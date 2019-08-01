#!/bin/bash
PROJECT_DIR=/home/kevin/seasoned
# DEPLOY_DIR=/var/lib/seasoned/

cd $PROJECT_DIR

echo "Stashing local changes"
git add .
git stash

echo "Pulling from master"
git checkout master
git pull origin master
echo "Pull from master succeeded"

echo "Installing necessary dependencies"
yarn

echo "Building application"
sudo yarn build

echo "Copy build files to webserver folder"
if [ ! -z "$DEPLOY_DIR" ]
then
  printf 'Copying files to %s\n' "$DEPLOY_DIR"
  sudo cp -R dist $DEPLOY_DIR
  cd $DEPLOY_DIR
fi

# echo "Setting permissions of dist folder to user 'ubuntu'"
# sudo chown -R ubuntu:ubuntu dist

echo "Restarting webserver"
sudo service request restart


