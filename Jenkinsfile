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
                    withEnv(['KUBECONFIG=/home/test/.kube/config']) {
                        sh """
                            # 이미지 태그 업데이트
                            sed -i 's/latest/${IMAGE_TAG}/g' k8s/frontend-deployment.yml
                            
                            # YAML 파일을 임시 파일로 복사
                            cp k8s/frontend-deployment.yml k8s/frontend-deployment-temp.yml
                            
                            # strategy 섹션이 spec.template.spec에 있는지 확인
                            if grep -q "spec:" k8s/frontend-deployment.yml && grep -q "template:" k8s/frontend-deployment.yml && grep -A5 "template:" k8s/frontend-deployment.yml | grep -q "spec:" && grep -A10 "spec:" k8s/frontend-deployment.yml | grep -q "strategy:"; then
                                echo "strategy 섹션이 잘못된 위치에 있습니다. 수정합니다."
                                
                                # 임시 파일 생성 및 구조 수정
                                cat << 'EOF' > fix_yaml.py
#!/usr/bin/env python3
import yaml, sys

# YAML 파일 로드
with open('k8s/frontend-deployment-temp.yml', 'r') as file:
    try:
        data = yaml.safe_load(file)
    except yaml.YAMLError as e:
        print(f"YAML 파일 읽기 오류: {e}")
        sys.exit(1)

# strategy 섹션을 찾아 올바른 위치로 이동
strategy = None
if 'spec' in data and 'template' in data['spec'] and 'spec' in data['spec']['template']:
    template_spec = data['spec']['template']['spec']
    if 'strategy' in template_spec:
        strategy = template_spec.pop('strategy')
        data['spec']['strategy'] = strategy
        print("strategy 섹션을 올바른 위치로 이동했습니다.")
    else:
        print("strategy 섹션을 찾을 수 없습니다.")
else:
    print("YAML 구조를 찾을 수 없습니다.")

# 수정된 YAML 저장
with open('k8s/frontend-deployment.yml', 'w') as file:
    yaml.dump(data, file, default_flow_style=False)
EOF
                                
                                # 파이썬 스크립트 실행 권한 부여 및 실행
                                chmod +x fix_yaml.py
                                python3 fix_yaml.py
                                
                                echo "YAML 파일 수정 완료. 수정된 내용:"
                                cat k8s/frontend-deployment.yml
                            else
                                echo "strategy 섹션 위치 문제가 없거나 다른 YAML 구조입니다."
                            fi
                            
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
        always {
            echo "파이프라인 실행 완료"
            // 임시 파일 정리
            sh "rm -f k8s/frontend-deployment-temp.yml fix_yaml.py || true"
        }
        success {
            echo "배포 성공: ${DOCKER_USER}/${IMAGE_NAME}:${IMAGE_TAG}"
        }
        failure {
            echo "배포 실패: 오류를 확인하세요."
        }
    }
}
