const { Router } = require('express');
const router = Router();

router.route('/')
    .get((req,res) => res.json({message: 'GET Request'}))
    .post((req,res) => res.json({message: 'POST Request'}));

module.exports = router;