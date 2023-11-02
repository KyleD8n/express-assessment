const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    const db = req.app.get('db')

    const classes = await db.classes.join({student_class: {on: {id: 'class_id'}}}).find();
    res.json(classes)
})

router.get('/:id', async (req, res) => {
    const db = req.app.get('db')

    const {id} = req.params
    
    const _class = await db.classes.join({student_class: {on: {id: 'class_id'}}}).find(id);
    res.json(_class)
})

router.post('/', async (req, res) => {
    const db = req.app.get('db')

    const {body} = req
    const _class = await db.classes.insert(body)
    res.json(_class)
})

router.put('/:id', async (req, res) => {
    const db = req.app.get('db')

    const {body} = req
    const {id} = req.params

    const _class = await db.classes.update(id, body)
    res.json(_class)
})

router.delete('/:id', async (req, res) => {
    const db = req.app.get('db')

    const {id} = req.params

    await db.classes.destroy(id)
    res.sendStatus(200)
})

module.exports = router;