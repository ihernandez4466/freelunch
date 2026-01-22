CREATE TABLE users (
    id text PRIMARY KEY,
    email text,
    first_name text,
    last_name text
);

CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name text NOT NULL,
    price decimal NOT NULL,
    description text,
    category text NOT NULL,
    created_at timestamp NOT NULL,
    modified_at timestamp,
    img_path text NOT NULL,
    available_quantity int DEFAULT 10,
    available_sizes text ARRAY NOT NULL,
    stripe_price_id text NOT NULL,
    stripe_shipping_id text NOT NULL
);

CREATE TABLE order_details (
    id SERIAL PRIMARY KEY,
    user_id text REFERENCES users(id),
    payment_used text NOT NULL,
    created_at timestamp NOT NULL,
    amount decimal NOT NULL,
    contact_email text NOT NULL,
    contact_phone text,
    contact_first text NOT NULL,
    contact_last text NOT NULL
);

CREATE TABLE order_items (
    id SERIAL PRIMARY KEY,
    order_details_id int REFERENCES order_details(id),
    product_id int NOT NULL,
    product_quantity int NOT NULL,
    product_size text NOT NULL
);

CREATE TABLE shopping_session (
    id SERIAL PRIMARY KEY,
    user_id text REFERENCES users(id) NOT NULL,
    session_token text NOT NULL,
    session_expiration timestamp,
    UNIQUE(user_id)
);

CREATE TABLE additions (
    id SERIAL PRIMARY KEY,
    name text,
    img_path text,
    price decimal
);

CREATE TABLE cart_items (
    id SERIAL PRIMARY KEY,
    session_id int REFERENCES shopping_session(id),
    product_id int REFERENCES products(id),
    size VARCHAR(10),
    quantity int,
    addition_id int REFERENCES additions(id),
    category text,
    total decimal
);