pipeline {
    agent any
    environment {
        DOCKER_USER = 'rekvv'
        IMAGE_NAME = 'grapefield_front'
        IMAGE_TAG = "${env.GIT_COMMIT[0..7]}-${BUILD_NUMBER}"
        VITE_BASE_IMAGE_URL = 'https://grapefield-image.s3.ap-northeast-2.amazonaws.com/'
    }
    stages {
        stage('Git clone') {
            agent {
                label 'build'
            }
            steps {
                echo "Cloning Repository"
                git branch: 'main', url: 'https://github.com/beyond-sw-camp/be12-fin-Catcher-GrapeField-FE.git'
            }
        }
        stage('Node.js Build') {
            agent {
                label 'build'
            }
            steps {
                sh '''
                    # 노드가 설치되어 있는지 확인
                    if ! command -v node &> /dev/null; then
                        echo "Node.js를 설치합니다..."
                        # NVM 설치 (Node Version Manager)
                        curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
                        # NVM 환경 설정 로드
                        export NVM_DIR="$HOME/.nvm"
                        [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"  # 백슬래시 제거
                        # Node.js LTS 버전 설치
                        nvm install --lts
                    fi
                    
                    set -x
                    echo "Node.js 버전: $(node -v || echo 'not installed')"
                    echo "NPM 버전: $(npm -v || echo 'not installed')"
                    export VITE_BASE_IMAGE_URL=${VITE_BASE_IMAGE_URL}
                    npm install
                    npm run build
                '''
                stash includes: 'dist/**/*', name: 'build-output'
                stash includes: 'k8s/*.yml', name: 'k8s-files'
            }
        }
        stage('Docker Build') {
            agent {
                label 'build'
            }
            steps {
                unstash 'build-output'
                sh """
                    # Docker 이미지 빌드
                    docker build -t ${DOCKER_USER}/${IMAGE_NAME}:${IMAGE_TAG} .
                """
            }
        }
        stage('Docker Push') {
            agent {
                label 'build'
            }
            steps {
                withCredentials([usernamePassword(credentialsId: 'DOCKER_HUB', passwordVariable: 'DOCKER_PASSWORD', usernameVariable: 'DOCKER_USERNAME')]) {
                    sh """
                        echo \${DOCKER_PASSWORD} | docker login -u \${DOCKER_USERNAME} --password-stdin
                        docker push ${DOCKER_USER}/${IMAGE_NAME}:${IMAGE_TAG}
                    """
                }
            }
        }
        stage('K8s Deploy') {
            agent {
                label 'deploy'
            }
            steps {
                script {
                    unstash 'k8s-files'
                    withEnv(['KUBECONFIG=/home/jenkins/.kube/config']) {
                        sh """
                            # 이미지 태그 업데이트
                            sed -i 's|${DOCKER_USER}/${IMAGE_NAME}:.*|${DOCKER_USER}/${IMAGE_NAME}:${IMAGE_TAG}|g' k8s/frontend-deployment.yml
                            
                            # 수정된 파일 내용 확인
                            echo "배포할 YAML 파일 내용:"
                            cat k8s/frontend-deployment.yml
                            
                            # Kubernetes에 배포
                            kubectl apply -f k8s/frontend-deployment.yml -n first --validate=false
                            kubectl rollout status deployment/nginx -n first
                        """
                    }
                }
            }
        }
    }
    post {
        success {
            echo "배포 성공: ${DOCKER_USER}/${IMAGE_NAME}:${IMAGE_TAG}"
        }
        failure {
            echo "배포 실패: 오류를 확인하세요."
        }
    }
}
