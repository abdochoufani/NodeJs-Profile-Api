const router = require('express').Router()
const mongoose = require('mongoose')
const passport = require('passport')

//Load Models
const Profile = require('../../models/Profile')
const validateProfileInput = require('../../validation/profile')
const validateExperienceInput = require('../../validation/experience')

//@Route GET  api/profile/test
//@description test profile request
//@access Public
router.get('/test', (req, res) =>
    res.json({ msg: "profile route works" })
)


//@Route GET  api/profile
//@description get current user profile 
//@access Private
router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    const errors = {}
    Profile.findOne({ user: req.user.id }).populate('user', ['name', 'avatar'])
        .then(profile => {
            errors.noprofile = 'profile not created yet'
            if (!profile) res.status(404).json(errors)
            res.json(profile)
        })
        .catch(err => res.status(404).json(err))

})


//@Route Post  api/profile
//@description create user profile 
//@access Private
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { errors, isValid } = validateProfileInput(req.body)

    if (!isValid) {
        return res.status(400).json(errors);
    }

    const profileFields = {}
    profileFields.user = req.user
    if (req.body.handle) profileFields.handle = req.body.handle
    if (req.body.company) profileFields.company = req.body.company
    if (req.body.website) profileFields.website = req.body.website
    if (req.body.location) profileFields.location = req.body.location
    if (req.body.bio) profileFields.bio = req.body.bio
    if (req.body.status) profileFields.status = req.body.status
    if (req.body.githubusername
    ) profileFields.githubusername
        = req.body.githubusername
    //skils are split into an array
    if (typeof req.body.skills !== undefined) {
        profileFields.skills = req.body.skills.split(',')
    }
    //social
    profileFields.social = {}
    if (req.body.youtube) profileFields.social.youtube = req.body.youtube
    if (req.body.facebook) profileFields.social.facebook = req.body.facebook
    if (req.body.twitter) profileFields.social.twitter = req.body.twitter
    if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin
    if (req.body.instagram) profileFields.social.instagram = req.body.instagram



    Profile.findOne({ user: req.user.id })
        .then(profile => {
            if (profile) {
                //update
                Profile.findOneAndUpdate({ user: req.user.id }, { $set: profileFields }, { new: true })
                    .then(profile => res.json(profile))
            } else {
                //create
                Profile.findOne({ handle: profileFields.handle }).then(profile => {
                    //check if handle exists
                    if (profile) {
                        errors.handle = "That handle already exists"
                        res.status(400).json(errors)
                    }

                    //save profile
                    new Profile(profileFields).save().then(profile => {
                        res.json(profile)
                    }).catch(err => res.status(404).json(err))
                })



            }
        }).catch(err => res.status(400).json(err))

})

//@Route Post  api/profile/experience
//@description add experience to profile
//@access Private

router.post('/experience', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { errors, isValid } = validateExperienceInput(req.body)

    if (!isValid) {
        res.status(400).json(errors)
    }

    Profile.findOne({ user: req.user.id }).then(profile => {

        const newExperience = {
            title: req.body.title,
            company: req.body.company,
            location: req.body.location,
            from: req.body.from,
            to: req.body.to,
            current: req.body.current,
            description: req.body.description
        }
        //add to experience to experience array
        profile.experience.unshift(newExperience)
        profile.save().then(profile => res.json(profile))
    }).catch(err => res.status(400).json(err))
})

router.post('/education', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { errors, isValid } = validateEducationInput(req.body)

    if (!isValid) {
        res.status(400).json(errors)
    }
    Profile.findOne({ user: req.user.id }).then(profile => {
        const newEducation = {
            school: req.body.school,
            fieldofstudy: req.bidy.fieldofstudy,
            degree: req.body.degree,
            location: req.body.location,
            from: req.body.from,
            to: req.body.to,
            current: req.body.current
        }

        profile.education.unshift(newEducation)
        Profile.save().then(profile => {
            res.json(profile)
        }).catch(err => res.status(400).json(err))
    })
})


module.exports = router