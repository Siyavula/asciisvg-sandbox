#!/bin/sh

echo;
while true; do
    read -p "Are you sure you want to PUSH? [y/n]" yn
    case $yn in
        [Yy]* ) echo "PUSH: asciisvg-sandbox"; git push; echo "PUSH: siyavula.asciisvg"; cd apache_server/siyavula.asciisvg; git push; cd ../../; break;;
        [Nn]* ) break;;
        * ) echo "Please answer y or n.";;
    esac
done
