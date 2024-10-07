# Book Readers' Community

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
    - [Backend (book-readers-community)](#backend-book-readers-community-api)
    - [Frontend (book-social-network-ui)](#frontend-book-readers-community-ui)

## Overview

Book Readers' Community is a full-stack web application designed for users to manage their personal book collections and connect with fellow book enthusiasts. The platform allows users to register, manage their books (add, update, delete, share, and archive), borrow books while checking availability, and handle returns with an approval process. The backend is powered by Spring Boot 3 with Spring Security 6, OAuth 2.0 Resource Server, and Keycloak for authentication and authorization, while the frontend is developed using Angular and styled with Bootstrap.

## Features

- User Registration & Login: Users register and login.
- Book Management: Users can create, edit, delete, and archive their books. Users can search books (supports substring search), borrow, and add others' books to favorites.
- Book Returning: Users can return borrowed books and owners can approve the return.
- Realtime notifications with WebSocket & Toastr to display notifications.

## Technologies Used

### Backend (book-readers'-community-api)

- Spring Boot 3
- Spring Security 6
- OAuth 2.0 Resource Server
- Spring Data JPA
- JSR-303 and Spring Validation
- OpenAPI and Swagger UI Documentation
- Docker
- Keycloak

### Frontend (book-readers'-community-ui)

- Angular
- Component-Based Architecture
- Lazy Loading
- Authentication Guard
- OpenAPI Generator for Angular
- Bootstrap
- Express (Serving)
