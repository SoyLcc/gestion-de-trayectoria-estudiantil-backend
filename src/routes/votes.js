const { Router } = require('express');
const router = Router();
const { getVote, getVotes, getMyVotes ,createVote, updateVote, deleteVote } = require('../controllers/vote.controller');

router.route('/myvotes')
    .get(getMyVotes);

router.route('/')
    .get(getVotes)
    .post(createVote);

router.route('/:id')
    .get(getVote)
    .post(createVote)
    .put(updateVote)
    .delete(deleteVote);

module.exports = router;