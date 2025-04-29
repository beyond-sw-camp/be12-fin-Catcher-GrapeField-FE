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
                script {  // script 블록 추가
                    docker.image('node:18').inside('-u root') {
                        sh '''
                            export VITE_BASE_IMAGE_URL=${VITE_BASE_IMAGE_URL}
                            npm install
                            npm run build
                        '''
                    }
                }
            }
        }
        stage('Docker Build') {
            agent {
                label 'build'
            }
            steps {
                script {
                    def fullImageName = "${DOCKER_USER}/${IMAGE_NAME}:${IMAGE_TAG}"
                    echo "Building Docker image: ${fullImageName}"
                    
                    docker.build(fullImageName)
                }
            }
        }
        stage('Docker Push') {
            agent {
                label 'build'
            }
            steps {
                script {
                    def fullImageName = "${DOCKER_USER}/${IMAGE_NAME}:${IMAGE_TAG}"
                    echo "Pushing Docker image: ${fullImageName}"
                    docker.withRegistry('https://index.docker.io/v1/', 'DOCKER_HUB') {
                        docker.image(fullImageName).push()
                    }
                }
            }
        }
        stage('K8s Deploy') {
            agent {
                label 'deploy'
            }
            steps {
                script {
                    withEnv(['KUBECONFIG=/home/test/.kube/config']) {
                        sh """
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
