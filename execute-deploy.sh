#!/bin/bash

cd /home/ec2-user/deploy/frontend/
~/.nvm/nvm.sh
yarn install
yarn build
sudo docker-compose up -d --build 