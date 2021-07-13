const User = require('../Models/model');

class userUpdate {
    async update(req, res) {

        const user = await new User({
            _id: req.params.id,
            username: req.body.username,
            lastname: req.body.lastname
        });


        User.updateOne({
            _id: req.params.id,
        }, user).then(
            () => {
                res.status(201).json({
                    meassge: 'Record updated Succesfully',
                })
            }
        ).catch((
            (error) => {
                res.status(400).json({
                    error: error
                })
            }
        ));
    }
}

module.exports = new userUpdate();
