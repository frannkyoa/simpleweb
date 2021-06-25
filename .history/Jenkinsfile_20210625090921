
pipeline {
    agent any
    environment {
        PROJECT_ID = 'gcp-kubernetes-terraform'
        CLUSTER_NAME = 'gcp-ckak8s-cluster'
        LOCATION = 'us-central1-c'
        CREDENTIALS_ID = 'gcp-kubernetes-terraform'
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
                    dockerImage.push()
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