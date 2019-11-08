const uuid = require('uuid/v1')
const axios = require('axios')
const dataService = require('../service/dataService')
const clientId = require('../client_id.json').web
const scope = 'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile'
var state;

exports.authorize = async (req, res, next) => {
    state = uuid();
    let oauth_uri = `${clientId.auth_uri}?client_id=${clientId.client_id}&redirect_uri=${clientId.redirect_uris[1]}&scope=${scope}&response_type=code&state=${state}`
    
    res.status(200).json({oauth_uri: oauth_uri});
}

exports.redirect = async (req, res, next) => {
    let query = req.query
    let token_uri = `${clientId.token_uri}?code=${query.code}&client_id=${clientId.client_id}&client_secret=${clientId.client_secret}&redirect_uri=${clientId.redirect_uris[1]}&grant_type=authorization_code`
    console.log(token_uri);
    try {
        let token_res = await axios.post(clientId.token_uri, {
            'code': query.code,
            'client_id': clientId.client_id,
            'client_secret': clientId.client_secret,
            'redirect_uri': clientId.redirect_uris[1],
            'grant_type': 'authorization_code'
        })
        console.log("=== token_res ", token_res)
        token_res.state = state;
        res.status(200).json(token_res)
        // await dataService.addCredentials(token_res);
    }
    catch(err){
        next(err)
    }
}