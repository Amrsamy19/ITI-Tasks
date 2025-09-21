use("ITI");

//! Lab 2

// 1-a
// db.instructors.find();

// 1-b
// db.instructors.find({ salary: { $gt: 4000 } }, { firstName: 1, salary: 1 });

//1-c
// db.instructors.find({ age: { $lte: 25 } }, { firstName: 1, age: 1 });

//1-d
// db.instructors.find(
//   { "address.city": "mansoura", "address.street": { $in: [10, 14] } },
//   { firstName: 1, address: 1, salary: 1 }
// );

//1-e
// db.instructors.find(
//   { courses: { $all: ["js", "jquery"] } },
//   { firstName: 1, courses: 1 }
// );

//1-f
// db.instructors.aggregate([
//   {
//     $project: {
//       firstName: 1,
//       numberOfCourses: { $size: "$courses" },
//     },
//   },
// ]);

//1-g
// db.instructors.aggregate([
//   {
//     $sort: {
//       firstName: 1,
//       lastName: -1,
//     },
//   },
//   {
//     $project: {
//       fullName: { $concat: ["$firstName", " ", "$lastName"] },
//       age: 1,
//     },
//   },
// ]);

// let instructorsSorted = db.instructors.aggregate([
//   {
//     $sort: {
//       firstName: 1,
//       lastName: -1,
//     },
//   },
//   {
//     $project: {
//       fullName: { $concat: ["$firstName", " ", "$lastName"] },
//       age: 1,
//     },
//   },
// ]);

// db.createCollection("instructorsData", {
//   validator: {
//     $jsonSchema: {
//       bsonType: "object",
//       required: ["fullName"],
//       properties: {
//         fullName: { bsonType: "string" },
//         age: { bsonType: "int" },
//       },
//     },
//   },
// });

// db.instructorsData.insertMany(instructorsSorted.toArray());
// db.instructorsData.find();

//1-h
// db.instructorsData.find({
//   fullName: {
//     $regex: /mohammed/,
//   },
// });

//1-i
// db.instructors.deleteOne({
//   firstName: "ebtesam",
//   courses: {
//     $size: 5,
//   },
// });

//1-j
// db.instructors.updateMany({}, { $set: { active: true } });

//1-k
// db.instructors.updateOne(
//   { firstName: "mazen", lastName: "mohammed", courses: "EF" },
//   {
//     $set: { "courses.$": "jquery" },
//   }
// );

//1-l
// db.instructors.updateOne(
//   {
//     firstName: "noha",
//     lastName: "hesham",
//   },
//   {
//     $push: {
//       courses: "jquery",
//     },
//   }
// );

//1-m
// db.instructors.updateOne(
//   {
//     firstName: "ahmed",
//     lastName: "ali",
//   },
//   {
//     $unset: {
//       courses: "",
//     },
//   }
// );

//1-n
// db.instructors.updateMany(
//   {
//     courses: { $size: 3 },
//   },
//   {
//     $inc: {
//       salary: -500,
//     },
//   }
// );

//1-o
// db.instructors.updateMany(
//   {},
//   {
//     $rename: {
//       address: "fullAddress",
//     },
//   }
// );

//1-p
// db.instructors.updateOne(
//   {
//     firstName: "noha",
//     lastName: "hesham",
//   },
//   {
//     $set: {
//       "fullAddress.street": 20,
//     },
//   }
// );

db.instructors.find({
  firstName: "noha",
  lastName: "hesham",
});
