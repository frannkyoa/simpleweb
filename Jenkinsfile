pipeline {
      agent any
      environment {
      registry = "frannyoa/frankie_docker_1repo"
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

pipeline {
    agent any
    environment {
        PROJECT_ID = 'gcp-devops-project-299410'
        CLUSTER_NAME = 'gke-terraform-cls01'
        LOCATION = 'europe-west2-c'
        CREDENTIALS_ID = 'gcp-devops-project-299410'
        registry = "frannyoa/frankie_docker_1repo"
        registryCredential = 'frannyoa'
        dockerImage = 'simpleweb'
    }
    stages {
        stage('Cloning Simpleweb GitHub Repo') {
        steps {
          git 'https://github.com/frannkyoa/simpleweb.git'
        }
      }
        stage("Build image") {
            steps {
                script {
                    dockerImage = docker.build registry + ":$dockerImage"
                }
            }
        }
        stage("Push image") {
            steps {
                script {
                    docker.withRegistry( '', registryCredential ) { 
                    dockerImage.push("latest")
                    }
                }
            }
        }        
        stage('Deploy to GKE Cluster') {
            steps{
                step([$class: 'KubernetesEngineBuilder', projectId: env.PROJECT_ID, clusterName: env.CLUSTER_NAME, location: env.LOCATION, manifestPattern: 'deployment.yaml', credentialsId: env.CREDENTIALS_ID, verifyDeployments: true])
            }
        }
    }    
}