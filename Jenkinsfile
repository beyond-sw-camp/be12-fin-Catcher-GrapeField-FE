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
                    # .env.production 파일 직접 생성
                    echo "VITE_BASE_IMAGE_URL=https://grapefield-image.s3.ap-northeast-2.amazonaws.com/" > .env.production

                    # 확인을 위해 파일 내용 출력
                    echo "생성된 .env.production 파일 내용:"
                    cat .env.production

                    npm install
                    npm run build
                '''
                // 빌드된 결과물과 k8s 파일 stash
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
