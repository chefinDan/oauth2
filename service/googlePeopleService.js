const axios = require('axios');
const peopleURI = 'https://people.googleapis.com/v1/people/me?personFields=names,emailAddresses'
exports.getInfo = async (token) => {
    let res = await axios.get(peopleURI, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    console.log(res.data)
    return { name: res.data.names[0].displayName, emailAddress: res.data.emailAddresses[0].value } 
    // return new Promise((resolve, reject) => {
        // resolve("Here is your info!!")
    // });
}