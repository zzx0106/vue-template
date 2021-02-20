#!/bin/bash
# author:zzx

project_path=$(
  cd $(dirname $0)
  pwd
)
# 先跳入指定页面
cd $2

echo "git pull origin master $3==>$4"
git pull origin master

# sleep 4s

echo "复制文件$project_path/../../dist/$1/$1.zip夹到$2/$1.zip"
cp -r $project_path/../../dist/$1/$1.zip $2/$1.zip

echo "git add ."
git add .

echo "git status"
git status

echo "git commit"
git commit -m "$3==>$4"

echo "git push"
git push origin master

echo "推送成功"