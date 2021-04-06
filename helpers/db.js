import * as SQLite from 'expo-sqlite';
import {statements} from './ddl';


// Connect or create database
const db = SQLite.openDatabase('restaurant.db');

// dbInit - initializes database.
export const dbInit = () => {

    const promise = new Promise((resolve, reject) => {

        const [customers, orders, showTables, showCustomers, showAllOrders] = statements;

        dbStmtExec(customers)
            .then((res) => {
                // console.log(res);
                return dbStmtExec(orders);
            }).then((res) => {
            // console.log(res);
            return dbStmtExec(showTables);
        }).then((res) => {
            // console.log(res);
            return dbStmtExec(showCustomers)
        }).then((res) => {
            // console.log(res);
            return dbStmtExec(showAllOrders)
        }).then((res) => {
            // console.log(res);
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


// insertCustomerOrder - adds a new order record
export const insertCustomerOrder = (customerId,customerName, customerBillingAddress,customerShippingAddress,subtotalAmount, discountPercent ) => {

    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql('INSERT INTO orders (order_id, customer_id, customer_name,customer_billing_address,customer_shipping_address,subtotal_amount,discount_percent) VALUES (?, ?, ?, ?, ?,?,?)',
                [new Date().getTime(), customerId,customerName, customerBillingAddress,customerShippingAddress,subtotalAmount, discountPercent],
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

// updateCustomerOrder - update customer order data
export const updateCustomerOrder = (customerId,orderId, customerName, customerBillingAddress,customerShippingAddress,subtotalAmount, discountPercent) => {

    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql('UPDATE orders SET customer_name = ?, customer_billing_address = ?, customer_shipping_address = ?, subtotal_amount = ?, discount_percent = ?  WHERE customer_id = ? and order_id = ?',
                [customerName, customerBillingAddress,customerShippingAddress,subtotalAmount, discountPercent, customerId,orderId],
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

// fetchCustomerOrders - Fetches all orders for a particular customer
export const fetchCustomerOrders = (customerId) => {

    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql('SELECT * from orders WHERE customer_id = ? order by order_date desc',
                [customerId],
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

// fetchCustomerOrder - Fetech a singler order for a customer
export const fetchCustomerOrder = (customerId,orderId) => {

    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql('SELECT * from orders WHERE customer_id = ? and order_id = ?',
                [customerId, orderId],
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

