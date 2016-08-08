import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import dockerode from 'dockerode';

import './main.html';

Template.dockerStuff.onCreated(() => {
	Template.instance().instanceId = new ReactiveVar('-1');
});

Template.dockerStuff.events({
	'click button.start'(){
		const templateInstance = Template.instance();
		Meteor.call('startNotebook','',(err, res)=>{
			if(err){
				console.log(err);
			} else {
				templateInstance.instanceId.set(res);
			}
		});
	},
	'click button.stop'(){
		const templateInstance = Template.instance();
		Meteor.call('stopNotebook',templateInstance.instanceId.get(),(err, res)=>{
			if(err){
				console.log(err);
			} else {
				templateInstance.instanceId.set('-1');
			}
		});
	}
});

Template.dockerStuff.helpers({
	instanceId (){
		return Template.instance().instanceId.get();
	},
	notebookLink(){
		return 'localhost:8888';
	}
});
