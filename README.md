This is a working project for a nodeJs frontend application.

To start the project, you will need to start up the server from https://github.com/deuvarneys/SpringRESTService along with a Mysql and MongoDb servers (I recommend using Docker. In a future commit, I will incorporate these servers in docker/docker-composer so user will only have to run one command). 

Start application
$ cd myapp
$ npm install
$ npm start

Roadmap:
- Fix project directory structure(remove documents from rootdir and replace with documents in myapp dir)
- Incorporate docker composer to launch all required servers using one command
- (Implemented)Ajax request to pull data from Web Service
- (Implemented)Implement Sign up page
- Front-end page styling updates after ajax call from Webservice(mongoDB)
- Have sign up page use angularjs
- Have account History page use backboneJS
- Incorporate Unit Tests
- Incorporate Jenkins(CICD)
- Incorporate Sonarqube (code quality)

Far down the Road:
- Incorporate selenium frontend automated testing using PhantomJS
