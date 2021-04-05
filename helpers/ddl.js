/*
 * dbDDL - database schema DDL Statements
 */

export const statements = [
    {
        name: 'create-table: customers',
        sqltext: `CREATE TABLE IF NOT EXISTS customers
                (email VARCHAR(100) NOT NULL,
                date_created datetime default current_timestamp NOT NULL,
                last_updated datetime default current_timestamp NOT NULL,
                password VARCHAR(25) NOT NULL,
                name VARCHAR(100) NOT NULL,
                phone VARCHAR(15) NOT NULL,
                address VARCHAR(150),
                address_lat REAL,
                address_lng REAL,
                PRIMARY KEY (email));
                `,
    },
    {
        name: 'create-table: orders',
        sqltext: `CREATE TABLE IF NOT EXISTS orders
            (order_id INTEGER NOT NULL,
            customer_id INTEGER NOT NULL,
            customer_name VARCHAR(100) NOT NULL,
            customer_billing_address VARCHAR(150) NOT NULL,
            customer_shipping_address VARCHAR(150) NOT NULL,
            order_date datetime default current_timestamp,
            subtotal_amount NUMERIC NOT NULL,
            discount_percent INTEGER NOT NULL,
            PRIMARY KEY (order_id, customer_id));
            `,
    },
    {
        name: 'showTables',
        sqltext: `SELECT name FROM sqlite_master WHERE type IN ('table','view') AND name NOT LIKE 'sqlite_%' ORDER BY 1;`,
    },
];
