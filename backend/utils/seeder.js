const User = require('../models/user');
const dotenv = require('dotenv');
connectionDatabase = require('../config/database');
const user = require('../data/user.json');
const connectDatabase = require('../config/database');

dotenv.config({ path: './config/config.env' });

connectDatabase();

const seedProducts = async () => {
    try {
        await User.deleteMany();
        console.log('Users are deleted');

        await User.insertMany(user);
        console.log('All users are added');
        process.exit();
    } catch (error) {
        console.log(error);
        process.exit();
    }
};

seedProducts();
