const router = require('express').Router()

//@Route GET  api/profile/test
//@description test profile request
//@access Public
router.get('/test', (req, res) => {
    res.json({ msg: "profile route works" })
})


module.exports = router