const { Router } = require('express');
const router = Router();
const { getPoll, getPolls, createPoll, updatePoll, deletePoll } = require('../controllers/poll.controller');

router.route('/')
    .get(getPolls)
    .post(createPoll);

router.route('/:id')
    .get(getPoll)
    .post(createPoll)
    .put(updatePoll)
    .delete(deletePoll);

module.exports = router;