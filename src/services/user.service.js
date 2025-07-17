// services/user.service.js

const users = []

export const createUser = (userData) => {
  const newUser = { id: users.length + 1, ...userData }
  users.push(newUser)
  return newUser
}

export const findUserByEmail = (email) => {
  return users.find(user => user.email === email)
}
