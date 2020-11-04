const { User } = require('./user.model');
const { Task } = require('../tasks/task.model');
const ObjectId = require('mongoose').Types.ObjectId;
const bcrypt = require('bcrypt');

const getAll = async () => {
  return User.find({});
};

const getById = async id => {
  return User.findOne({ _id: id });
};

const createUser = async user => {
  const newUser = new User({
    ...user,
    password: await bcrypt.hash(user.password, 8)
  });
  await newUser.save();

  return newUser;
};

const updateUser = async (userId, userBody) => {
  await User.updateOne(
    { _id: userId },
    {
      $set: { ...userBody }
    }
  );

  return User.findOne({ _id: userId });
};

const deleteUser = async userId => {
  await Task.updateMany(
    { userId: ObjectId(userId) },
    {
      $set: { userId: null }
    }
  );
  await User.deleteOne({ _id: userId });

  return null;
};

module.exports = {
  getAll,
  getById,
  createUser,
  updateUser,
  deleteUser
};
