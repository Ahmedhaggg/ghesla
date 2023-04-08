
# Ghesla
Ghesla is a shop that provides car cleaning services and also sells car cleaning accessories. 
Customers can request the bikers service to clean their car in place by registering on the application and going to the store to put the balance in their account on application so that they can request the service.


## Tech Stack
* node.js
* express js
* mysql
* sequelize
* html
* css
* bootstrap
* docker-compose
* nginx
* aws ec2 
* aws s3 bucket

## Installation
  1- clone the repo
  2- Install docker and docker-compose
  3- run start command : 
  docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d
  4- serve http://localhost:4500 and create database picker_service
  5- after create database 
  run the start command again.
  
  

## Documentation

[Postman Documentation](https://www.postman.com/ghesla/workspace/ghesla/overview?ctx=settings)


## links
dashboard link : 
[dashboard link](http://44.213.108.46/dashboard)

api link : 
http://44.213.108.46/api/v1/ + [service url] 


## completed Api features
### 1- customers
* register and OTP login 
* create reservations and and request additional service (accessories) with balance or points
* can save his cars info
* can send gifts to his friends
### 2- stuff
* login
* add balance to customers
* add points for customer if request service from the site;

### 3- pickers 
* login
* complete reservation with image before and after for car

### some cron jobs service 
* scheduler for add every day available places for reservation from count number of pickers
