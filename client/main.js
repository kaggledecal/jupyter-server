import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

Template.dockerStuff.onCreated(() => {
	Template.instance().instanceId = new ReactiveVar('-1');
	Template.instance().imageList = new ReactiveVar([]);
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
	},
	'click button.getImageList'(){
		const templateInstance = Template.instance();
		Meteor.call('getImageList',{},(err, res)=>{
			if(err){
				console.log(err);
			} else {
				templateInstance.imageList.set(res.data);
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
	},
	imageList(){
		return Template.instance().imageList.get();
	}
});
