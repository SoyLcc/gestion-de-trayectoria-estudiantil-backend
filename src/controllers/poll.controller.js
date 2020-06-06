const pollCtrl = {};
const Poll = require('../models/Poll');

pollCtrl.getPoll =  async (req, res) => {
    const poll = await Poll.find(req.params.id);
    res.json(poll);
};

pollCtrl.getPolls =  async (req, res) => {
    const polls = await Poll.find();
    res.json(polls);
};

pollCtrl.createPoll = async (req, res) => {
    const { title, description, isActive, subjects } = req.body;
    const newPoll = new Poll({
        title,
        description,
        isActive,
        subjects
    });
    await newPoll.save();
    console.log(newPoll);
    res.json({message: 'Poll Created'});
};

pollCtrl.updatePoll =  async (req, res) => {
    const { title, description, isActive, subjects } = req.body;
    await Poll.findOneAndUpdate({_id:req.params.id}, {
        title,
        description,
        isActive,
        subjects
    });
    res.json({message: 'Poll Updated'});
};

pollCtrl.deletePoll =  async (req, res) => {
    await Poll.findByIdAndDelete(req.params.id);
    res.json({message: 'Poll Deleted'});
};

module.exports = pollCtrl;