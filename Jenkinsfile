pipeline {
  agent any
  tools {
      nodejs "Nodejs"
  }
  stages {
    stage("Build") {
        steps {
            dir("${env.WORKSPACE}/hr-a11y") {
                withCredentials([string(credentialsId:'artifactory-api-key', variable: 'KEY')]) {
                    sh "curl -u\"joshua.mcclure@deque.com\":$KEY \"https://agora.dequecloud.com/artifactory/api/npm/auth\" > .npmrc"
                    sh "echo \"registry = https://agora.dequecloud.com/artifactory/api/npm/dequelabs/\" >> .npmrc"
                }
                sh "npm install"
                sh "npm run build"
            }
        }
    }
    stage('Run CI tests') {
        steps {
            // sh "npm install"
            // sh "npm run build"
            catchError {
                sh "npm test"
            }
        }
    }
  }
  post {
    always {
        junit '**/a11y-results/**/*.xml'
    }
  }
}