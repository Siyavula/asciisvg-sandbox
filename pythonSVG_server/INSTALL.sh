#!/bin/bash

# ==================================================
# Script to install python_server
# Author: Leen Remmelzwaal
# Date: 2nd November 2012
# ==================================================

echo; echo "Welcome to bash setup for ASCIISVG Server.";

# Install APACHE2
echo; 
read -p "Press any key to download & install APACHE... "
sudo apt-get install apache2

# Testing FIREFOX
echo; 
read -p "Press any key to display FIREFOX test... "
firefox http://localhost/ &

echo; 
read -p "Was the server test OK? Press any key to continue..."

# Install php
echo; 
read -p "Press any key to download & install PHP... "
sudo apt-get install php5 libapache2-mod-php5

# Install python-rsvg
echo; 
read -p "Press any key to download & install python-rsvg... "
sudo apt-get install python-rsvg

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
