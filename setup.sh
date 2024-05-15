#!/bin/bash

# update and upgrade
sudo apt-get update
sudo apt-get upgrade

# Install nodejs and npm
sudo apt install postgresql postgresql-client -y

# Install Packages and database
pushd ./ad_scraper/crawler > /dev/null
npm install
sudo -u postgres psql -c "ALTER USER postgres PASSWORD 'postgres';"
sudo -u postgres psql -c "CREATE DATABASE adscraper;"
sudo -u postgres psql -d adscraper -f ../adscraper.sql
popd > /dev/null

# Install google-chrome
wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub > linux_signing_key.pub
sudo install -D -o root -g root -m 644 linux_signing_key.pub /etc/apt/keyrings/linux_signing_key.pub
sudo sh -c 'echo "deb [arch=amd64 signed-by=/etc/apt/keyrings/linux_signing_key.pub] http://dl.google.com/linux/chrome/deb/ stable main" > /etc/apt/sources.list.d/google-chrome.list'
sudo apt update
sudo apt install google-chrome-stable -y


