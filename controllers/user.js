const db = require('../util/database');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.registerUser = async (req, res)=> {
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;
  const telephone = req.body.telephone;
  const role = req.body.role;
  const school = req.body.school;
  var hashedPassword;

  try {
    hashedPassword = await bcrypt.hash(password, 10);
  }
  catch(error) {
    console.log(error);
  }

  db.execute('insert into user(username, password, email, telephone, role, school) values (?, ? ,? ,? ,? ,?)', [
    username, hashedPassword, email, telephone, role, school
  ])
  .then((data) => {
    res.status(200).json({
      message: "Record succesfully added",
      data: data
    })
  })
  .catch((error) => {
    res.status(500).json({
      message: "Error ! Record not added",
      data: error
    })
  });
}

exports.login = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  db.execute('select user_id, username, password from user where email = ?', [email])
  .then(([data]) => {

    if (data[0]) {
      const validPassword = bcrypt.compareSync(password, data[0].password);

      if (validPassword) {
        const token = jwt.sign({
          username: data[0].username,
          password: data[0].password
        },
        'secret',
        { expiresIn: '1hr' });
  
        res.status(200).json({
          userid : data[0].user_id,
          username: data[0].username,
          email: data[0].email,
          token:  token
        });
      } else {
        res.status(404).json({
          message: "Invalid Password"
        });
      }
    } else {
      res.status(404).json({
        message: "Invalid Email"
      });
    }
    
  })
  .catch((err) => {
    res.status(500).json({
      error: err
    });
  });
}