var application = require('./express/app');
var PORT = process.env.PORT || 3001;
application.listen(PORT, function () {
    console.log('Example app listening on port 3001!');
});
