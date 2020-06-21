const voteCtrl = {};
const Vote = require('../models/Vote');
const Poll = require('../models/Poll');
const Subject = require('../models/Subject');

voteCtrl.getVotes =  async (req, res) => {
    Poll.findOne({_id:req.params.id}).exec(function (err, poll) {
        if (err || !poll) {
            return res.send({
                message: err || "No Poll Found"
            });
        } else {
            subjects_ids = []; 
            poll.subjects.forEach( subject => {
                subjects_ids.push(subject._id);
            })
            Vote.find({'poll': req.params.id, 'subject': {$in: subjects_ids}}).select('subject').exec(function (err, votes) {
                Subject.find({'_id':{$in:subjects_ids}}).select('name').exec(function (err, subjects) {
                    if (!err) {
                        total_votes = []
                        subjects.map((subject) => {
                            var o = Object.assign({}, subject);
                            o._doc.votes = votes.filter(vote => (vote.subject).toString() == (subject._id).toString()).length;
                        })
                        res.json(subjects);
                    }
                });
            });
        }
    });
};

voteCtrl.getMyVotes =  async (req, res) => {
    const { poll, user } = req.query;
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
                    res.json(subjects);
                }
            });
        }
    });
};

voteCtrl.createVote = async (req, res) => {
    const { poll, subjects, user } = req.body;

    //if already voted the poll,find the past votes
    const votes = await Vote.find({'user': user, 'poll': poll});

    if(votes) {
        //delete the votes
        votes.forEach(vote => {
            vote.remove();
        });
    }
   
    subjects.forEach(subject => {
        const newVote = new Vote({
            poll,
            subject,
            user,
        });
        newVote.save();
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