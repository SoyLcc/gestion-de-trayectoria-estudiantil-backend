const userCtrl = {};
const User = require('../models/User');

userCtrl.getUser =  async (req, res) => {
    const user = await User.find(req.params.id);
    res.json(user);
};

userCtrl.getUsers =  async (req, res) => {
    const users = await User.find();
    res.json(users);
};

userCtrl.createUser = async (req, res) => {
    const { student_id, name, lastname, password, role } = req.body;
    const newUser = new User({
        student_id,
        name,
        lastname,
        password,
        role
    })
    await newUser.save();
    console.log(newUser);
    res.json({message: 'User Created'})
};

userCtrl.updateUser =  async (req, res) => {
    let params = { 
        student_id: req.body.student_id,
        name: req.body.name, 
        lastname: req.body.lastname,
        password: req.body.password,
        role: req.body.role
    };
    for(let prop in params) if(params[prop] === undefined) delete params[prop];

    await User.findOneAndUpdate({_id:req.params.id}, { $set: params });
    res.json({message: 'User Updated'})
};

userCtrl.deleteUser =  async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    res.json({message: 'User Deleted'})
};

module.exports = userCtrl;