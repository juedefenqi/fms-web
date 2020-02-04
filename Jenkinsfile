pipeline {
    agent {
        label "nodejs-slave"
    }
     parameters {
        string(name: 'GIT_CREDENTIALS_ID', defaultValue: '600749a1-32bb-40ea-b843-efd4d54a07ff', description: 'Git 用户凭据')
        string(name: 'GIT_URL', defaultValue: 'http://nvwa.jiuqi.com.cn/gitlab/jqjj/fccloud/fms-web.git', description: 'Git 仓库地址')
        string(name: 'BRANCH', defaultValue: 'master', description: '构建的分支名称')
        string(name: 'NEXUS_CREDENTIALS_ID', defaultValue: '600749a1-32bb-40ea-b843-efd4d54a07ff', description: 'Nexus 用户凭据')
        string(name: 'REP_NEXUS_INS_ID', defaultValue: 'nexus', description: 'Nexus 实例标识')
        string(name: 'REP_NEXUS_LIB_ID', defaultValue: 'npm-jqjj-releases', description: 'Maven/npm 仓库标识')
        string(name: 'REP_NEXUS_LIB_URL', defaultValue: 'http://nvwa.jiuqi.com.cn/nexus/repository/npm-jqjj-releases/', description: 'Maven/npm 仓库地址')
        string(name: 'REP_NEXUS_DOCKER_ID', defaultValue: '', description: 'Docker 镜像仓库标识')
        string(name: 'REP_NEXUS_DOCKER_URL', defaultValue: '', description: 'Docker 镜像仓库地址')
        booleanParam(name: 'PUBLISH_TO_LIB_REP', defaultValue: false, description: '是否自动发布到maven/npm仓库?')
        booleanParam(name: 'PUBLISH_TO_DOCKER_REP', defaultValue: false, description: '是否自动发布到DOCKER仓库?')
    }

    environment {
            NPM_COMMON_CREDS = credentials("${params.NEXUS_CREDENTIALS_ID}")
        }

    stages {
        stage('Preparation') {
            steps {
                    git branch: params.BRANCH, credentialsId: params.GIT_CREDENTIALS_ID, url: params.GIT_URL
            }
 
        }
        stage('Build') {
            steps {
                script {
                    echo "${env.NPM_COMMON_CREDS_USR}:${env.NPM_COMMON_CREDS_PSW}"
                   def npm_config_auth = "${env.NPM_COMMON_CREDS_USR}:${env.NPM_COMMON_CREDS_PSW}"
                    echo "${npm_config_auth}0000000000000000"
                    if (isUnix()) {
                        sh "npm install"
                        sh "npm run build"
                    } else {
                        bat "npm config set registry ${params.REP_NEXUS_LIB_URL}"
                        bat "npm config set email ${env.NPM_COMMON_CREDS_USR}@jiuqi.com.cn"
                        bat "npm config set always-auth true"
                        bat "npm config set _auth ${npm_config_auth}"
                        bat "npm install"
                        bat "npm run build"
                    }
 
                }   
            }
        }
        stage('Test') {
            steps {
             		echo '='*50 + 'test' + '='*50
                sh 'npm test'
            }
            post {
                always {
                    archiveArtifacts 'dist/*'
                }
            }
        }
    }
}
