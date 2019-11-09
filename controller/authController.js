const uuid = require('uuid/v1')
const axios = require('axios')
const peopleController = require('../controller/peopleController')
const clientId = require('../client_id.json').web
const scope = 'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile'

const redirect_uri = (process.env.NODE_ENV === 'dev') ? clientId.redirect_uris[1] : clientId.redirect_uris[0] 
var state;

exports.check = async (req, res, next) => {
    console.log('GET /people')
    console.log("Checking if user has authorized google")        
    if(!peopleController.getAccessToken()){
        
        console.log("Access token not found")
        state = uuid();
        let oauth_uri = `${clientId.auth_uri}?client_id=${clientId.client_id}&redirect_uri=${redirect_uri}&scope=${scope}&response_type=code&state=${state}`
        
        console.log("Sending oauth uri: ", oauth_uri)
        console.log("Presenting user with google oauth link")
        res.status(200).render('auth', { oauth_uri: oauth_uri });
    }
    else{
        console.log('Found access_token')
        next()
    }
}

exports.redirect = async (req, res, next) => {
    console.log('GET /auth/redirect')
    let query = req.query
    let token_uri = `${clientId.token_uri}?code=${query.code}&client_id=${clientId.client_id}&client_secret=${clientId.client_secret}&redirect_uri=${redirect_uri}&grant_type=authorization_code`
    console.log("User authorized google")
    try {
        let token_res = await axios.post(clientId.token_uri, {
            'code': query.code,
            'client_id': clientId.client_id,
            'client_secret': clientId.client_secret,
            'redirect_uri': redirect_uri,
            'grant_type': 'authorization_code'
        })
        console.log(token_res.data)
        token_res.data.state = state;
        console.log('setting access token')
        peopleController.setAccessToken(token_res.data);
        res.redirect('/people')
    }
    catch(err){
        next(err)
    }
}