[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/IrWObaQs)
[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-718a45dd9cf7e7f842a935f5ebbe5719a5e09af4491e668f4dbf3b35d5cca122.svg)](https://classroom.github.com/online_ide?assignment_repo_id=12856485&assignment_repo_type=AssignmentRepo)

# Calorie Choice API Documentation

Server: https://calorie-choice.blog-website.my.id/pub/foods
Client: 

## Endpoints :

List of available endpoints:
- `POST /register`
- `POST /login`
- `POST /google-login`
- `GET /pub/foods`
  
Routes below need authentication:
- `GET /profile`
- `PUT /profile`
- `GET /foods`
  
Routes below need authentication & authorization:
- `GET /foods/admin`
- `GET /foods/admin/:id`
- `POST /foods/admin`
- `PUT /foods/admin/:id`
- `DELETE /foods/admin/:id`

&nbsp;

## 1. POST /register
Description:
- Create User

Request:

- body:

```json
{
  "email": "string",
  "password": "string"
}
```

_Response (201 - Created)_

```json
{
  "id": "integer",
  "email": "string"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Email is required"
}
OR
{
  "message": "Email Must be Email Format"
}
OR
{
  "message": "Email is already registered"
}
OR
{
  "message": "Password is Required"
}
OR
{
  "message": "Pasword Minimum 5 Characters"
}
```
&nbsp;

## 2. POST /login

Description:
- login user

Request:

- body:

```json
{
  "email": "string",
  "password": "string"
}
```

_Response (200 - OK)_

```json
{
  "access_token": "string",
  "email": "string"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "email must be fill"
}
OR
{
  "message": "password must be fill"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid email/password"
}
```

&nbsp;

## 3. POST /google-login

Description:
- login user with google account

Request:

- google account:


_Response (200 - OK)_

```json
{
  "access_token": "string",
  "email": "string"
}
```


&nbsp;

## 4. GET /pub/foods

Description:
- Get all food without login from database

_Response (200 - OK)_

```json
[
   {
        "id": 4,
        "name": "Blackberry Walnut Cookies",
        "imageUrl": "https://spoonacular.com/recipeImages/635248-312x231.jpg",
        "price": 641,
        "calory": 142,
        "UserId": 1,
        "createdAt": "2023-11-17T04:38:24.494Z",
        "updatedAt": "2023-11-17T04:38:24.494Z"
    },
    {
        "id": 5,
        "name": "Chicken and White Bean Chili",
        "imageUrl": "https://spoonacular.com/recipeImages/637932-312x231.jpg",
        "price": 1849,
        "calory": 433,
        "UserId": 1,
        "createdAt": "2023-11-17T04:38:24.497Z",
        "updatedAt": "2023-11-17T04:38:24.497Z"
    },
  ...,
]
```

&nbsp;

## 5. GET /profile

Description:
- Get profile as login user

Request:

- headers: 

```json
{
  "Authorization": "Bearer <token>"
}
```

_Response (200 - OK)_

```json
{
    "id": 4,
    "fullName": "coba guys",
    "address": "bogor",
    "phoneNumber": "086262772",
    "UserId": 4,
    "createdAt": "2023-11-17T06:49:16.193Z",
    "updatedAt": "2023-11-17T06:50:16.476Z"
}
```

&nbsp;

## 6. PUT /profile
Description:
- Edit profile with access_token

Request:

- headers: 

```json
{
  "Authorization": "Bearer <token>",
  "req.user.id": "integer"
}
```

- body:

```json
{
  "fullName": "string",
  "address": "string",
  "phoneNumber": "string"
}
```

_Response (200 - ok)_

```json
{
  "id": "integer",
  "fullName": "string",
  "address": "string",
  "phoneNumber": "string",
  "UserId": "integer",
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "UserId is Required"
}
```
_Response (404 - Not Found)_

```json
{
  "message": "Profile not found"
}
```

&nbsp;

## 7. GET /foods

Description:
- Get all foods from database

Request:

- headers: 

```json
{
  "Authorization": "Bearer <token>"
}
```

_Response (200 - OK)_

```json
[
  {
        "id": 4,
        "name": "Blackberry Walnut Cookies",
        "imageUrl": "https://spoonacular.com/recipeImages/635248-312x231.jpg",
        "price": 641,
        "calory": 142,
        "UserId": 1,
        "createdAt": "2023-11-17T04:38:24.494Z",
        "updatedAt": "2023-11-17T04:38:24.494Z"
    },
    {
        "id": 5,
        "name": "Chicken and White Bean Chili",
        "imageUrl": "https://spoonacular.com/recipeImages/637932-312x231.jpg",
        "price": 1849,
        "calory": 433,
        "UserId": 1,
        "createdAt": "2023-11-17T04:38:24.497Z",
        "updatedAt": "2023-11-17T04:38:24.497Z"
    },
  ...,
]
```

&nbsp;

## 8. GET /foods/admin

Description:
- Get all foods from database need authorization admin role

Request:

- headers: 

```json
{
  "Authorization": "Bearer <token>",
  "req.user.role": "string"
}
```

_Response (200 - OK)_

```json
[
  {
        "id": 4,
        "name": "Blackberry Walnut Cookies",
        "imageUrl": "https://spoonacular.com/recipeImages/635248-312x231.jpg",
        "price": 641,
        "calory": 142,
        "UserId": 1,
        "createdAt": "2023-11-17T04:38:24.494Z",
        "updatedAt": "2023-11-17T04:38:24.494Z"
    },
    {
        "id": 5,
        "name": "Chicken and White Bean Chili",
        "imageUrl": "https://spoonacular.com/recipeImages/637932-312x231.jpg",
        "price": 1849,
        "calory": 433,
        "UserId": 1,
        "createdAt": "2023-11-17T04:38:24.497Z",
        "updatedAt": "2023-11-17T04:38:24.497Z"
    },
  ...,
]
```

&nbsp;

## 9. GET /foods/admin/:id

Description:
- Get detail food from database need authorization admin role

Request:

- headers: 

```json
{
  "Authorization": "Bearer <token>",
  "req.user.role": "string"
}
```
- params: 

```json
{
  "id": "integer"
}
```

_Response (200 - OK)_

```json
{
        "id": 5,
        "name": "Chicken and White Bean Chili",
        "imageUrl": "https://spoonacular.com/recipeImages/637932-312x231.jpg",
        "price": 1849,
        "calory": 433,
        "UserId": 1,
        "createdAt": "2023-11-17T04:38:24.497Z",
        "updatedAt": "2023-11-17T04:38:24.497Z"
    },
```
_Response (404 - Not Found)_

```json
{
  "message": "Food not found"
}
```


&nbsp;

## 10. POST /foods/admin
Description:
- Create food with access_token need authorization admin role

Request:

- headers: 

```json
{
  "Authorization": "Bearer <token>",
  "req.user.role": "string",
  "req.user.id": "integer"
}
```

- body:

```json
{
  "name": "string",
  "imageUrl": "string",
  "price": "integer",
  "calory": "integer"
}
```

_Response (201 - Created)_

```json
{
  "id": "integer",
   "name": "string",
  "imageUrl": "string",
  "price": "integer",
  "calory": "integer",
  "UserId": "integer"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Name is Required"
}
OR
{
  "message": "Image URL is Required"
}
OR
{
  "message": "Price is Required"
}
OR
{
  "message": "Calory is Required"
}
OR
{
  "message": "UserId is Required"
}
```


&nbsp;

## 11. PUT /foods/admin/:id
Description:
- Edit food with access_token need authorization admin role

Request:

- headers: 

```json
{
  "Authorization": "Bearer <token>",
  "req.user.role": "string"
}
```
- params: 

```json
{
  "id": "integer"
}
```

- body:

```json
{
  "name": "string",
  "imageUrl": "string",
  "price": "string",
  "calory": "integer"
}
```

_Response (200 - ok)_

```json
{
  "id": "integer",
  "imageUrl": "string",
  "price": "string",
  "calory": "integer"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Name is Required"
}
OR
{
  "message": "Image URL is Required"
}
OR
{
  "message": "Price is Required"
}
OR
{
  "message": "Calory is Required"
}
```
_Response (404 - Not Found)_

```json
{
  "message": "Food not found"
}
```

&nbsp;

## 12. DELETE /foods/admin/:id

Description:
- Delete post by id need authorization admin role

Request:

- headers:

```json
{
  "Authorization": "Bearer <token>"
}
```

- params:

```json
{
  "id": "integer (required)"
}
```

_Response (200 - OK)_

```json
{
  "message": "name food success to delete"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Food not found"
}
```


&nbsp;

## Global Error

_Response (401 - InvalidUser || JsonWebTokenError)_

```json
{
  "message": "Unauthenticated"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal server error"
}
```