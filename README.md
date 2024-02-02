# b-social Network Application

## Overview

This is a simple social network application where users can create posts, comment on them, and follow other users. The application is built using Node.js for backend, React for the front end, and PostgreSQL as the database.

## Features

- **User Authentication:** Secure registration and login.
- **Posts:** Create and delete posts.
- **Comments:** Add and delete comments on posts.
- **Follow System:** Follow/unfollow other users to customize your feed.

## Getting Started

Make sure you have docker installed.

### How to start project

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/krdzex/b-social.git
   cd social-network-app

2. **Run project using docker:**
   ```bash
   docker compose build
   docker compose up -d

## Backend Microservices

### 1. Main Service

- Utilized as the primary REST API for our application.
- Responsible for sending messages to other applications using Kafka.

### 2. Notification Service

- Dedicated to handling notifications.
- Consumes messages when users comment on a post.
- Uses Socket.IO to send real-time notifications to post owners.

### 3. Consumer Service

- Responsible for consuming messages from the Main Service.
- Stores these messages in Elasticsearch for future reference.

## Frontend

The frontend of our application features a simple and intuitive user interface:

1. **Sign Up and Sign In:**
   - Upon landing on the application, users will start at the Sign In page.
   - If users don't have an account, they can navigate to the top of the application and click on the Sign Up link.

2. **Profile Page:**
   - After creating an account and logging in, users will be redirected to their profile page.
   - The profile page displays a card with user information.
   - Users will notice three tabs:
     - **First Tab (My Posts):**
       - Use this tab to create new posts, comment on your posts, or delete them.
     - **Second Tab (Following):**
       - View a list of people you are currently following.
     - **Third Tab (Followers):**
       - See a list of users following you.

3. **Navigation Links:**
   - On top of the application, after you sign in, users will find new links:
     - **Users:**
       - Navigate to a page displaying all users on the application.
     - **My Profile:**
       - Directly go to your profile page.
     - **Sign Out:**
       - Log out and return to the Sign In page.

4. **User Profiles:**
   - When on the Users page, clicking on a user's profile will take you to their profile page.
   - If you don't follow the user, you'll need to follow them to unlock access to the three tabs described above.
  
   Enjoy exploring and interacting with the b-social application
