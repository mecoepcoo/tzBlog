#!/bin/bash
#run blog
echo -e "ng引擎启动中... \n"
path=$(cd `dirname $0`;pwd)
cd "${path}/view-admin" && npm start