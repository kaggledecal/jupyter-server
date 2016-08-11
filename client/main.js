import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

Template.dockerStuff.onCreated(() => {
	Template.instance().containerId = new ReactiveVar('-1');
	Template.instance().containerList = new ReactiveVar([]);
	Template.instance().currentContainer = new ReactiveVar('');
	const templateInstance = Template.instance();

	Meteor.call('getContainerList', {}, (err,res) => {
		if(err){
			console.log(err);
		} else {
			templateInstance.containerList.set(res.data);
			templateInstance.currentContainer.set(res.data[0]);
		}
	});
});

Template.dockerStuff.events({
	'click button.start'(){
		const templateInstance = Template.instance();
		Meteor.call('startNotebook',templateInstance.containerId.get(),(err, res)=>{
			if(err){
				console.log(err);
			}
		});
	},
	'click button.stop'(){
		const templateInstance = Template.instance();
		Meteor.call('stopNotebook',templateInstance.containerId.get(),(err, res)=>{
			if(err){
				console.log(err);
			}
		});
	},
	'click button.getContainerList'(){
		const templateInstance = Template.instance();
		Meteor.call('getContainerList',{},(err, res)=>{
			console.log(res.data);
			if(err){
				console.log(err);
			} else {
				templateInstance.containerList.set(res.data);
			}
		});
	},
	'change select.containerSelect'(e,t) {
		const templateInstance = Template.instance();		
		templateInstance.containerId.set(e.currentTarget.value);
	}
});

Template.dockerStuff.helpers({
	containerId (){
		return Template.instance().currentContainer.get().Id;
	},
	containerName(){
	
	},
	notebookLink(){
		return 'localhost:8888';
	},
	containerList(){
		return Template.instance().containerList.get();
	}
});
