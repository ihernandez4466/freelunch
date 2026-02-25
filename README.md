# Setup Locally

Create a .env file in your root directory:

```
DB_USER=postgres
DB_HOST=localhost
DB_DATABASE=freelunch
DB_PASSWORD=postgres
DB_PORT=5432
SMTP_SERVICE=Gmail
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_SECURE=true
EMAIL_USER=youremail
EMAIL_PASSWORD=yourpassword

# Stripe (get keys from https://dashboard.stripe.com/apikeys)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
```

Run locally

1. Setup database 
Use any form you choose to setup a postgresql database. I used docker
- docker pull postgres
- docker run --name my-postgres -p 5432:5432 -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=freelunch -e POSTGRES_USER=postgres -d postgres
- Validate container is up and running using `docker ps`

2. Insert dummy records into your database
- The most important records are the products. Every other table generates their data on use

isabel.hernandez@MYWL6MFC77 ~ % docker exec -it 4cbeaf106ca1 /bin/bash
root@4cbeaf106ca1:/# psql -U postgres -d freelunch

update the database schema using database/schema.sql

- Comment out for local development
```js
    // ssl: {
    //     rejectUnauthorized: false, // Required for SSL with Supabase
    // }
```
in database/db.js

```sql
insert into products(name,img_path,price,description,category,created_at, available_quantity,available_sizes)
values ('Brown Front', '/images/sweaters/template-red-sweater.png', 85, 'Need a little accent but not too much', 'sweaters', now(), 10, '{"s", "m", "l", "xl", "2x"}'),
('Grey Front', '/images/sweaters/template-blackgrey-sweater.png', 80, 'You dont get out of your comfort zone but its still cute', 'sweaters', now(), 10, '{"s", "m", "l", "xl"}'),
('Red Front', '/images/sweaters/template-whitered-sweater.png', 80, 'Add a little flavor you know you want to', 'sweaters', now(), 10, '{"s", "m", "l", "xl", "2x"}')
```

3. Run the application
- Update modules using `npm install`
- Run app using `npm run dev`
- Output in terminal should look something like:
  ▲ Next.js 13.5.11
  - Local:        http://localhost:3000
  - Environments: .env

 ✓ Ready in 1013ms

Troubleshooting
1. Postgresql database error:
```bash
error invoking remote method 'docker-start-container': Error: (HTTP code 500) server error - Ports are not available: listen tcp 0.0.0.0:5432: bind: address already in use
```

Solution:
```bash
sudo lsof -i :5432
sudo kill -9 147 (processid)
``` 