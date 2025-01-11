# 📚 **Book Readers' Community** 

## Table of Contents

- [📖 Overview](#-overview)
- [✨ Features](#-features)
- [💻 Technologies Used](#-technologies-used)
    - [🔧 Backend (book-readers-community-api)](#-backend-book-readers-community-api)
    - [🌐 Frontend (book-readers-community-ui)](#-frontend-book-readers-community-ui)

## 📖 **Overview**

**Book Readers' Community** is a full-stack web application designed for users to manage their personal book collections and connect with fellow book enthusiasts. The platform enables users to register, manage their books (add, update, delete, share, and archive), borrow books while checking availability, and handle returns with an approval process. 

The backend is powered by **Spring Boot 3** and **Spring Security 6**, utilizing **OAuth 2.0 Resource Server** with **Keycloak** for authentication and authorization. The frontend is developed using **Angular** and styled with **Bootstrap** to ensure a responsive and user-friendly interface.

## 💻 **Demo**

https://github.com/user-attachments/assets/62d81ea7-1302-440c-be0b-d9c91a519f55

## ✨ **Features**

- 🔑 **User Registration & Login**: Users can register and securely log in via **Keycloak**.
- 📚 **Book Management**: Add, edit, delete, share, and archive books. Users can also search for books with **substring search**, borrow available books, and add others' books to their favorites.
- 🔄 **Book Return Process**: Borrowed books can be returned, and owners must approve the return for the book to be available again.
- ⚡ **Real-Time Notifications**: Receive real-time notifications for book-related actions (borrowing, returning, errors) via **WebSocket** & **Toastr**.

## 💻 **Technologies Used**

### 🔧 **Backend (book-readers-community-api)**

- **Spring Boot 3**: Provides RESTful APIs and handles the application’s logic.
- **Spring Security 6**: Secures the backend using **OAuth 2.0** and **JWT**.
- **OAuth 2.0 Resource Server**: Manages authentication and authorization.
- **Spring Data JPA**: Simplifies database interactions.
- **JSR-303 & Spring Validation**: Ensures data validation and consistency.
- **OpenAPI & Swagger UI**: Offers interactive API documentation.
- **Docker**: Containers for PostgreSQL and Keycloak.
- **Keycloak**: Manages user authentication and roles.
- **PostgreSQL**: A robust and reliable relational database.

### 🌐 **Frontend (book-readers-community-ui)**

- **Angular**: A powerful frontend framework using **component-based architecture**.
- **Lazy Loading**: Optimizes performance by loading components on demand.
- **Authentication Guard**: Secures routes based on user roles and authentication.
- **OpenAPI Generator**: Automatically generates Angular services for API communication.
- **Bootstrap**: Responsive and modern UI design.
