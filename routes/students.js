const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    const db = req.app.get('db')

    const students = await db.students.join({student_class: {on: {id: 'student_id'}}}).find();
    res.json(students)
})

router.get('/:id', async (req, res) => {
    const db = req.app.get('db')

    const {id} = req.params
    
    const student = await db.students.join({student_class: {on: {id: 'student_id'}}}).find(id);
    res.json(student)
})

router.post('/', async (req, res) => {
    const db = req.app.get('db')

    const {body} = req
    const student = await db.students.insert(body)
    res.json(student)
})

router.put('/:id', async (req, res) => {
    const db = req.app.get('db')

    const {body} = req
    const {id} = req.params

    const student = await db.students.update(id, body)
    res.json(student)
})

router.delete('/:id', async (req, res) => {
    const db = req.app.get('db')

    const {id} = req.params

    await db.students.destroy(id)
    res.sendStatus(200)
})

module.exports = router;