import mysql from 'promise-mysql';
import keys from './keys';

const pool = mysql.createPool(keys.database);

pool.getConnection()
    .then(conecction=>{
        pool.releaseConnection(conecction);
        console.log('DB is Connect');
    });

export default pool;