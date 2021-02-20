#!/bin/bash
# author:zzx

project_path=$(
  cd $(dirname $0)
  pwd
)

# 进入项目根目录 -p如果目录不存在，则创建目录路径
mkdir -p $project_path/../../../pms-bakup/$1 && cp $project_path/../../dist/$1/$1.zip  $project_path/../../../pms-bakup/$1/$2.zip

cd $project_path/../../../pms-bakup/$1

echo "文件 $1.zip 备份成功 备份路径 $(pwd)/$2.zip"
