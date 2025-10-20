pipeline {
    agent any

    environment {
        SCANNER_HOME = tool 'sonar-scanner'
        IMAGE_TAG = "${BUILD_NUMBER}"
    }

    


    stages {

        stage('Clean Workspace') {
            steps {
                cleanWs()
            }
        }
        stage('Git Checkout Code') {
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
        stage('Build & Push Docker Images') {
    parallel {
        stage('Frontend Image') {
            steps {
                dir('pcd_front') {
                    withCredentials([usernamePassword(credentialsId: 'dockerhub-cred', usernameVariable: 'DOCKERHUB_USERNAME', passwordVariable: 'DOCKERHUB_PASSWORD')]) {
                        sh '''
                        docker build -t $DOCKERHUB_USERNAME/frontend:$IMAGE_TAG .
                        echo "$DOCKERHUB_PASSWORD" | docker login -u "$DOCKERHUB_USERNAME" --password-stdin
                        docker push $DOCKERHUB_USERNAME/frontend:$IMAGE_TAG
                        '''
                    }
                }
            }
        }
        stage('Backend Image') {
            steps {
                dir('pcd_back/backend') {
                    withCredentials([usernamePassword(credentialsId: 'dockerhub-cred', usernameVariable: 'DOCKERHUB_USERNAME', passwordVariable: 'DOCKERHUB_PASSWORD')]) {
                        sh '''
                        docker build -t $DOCKERHUB_USERNAME/backend:$IMAGE_TAG .
                        echo "$DOCKERHUB_PASSWORD" | docker login -u "$DOCKERHUB_USERNAME" --password-stdin
                        docker push $DOCKERHUB_USERNAME/backend:$IMAGE_TAG
                        '''
                    }
                }
            }
        }
        stage('AI Image') {
            steps {
                dir('ai') {
                    withCredentials([usernamePassword(credentialsId: 'dockerhub-cred', usernameVariable: 'DOCKERHUB_USERNAME', passwordVariable: 'DOCKERHUB_PASSWORD')]) {
                        sh '''
                        docker build -t $DOCKERHUB_USERNAME/ai:$IMAGE_TAG .
                        echo "$DOCKERHUB_PASSWORD" | docker login -u "$DOCKERHUB_USERNAME" --password-stdin
                        docker push $DOCKERHUB_USERNAME/ai:$IMAGE_TAG
                        '''
                    }
                }
            }
        }
    }
  }

  stage('Trivy Scan Images') {
    steps {
        withCredentials([usernamePassword(credentialsId: 'dockerhub-cred', usernameVariable: 'DOCKERHUB_USERNAME', passwordVariable: 'DOCKERHUB_PASSWORD')]) {
            sh "trivy image --scanners vuln --timeout 30m --format table -o trivy-frontend-image-report.html $DOCKERHUB_USERNAME/frontend:$IMAGE_TAG"
            sh "trivy image --scanners vuln --timeout 30m --format table -o trivy-backend-image-report.html $DOCKERHUB_USERNAME/backend:$IMAGE_TAG"
            sh "trivy image --scanners vuln --timeout 30m  --format table -o trivy-ai-image-report.html $DOCKERHUB_USERNAME/ai:$IMAGE_TAG"
        }
    }
  }
  stage('Publish Reports') {
    steps {
        publishHTML([
            reportDir: '.',
            reportFiles: 'trivy-frontend-image-report.html,trivy-backend-image-report.html,trivy-ai-image-report.html',
            reportName: 'Trivy Security Reports',
            keepAll: true,
            alwaysLinkToLastBuild: true,
            allowMissing: true
        ])
     }
  }

    stage('Update Helm Chart Values & Push') {
            steps {
                script {
                    withCredentials([usernamePassword(
                        credentialsId: 'tokengithub',  // Jenkins credential ID
                        usernameVariable: 'GIT_USERNAME',
                        passwordVariable: 'GIT_PASSWORD'
                    )]) {
                        sh """
                        # Update image tags in Helm values
                        sed -i "s/tag:.*/tag: $IMAGE_TAG/" mychart/frontend/values.yaml
                        sed -i "s/tag:.*/tag: $IMAGE_TAG/" mychart/backend/values.yaml
                        sed -i "s/tag:.*/tag: $IMAGE_TAG/" mychart/ai/values.yaml

                        # Configure Git (use your GitHub email here, not the Jenkins var)
                        git config --global user.name "$GIT_USERNAME"
                        git config --global user.email "hakim.salah@ensi-uma.tn"

                        # Commit and push changes
                        git add .
                        git commit -m "Update image tags to $IMAGE_TAG" || echo "No changes to commit"
                        git push https://Hakimsalah:${GIT_PASSWORD}@github.com/Hakimsalah/DevOps-CI-CD-Pipeline.git HEAD:main
                        """
                    }
                }
            }
        }

        stage('Install ArgoCD CLI') {
              steps {
                        sh '''
                            # Télécharger et installer ArgoCD CLI
                            curl -sSL -o argocd-linux-amd64 https://github.com/argoproj/argo-cd/releases/latest/download/argocd-linux-amd64
                            sudo install -m 555 argocd-linux-amd64 /usr/local/bin/argocd
                            rm argocd-linux-amd64
                            '''
                    }
         }

        stage('ArgoCD Sync') {
    steps {
        script {
            withCredentials([string(credentialsId: 'argocd-password', variable: 'ARGOCD_PASSWORD')]) {
                sh '''
                    # Obtenir l'IP de l'hôte Docker
                    HOST_IP=$(ip route | grep default | awk '{print $3}')
                    echo "Tentative de connexion à ArgoCD sur: $HOST_IP:2020"
                    
                    argocd login $HOST_IP:2020 --username admin --password $ARGOCD_PASSWORD --insecure
                    argocd app sync frontend
                    argocd app sync backend
                    argocd app sync ai
                '''
            }
        }
    }
}
        
    }
}