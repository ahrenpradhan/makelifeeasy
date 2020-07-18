const router = require('express').Router();
let User = require('../models/user.model');
// get all users
router.route('/').get((req, res) => {
	if (Object.entries(req.body).length) {
		User.find()
			.then((users) => users.filter((user) => user[req.body.type] == req.body[req.body.type]))
			.then((users) => res.json(users))
			.catch((err) => res.status(400).json('Error: ' + err));
	} else {
		User.find()
			.then((users) => res.json(users))
			.catch((err) => res.status(400).json('Error: ' + err));
	}
});
// add new user
router.route('/add').post((req, res) => {
	const { username, password, emails, firstName, lastName } = req.body;
	const newUser = new User({
		firstName,
		lastName,
		username,
		emails,
		password,
	});
	if (!!username && !!password && emails.length > 0 && !!firstName && !!lastName) {
		newUser
			.save()
			.then((data) => res.json({ access: true, data }))
			.catch((err) => res.status(400).json('Error: ' + err));
	} else {
		res.json({ access: false, message: 'Fields missing' });
	}
});
// find user by req body
router.route('/find').get((req, res) => {
	const username = req.query.username;
	const password = req.query.password;
	User.find({ username, password })
		.then((result) => {
			if (result.length) {
				res.json({ doc: result[0], access: true });
			}
			res.json({ access: false });
		})
		.catch((err) => res.status(401).json('Error: ' + err));
});
// find user by ID
router.route('/:id').get((req, res) => {
	User.findById(req.params.id)
		.then((user) => res.json(user))
		.catch((err) => res.status(400).json('Error: ' + err));
});
//delete user by ID
router.route('/:id').delete((req, res) => {
	User.findByIdAndDelete(req.params.id)
		.then(() => res.json('User deleted!'))
		.catch((err) => res.status(400).json('Error: ' + err));
});
//update user details by ID
router.route('/update/:id').post((req, res) => {
	User.findById(req.params.id)
		.then((user) => {
			if (req.body.username) {
				user.username = req.body.username;
			}
			if (req.body.password) {
				user.password = req.body.password;
			}
			if (req.body.emails) {
				user.emails = req.body.emails;
			}
			if (req.body.firstName) {
				user.firstName = req.body.firstName;
			}
			if (req.body.lastName) {
				user.lastName = req.body.lastName;
			}
			user.save()
				.then(() => res.json('User updated!'))
				.catch((err) => res.status(400).json('Error: ( User update failed )' + err));
		})
		.catch((err) => res.status(400).json('Error: ' + err));
});
// update user by overwriting object
router.route('/update').post((req, res) => {
	User.findById(req.body.id)
		.then((user) => {
			if (req.body.username) {
				user.username = req.body.username;
			}
			if (req.body.password) {
				user.password = req.body.password;
			}
			if (req.body.emails) {
				user.emails = req.body.emails;
			}
			if (req.body.firstName) {
				user.firstName = req.body.firstName;
			}
			if (req.body.lastName) {
				user.lastName = req.body.lastName;
			}
			user.save()
				.then(() => res.json('User updated!'))
				.catch((err) => res.status(400).json('Error: ' + err));
		})
		.catch((err) => res.status(400).json('Error: ' + err));
});

module.exports = router;
