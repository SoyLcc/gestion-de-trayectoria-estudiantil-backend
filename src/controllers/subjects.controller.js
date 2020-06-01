const subjectCtrl = {};
const Subject = require('../models/Subject');

subjectCtrl.getSubject =  async (req, res) => {
    const subject = await Subject.find(req.params.id);
    res.json(subject);
};

subjectCtrl.getSubjects =  async (req, res) => {
    const subjects = await Subject.find();
    res.json(subjects);
};

subjectCtrl.getSubjectsByFilter = async (req, res) => {
    let axis = req.params.axis;
    const subjects = await Subject.where({axis});
    res.json(subjects);
};

subjectCtrl.createSubject = async (req, res) => {
    const { key, name, type, credits, theory, lab, axis, minCredits, requirements } = req.body;
    const newSubject = new Subject({
        key, 
        name, 
        type, 
        credits, 
        theory, 
        lab, 
        axis, 
        minCredits, 
        requirements
    })
    await newSubject.save();
    console.log(newSubject);
    res.json({message: 'Subject Created'})
};

subjectCtrl.updateSubject =  async (req, res) => {
    const { key, name, type, credits, theory, lab, axis, minCredits, requirements } = req.body;
    await Subject.findOneAndUpdate({_id:req.params.id}, {
        key, 
        name, 
        type, 
        credits, 
        theory, 
        lab, 
        axis, 
        minCredits, 
        requirements
    });
    res.json({message: 'Subject Updated'})
};

subjectCtrl.deleteSubject =  async (req, res) => {
    await Subject.findByIdAndDelete(req.params.id);
    res.json({message: 'Subject Deleted'})
};

module.exports = subjectCtrl;