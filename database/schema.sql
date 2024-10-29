CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(100) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR NOT NULL
);


CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    price decimal,
    description VARCHAR(200),
    category int,
    created_at timestamp NOT NULL,
    modified_at timestamp,
    img_path VARCHAR(100) NOT NULL,
    available_quantity int NOT NULL,
    available_sizes text ARRAY NOT NULL
);

CREATE TABLE order_details (
    id SERIAL PRIMARY KEY,
    user_id int REFERENCES users(id),
    payment_used VARCHAR(100) NOT NULL,
    created_at timestamp NOT NULL,
    amount decimal NOT NULL
);

CREATE TABLE order_items (
    id SERIAL PRIMARY KEY,
    order_details_id int REFERENCES order_details(id),
    product_id int
);

CREATE TABLE cart_items (
    id SERIAL PRIMARY KEY,
    session_id int REFERENCES shopping_session(id),
    product_id int REFERENCES products(id),
    size VARCHAR(10),
    quantity int,
    addition_id int REFERENCES additions(id),
    total decimal
);

CREATE TABLE additions (
    id SERIAL PRIMARY KEY,
    name VARCHAR(10),
    img_path VARCHAR(100),
    price decimal
);

CREATE TABLE shopping_session (
    id SERIAL PRIMARY KEY,
    user_id int REFERENCES users(id),
    session_token VARCHAR(100),
    session_expiration timestamp,
    UNIQUE(user_id)
);