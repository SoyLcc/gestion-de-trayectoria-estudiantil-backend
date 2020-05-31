const { Router } = require('express');
const router = Router();
const { getUser, getUsers, createUser, updateUser, deleteUser } = require('../controllers/users.controller');

router.route('/')
    .get(getUsers)
    .post(createUser);

router.route('/:id')
    .get(getUser)
    .post(createUser)
    .put(updateUser)
    .delete(deleteUser);

module.exports = router;