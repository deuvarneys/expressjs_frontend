This is a working project for a nodeJs frontend application.

To start the project, you will need to start up the server from https://github.com/deuvarneys/SpringRESTService along with a Mysql and MongoDb servers (This will start up to neccesary docker containers Spring, Mysql, and Mongo. Will need to have Docker-compose installed. Best to use Ubuntu or any other Linux distribution to avoid ip issues with docker vm). 

Start application
- $ cd myapp
- $ sudo npm install && npm start

Roadmap:
- Fix project directory structure(remove documents from rootdir and replace with documents in myapp dir)
- Incorporate docker composer to launch all required servers using one command
- (Began Implementation)Front-end page styling updates after ajax call from Webservice(mongoDB)
- (Began Implementation feature branch angularSignUp /signup2)Have sign up page use angularjs
- Have account History page use backboneJS
- Incorporate Unit Tests
- 
- (Implemented)Incorporate Jenkins(CICD)
- (Implemented)Incorporate Sonarqube (code quality)
- (Implemented)Ajax request to pull data from Web Service
- (Implemented)Implement Sign up page

Far down the Road:
- Incorporate selenium frontend automated testing using PhantomJS
