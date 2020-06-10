const { Router } = require('express');
const { getUser, getUsers, createUser, updateUser, deleteUser } = require('../controllers/users.controller');
const authController = require('../controllers/authController');
const router = Router();

router.post('/login', authController.login);
router.get('/logout', authController.logout);

router.route('/')
    .get(getUsers)
    .post(createUser);

router.route('/:id')
    .get(getUser)
    .post(createUser)
    .put(updateUser)
    .delete(deleteUser);

module.exports = router;