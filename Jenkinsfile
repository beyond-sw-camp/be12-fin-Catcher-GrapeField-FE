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
                sh """
                    # Node 컨테이너 실행 및 빌드
                    docker run --rm -v \$(pwd):/app -w /app -e VITE_BASE_IMAGE_URL=${VITE_BASE_IMAGE_URL} node:18 /bin/bash -c '
                        echo "VITE_BASE_IMAGE_URL=\$VITE_BASE_IMAGE_URL" > .env
                        npm install
                        npm run build
                    '
                """
            }
        }
        stage('Docker Build') {
            agent {
                label 'build'
            }
            steps {
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
                withCredentials([string(credentialsId: 'DOCKER_HUB', variable: 'DOCKER_PASSWORD')]) {
                    sh """
                        echo \${DOCKER_PASSWORD} | docker login -u ${DOCKER_USER} --password-stdin
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
                sh """
                    export KUBECONFIG=/home/test/.kube/config
                    
                    # 이미지 태그 업데이트
                    sed -i 's/latest/${IMAGE_TAG}/g' k8s/frontend-deployment.yml
                    
                    # 수정된 파일 내용 확인 (디버깅용)
                    echo "배포할 YAML 파일 내용:"
                    cat k8s/frontend-deployment.yml
                    
                    # Kubernetes에 배포
                    kubectl apply -f k8s/frontend-deployment.yml -n first
                    kubectl rollout status deployment/nginx -n first
                """
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
