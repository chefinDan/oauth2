const peopleService = require('../service/googlePeopleService');
var access_token;
var state;

exports.getAccessToken = () => {
    return access_token; 
}

exports.setAccessToken = (creds) => {
    access_token = creds.access_token;
    state = creds.state
}

exports.getInfo = (req, res, next) => {
    console.log("Getting people/me info with access token")
    peopleService.getInfo(access_token)
        .then(info => {
            info.state = state;
            access_token = null;
            res.status(200).render('details', info)
        })
        .catch(next)
}