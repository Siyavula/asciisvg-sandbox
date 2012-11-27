#!/bin/bash

# ==================================================
# Script to install python_server
# Author: Leen Remmelzwaal
# Date: 2nd November 2012
# ==================================================

echo; echo "Welcome to bash setup for ASCIISVG Server.";

# Install software
echo; 
read -p "Press any key to download & install APACHE, PHP and python-rsvg... "
sudo apt-get install apache2
sudo apt-get install php5 libapache2-mod-php5
sudo apt-get install python-rsvg

# Download siyavula.asciisvg repository
echo; 
read -p "Press any key to download siyavula.asciisvg repository... "
git clone "https://github.com/leenremm/siyavula.asciisvg.git"

# Testing APACHE CONFIG FILE
echo; 
read -p "Press any key to ADD text to & EDIT httpd.conf... "
sudo gedit /etc/apache2/httpd.conf

# Give full user access to /var/www/
echo; 
read -p "Press any key to give user ACCESS to /var/www/... "
sudo chmod 777 /var/www -R

# Testing APACHE CONFIG FILE
echo; 
read -p "Press any key to RESTART apache server... "
sudo /etc/init.d/apache2 restart
