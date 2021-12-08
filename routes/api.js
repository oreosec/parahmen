	const router = require("express").Router();

// anti csrf token
const csrf = require("csurf");
var csrfProtection = csrf({ cookie: true });

const {
	getUsers,
	getMentors,
	getModerators,
	getDisciples,
	checkUserExisted,
	createMentor,
	createModerator,
	createDisciple,
	getDetailMentor,
	getDetailModerator,
	getDetailDisciple,
	deleteMentors,
	deleteModerators,
	deleteDisciples,
	reportUser,
	getReports,
	refrenceMentorAndModerator,
	refrenceDiscipleAndMentor,
	absenUser,
	getAbsensiUser,
	findAbsensiUser,
	isAdmin,
	isMentor,
	isModerator,
	verifyUser,
	login,
} = require("../controller/main");

// limit for login
const rateLimit = require("express-rate-limit");
const limiter = rateLimit({
    max: 5,
    windowMs: 3 * 60 * 1000,
    message: "don't bruteforce bruteforce bosque"
});

router.get("/users", getUsers);
router.get("/mentors", getMentors);
router.get("/moderators", getModerators);
router.get("/disciples", getDisciples);
router.get("/detail/mentor/:id", getDetailMentor);
router.get("/detail/moderator/:id", getDetailModerator);
router.get("/detail/disciple/:id", getDetailDisciple);



/*
{ 'name':'Fawwaz Abdurrabby Shobron', 'user':'fawasabd', 'password':'unchhh' }

respons:
{'data': output database}
*/
router.post("/mentor", checkUserExisted, createMentor);
router.post("/moderator", checkUserExisted, createModerator);
router.post("/disciple", checkUserExisted, createDisciple);




/*
nggo ngereport user ng admin misal ono sg mambu dll

{
  'user': '+6281391617562', // id user
  'cause': 'gak pernah mandi',
  'data': 'tggl'
}

response:
{message: "successfully reporting user",}
*/
router.post("/report/:id", verifyUser, reportUser);




/* karek gas lgsg entok kabeh data gor admin tok sg iso delok

response:

{
  'user': '+6281391617562', // id user
  'cause': 'gak pernah mandi',
  'data': 'tggl'
}

*/

router.get("/report", getReports);





/*
{
  'status': true/false, //melbu pora
  'date': tggal
}
*/
router.post("/absen/:id", verifyUser, absenUser);
router.get("/absen", verifyUser, getAbsensiUser);
router.get("/absen/:id", verifyUser, findAbsensiUser);



/* hapus kabeh document gor admin tok sg iso kei kyk danger zone ngono kae ben gak nggarai kepencet */

router.delete("/mentor", isAdmin, deleteMentors);
router.delete("/moderator", isAdmin, deleteModerators);
router.delete("/disciple", isAdmin, deleteDisciples);



/*
{ 'user':'fawasabd', 'password':'unchhh' }

response:
{ 
	'auth': true,
	'token': 'eysadsjsdasxxx' // token jwt sg dinggo login ngko ngekei ne bagian header x-access-token
}
*/
// router.post("/login", [limiter, csrfProtection], login);
router.post("/login", login);


router.put("/ref/menmod/:mentorId/:moderatorId", refrenceMentorAndModerator);
router.put("/ref/dismen/:discipleId/:mentorId", refrenceDiscipleAndMentor);


router.get("/csrfToken", csrfProtection, (req, res, next) => {
	res.send({ csrfToken: req.csrfToken()});
})

module.exports = router;