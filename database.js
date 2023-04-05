const {MongoClient} = require('mongodb');

const userName = process.env.MONGOUSER;
const password = process.env.MONGOPASSWORD;
const hostname = process.env.MONGOHOSTNAME;

if (!userName) {
    throw Error('Database not configured. Set environment variables');
}

const url = `mongodb+srv://${userName}:${password}@${hostname}`;

const client = new MongoClient(url);
const statesCollection = client.db('startup').collection('states');


function createList(listObject) {
    statesCollection.insertOne(listObject);
}

async function updateList(id, list) {
    const objectExists = await statesCollection.findOne({user: id});
    if (!objectExists) {
        createList({user: id, states, list});
    }
    else {
        statesCollection.findOneAndUpdate({user: id}, {$set: {states: list}});
    }
}

async function getList(id) {
    const query = {user: id};
    const userObject = await statesCollection.findOne(query);
    return userObject;      
}

module.exports = {updateList, getList, createList};