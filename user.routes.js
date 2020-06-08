module.exports = app => {
  const users = require("./user.controller")

  // Create a new User
  app.post("/api/users", users.create)

  // Search User by username
  app.get("/api/users/search?", users.findByUsername)

  // Retrieve all Users
  app.get("/api/users", users.findAll)

  // Retrieve a single User with userId
  app.get("/api/users/:userId", users.findOne)

  // Update a User with userId
  app.put("/api/users/:userId", users.update)

  // Delete a User with userId
  app.delete("/api/users/:userId", users.delete)

  // Create a new User
  app.delete("/api/users", users.deleteAll)

}
