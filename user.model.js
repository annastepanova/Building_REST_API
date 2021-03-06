const sql = require('./db')

const User = function(user) {
  this.username = user.username
  this.email = user.email
  this.phone_number = user.phone_number
  this.preferred_contact_method = user.preferred_contact_method
}

User.create = (newUser, result) => {
  sql.query("INSERT INTO users SET ?", newUser, (err, res) => {
    if (err) {
      console.log("error: ", err)
      result(err, null)
      return;
    }

    console.log("created user: ", { id: res.insertId, ...newUser })
    result(null, { id: res.insertId, ...newUser })
  })
}

User.findById = (userId, result) => {
  sql.query(`SELECT * FROM users WHERE id = ${userId}`, (err, res) => {
    if (err) {
      console.log("error: ", err)
      result(err, null)
      return
    }

    if (res.length) {
      console.log("found user: ", res[0])
      result(null, res[0])
      return
    }

    // not found User with the id
    result({ kind: "not_found" }, null)
  })
}

User.getAll = result => {
  sql.query("SELECT * FROM users", (err, res) => {
    if (err) {
      console.log("error: ", err)
      result(null, err)
      return
    }

    console.log("users: ", res)
    result(null, res)
  })
}

User.getByName = (name, result) => {
  sql.query("SELECT * FROM users WHERE username = ?", [name], (err, res) => {
    if (err) {
      console.log("error: ", err)
      result(null, err)
      return
    }

    if (res.length) {
      console.log("found users: ", res)
      result(null, res)
      return
    }

    result({ kind: "not_found" }, null)
  })
}

User.updateById = (id, user, result) => {
  sql.query(
    "UPDATE users SET username = ?, email = ?, phone_number = ?, preferred_contact_method = ? WHERE id = ?",
    [user.username, user.email, user.phone_number, user.preferred_contact_method, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err)
        result(null, err)
        return
      }

      if (res.affectedRows == 0) {
        // not found User with the id
        result({ kind: "not_found" }, null)
        return
      }

      console.log("updated user: ", { id: id, ...user })
      result(null, { id: id, ...user })
    }
  )
}

User.remove = (id, result) => {
  sql.query("DELETE FROM users WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err)
      result(null, err)
      return
    }

    if (res.affectedRows == 0) {
      // not found User with the id
      result({ kind: "not_found" }, null)
      return
    }

    console.log("deleted users with id: ", id)
    result(null, res)
  })
}

User.removeAll = result => {
  sql.query("DELETE FROM users", (err, res) => {
    if (err) {
      console.log("error: ", err)
      result(null, err)
      return
    }

    console.log(`deleted ${res.affectedRows} users`)
    result(null, res)
  })
}

module.exports = User
