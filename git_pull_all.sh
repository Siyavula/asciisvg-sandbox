#!/bin/sh

# asciisvg-sandbox
echo "PULL: asciisvg-sandbox"
git pull;

# siyavula.asciisvg
echo "PULL: siyavula.asciisvg"
cd apache_server/siyavula.asciisvg
git pull;	 

# return
cd ../../

