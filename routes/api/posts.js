const router = require('express').Router()



//@Route GET  api/posts/test
//@description test posts request
//@access Public
router.get('/test', (req, res) => {
    res.json({ msg: 'test posts works' })
})


module.exports = router