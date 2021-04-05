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


// insertCustomer - adds a new customer record
export const insertCustomer = (email, password, name, phone, address, addressLat, addressLng) => {

    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql('INSERT INTO customers (email, password, name, phone, address,address_lat, address_lng) VALUES (?, ?, ?, ?,?,?,?)',
                [email, password, name, phone, address, addressLat, addressLng],
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

// Update Customer
export const updateCustomer = (email, password, name, phone, address, addressLat, addressLng) => {

    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql('UPDATE customers SET email = ?, password = ?, name = ?, phone = ?, address = ?, address_lat = ?, address_lng = ? WHERE email = ?',
                [email, password, name, phone, address, addressLat, addressLng, email],
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

// fetchCustomer -
export const fetchCustomer = (email) => {

    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql('SELECT * from customers WHERE email = ?',
                [email],
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

// loginCustomer -
export const loginCustomer = (email,password) => {

    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql('SELECT * from customers WHERE email = ? and password = ?',
                [email,password],
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

// deleteCustomer -
export const deleteCustomer = (email) => {

    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql('DELETE FROM customers WHERE email = ?',
                [email],
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

