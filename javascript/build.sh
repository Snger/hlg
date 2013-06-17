#!/bin/sh

baseDir=/service/dev/abing/promo/www/js/hlg/v3
echo $baseDir

name="Mmonitor"

time="20130510"

#read -p "请输入需要打包发布的模块名称 : " name   
#echo $name
#if [ ! -n "$name" ]; then  
#	echo "模块名称不能空"
#	exit
#fi  

#read -p "请输入发布目录格式20130202 : " time 
#echo $time
#if [ ! -n "$time" ]; then  
#	echo "请输入发布目录格式"
#	exit
#fi 


for mode in `ls ${baseDir}/${name}`; do
    if [ ${mode} != "1.0" ]; then  
    	echo "delete ${mode}"
    	rm -rf ${baseDir}/${name}/${mode}
	fi  
done

cd /service/dev/abing/promo/www/js/hlg/v3


ki build ${name}/1.0 -t ${time}

echo "完成"



