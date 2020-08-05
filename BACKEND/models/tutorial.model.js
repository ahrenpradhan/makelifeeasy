const mongoose = require('mongoose');

const Schema = mongoose.Schema;

/*
instructions: {
    'instruction-1': {
        id: 'instruction-1',
        title: '',
        required: false,
        time: 0,
        tasksIds: [],
    },
},
tasks: {},
columns: {
    'column-1': {
        id: 'column-1',
        title: 'Positioned Instruction',
        instructionsIds: ['instruction-1'],
    },
    'column-2': {
        id: 'column-2',
        title: 'Pending Instruction',
        instructionsIds: [],
    },
},
columnOrder: ['column-1', 'column-2'],
*/

/*
Steps -- 
1) instruction
2) column
3) combine the above 2

*/
const userSchema = new Schema(
	{
		username: {
			type: String,
			required: true,
			unique: true,
			trim: true,
			minlength: 3,
		},
	},
	{
		timestamps: true,
	},
);

const User = mongoose.model('User', userSchema);

module.exports = User;
