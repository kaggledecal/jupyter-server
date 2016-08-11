import { Meteor } from 'meteor/meteor';
import {exec} from 'child_process';
import {HTTP} from 'meteor/http';

Meteor.startup(() => {
	currentPort = 8000;
});

Meteor.methods({
	'startNotebook'(containerId){
		try {
			//const derp = '"PortBindings": { "8888/tcp": [{ "HostPort": "8000" }] }';
			return HTTP.call('POST', 'http://docker-server:4243/containers/' + containerId + '/start', {
			});
		} catch (e) {
			console.log(e);
			throw new Meteor.Error(500,e);
		}
	},
	'stopNotebook'(containerId){
		try {
			return HTTP.call('POST', 'http://docker-server:4243/containers/' + containerId + '/stop', {});
		} catch (e) {
			console.log(e);
			throw new Meteor.Error(500,e);
		}
	},
	'getContainerList'(){
		try {
			return HTTP.call('GET', 'http://docker-server:4243/containers/json?all=true', {});
		} catch (e) {
			console.log(e);
			throw new Meteor.Error(500,e);
		}

	},
	'createContainer'(){
		try {
			let returnValue = HTTP.call('POST', 'http://docker-server:4243/containers/create', {
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
					}
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
			return HTTP.call('DELETE', 'http://docker-server:4243/containers/' + containerId, {});
		} catch (e) {
			console.log(e);
			throw new Meteor.Error(500,e);
		}
	}
});
