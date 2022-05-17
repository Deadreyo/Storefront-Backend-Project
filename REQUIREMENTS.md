## API Endpoints
#### Products
- Index 
GET `/products`
- Show
GET `/products/:id`
- Create [token required]
POST `/products`, requires "name", "price", "category".
- [OPTIONAL] Top 5 most popular products 
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
- [OPTIONAL] Completed Orders by user (args: user id)[token required]
GET `/users/:id/complete`

## Data Shapes
#### Product
-  id
- name
- price
- [OPTIONAL] category

#### User
- id
- firstName
- lastName
- password

#### Order
- id
- user_id
- status of order (active or complete)

#### Order_Product
- id
- product_id
- order_id
- quantity


