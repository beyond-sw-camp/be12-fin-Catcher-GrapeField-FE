pipeline {
    agent any

    environment {
        DOCKER_USER = 'rekvv'
        IMAGE_NAME = 'grapefield_front'
        IMAGE_TAG = "${env.GIT_COMMIT[0..7]}-${BUILD_NUMBER}"
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
                docker { 
                    label 'build'
                    image 'node:18' 
                    args '-u root'
                }
            }
            steps {
                sh '''
                    npm install
                    npm run build
                '''
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
                    withEnv(['KUBECONFIG=/home/jenkins/.kube/config']) {
                        sh """
                            sed -i 's/latest/${IMAGE_TAG}/g' k8s/frontend-deployment.yml
                            kubectl apply -f k8s/frontend-deployment.yml -n first --validate=false
                            kubectl rollout status deployment/nginx -n first
                        """
                    }
                }
            }
        }
    }
}
