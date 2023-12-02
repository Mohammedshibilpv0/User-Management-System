const User = require("../model/user");
const bcrypt = require('bcrypt');

const home = (req, res) => {
  if (req.session.user) {
    res.render("index");
  } else {
    res.redirect("/login");
  }
};


const error = (req, res) => {
  res.render("404");
};





const signup = async (req, res) => {
  try {
    if(!req.session.user){
    const errorMessage = req.flash('error')
    res.render("signup",{errorMessage});
    }else{
      res.redirect('/')
    }

  } catch (error) {
    console.error();
  }
};

const insertUser = async (req, res) => {
  const emailcheck = await User.findOne({ Email: req.body.email });

  if (emailcheck) {
   
    const errorMessage = "Sorry that's email already exists";
    req.flash('error',errorMessage)
    res.redirect("/signup");
  } else {
    const hashedPassword = await bcrypt.hash(req.body.password, 10); // 10 is the cost factor
    const user = new User({
      Name: req.body.name,
      Email: req.body.email,
      Password: hashedPassword,
    });

    const check = await user.save();

    if (check) {
      res.redirect("/");
    } else {
      res.send("Some Error while inserting");
    }
  }
};

const login = (req, res) => {
  if (!req.session.user) {
    const errorMessage = req.flash('error');
    const successMessage=req.flash('suss')
    res.render("login", { errorMessage,successMessage });
  }
};

const loginsub = async (req, res) => {
  if (req.session.user) {
    res.redirect("/");
  } else {
    const user = await User.findOne({ Email: req.body.email });
    if (user) {
      const passwordMatch = await bcrypt.compare(req.body.password, user.Password)
     
      if (passwordMatch) {
        req.session.user = user.Email;
        res.redirect("/");
      } else {
        const errorMessage = "Incorrect email or password!";
        req.flash('error',errorMessage);
        res.redirect("/login");

      }
    } else {
      const errorMessage = "User does not exist";
      req.flash('error',errorMessage);
      res.redirect("/login")
    }
  }
};

const logout = (req, res) => {
  req.session.user = null;
  const successMessage = "logout successfully";
      req.flash('suss',successMessage);
  res.redirect("/login");
};

module.exports = {
  home,
  signup,
  insertUser,
  loginsub,
  login,
  logout,
  error,

};
