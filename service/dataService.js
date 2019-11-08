'use-strict'

const { Datastore } = require('@google-cloud/datastore');

const datastore = new Datastore();

exports.addCredentials = async (creds) => {
    let transaction = datastore.transaction();
    let key = createKey('Token');

    try {
        await transaction.run();
        let newCredentials = {
            'key': key,
            'data': {
                'access': creds.access_token,
                'type': creds.expires_in,
                'expires': creds.token_type,
                'refresh': creds.refresh_token
            }
        }
        console.log("=== Adding credentials to datastore")
        await transaction.save(newCredentials);
        await transaction.commit()
    }
    catch (err) {
        transaction.rollback()
        throw err
    }

}

exports.getCredentials = (boatId) => {
    // const boatKey = createKey(Boat, boatId)

    // const transaction = datastore.transaction();
    // try {
    //     await transaction.run();
    //     let [boat] = await transaction.get(boatKey);

    //     if (!boat) { throw { 'status': 404, 'msg': `Entity id: ${boatId} not found` } }
    //     await transaction.commit();
    //     boat.id = boat[datastore.KEY].id
    //     return boat
    // }
    // catch (err) {
    //     transaction.rollback();
    //     throw err
    // }

}

// function createQuery(type, prop, keys) {
//     return keys.map((key) => { return datastore.createQuery(type).hasAncestor(ancestorKey).filter(prop, key); });
// }

// function createKey(type, id = null) {
//     if (id) {
//         return datastore.key([parent.kind, parseInt(parent.id), type, parseInt(id)]);
//     }
//     return datastore.key([parent.kind, parseInt(parent.id), type]);
// }

// async function runQuery(query) {
//     let promises = query.map(async query => { return await query.run(); });
//     return await Promise.all(promises);

// }

// function getParentId() {
//     const query = datastore.createQuery('parent').select('__key__');
//     query.run()
//         .then(([[queryResult]]) => {
//             parentId = queryResult[datastore.KEY].id;
//         });
// }