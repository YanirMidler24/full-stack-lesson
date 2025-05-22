let users = require("../data/mockUsers");

function getAllUsers() {
  return users;
}

function getUserById(id) {
  return users.find((user) => user.id === id);
}

function createUser(user) {
  const newUser = { id: Date.now(), ...user };
  users.push(newUser);
  return newUser;
}

function updateUser(id, updatedData) {
  const index = users.findIndex((user) => user.id === id);
  if (index !== -1) {
    users[index] = { ...users[index], ...updatedData };
    return users[index];
  }
  return null;
}

function deleteUser(id) {
  id = Number(id);

  const index = users.findIndex((user) => user.id === id);
  if (index !== -1) {
    const deleted = users[index];
    users.splice(index, 1);
    return deleted;
  }
  return null;
}

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
