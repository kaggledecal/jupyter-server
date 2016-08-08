import { Meteor } from 'meteor/meteor';
import {exec} from 'child_process';

Meteor.startup(() => {
});

Meteor.methods({
	'startNotebook'(){
		const command = 'docker run -d -p 8888:8888 jupyter/scipy-notebook';
		const cmd = Meteor.wrapAsync(exec);
		try {
			return cmd(command);
		} catch (e) {
			throw new Meteor.Error(500,e);
		}
	}
});
