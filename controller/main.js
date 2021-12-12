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

	checkUserExisted: (req, res, next) => {
		const data = User.findOne({user: req.body.user});
		if(data) res.status(400).send({message: "user existed"});
		else next();
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

  refrenceDiscipleAndMentor: async (req, res, next) => {
  	await Disciple.findByIdAndUpdate(
  		req.params.discipleId,
  		{
  			mentor: req.params.mentorId
  		}
		);	
  	await Mentor.findByIdAndUpdate(
  		req.params.mentorId,
  		{
  			$push: {
  				disciples: req.params.discipleId,
  			},
  		}
		);

  	await Moderator.findByIdAndUpdate(
  		req.params.mentorId,
  		{
  			$push: {
  				disciples: req.params.discipleId,
  			},
  		}
		);

  	await Admin.findByIdAndUpdate(
  		req.params.mentorId,
  		{
  			$push: {
  				disciples: req.params.discipleId,
  			},
  		}
		);
  	res.status(201).json({
  		message: "successfully referencing between documents",
  	});
  },

  reportUser: async (req, res, next) => {
  	const rprt = await Report.create({
  		user: req.params.id,
  		cause: req.body.cause,
  		date: req.body.date
  	});

  	res.status(201).json({
  		message: "successfully reporting user",
  	});
  },

  getReports: async (req, res, next) => {
  	Report.find({})
  	.then((data) => res.status(200).json({ data }))
  	.catch((err) => res.status(400).json({ err: err.message }));
  },

  absenUser: async (req, res, next) => {
  	await Presence.create({
  		user: req.params.id,
  		status: req.body.status,
  		date: req.body.date
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

  isAdmin: async (req, res, next) => {
  	const token = req.cookies.token
  	if(!token) res.status(403).json({message: "no access token"});
  	else {
  		jwt.verify(token, config.secret, (err, decoded) => {
  			if(err) res.status(500).json({message: "failed authenticate token."});
  			if(decoded) {
  				User.findById(decoded.id, (err, data) => {
  					if(err) res.status(500).json({message: "failed authenticate token."});
  					if(data){
  						if(data.role != "admin" && decoded.role != "admin") res.status(403).json({message: "access denied."});
  						else{
  							if(data.name == decoded.name) next();
  							else res.status(403).json({message: "access denied."});
  						}
  					}
  				});
  			}
  		});

  	}
  },

  isModerator: async (req, res, next) => {
  	const token = req.cookies.token
  	if(!token) res.status(403).json({message: "no access token"});
  	else {
  		jwt.verify(token, config.secret, (err, decoded) => {
  			if(err) res.status(500).json({message: "failed authenticate token."});
  			if(decoded) {
  				User.findById(decoded.id, (err, data) => {
  					if(err) res.status(500).json({message: "failed authenticate token."});
  					if(data){
  						if(data.role != "moderator" && decoded.role != "moderator") res.status(403).json({message: "access denied."});
  						else{
  							if(data.name == decoded.name) next();
  							else res.status(403).json({message: "access denied."});
  						}
  					}
  				});
  			}
  		});

  	}
  },

  isMentor: async (req, res, next) => {
  	const token = req.cookies.token
  	if(!token) res.status(403).json({message: "no access token"});
  	else {
  		jwt.verify(token, config.secret, (err, decoded) => {
  			if(err) res.status(500).json({message: "failed authenticate token."});
  			if(decoded) {
  				User.findById(decoded.id, (err, data) => {
  					if(err) res.status(500).json({message: "failed authenticate token."});
  					if(data){
  						if(data.role != "mentor" && decoded.role != "mentor") res.status(403).json({message: "access denied."});
  						else{
  							if(data.name == decoded.name) next();
  							else res.status(403).json({message: "access denied."});
  						}
  					}
  				});
  			}
  		});

  	}
  },

	verifyUser: async (req, res, next) => {
  	const token = req.cookies.token
  	if(!token) res.status(403).json({message: "no access token"});
  	else {
  		jwt.verify(token, config.secret, (err, decoded) => {
  			if(err) res.status(500).json({message: "failed authenticate token."});
  			if(decoded) {
  				User.findById(decoded.id, (err, data) => {
  					if(err) res.status(500).json({message: "failed authenticate token."});
  					if(data){
  						var validRole = ["admin", "moderator", "mentor"];
  						if(validRole.includes(data.role) && validRole.includes(decoded.role)) res.status(403).json({message: "access denied."});
  						else{
  							if(data.name == decoded.name) next();
  							else res.status(403).json({message: "access denied."});
  						}
  					}
  				});
  			}
  		});

  	}
  },  

  login: async (req, res, next) => {
  	const data = await User.findOne({user: req.body.user});
  	if(data == null) res.status(401).json({message: "invalid credentials."});
  	else {
  		var passwordIsValid = bcrypt.compareSync(req.body.password, data.password);
  		if(!passwordIsValid) res.status(401).json({auth: false, token: null, msg: "invalid credentials"});
  		else{
  			var token = jwt.sign({ id: data._id, user: data.user, role: data.role }, config.secret);
  			res.cookie('token', token, {httpOnly: true});
  			res.status(200).json({auth: true, accessToken: token});
  		}
  	}
  },


};


