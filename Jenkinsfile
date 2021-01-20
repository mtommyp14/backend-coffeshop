def dockerhub = "mtommyp14/back"
def images_name = "${dockerhub}:${BRANCH_NAME}"
def builder 

pipeline{
    
    agent any

    // parameters{
    //     string(name: 'DOKERHUB', defaultValue: 'Hallo Params', description: 'blasalavbla')
    //     booleanParam(name: 'RUNTEST', defaultValue: 'false', description: 'lalalal')
    //     choice(name: 'DEPLOY', choices: ["Yes", "No"], description: 'lalalal')
    // }
    
    stages{

        stage("Install dependencies"){

            steps{
                nodejs("node14 back"){
                    sh 'npm install'
                }
            }
        }

        stage("Build Docker"){
            steps{
                script{
                    builder = docker.build("${dockerhub}:${BRANCH_NAME}")
                }
            }
        }

        stage("Testing Image"){
            steps{
                script{
                    builder.inside{
                        sh 'Echo Passed'
                    }
                }
            }
        }

        stage("Push Image"){
            steps{
                script{
                        builder.push
                    }
            }
        }
    }
}