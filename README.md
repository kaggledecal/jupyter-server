# docker-server

## Setup Instructions
Make sure that you have [vagrant installed](https://www.vagrantup.com/downloads.html) so that you can deploy easily.

## Acknowledgements
The docker image we use for our deployments is the stock available from the jupyter development crew.
You can find instructions for deploying the docker image we use here:  https://github.com/jupyter/docker-stacks/tree/master/scipy-notebook

## Setting up docker instance

1. [Install docker](https://docs.docker.com/installation/)
2. [Install data science docker container](https://github.com/jupyter/docker-stacks/tree/master/datascience-notebook)
	* In terminal: `docker run -d -p 8888:8888 jupyter/scipy-notebook`

### You're done!

![You're special](https://67.media.tumblr.com/8e1584d01088cdaafa572bb539047654/tumblr_mf8sucbLjv1r4alnuo1_400.gif)

