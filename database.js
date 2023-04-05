const {MongoClient} = require('mongodb');
const bcrypt = require('bcrypt');
const uuid = require('uuid');

const userName = process.env.MONGOUSER;
const password = process.env.MONGOPASSWORD;
const hostname = process.env.MONGOHOSTNAME;

if (!userName) {
    throw Error('Database not configured. Set environment variables');
}

const url = `mongodb+srv://${userName}:${password}@${hostname}`;

const client = new MongoClient(url);
const userCollection = client.db('startup').collection('user');
const statesCollection = client.db('startup').collection('states');


async function createUser(email,name,password) {
    const passwordHash = await bcrypt.hash(password, 10);
    const user = {
        email: email,
        name: name,
        password: passwordHash,
        token: uuid.v4(),
    }
    await userCollection.insertOne(user);
    return user;
}

function getUser(email) {
    return userCollection.findOne({ email: email});
}



function createList(listObject) {
    return statesCollection.insertOne(listObject);
}

async function updateList(id, list) {
    const objectExists = await statesCollection.findOne({user: id});
    if (!objectExists) {
        createList({user: id, states, list});
    }
    else {
        return statesCollection.findOneAndUpdate({user: id}, {$set: {states: list}});
    }
}

async function getList(id) {
    const query = {user: id};
    const userObject = await statesCollection.findOne(query);
    return userObject;      
}

module.exports = {createUser, getUser, updateList, getList, createList};