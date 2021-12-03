

const router = require("express").Router();
 
const {
    getUsers,
    getMentors,
    getModerators,
    createMentor,
    createModerator,
    getDetailMentor,
    getDetailModerator,
    deleteMentors,
    deleteModerators,
    refrenceMentorAndModerator,
} = require("../../controller/adminController");
 
router.get("/users", getUsers);
router.get("/mentors", getMentors);
router.get("/moderators/", getModerators);
router.get("/detail/mentor/:id", getDetailMentor);
router.get("/detail/moderator/:id", getDetailModerator);
 
router.post("/mentor", createMentor);
router.post("/moderator", createModerator);
 
router.put("/ref/:mentorId/:moderatorId", refrenceMentorAndModerator);
 
module.exports = router;
 