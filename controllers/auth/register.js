const User = require('../../models/user/user')
const bcrypt = require('bcrypt')

const handleNewUser = async (req,res) => {
    const {user,pwd} = req.body;
    if(!user || !pwd)
        return res
        .status(400)
        .json({message: "Username and Password are required"});
    const duplicate = await User.findOne({username: user}).exec();
    if(duplicate) return res.sendStatus(409);

    try{
        const hshPwd = await bcrypt.hash(pwd,10);
        const response = User.create({
            username: user,
            password: hshPwd
        })
        res.status(201).json({message: `New user ${user} is crested`})
    } catch (err) {
        res.status(500).json({message: err.message});
    }
}

module.exports = {handleNewUser}