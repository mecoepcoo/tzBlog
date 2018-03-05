#!/bin/bash
#run blog
echo -e "express启动中... \n"
gnome-terminal -x bash -c "bash ./run-front.sh;exec bash;"
npm start

