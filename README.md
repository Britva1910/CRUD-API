# User Management API

This API allows you to perform CRUD operations on user records. Users are stored as objects with unique identifiers generated on the server side.

## Installation

1. **Clone this repository to your local machine:**

   ```bash
   git clone <repository_url>
   ```

2. **Navigate to the project directory:**

   ```bash
   cd user-management-api
   ```

3. **Install dependencies:**

   ```bash
   npm install
   ```

4. **Create a `.env` file in the root directory and define the port:**

   ```plaintext
   PORT=3000
   ```

## Usage

### Running the Application

#### Development Mode

To run the application in development mode using nodemon or ts-node-dev, execute:

```bash
npm run start:dev
```

#### Production Mode

To run the application in production mode, execute:

```bash
npm run build
npm start
```

### Endpoints

- **GET `/api/users`**: Get all users.
  
- **GET `/api/users/{userId}`**: Get user by ID.
  
- **POST `/api/users`**: Create a new user.
  
- **PUT `/api/users/{userId}`**: Update user by ID.
  
- **DELETE `/api/users/{userId}`**: Delete user by ID.

### Request and Response Examples

#### GET /api/users

**Request:**

```bash
curl -X GET http://localhost:3000/api/users
```

**Response (200 OK):**

```json
[
    {
        "id": "1",
        "username": "john_doe",
        "age": 30,
        "hobbies": ["reading", "coding"]
    },
    {
        "id": "2",
        "username": "jane_doe",
        "age": 25,
        "hobbies": []
    }
]
```

#### GET /api/users/{userId}

**Request:**

```bash
curl -X GET http://localhost:3000/api/users/{userID}
```

**Response (200 OK):**

```json
{
    "id": "1",
    "username": "john_doe",
    "age": 30,
    "hobbies": ["reading", "coding"]
}
```

#### POST /api/users

**Request:**

```bash
curl -X POST \
  http://localhost:3000/api/users \
  -H 'Content-Type: application/json' \
  -d '{
        "username": "emma_smith",
        "age": 28,
        "hobbies": ["painting", "traveling"]
    }'
```

**Response (201 Created):**

```json
{
    "id": "3",
    "username": "emma_smith",
    "age": 28,
    "hobbies": ["painting", "traveling"]
}
```

#### PUT /api/users/{userId}

**Request:**

```bash
curl -X PUT \
  http://localhost:3000/api/users/{userID} \
  -H 'Content-Type: application/json' \
  -d '{
        "username": "updated_john_doe",
        "age": 35,
        "hobbies": ["coding", "hiking"]
    }'
```

**Response (200 OK):**

```json
{
    "id": "1",
    "username": "updated_john_doe",
    "age": 35,
    "hobbies": ["coding", "hiking"]
}
```

#### DELETE /api/users/{userId}

**Request:**

```bash
curl -X DELETE http://localhost:3000/api/users/{userID}
```

**Response (204 No Content)**

### Error Handling

- Requests to non-existing endpoints will return a 404 status code with a human-friendly message.

- Server-side errors will return a 500 status code with a corresponding human-friendly message.
