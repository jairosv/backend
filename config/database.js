import Sequelize  from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(process.env.MYSQL_DB, process.env.DB_USER, process.env.DB_PASS,
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: process.env.DB,

        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
          },
        
        // http://docs.sequelizejs.com/manual/tutorial/querying.html#operators
        operatorsAliases: 0
    }

);

sequelize.authenticate()
    .then(function (err) {
        console.log('DB is connected.');
    })
    .catch(function (err) {
        console.log('Unable to connect to the database: ', err);
    });

 export default sequelize ;

