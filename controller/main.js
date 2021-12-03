const { Moderator, Mentor, User, Disciple, Admin, Report, Presence } = require("../models/Schemas");
const config = require("../config");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

module.exports = {
	getUsers: (req, res) => {
		User.find({})
		.then((data) => res.status(200).json({ data }))
		.catch((err) => res.status(400).json({ err: err.message }));
	},

	getMentors: (req, res) => {
		Mentor.find({})
		.then((data) => res.status(200).json({ data }))
		.catch((err) => res.status(400).json({ message: err.message }));
	},

	getModerators: (req, res) => {
		Moderator.find({})
		.then((data) => res.status(200).json({ data }))
		.catch((err) => res.status(400).json({ message: err.message }));
	},

	getDisciples: (req, res) => {
		Disciple.find({})
		.then((data) => res.status(200).json({ data }))
		.catch((err) => res.status(400).json({ message: err.message }));
	},

	getDetailMentor: (req, res) => {
		Mentor.findOne({ _id: req.params.id })
		.populate("moderator")
		.then((data) => res.status(200).json({ data }))
		.catch((err) => res.status(400).json({ message: err.message }));
	},

	getDetailModerator: (req, res) => {
		Moderator.findOne({ _id: req.params.id })
		.populate("mentors")
		.then((data) => res.status(200).json({ data }))
		.catch((err) => res.status(400).json({ message: err.message }));
	},

	getDetailDisciple: (req, res) => {
		Disciple.findOne({ _id: req.params.id })
		.populate("mentors")
		.then((data) => res.status(200).json({ data }))
		.catch((err) => res.status(400).json({ message: err.message }));
	},

  // // // //
  // handle request e neng front end, endpoint e dinamis tergantung milih opo ngko seng regis
  // cnth => selected role = mentor, http://api.tahidz-app.com/v1/mentor
  createMentor: async (req, res) => {
  	var hashedPassword = bcrypt.hashSync(req.body.password, 8);
  	const usr = await User.create({
  		user: req.body.user,
  		name: req.body.name,
  		password: hashedPassword,
  		role: "mentor"
  	});
  	const mentor = await Mentor.create({ profile: usr._id });

  	res.status(201).json({ data: mentor });
  },

  createModerator: async (req, res) => {
  	var hashedPassword = bcrypt.hashSync(req.body.password, 8);
  	const usr = await User.create({
  		user: req.body.user,
  		name: req.body.name,
  		password: hashedPassword,
  		role: "moderator"
  	});
  	const moderator = await Moderator.create({ profile: usr._id });

  	res.status(201).json({ data: moderator });
  },

  createDisciple: async (req, res) => {
  	var hashedPassword = bcrypt.hashSync(req.body.password, 8);
  	const usr = await User.create({
  		name: req.body.name,
  		role: "disciple"
  	});
  	const disciple = await Disciple.create({ profile: usr._id });

  	res.status(201).json({ data: disciple });
  },

  // // // //
  deleteMentors: (req, res) => {
  	Mentor.deleteMany({})
  	.then((data) => res.status(200).json({ data }))
  	.catch((err) => res.status(400).json({ message: err.message }));

  	res.status(200).json({ message: "successfully delete Muhafizh" });
  },

  deleteModerators: (req, res) => {
  	Moderator.deleteMany({})
  	.then((data) => res.status(200).json({ data }))
  	.catch((err) => res.status(400).json({ message: err.message }));

  	res.status(200).json({ message: "successfully delete Musyrif" });
  },

  deleteDisciples: (req, res) => {
  	Disciple.deleteMany({})
  	.then((data) => res.status(200).json({ data }))
  	.catch((err) => res.status(400).json({ message: err.message }));

  	res.status(200).json({ message: "successfully delete Hafizh" });
  },
  // // // //
  refrenceMentorAndModerator: async (req, res) => {
  	await Mentor.findByIdAndUpdate(
  		req.params.mentorId,
  		{
  			moderator: req.params.moderatorId
  		}
  		);	
  	await Moderator.findByIdAndUpdate(
  		req.params.moderatorId,
  		{
  			$push: {
  				mentors: req.params.mentorId,
  			},
  		}
  		);

  	res.status(201).json({
  		message: "successfully referencing between documents",
  	});
  },

  refrenceDiscipleAndMentor: async (req, res) => {
  	await Disciple.findByIdAndUpdate(
  		req.params.discipleId,
  		{
  			moderator: req.params.mentorId
  		}
  		);	
  	await Mentor.findByIdAndUpdate(
  		req.params.mentorId,
  		{
  			$push: {
  				disciple: req.params.discipleId,
  			},
  		}
  		);

  	await Moderator.findByIdAndUpdate(
  		req.params.mentorId,
  		{
  			$push: {
  				disciple: req.params.discipleId,
  			},
  		}
  		);

  	await Admin.findByIdAndUpdate(
  		req.params.mentorId,
  		{
  			$push: {
  				disciple: req.params.discipleId,
  			},
  		}
  		);
  	res.status(201).json({
  		message: "successfully referencing between documents",
  	});
  },

  reportUser: async (req, res, next) => {
  	const rprt = await Report.create({
  		name: req.params.id,
  		cause: req.body.cause,
  		date: req.body.date
  	});

  	res.status(201).json({
  		message: "successfully reporting user",
  	});
  },

  getReport: async (req, res, next) => {
  	Report.find({})
  	.then((data) => res.status(200).json({ data }))
  	.catch((err) => res.status(400).json({ err: err.message }));
  },

  absenUser: async (req, res, next) => {
  	await Presence.create({
  		user: req.params.id,
  		status: req.params.status,
  		date: req.params.date
  	});

  	res.status(201).json({
  		message: "successfully presence user.",
  	});
  },

  getAbsensiUser: async (req, res, next) => {
  	Presence.find({})
  	.then((data) => res.status(200).json({ data }))
  	.catch((err) => res.status(400).json({ err: err.message }));
  },

  findAbsensiUser: async (req, res, next) => {
  	Presence.find({user: req.params.id})
  	.then((data) => res.status(200).json({ data }))
  	.catch((err) => res.status(400).json({ err: err.message }));
  },


};


