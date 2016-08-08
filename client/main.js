import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import dockerode from 'dockerode';

import './main.html';

Template.dockerStuff.events({
	'click button.start'(){
		Meteor.call('startNotebook','',(err, res)=>{
			console.log(err, res);
		});
	}
});
