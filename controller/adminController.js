const collection = require("../model/admin");
const User = require("../model/user");
const { db } = require("../model/user");
const Users=require('../model/user')

const home = async(req, res) => {
  try {
   const userData= await Users.find()
   const mailError = req.query.error ? req.query.error : "";
   const successMessage = req.flash('success');
   const errorMessage = req.flash('error');
    res.render("adminpage",{userData,mailError,successMessage,errorMessage});
  } catch (error) {
    console.log(error);
  }
};

const login = (req, res) => {
  try {
    if (!req.session.admin) {
      const errorMessage = req.flash('error');
        res.render("adminLogin",{errorMessage});

    } else {
      res.redirect("/admin");
    }
  } catch (error) {
    console.error();
  }
};

const submit = async (req, res) => {
  try {
    if (req.session.admin) {
      res.redirect("/admin");
    } else {
      const Admin = await db.collection(collection.ADMIN_COLLECTION).findOne({ Email: req.body.email });
      if (Admin) {
        if (Admin.Password == req.body.password) {
          req.session.admin = Admin.Name;
          res.redirect("/admin");
        }else{
          const errorMessage = "Invalid User!";
          req.flash('error',errorMessage);
            res.redirect("/admin/login")
        }
      } else {
        const errorMessage = "Invalid User!";
          req.flash('error',errorMessage);
        res.redirect("/admin/login");
      }
    }
  } catch (error) {
    console.log(error);
  }
};

const logout = (req, res) => {
  try {
    req.session.admin = null;
    res.redirect("/admin");
  } catch (error) {
    console.log(error);
  }
};


const deleteUser = async(req,res,)=>{
  try{
    const userId=req.params.id
    await Users.deleteOne({_id:userId})
    res.redirect('/admin')

  }catch(error){
    console.error()
  }
}

const editUser =async(req,res)=>{

  const id=req.params.id;
  const user= await Users.findOne({_id:id})
 res.render('edituser',{user})

}

const editSubmit= async (req,res)=>{
const id=req.params.id;
 await Users.findByIdAndUpdate({_id:id},

    {
     Name:req.body.name,
     Email:req.body.email,
     Password:req.body.password
  })
  const successMessage = "User data edited successfully!";
  req.flash('success', successMessage);
   res.redirect('/admin')
}





const signup=(req,res)=>{
  const errorMessage = req.flash('error');
  res.render('createuser',{errorMessage})
}

const signupsub= async(req,res)=>{
  const emailCheck = await Users.findOne({ Email: req.body.email });
  
  if (emailCheck) {
    const errorMessage = "sorry that's email already exists";
    req.flash('error',errorMessage);
    res.redirect("/admin/createuser");
  } else {
    const user = new Users({
      Name: req.body.name,
      Email: req.body.email,
      Password: req.body.password,
    });
    console.log(user)
    const check = await user.save();
    if (check) {
      const successMessage = "New user created successfully!";
      req.flash('success', successMessage);
      res.redirect('/admin');
    } else {
      const errorMessage = "Sorry, no data in the database";
      req.flash('error', errorMessage);
      res.redirect('/admin');
    }

  }

}




module.exports = {
  login,
  submit,
  home,
  logout,
  deleteUser,
  editUser,
  editSubmit,
  signupsub,
  signup,
 
};
