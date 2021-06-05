// Required for accessing Env variable data
//
require('dotenv').config()
const mongoose = require('mongoose');

function connectDB(){
    // Database Connection.
    // This is like a template. 
    // 'url' we'll get from mongoDB site rest all are standard.
    //
    mongoose.connect(url, { useNewUrlParser: true, useCreateIndex:true, useUnifiedTopology:true, useFindAndModify:true });
    const connection = mongoose.connection;

    // Works like an event listener.
    // Once the connection is established the callback is called.
    //
    connection.once( 'open', () => {
        console.log('Database. Connected.');
    }).catch( err => {
        console.log('Connection failed.');
    })
}

module.exports = connectDB