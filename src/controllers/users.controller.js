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
    const { student_id, name, lastname, password, role } = req.body;
    await User.findOneAndUpdate({_id:req.params.id}, {
        student_id,
        name,
        lastname,
        password,
        role
    });
    res.json({message: 'User Updated'})
};

userCtrl.deleteUser =  async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    res.json({message: 'User Deleted'})
};

module.exports = userCtrl;