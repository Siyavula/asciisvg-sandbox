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
while true; do
    read -p "Do you wish to WRITE to httpd.conf? [y/n]" yn
    case $yn in
        [Yy]* ) echo "Add the following lines to the httpd.conf file: \n\n<Directory /var/www/asciisvg-sandbox/apache_server/version_2/cgi-bin/>
	Options +ExecCGI
	AllowOverride None
	AddHandler cgi-script .py
</Directory>

<Directory /var/www/asciisvg-sandbox/apache_server/version_3/cgi-bin/>
	Options +ExecCGI
	AllowOverride None
	AddHandler cgi-script .py
</Directory>

<Directory /var/www/asciisvg-sandbox/apache_server/version_4/cgi-bin/>
	Options +ExecCGI
	AllowOverride None
	AddHandler cgi-script .py
</Directory>

<Directory /var/www/asciisvg-sandbox/apache_server/version_5/cgi-bin/>
	Options +ExecCGI
	AllowOverride None
	AddHandler cgi-script .py
</Directory>"; sudo gedit /etc/apache2/httpd.conf; break;;
        [Nn]* ) break;;
        * ) echo "Please answer y or n.";;
    esac
done

# Give full user access to /var/www/
echo; 
read -p "Press any key to give user ACCESS to /var/www/... "
sudo chmod 777 /var/www -R

# Testing APACHE CONFIG FILE
echo; 
read -p "Press any key to RESTART apache server... "
sudo /etc/init.d/apache2 restart
