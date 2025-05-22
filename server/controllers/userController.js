const userService = require("../services/userService");

const getUsers = (req, res) => {
  res.json(userService.getAllUsers());
};

const getUser = (req, res) => {
  const user = userService.getUserById(Number(req.params.id));
  user ? res.json(user) : res.status(404).send("User not found");
};

const createUser = (req, res) => {
  const newUser = userService.createUser(req.body);
  res.status(201).json(newUser);
};

const updateUser = (req, res) => {
  const updated = userService.updateUser(Number(req.params.id), req.body);
  updated ? res.json(updated) : res.status(404).send("User not found");
};

const deleteUser = (req, res) => {
  const deleted = userService.deleteUser(Number(req.params.id));
  deleted ? res.json(deleted) : res.status(404).send("User not found");
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
};
