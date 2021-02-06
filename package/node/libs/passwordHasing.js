const bcrypt=require('bcryptjs');
const saltRounds=10;

let hashpassword=(myPlianPassword)=>{
    let salt=bcrypt.genSaltSync(saltRounds);
    let hash=bcrypt.hashSync(myPlianPassword,salt);
    return hash;
}

let comparepassword=(oldPassword,hashpassword,cb)=>{
    bcrypt.compare(oldPassword,hashpassword,(err,res)=>{
        if(err){
            cb(err,null)
        }
        else {
            cb(null,res)
        }
    })
}

module.exports={
    hashpassword:hashpassword,
    comparepassword:comparepassword
}