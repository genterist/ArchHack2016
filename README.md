# Project LOLA - 2016

##Project Mission Statement
Bringing artificial intelligence to real life - Filling in the gaps, inspiring the future, growing happiness 

##Project Scope
+ For young kid (less than ten y.o.) and aging population (over 60 y.o.)
+ For both professional institutions and private homes
+ For both physical and digital domain
+ For English speaking communities

##Project Goals

A next-gen robot that can provide personalized health care experience to various groups of patients on demand at their private nursing, hospital room or private house. A robot that is sensitive through carefully tailored artificial intelligence engines and is also fast in collaborating with different systems ensure patients get the fastest and most reliable results.
Our project will demo the capabilities of : smart tracking of medicine consumption, basict first aide assesment through questionaries, smart conversations (helps with mental illness), smart notification.

## Versioning

###VERSION 1  (11/05/2016)
Project versioning is done by using GitHub. Project link is:  https://github.com/genterist/ArchHack2016

## Authors

* **Tam Nguyen** - Team Lead - *Initial work* - [Genterist](https://github.com/genterist)
* **Aditya Karnam** - Node.js and IBM Bluemix - *Initial work* - [Aditya](https://github.com/adityak74)
* **Dheeraj Arremsetty** - Python and Bluemix - *Initial work* - [Dheeraj-Arremsetty](https://github.com/Dheeraj-Arremsetty)
* **Thomas Downs** - Choregraphe programming and data base - *Initial work* - [ThomasLDowns](https://github.com/ThomasLDowns)

We also like to thank Washington University, Centene, Express Scripts, and other sponsors who provided us with an excellent atmosphere so we could work and finished this project in one weekend (11/06/2016)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Hat tip to anyone who's code was used
* Credits to Alderbaran and the NAO bot community for a well developed IDE and many usefull library contributions
* This project is just a demo and is far from being qualified to be used even in home
* Codes from this project can be installed on PEPPER - a human size robot with even more capabilities
* etc

## Getting Started

To get started, you can use 

### Prerequisites

You will need to have an access to an Alderbaran robot (NAO in this case)

You will need these tools/softwares to be able to fully deploy this solution

IBM Bluemix account and knowledge of deploying IBM's Bluemix boilers

Node.JS – event driven, I/O model. Optimal for applications with many input/output operations, such as the real-time communication program used in our project.

MySQL – relational database management system. Used in our project to store user information for access by the interactive assistant.

Python – object-oriented, high-level programming language.

Aldebaran ID – API designed for face recognition. Used in our project to allow the assistant to identify patients by their face and then pull up their stored information from the database.

Choreographe IDE – development environment for the robot used

Linux - must be familiar with Linux because it is the official OS for the robot

Putty - a SSH client to connect to the robot

GitHub - a working knowledge of GitHub


### Installing

Please follow the links to install the necessary tools

[http://doc.aldebaran.com/1-14/software/installing.html](http://doc.aldebaran.com/1-14/software/installing.html)

[IBM BlueMix](https://console.ng.bluemix.net/)

[Node.JS](https://nodejs.org/en/download/)

[Python 2.7 Documentation](https://docs.python.org/2/index.html)

[MYSQL installation](https://dev.mysql.com/downloads/installer/)

[Putty SSH client](http://www.putty.org/)

[Python Request module](http://docs.python-requests.org/en/master/user/install/)

[Python Json encoder and decoder module ](https://docs.python.org/2.7/library/json.html)

Basic installation steps:
* SSH to NAO robot, install PIP
* install Request module to NAO
* Install and set up Node.JS, MySQL, Python 2.7
* Register for Blue mix and deploy Watson Conversation service, Watson visual recognition service
* Install and download Choregraphe.
* Download and open software package from this github page (folder "MediBot")
* Set up Node.JS api with IBM Bluemix, make sure mySQL is working
* Open Choregraphe, load the project to robot and deploy

## Running the tests

... testing information

## Deployment

Add additional notes about how to deploy this on a live system


