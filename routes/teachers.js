const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    const db = req.app.get('db')

    const teachers = await db.teachers.join({classes: {on: {id: 'class_id'}}}).find();
    res.json(teachers)
})

router.get('/:id', async (req, res) => {
    const db = req.app.get('db')

    const {id} = req.params
    
    const teacher = await db.teachers.join({classes: {on: {id: 'class_id'}}}).find({id});
    res.json(teacher)
});

router.post('/', async (req, res) => {
    const db = req.app.get('db')

    const {body} = req
    const teacher = await db.teachers.insert(body)
    res.json(teacher)
})

router.put('/:id', async (req, res) => {
    const db = req.app.get('db')

    const {body} = req
    const {id} = req.params

    const teacher = await db.teachers.update(id, body)
    res.json(teacher)
})

router.delete('/:id', async (req, res) => {
    const db = req.app.get('db')

    const {id} = req.params

    await db.teachers.destroy(id)
    res.sendStatus(200)
})

module.exports = router;