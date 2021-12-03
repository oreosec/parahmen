

const router = require("express").Router();
 
const {
    getUsers,
    getMentors,
    getModerators,
    getDisciples,
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
    refrenceMentorAndModerator,
    refrenceDiscipleAndMentor,
    absenUser,
    getAbsensiUser,
    findAbsensiUser,
} = require("../controller/main");
 
router.get("/users", getUsers);
router.get("/mentors", getMentors);
router.get("/moderators", getModerators);
router.get("/disciples", getDisciples);
router.get("/detail/mentor/:id", getDetailMentor);
router.get("/detail/moderator/:id", getDetailModerator);
router.get("/detail/disciple/:id", getDetailDisciple);
 
router.post("/mentor", createMentor);
router.post("/moderator", createModerator);
router.post("/disciple", createDisciple);

router.post("/report/:id", reportUser);

router.post("/absen/:id", absenUser);
router.get("/absen", getAbsensiUser);
router.get("/absen/:id", findAbsensiUser);
 
router.delete("/mentor", deleteMentors);
router.delete("/moderator", deleteModerators);
router.delete("/disciple", deleteDisciples);


router.put("/ref/:mentorId/:moderatorId", refrenceMentorAndModerator);
router.put("/ref/:discipleId/:mentorId", refrenceDiscipleAndMentor);
 
module.exports = router;
 