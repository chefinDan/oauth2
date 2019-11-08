const app = require('./app');
const PORT = process.env.PORT || 8080;
global.env_type = process.argv[2]

app.listen(PORT, function () {
    if(env_type === "local")
        console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.');
});
