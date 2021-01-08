pipeline {
      agent any
      environment {
      registry = "frannyoa/"
      registryCredential = 'frannyoa'
      DOCKER_TAG = 'simpleweb'
    }
    stages {
      stage('Cloning Git') {
        steps {
          git 'https://github.com/frannkyoa/simpleweb.git'
        }
      }
      stage('Build docker Image'){
        steps{
           script{
             dockerImage = docker.build registry + ":$DOCKER_TAG"
           }
        }
      }
      stage('Push Docker image to DockerHub') {
        steps{
          script{
              docker.withRegistry( '', registryCredential ) { 
              dockerImage.push()
          }        
         } 
        }
      }
    }
}

/* def getDockerTag() {
  def tag = sh script: 'git rev-parse HEAD', returnStdout: true
  return tag
} */