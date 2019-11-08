'use strict'

var oauth_uri = null;
var app = new Vue({
    el: '#auth-btn',
    data: {},
    methods: {
        auth: wait 
    }
})

function wait(){
    var backdrop = document.getElementById('backdrop');
    backdrop.classList.remove('hidden');
}

function getOauthURI() {
    console.log("Transfer complete")
    let auth_ln = document.getElementById('auth-btn');
    let oauth_uri = JSON.parse(this.response).oauth_uri
    auth_ln.href = oauth_uri;
}

function updateProgress() {
    console.log("request in progress")
}

function transferFailed() {
    console.log("Transfer failed")
}

function transferCanceled() {
    console.log("transfer cancelled")
}

window.addEventListener('DOMContentLoaded', async function () {
    if(!oauth_uri){
        let req = new XMLHttpRequest()
        req.addEventListener("progress", updateProgress);
        req.addEventListener("load", getOauthURI);
        req.addEventListener("error", transferFailed);
        req.addEventListener("abort", transferCanceled);
        req.open('GET', 'auth')
        req.send()
    }
})
