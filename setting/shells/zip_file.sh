#!/bin/bash
# author:zzx

project_path=$(
  cd $(dirname $0)
  pwd
)

# 进入项目根目录
cd $project_path/../../dist/$1

start winrar a -r $1.zip

echo "文件 ${1}.zip 压缩成功"
