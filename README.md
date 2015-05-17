# sean
s - sequelizeJS, e - expresasJS, a - angularJS and n - nodeJS

Install all the dependencies:

    npm install

open the file migration/sqlSchema.js

     var seqlz = new Sequelize('databaseName', 'userName', 'password', {
	    host: 'localhost',
	    dialect: 'mssql',
    });

create empty database with the same name as in Sequelize params databaseName.

once you done with creating empty database.

run server

    node server
    
run localhost:3000 on browser

Note: make sure your tcp/ip use post 1433 and localhost i.e 127.0.0.1 is enable in sql server configuration.
