import * as SQLite from 'expo-sqlite';
import {statements} from './ddl';


// Connect or create database
const db = SQLite.openDatabase('restaurant.db');

// dbInit - initializes database.
export const dbInit = () => {

    const promise = new Promise((resolve, reject) => {

        const [customers, orders, showTables] = statements;

        dbStmtExec(customers)
            .then((res) => {
                console.log(res);
                return dbStmtExec(orders);
            }).then((res) => {
            console.log(res);
            return dbStmtExec(showTables);
        }).then((res) => {
            console.log(res);
        }).catch(err => {
            console.log('Database initialization failed');
            console.log(err);
        });

    });

    return promise;
};

export const dbStmtExec = (statement) => {

    const promise = new Promise((resolve, reject) => {

        db.transaction((tx) => {
            tx.executeSql(statement.sqltext,
                [],
                (_, result) => {
                    resolve(result);
                },
                (_, err) => {
                    reject(err);
                }
            );
        });
    });

    return promise;
};

