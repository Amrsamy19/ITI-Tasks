const UserModel = require("../models/user");

const getAll = async () => {
  return await UserModel.find();
};

const getById = async (userId) => {
  return await UserModel.findById(userId);
};

const getByUserName = async (userName) => {
  return await UserModel.findOne({ username: userName });
};

const createUser = async (newUser) => {
  const userModel = new UserModel({
    username: newUser.username,
    password: newUser.password,
    name: newUser.name,
    role: newUser.role,
  });

  return await userModel.save();
};

const updateById = async (userId, updatedUser) => {
  return await UserModel.findByIdAndUpdate(userId, updatedUser, { new: true });
};

const deleteById = async (userId) => {
  return await UserModel.findByIdAndDelete(userId);
};

module.exports = {
  getAll,
  getById,
  createUser,
  getByUserName,
  updateById,
  deleteById,
};
