
const application = require('./express/app');

const PORT = process.env.PORT || 3001;

application.listen(PORT, () => {
    console.log('Example app listening on port 3001!');
});




