const router = require('express').Router()

//Load Models
const Profile = require('../../models/Profile')
const User = require('../../models/User')


//@Route GET  api/posts/test
//@description test posts request
//@access Public
router.get('/test', (req, res) => {
    res.json({ msg: 'test posts works' })
})


module.exports = router