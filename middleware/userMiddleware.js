
const verify=(req,res,next)=>{
    if(req.session.user){
   next()
    }else{
     res.redirect('/login')
    }
}

const  login = (req,res,next)=>{
    if(!req.session.user){
        next()
    }else{
        res.redirect('/')
    }
}


module.exports={
    verify,
    login
}