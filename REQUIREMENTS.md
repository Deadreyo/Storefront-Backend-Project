
## API Endpoints

#### Products

- Index

GET `/products`

- Show

GET `/products/:id`

- Create [token required]

POST `/products`, requires "name", "price", "category".

-  [OPTIONAL] Top 5 most popular products

GET `/products/top`

- Add Product to Order [token required]

POST `/products/:id`, requires "order_id", "quantity".

  

Example: `localhost:3030/products/top`

  

#### Users

- Index [token required]

GET `/users`

- Show [token required]

GET `/users/:id`

- Create

POST `/users`, requires "firstname", "lastname", "password"

- Authenticate

POST `/users/auth`, requires "firstname", "lastname", "password"

  

#### Orders

- Index [token required]

GET `/orders`

- Show [token required]

GET `/orders/:id`

- Create

POST `/orders`, requires "user_id", "status".

- Current Order by user (args: user id)[token required]

GET `/users/:id/active`

-  [OPTIONAL] Completed Orders by user (args: user id)[token required]

GET `/users/:id/complete`

  

## Data Shapes (Tables & Columns)
### Database Name: *store_project*;

#### Product table
- id 

> Primary Serial Key

- name

> Varchar(255) NOT NULL

- price
> INTEGER NOT NULL
-  [OPTIONAL] category
> Varchar(255) 
- Purchase Count

> INTEGER  NOT  NULL DEFAULT 0
> 
#### User table
- id 
> SERIAL  PRIMARY  KEY,

- firstname 
> VARCHAR(255) NOT  NULL,

- lastname 
> VARCHAR(255) NOT  NULL,

- password  
> VARCHAR(255) NOT  NULL

#### Order table
- id 
> SERIAL  PRIMARY  KEY,

- user_id 
> INTEGER  REFERENCES users(id),

- status 
> VARCHAR(20) NOT  NULL

  

#### Order_Product table
- id
> SERIAL  PRIMARY  KEY,

- order_id
> INTEGER  REFERENCES orders(id),

- product_id
> INTEGER  REFERENCES products(id),

- quantity
> INTEGER  NOT  NULL
