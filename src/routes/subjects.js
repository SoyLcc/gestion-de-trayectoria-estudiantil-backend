const { Router } = require('express');
const router = Router();
const { getSubject, getSubjects, createSubject, updateSubject, deleteSubject } = require('../controllers/subjects.controller');

router.route('/')
    .get(getSubjects)
    .post(createSubject);

router.route('/:id')
    .get(getSubject)
    .post(createSubject)
    .put(updateSubject)
    .delete(deleteSubject);

module.exports = router;