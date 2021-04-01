#!/bin/bash

cd /home/ec2-user/deploy/frontend/
PATH=$PATH:/home/ec2-user/.yarn/bin:/home/ec2-user/.nvm/versions/node/v15.12.0/bin
sudo chmod -R 777 .
yarn install
yarn build
sudo docker-compose up -d --build 