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
	}
});

Template.dockerStuff.helpers({
	instanceId (){
		return Template.instance().instanceId.get();
	}
});
