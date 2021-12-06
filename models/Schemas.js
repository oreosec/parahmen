 const { Schema, model } = require("mongoose");
 
const PresenceSchema = new Schema({
  date: Date,
  status: String,
  user: { type: Schema.Types.ObjectId, ref: "User" },
});


const ReportSchema = new Schema({
  cause: String,
  date: Date,
  user: { type: Schema.Types.ObjectId, ref: "User" },
});
 
// nggo login
// dadi pas login handle e neng kene
const UserSchema = new Schema({
  user: String,
  name: String,
  password: String,
  role: String,
});

const AdminSchema = new Schema({
  profile: { type: Schema.Types.ObjectId, ref: "User" },

  // presence: [PresenceSchema],

  disciples: [{ type: Schema.Types.ObjectId, ref: "Disciple" }],
});

const ModeratorSchema = new Schema({
  profile: { type: Schema.Types.ObjectId, ref: "User" },

  // presence: [PresenceSchema],
  // reports: [ReportSchema],

  mentors: [{ type: Schema.Types.ObjectId, ref: "Mentor" }],
  disciples: [{ type: Schema.Types.ObjectId, ref: "Disciple" }],
});
 
const MentorSchema = new Schema({
  profile: { type: Schema.Types.ObjectId, ref: "User" },
  moderator: { type: Schema.Types.ObjectId, ref: "Moderator" },

  // presence: [PresenceSchema],
  // reports: [ReportSchema],
  
  disciples: [{ type: Schema.Types.ObjectId, ref: "Disciple" }],
});
 
const DiscipleSchema = new Schema({
  // misal arep mbok gawe santrine iso login
  // opo ngko wong tuwo nganggo akun anak e wae yen arep ndelok
  profile : {type: Schema.Types.ObjectId, ref: "User"},
 
  // presence: [PresenceSchema],
  mentor: { type: Schema.Types.ObjectId, ref: "Mentor" },
  mentor: { type: Schema.Types.ObjectId, ref: "Moderator" },
  mentor: { type: Schema.Types.ObjectId, ref: "Admin" },
});
 
const [User, Admin, Moderator, Mentor, Disciple, Report, Presence] = [
  model("User", UserSchema),
  model("Admin", AdminSchema),
  model("Moderator", ModeratorSchema),
  model("Mentor", MentorSchema),
  model("Disciple", DiscipleSchema),
  model("Report", ReportSchema),
  model("Presence", PresenceSchema),
];	
 
module.exports = {
  User,
  Admin,
  Moderator,
  Mentor,
  Disciple,
  Report,
  Presence,
};
 