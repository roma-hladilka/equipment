const express = require("express");
const { graphqlHTTP } = require('express-graphql');
const schema = require('../schema/schema');
const mongoose = require('mongoose');

const app = express();
const PORT = 3005;

mongoose.connect('mongodb+srv://hladilka:11223344@crud.zctmt.mongodb.net/equipment?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true,
}));

const dbConnection = mongoose.connection;
dbConnection.on('error', err => console.log(`connection error: ${err}`));
dbConnection.once('open', () => console.log('Connected!'));

app.listen(process.env.PORT || PORT, err => {
    err ? console.log(error) : console.log('Server started!');
});
