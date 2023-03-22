const mongoose = require('mongoose');


async function connectToDB() {
    try {
        await mongoose.connect(process.env.URL_DB);
            console.log('Connected To MongoDB....');
    } catch (error) {
        console.log('Connection Failed To MongoDB', error);
        
    }
}


// mongoose.connect(process.env.URL_DB)
// .then(() => {
    // console.log('Connected To MongoDB....');
// })
// .catch((error) => {
    // console.log('Connection Failed To MongoDB', error);
// });

module.exports = connectToDB;