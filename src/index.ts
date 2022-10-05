
import app from "./express/app";
import {database} from "./sequelize/db";

const PORT = process.env.PORT || 3001;
const FORCE: boolean = false; // true - force recreate tables, false - don't recreate tables 


async function assertDatabaseConnectionOk() {
	console.log(`Checking database connection...`);
	try {
		await database.sync({force:FORCE});
		console.log('Database connection OK!');
	} catch (error) {
		console.log('Unable to connect to the database:');
		console.log(error.message);
	}
}


function init(){
    assertDatabaseConnectionOk();
    app.listen(PORT, () => {
        console.log('Example app listening on port 3001!');
    });
}


init();




