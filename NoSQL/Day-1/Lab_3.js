use("FacultySystemV2");

// // Faculties Data
// var faculties = [
//   { facultyName: "Engineering",address: "Cairo" },
//   { facultyName: "Computer Science", address: "Alexandria" },
//   { facultyName: "Business", address: "Mansoura" },
// ];
// // Courses Data
// var courses = [
//   { courseName: "Database Systems", finalMark: 100 },
//   { courseName: "Algorithms", finalMark: 100 },
//   { courseName: "Operating Systems", finalMark: 100 },
//   { courseName: "Marketing", finalMark: 100 },
// ];

// // Students Data
// var students = [
//   {
//     firstName: "Noha",
//     lastName: "Mohamed",
//     isFired: false,
//   },
//   {
//     firstName: "Ahmed",
//     lastName: "Hassan",
//     isFired: false,
//   },
//   {
//     firstName: "Sara",
//     lastName: "Ali",
//     isFired: true,
//   },
// ];

// db.createCollection("students");
// db.createCollection("faculties");
// db.createCollection("courses");

// db.students.drop();
// db.faculties.drop();
// db.courses.drop();

// db.students.insertMany(students);
// db.faculties.insertMany(faculties);
// db.courses.insertMany(courses);

// let courses = db.courses.find({}, { _id: 1 }).toArray();
// db.courses.find({}, { _id: 1 });

// db.students.updateMany({}, { $set: { courses: courses } });
// db.students.updateOne(
//   { firstName: "Noha" },
//   { $set: { faculty: ObjectId("68bfced83b65b33f725bf53e") } }
// );
// db.students.updateOne(
//   { firstName: "Ahmed" },
//   { $set: { faculty: ObjectId("68bfced83b65b33f725bf53f") } }
// );
// db.students.updateOne(
//   { firstName: "Sara" },
//   { $set: { faculty: ObjectId("68bfced83b65b33f725bf540") } }
// );

//1
// db.students.find();

//2
// db.students.aggregate([
//   {
//     $lookup: {
//       from: "courses",
//       localField: "courses._id",
//       foreignField: "_id",
//       as: "enrolledCourses",
//     },
//   },
//   {
//     $project: {
//       fullName: { $concat: ["$firstName", " ", "$lastName"] },
//       averageMark: { $avg: "$enrolledCourses.finalMark" },
//     },
//   },
// ]);

//3
// db.courses.aggregate([
//   {
//     $group: {
//       _id: null,
//       totalFinalMark: { $sum: "$finalMark" },
//     },
//   },
// ]);

//4
// db.students.aggregate([
//   {
//     $lookup: {
//       from: "courses",
//       localField: "courses._id",
//       foreignField: "_id",
//       as: "enrolledCourses",
//     },
//   },
// ]);

db.students.aggregate([
  { $match: { firstName: "Noha" } },
  {
    $lookup: {
      from: "courses",
      localField: "courses._id",
      foreignField: "_id",
      as: "enrolledCourses",
    },
  },
]);

//5
// db.students.aggregate([
//   {
//     $lookup: {
//       from: "faculties",
//       localField: "faculty",
//       foreignField: "_id",
//       as: "enrolledFaculty",
//     },
//   },
// ]);

// db.students.aggregate([
//   {
//     $match: {
//       firstName: "Noha",
//     },
//   },
//   {
//     $lookup: {
//       from: "faculties",
//       localField: "faculty",
//       foreignField: "_id",
//       as: "enrolledFaculty",
//     },
//   },
// ]);
