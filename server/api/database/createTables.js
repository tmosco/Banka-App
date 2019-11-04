import Pool from './db';

const queryText = `
  CREATE TABLE IF NOT EXISTS users(
    id SERIAL PRIMARY KEY,
    email VARCHAR(130) UNIQUE NOT NULL,
    firstname VARCHAR(50) NOT NULL,
    lastname VARCHAR(50) NOT NULL,
    password VARCHAR(200) NOT NULL,
    type VARCHAR(6) DEFAULT 'USER',
    isadmin BOOLEAN DEFAULT NULL
  ); 
  CREATE TABLE IF NOT EXISTS accounts(
    id SERIAL PRIMARY KEY,
    account_number BIGINT UNIQUE NOT NULL,
    createdon TIMESTAMP,
    client_id INTEGER REFERENCES users(id),
    type VARCHAR(7) NOT NULL,
    status VARCHAR(7) DEFAULT 'draft',
    balance NUMERIC(200, 2) DEFAULT 0.00 CONSTRAINT positive_balance CHECK (balance > -1)
  );
  CREATE TABLE IF NOT EXISTS transactions(
    id SERIAL PRIMARY KEY,
    createdon TIMESTAMP NOT NULL,
    type VARCHAR(6) NOT NULL,
    account_number BIGINT REFERENCES accounts(account_number) ON DELETE CASCADE,
    cashier INTEGER REFERENCES users(id),
    amount NUMERIC(200, 2) NOT NULL,
    old_balance NUMERIC(200, 2) NOT NULL,
    new_balance NUMERIC(200, 2) NOT NULL CHECK (new_balance > -1)
  ); 
`;

Pool.query(queryText);
