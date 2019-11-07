'use strict'

var app = new Vue({
    el: '#auth-btn',
    data: {},
    methods: {
        auth: (event) => {
            alert("Directing you to Google")
            let req = new XMLHttpRequest();
            // req.open('https://accounts.google.com/o/oauth2/v2/auth')

        }    
    }
})