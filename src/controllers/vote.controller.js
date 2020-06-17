const voteCtrl = {};
const Vote = require('../models/Vote');
const Subject = require('../models/Subject');

voteCtrl.getVote =  async (req, res) => {
    const vote = await Vote.findOne({_id:req.params.id});
    res.json(vote);
};

voteCtrl.getVotes =  async (req, res) => {
    const votes = await Vote.find();
    res.json(votes);
};

voteCtrl.getMyVotes =  async (req, res) => {
    const { poll, user } = req.body;
    Vote.find({'user': user, 'poll': poll}).exec(function (err, votes) {
        if (err || !votes) {
            return res.send({
                message: err || "No Votes Found"
            });
        } else {
            subjects_ids = []; 
            votes.forEach( vote => {
                subjects_ids.push(vote.subject);
            })
            Subject.find({'_id':{$in:subjects_ids}}).exec(function (err, subjects) {
                if (!err) {
                    console.log(subjects)
                    res.json(subjects);
                }
            });
        }
    });
};
async function getSubject(id) {
    return await Subject.find(id);
};

voteCtrl.createVote = async (req, res) => {
    const { poll, subjects, user } = req.body;
    subjects.forEach(subject => {
        const newVote = new Vote({
            poll,
            subject,
            user,
        });
        newVote.save();
        console.log(newVote);
    });
    res.json({message: 'Adding Votations'});
};

voteCtrl.updateVote =  async (req, res) => {
    let params = { 
        poll: req.body.poll,
        subject: req.body.subject, 
        user: req.body.user,
    };
    for(let prop in params) if(params[prop] === undefined) delete params[prop];

    await Vote.findOneAndUpdate({_id:req.params.id}, { $set: params });
    res.json({message: 'Vote Updated'});
};

voteCtrl.deleteVote =  async (req, res) => {
    const { poll, user } = req.body;
    const votes = await Vote.find({'user': user, 'poll': poll});
    votes.forEach(vote => {
        vote.remove();
    });
    res.json({message: 'Votes Deleted'});
};

module.exports = voteCtrl;