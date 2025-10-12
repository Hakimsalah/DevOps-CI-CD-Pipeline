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
    }
}