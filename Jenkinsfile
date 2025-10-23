pipeline {
    agent any

    environment {
        SCANNER_HOME = tool 'sonar-scanner'
        IMAGE_TAG = "${BUILD_NUMBER}"
    }

    stages {
        stage('Clean Workspace') {
            steps { cleanWs() }
        }

        stage('Checkout Code') {
            steps {
                git branch: 'main', url: 'https://github.com/Hakimsalah/DevOps-CI-CD-Pipeline.git'
            }
        }

        stage('SonarQube Analysis') {
            parallel {
                stage('Frontend') {
                    steps {
                        dir('pcd_front') {
                            withSonarQubeEnv('sonar-server') {
                                sh """ 
                                $SCANNER_HOME/bin/sonar-scanner \
                                -Dsonar.projectName=frontend \
                                -Dsonar.projectKey=frontend
                                """
                            }
                        }
                    }
                }
                stage('Backend') {
                    steps {
                        dir('pcd_back/backend') {
                            withSonarQubeEnv('sonar-server') {
                                sh """
                                ./mvnw clean compile sonar:sonar \
                                -Dsonar.projectName=backend \
                                -Dsonar.projectKey=backend \
                                -Dsonar.java.binaries=target/classes
                                """
                            }
                        }
                    }
                }
                stage('AI Service') {
                    steps {
                        dir('ai') {
                            withSonarQubeEnv('sonar-server') {
                                sh """
                                $SCANNER_HOME/bin/sonar-scanner \
                                -Dsonar.projectName=ai \
                                -Dsonar.projectKey=ai
                                """
                            }
                        }
                    }
                }
            }
        }

        stage('Trivy Source Scan') {
            steps {
                sh """
                trivy fs --scanners vuln,secret --format table -o trivy-source-report.html .
                """
            }
        }

        stage('Build Docker Images') {
            parallel {
                stage('Frontend Image') {
                    steps {
                        dir('pcd_front') {
                            sh "docker build -t hakim2002/frontend:$IMAGE_TAG ."
                        }
                    }
                }
                stage('Backend Image') {
                    steps {
                        dir('pcd_back/backend') {
                            sh "docker build -t hakim2002/backend:$IMAGE_TAG ."
                        }
                    }
                }
                stage('AI Image') {
                    steps {
                        dir('ai') {
                            sh "docker build -t hakim2002/ai:$IMAGE_TAG ."
                        }
                    }
                }
            }
        }

        stage('Trivy Image Scan') {
            steps {
                sh """
                trivy image --timeout 30m --format table -o trivy-frontend-image-report.html hakim2002/frontend:$IMAGE_TAG
                trivy image --timeout 30m --format table -o trivy-backend-image-report.html hakim2002/backend:$IMAGE_TAG
                trivy image --timeout 30m --format table -o trivy-ai-image-report.html hakim2002/ai:$IMAGE_TAG
                """
            }
        }

        stage('Push Docker Images') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub-cred', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                    sh """
                    echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin
                    docker push hakim2002/frontend:$IMAGE_TAG
                    docker push hakim2002/backend:$IMAGE_TAG
                    docker push hakim2002/ai:$IMAGE_TAG
                    """
                }
            }
        }

        stage('Publish Trivy Reports') {
            steps {
                publishHTML([
                    reportDir: '.',
                    reportFiles: 'trivy-source-report.html,trivy-frontend-image-report.html,trivy-backend-image-report.html,trivy-ai-image-report.html',
                    reportName: 'Security Reports',
                    keepAll: true
                ])
            }
        }

        stage('Update Helm Charts & Push') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'githubtoken', usernameVariable: 'GIT_USER', passwordVariable: 'GIT_PASS')]) {
                    sh """
                    sed -i "s/tag:.*/tag: $IMAGE_TAG/" mychart/frontend/values.yaml
                    sed -i "s/tag:.*/tag: $IMAGE_TAG/" mychart/backend/values.yaml
                    sed -i "s/tag:.*/tag: $IMAGE_TAG/" mychart/ai/values.yaml

                    git config --global user.name "$GIT_USER"
                    git config --global user.email "hakim.salah@ensi-uma.tn"

                    git add .
                    git commit -m "Update Helm image tags to $IMAGE_TAG" || echo "No changes"
                    git push https://Hakimsalah:${GIT_PASS}@github.com/Hakimsalah/DevOps-CI-CD-Pipeline.git HEAD:main
                    """
                }
            }
        }

        stage('ArgoCD Sync') {
            steps {
                withCredentials([string(credentialsId: 'argocd-password', variable: 'ARGO_PASS')]) {
                    sh """
                    argocd login localhost:32690 --username admin --password $ARGO_PASS --insecure
                    argocd app sync frontend
                    argocd app sync backend
                    argocd app sync ai
                    """
                }
            }
        }
    }
}
