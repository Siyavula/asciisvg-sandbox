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

sudo apt-get install php5 libapache2-mod-php5 perl-tk php-pear php5-curl php5-dev php5-gd php5-mcrypt php5-mysql

sudo apt-get install libcairo-gobject2 libcairo-perl libcairo-script-interpreter2 libcairo2	libcairo2-dev	libcairomm-1.0-1 libmono-cairo4.0-cil 

sudo apt-get install python-rsvg python-cairo python-gi-cairo python-evolution python-feedparser python-flask python-gnome2 python-gtksourceview2 python-jinja2 python-libxslt1 python-mlt3 python-nautilus python-poster python-pygoocanvas python-pyorbit python-pywapi python-uniconvertor python-utidylib python-virtualenv python-webkit python-werkzeug python-wnck python3 python3-minimal python3.2 python3.2-minimal

sudo apt-get install librsvg2-2 librsvg2-bin librsvg2-common python-rsvg

# Download siyavula.asciisvg repository
echo; 
read -p "Press any key to download siyavula.asciisvg repository... "
git clone "https://github.com/Siyavula/siyavula.asciisvg.git"

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
