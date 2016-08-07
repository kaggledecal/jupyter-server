#docker-server

## Setting up docker instance

1. [Install docker](https://docs.docker.com/installation/)
2. [Install data science docker container](https://github.com/jupyter/docker-stacks/tree/master/datascience-notebook)
	* In terminal: `docker run -d -p 8888:8888 jupyter/scipy-notebook`

### You're done!

![You're special](https://67.media.tumblr.com/8e1584d01088cdaafa572bb539047654/tumblr_mf8sucbLjv1r4alnuo1_400.gif)

We should use [dockerode](https://github.com/apocas/dockerode) as the Docker REST API client.
