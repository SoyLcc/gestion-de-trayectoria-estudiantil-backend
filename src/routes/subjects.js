const { Router } = require('express');
const router = Router();
const { getSubject, getSubjects, createSubject, updateSubject, deleteSubject, getSubjectsByFilter } = require('../controllers/subjects.controller');

router.route('/')
    .get(getSubjects)
    .post(createSubject);

router.route('/:id')
    .get(getSubject)
    .post(createSubject)
    .put(updateSubject)
    .delete(deleteSubject);

router.route('/axis/:axis')
    .get(getSubjectsByFilter);


module.exports = router;