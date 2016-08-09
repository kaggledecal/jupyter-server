#!/bin/sh
# Run this in the Ubuntu vagrant instance
echo "Updating system and installing docker"
echo "Assumes bento/ubuntu-14.04"
sudo apt-get -y update
sudo apt-get -y upgrade
sudo apt-get install -y apt-transport-https ca-certificates
sudo apt-key adv --keyserver hkp://p80.pool.sks-keyservers.net:80 --recv-keys 58118E89F3A912897C070ADBF76221572C52609D
echo "deb https://apt.dockerproject.org/repo ubuntu-trusty main" | sudo tee -a /etc/apt/sources.list.d/docker.list
sudo apt-get -y update
sudo apt-get -y purge lxc-docker
apt-cache policy docker-engine
sudo apt-get install  -y linux-image-extra-$(uname -r) apparmor docker-engine
sudo usermod -aG docker $(whoami)
echo "Docker installed, reboot pls"

