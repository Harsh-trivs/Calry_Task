## Getting Started

clone the repository : 

```bash
git clone https://github.com/Harsh-trivs/Calry_Task
```

install packages using npm :

```bash
npm install 
```

Run code :

```bash
npm run dev
```

This would start-server on port 3000 

## Task - 1

Endpoint  “/schedule” can call a function that merges bookings and gives merged bookings as an outcome. The request body of this endpoint is {bookings: your_array} where your_array is input in the form of a number[][]. for instance,

```
{
  "bookings": [
    [9, 12],    [11, 13],   [14, 17],   [16, 18],   [19, 20],   [18, 19],   [10, 11],   [13, 15],   [15, 16],   [17, 19],   [21, 22],  [22, 23]    
  ]
}
```

The response body of this endpoint is {optimisedBookings: your_array}. for the above problem, it would give the following solution

```json
{
    "optimizedBookings": [
        [9,20], [21,23]
    ]
}
```

## Task - 2

Room Service Request API Documentation

This API allows hotel staff to create, retrieve, update, and delete room service requests, and manage their status. It uses JSON files for temporary data storage and operates based on request priority.

Base URL

```
<http://localhost:3000>

```

Endpoints

### 1. Get All Requests

**GET** `/requests`

Retrieves a list of all room service requests, sorted by priority (ascending).

### Request:

- **Method**: GET
- **URL**: `/requests`

### Response:

- **Status Code**: 200 OK
- **Body**: Returns a JSON array of all room service requests, sorted by priority.

### Example:

```json
[
  {
    "id": "1a2b3c",
    "guestName": "John Doe",
    "roomNumber": 101,
    "requestDetails": "Need towels",
    "priority": 1,
    "status": "received"
  },
  {
    "id": "4d5e6f",
    "guestName": "Jane Smith",
    "roomNumber": 202,
    "requestDetails": "Food service",
    "priority": 2,
    "status": "in progress"
  }
]

```

### 2. Get Request by ID

**GET** `/requests/:id`

Retrieves a specific room service request by its ID.

### Request:

- **Method**: GET
- **URL**: `/requests/:id`
- **URL Parameters**: `id` (string) - The ID of the room service request.

### Response:

- **Status Code**: 200 OK if found, 404 Not Found if the request with the given ID doesn't exist.
- **Body**: Returns the room service request details.

### Example:

```json
{
  "id": "1a2b3c",
  "guestName": "John Doe",
  "roomNumber": 101,
  "requestDetails": "Need towels",
  "priority": 1,
  "status": "received"
}

```

### 3. Create New Request

**POST** `/requests`

Creates a new room service request.

### Request:

- **Method**: POST
- **URL**: `/requests`
- **Body** (JSON):
    
    ```json
    {
      "guestName": "John Doe",
      "roomNumber": 101,
      "requestDetails": "Need towels",
      "priority": 1
    }
    
    ```
    

### Response:

- **Status Code**: 200 OK
- **Body**: Returns the created room service request.

### Example:

```json
{
  "id": "1a2b3c",
  "guestName": "John Doe",
  "roomNumber": 101,
  "requestDetails": "Need towels",
  "priority": 1,
  "status": "received"
}

```

### 4. Update Request

**PUT** `/requests/:id`

Updates the details, priority, or status of an existing room service request.

### Request:

- **Method**: PUT
- **URL**: `/requests/:id`
- **URL Parameters**: `id` (string) - The ID of the room service request.
- **Body** (JSON): Any of the following fields can be updated.
    
    ```json
    {
      "requestDetails": "Need fresh towels",
      "priority": 2,
      "status": "in progress"
    }
    
    ```
    

### Response:

- **Status Code**: 200 OK if successful, 404 Not Found if the request with the given ID doesn't exist.
- **Body**: Returns the updated room service request.

### Example:

```json
{
  "id": "1a2b3c",
  "guestName": "John Doe",
  "roomNumber": 101,
  "requestDetails": "Need fresh towels",
  "priority": 2,
  "status": "in progress"
}

```

### 5. Delete Request

**DELETE** `/requests/:id`

Deletes a room service request only if its status is either `completed` or `canceled`.

### Request:

- **Method**: DELETE
- **URL**: `/requests/:id`
- **URL Parameters**: `id` (string) - The ID of the room service request.

### Response:

- **Status Code**: 200 OK if successful, 404 Not Found if the request with the given ID doesn't exist.
- **Body**: Returns a message indicating the success or failure of the deletion.

### Example Response:

```json
{
  "message": "Deleted request with id 1a2b3c"
}

```

### 6. Mark the Request as Completed

**POST** `/requests/:id/complete`

Marks a specific room service request as `completed`.

### Request:

- **Method**: POST
- **URL**: `/requests/:id/complete`
- **URL Parameters**: `id` (string) - The ID of the room service request.

### Response:

- **Status Code**: 200 OK if successful, 404 Not Found if the request with the given ID doesn't exist.
- **Body**: Returns the updated room service request with the status changed to `completed`.

### Example Response:

```json
{
  "id": "1a2b3c",
  "guestName": "John Doe",
  "roomNumber": 101,
  "requestDetails": "Need towels",
  "priority": 1,
  "status": "completed"
}
```

---
