/**
 * Created by shishitengteng on 2018/4/27.
 */

const User = require('../lib/mongo').User;

module.expoers = {
    create: function create (user) {
        return User.create(user).exec()
    }
}