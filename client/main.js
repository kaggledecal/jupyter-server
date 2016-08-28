import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';


var dockerHost = 'docker-server'

Template.dockerStuff.onCreated(() => {
	Template.instance().containerList = new ReactiveVar([]);
	getContainerList(Template.instance());
});

function getContainerList(templateInstance) {
	Meteor.call('getContainerList',{},(err, res)=>{
		console.log(res.data);
		if(err){
			console.log(err);
		} else {
			templateInstance.containerList.set(res.data);
		}
	});

}

Template.dockerStuff.events({
	'click button.start'(){
		const templateInstance = Template.instance();
		Meteor.call('startNotebook',this.Id,(err, res)=>{
			if(err){
				console.log(err);
			}
			getContainerList(templateInstance);
		});
	},
	'click button.stop'(){
		const templateInstance = Template.instance();
		Meteor.call('stopNotebook',this.Id,(err, res)=>{
			if(err){
				console.log(err);
			}
			getContainerList(templateInstance);
		});
	},
	'click button.remove'(){
		const templateInstance = Template.instance();
		Meteor.call('removeContainer',this.Id,(err, res)=>{
			if(err){
				console.log(err);
			}
			getContainerList(templateInstance);
		});
	},
	'click button.createContainer'(){
		const templateInstance = Template.instance();
		Meteor.call('createContainer',{},(err, res)=>{
			if(err){
				console.log(err);
			}
			getContainerList(templateInstance);
		});
	},
	'click button.getContainerList'(){
		getContainerList(Template.instance());
	},
});

Template.dockerStuff.helpers({
	containerName(){

	},
	notebookLink(){
		return dockerHost + ':' + this.Ports[0].PublicPort;
	},
	containerList(){
		return Template.instance().containerList.get();
	},
	shortenId(){
		return this.Id.slice(0,12);
	},
	isRunning() {
		return this.State === "running";
	}
});
