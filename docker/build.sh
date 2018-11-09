#!/bin/bash -ilex

#jenkins config
#chmod -R +777 ${WORKSPACE}/docker/
#${WORKSPACE}/docker/build.sh ${BUILD_NUMBER} "cqdev" "root@master" "reg.cqdev.com/develop" "business-mannger-web" "1.0"

SCRIPT=$(readlink -f $0)
SCRIPTPATH=`dirname $SCRIPT`

BUILD_NUMBER=$1
NAMESPACE=$2
MASTERSERVER=$3
REPOSITORY=$4
NAME=$5
VER=$6
DATENUMBER=$(date +%Y%m%d)
VERSION=${VER}_${DATENUMBER}_${BUILD_NUMBER}


npm install
npm run build

rm -rf docker/web
#if [ ! -d "docker/web" ]; then
mkdir -p "docker/web"
#fi

#mkdir docker/web
cp -rf dist/* $SCRIPTPATH/web

#echo "Hi,the user running this build.sh is ${me} - $NODENAME"
#echo "$SCRIPTPATH"
#cp -r * $SCRIPTPATH
cd $SCRIPTPATH

#echo "${VERSION}"

# build a image
#docker login -u admin -p Harbor12345 reg.cqdev.com        \

docker build -t $REPOSITORY/$NAME:$VERSION $SCRIPTPATH \
&& docker push $REPOSITORY/$NAME:$VERSION                 \
&& docker rmi -f $REPOSITORY/$NAME:$VERSION               \

ssh $MASTERSERVER "kubectl set image deployment/$NAME $NAME=$REPOSITORY/$NAME:$VERSION -n $NAMESPACE"
