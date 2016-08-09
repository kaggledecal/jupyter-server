# Getting started

## Setting up vagrant

1. [Install vagrant](https://www.vagrantup.com/docs/installation/)
2. Boot Ubuntu Vagrant instance `vagrant up` and connect `vagrant ssh`
	* Update everything! (I mean it)
	* See (this gist)[https://gist.github.com/maxivak/c318fd085231b9ab934e631401c876b1#hostname] on fixing "unable to resolve host ubuntu-xenial" error
3. [Install docker](https://docs.docker.com/engine/installation/) on vagrant vm instance
	* Make sure you upgrade your kernel if needed! 

## Setting up docker instance

1. [Install docker](https://docs.docker.com/installation/)
2. Configure vagrant port forwarding 4342:4342
3. Configure docker rest port
	* See [this](http://www.campalus.com/enable-remote-tcp-connections-to-docker-host-running-ubuntu-15-04/)
4. [Install data science docker container](https://github.com/jupyter/docker-stacks/tree/master/datascience-notebook)
	* In terminal: `docker run -d -p 8888:8888 jupyter/scipy-notebook`
	* Aside: if running inside vagrant instance, see [this github issue](https://github.com/docker/docker/issues/17846)

### You're done!

![You're special](https://67.media.tumblr.com/8e1584d01088cdaafa572bb539047654/tumblr_mf8sucbLjv1r4alnuo1_400.gif)
