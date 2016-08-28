import { Meteor } from 'meteor/meteor';
import {exec} from 'child_process';
import {HTTP} from 'meteor/http';

Meteor.startup(() => {
	currentPort = 8000;
});
var dockerHost = 'docker-server'
var dockerPort = '4243'
var dockerBaseUrl = 'http://' + dockerHost + ':' + dockerPort
var containerUrl = dockerBaseUrl + '/containers'
Meteor.methods({
	'startNotebook'(containerId){
		try {
			//const derp = '"PortBindings": { "8888/tcp": [{ "HostPort": "8000" }] }';
            let ret = HTTP.call('POST', containerUrl + '/' + containerId + '/start', {
			});
			console.log(ret);
			return ret;
		} catch (e) {
			console.log(e);
			throw new Meteor.Error(500,e);
		}
	},
	'stopNotebook'(containerId){
		try {
			return HTTP.call('POST', containerUrl + '/' + containerId + '/stop', {});
		} catch (e) {
			console.log(e);
			throw new Meteor.Error(500,e);
		}
	},
	'getContainerList'(){
		try {
			return HTTP.call('GET', containerUrl + '/json?all=true', {});
		} catch (e) {
			console.log(e);
			throw new Meteor.Error(500,e);
		}

	},
	'createContainer'(){
		try {
			let returnValue = HTTP.call('POST', containerUrl + '/create', {
				data:{
					"Image": "jupyter/scipy-notebook",
					"AttachStdin": false,
					"AttachStdout": false,
					"AttachStderr": false,
					"Tty": false,
					"OpenStdin": false,
					"StdinOnce": false,
					"ExposedPorts": {
						"8888/tcp": {}
					},
					"HostConfig":{
						"PortBindings": { "8888/tcp": [{ "HostPort": currentPort.toString() }] },
						"PublishAllPorts": false,
                    },
					"Entrypoint":["sh", "-c", "jupyter notebook --NotebookApp.base_url=/container  --NotebookApp.allow_origin=* --NotebookApp.ip=0.0.0.0"]
				}
			});
			currentPort++;
			return returnValue;
		} catch (e) {
			console.log(e);
			throw new Meteor.Error(500,e);
		}

	},
	'removeContainer'(containerId){
		try {
			return HTTP.call('DELETE', containerUrl + '/' + containerId, {});
		} catch (e) {
			console.log(e);
			throw new Meteor.Error(500,e);
		}
	}
});
