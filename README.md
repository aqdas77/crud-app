# CRUD Application

A CRUD appliaction in which user can register, login, update or delete its profile and JWT is used for authentication during login.

## Features
JWT User Authentication: Securely create an account, log in, and access your tasks using JSON Web Tokens (JWT) for robust authentication and authorization.

Update Profile : User can update his profile.

Delete Profile : User can delete his profile.

Responsive Design: Enjoy a seamless experience on both desktop and mobile devices.

## Getting Started
To run this application locally or deploy it on your server, follow these steps:

Clone the Repository:

```bash
git clone https://github.com/aqdas77/crud-app.git
cd crud-app
```
## Install Dependencies:
```bash
npm install
```
## Configure Environment Variables:

Create a `.env` file in the project root.
Define the necessary environment variables, such as the JWT secret, database connection information, and session settings.

## Database Setup:

Set up your preferred database (e.g., MongoDB).
Update the database connection URL in your `.env` file.
Start the Application:

```bash
npm start
```
Access the Application:
Open your web browser and navigate to ```http://localhost:3000``` (or the specified port).

## JWT Authentication
Task App uses JSON Web Tokens (JWT) for user authentication and authorization. Here's how JWT authentication works:

**User Registration**: Users can securely create an account with a unique username and a strong password.

**User Login**: Upon successful registration, users can log in using their credentials, and the server will issue a JWT for subsequent authentication.

**JWT Authorization**: The JWT is used to authorize users and grant access to their tasks. It is included in the request headers for protected routes.

**Token Expiration**: JWTs have a configurable expiration time to enhance security. Users will need to log in again after the token expires.

**Middleware**: Middleware is employed to validate JWTs on protected routes, ensuring only authenticated users can access their tasks.

**Logout**: Users can log out, which invalidates their JWT, further enhancing security.

## Technologies Used
**Node.js**: Server-side runtime environment.

**Express.js**: Web application framework for Node.js.

**MongoDB**: NoSQL database for storing task data.

**EJS**: Templating engine for rendering views.

**JSON Web Tokens (JWT)**: Secure user authentication and authorization.

**Material UI**: Front-end CSS framework for responsive design.

## Contributing
Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.


## Contact
If you have any questions, suggestions, or feedback, please feel free to contact the project maintainer:

**Email**: mohammadaqdas212@gmail.com
