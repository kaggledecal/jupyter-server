import { Meteor } from 'meteor/meteor';
import {exec} from 'child_process';
import {HTTP} from 'meteor/http';

Meteor.startup(() => {
});

Meteor.methods({
	'startNotebook'(containerId){
		try {
			return HTTP.call('POST', 'http://localhost:4342/containers/' + containerId + '/start', {});
		} catch (e) {
			throw new Meteor.Error(500,e);
		}
	},
	'stopNotebook'(containerId){
		try {
			return HTTP.call('POST', 'http://localhost:4342/containers/' + containerId + '/stop', {});
		} catch (e) {
			throw new Meteor.Error(500,e);
		}
	},
	'getContainerList'(){
		try {
			return HTTP.call('GET', 'http://localhost:4342/containers/json?all=true', {});
		} catch (e) {
			throw new Meteor.Error(500,e);
		}

	}
});
