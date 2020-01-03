const User = require('../../models/user/user');
const jwt = require('jsonwebtoken');
const config = require('../../config/config');
const errorHandler = require('../../utils/errorHandler');

module.exports.login = async function (req, res) {
    const candidate = await User.findOne({
        email: req.body.email,
    });

    if (candidate) {
        const token = jwt.sign({
            email: candidate.email,
            userId: candidate._id
        }, config.secretKey, {expiresIn: 60 * 60});
        res.status(200).json({
            token: `Bearer ${token}`
        });
    } else {
        res.status(404).json({
            message: 'Can`t find user'
        })
    }
};

module.exports.register = async function (req, res) {
    const candidate = await User.findOne({email: req.body.email});
    if (candidate) {
        res.status(409).json({
            message: 'User already exist'
        });
    } else {
        const user = new User({
            email: req.body.email,
            password: req.body.password
        });
        try {
            await user.save();
            const newCandidate = await User.findOne({email: req.body.email});
            const token = jwt.sign({
                email: newCandidate.email,
                userId: newCandidate._id
            }, config.secretKey, {expiresIn: 60 * 60});

            res.status(201).json({
                token: `Bearer ${token}`
            });
        } catch (e) {
            errorHandler(res, e);
        }
    }
};
