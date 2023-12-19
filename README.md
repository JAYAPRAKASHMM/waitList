# WaitList App

## Brief Overview

Welcome to Tile by WaitList App! This application is a gaming event conducted by an organization to win an iPhone by connecting friends through referrals and reaching Position 1 from 100+.

## Table of Contents

1. [Introduction](#introduction)
2. [Features](#features)
3. [Tech Stack Used](#tech-stack-used)
    - [Frontend](#frontend)
    - [Backend](#backend)
    - [Database](#database)
4. [Built Tools & Version Controls](#built-tools)
5. [Attachments](#attachments)
6. [Procedure/Setup](#procedure-setup)

---

## Introduction

Tile by WaitList App is designed for a gaming event where participants refer friends to climb the waitlist positions and compete to win an iPhone.

---

## Features ✅

1. User logs are stored in MySQL.
2. Sessions are maintained in LocalStorage.
3. Referring a friend is limited to once per user.
4. Admin can view the overall waitlist status.
5. Proper authentication is implemented.
6. Landing page and winner mailings work seamlessly.
7. Project structure and file names are meticulously maintained.
8. The entire project is responsive.

---

## Tech Stack Used

### Frontend

- **HTML:** Hypertext Markup Language for structuring web content.
- **CSS:** Cascading Style Sheets for styling the visual presentation.
- **JavaScript:** A versatile scripting language for dynamic behavior.

### Backend

- **Node.js:** A server-side scripting language for dynamic web pages.
- **Node Mailer:** Used for mailing purposes.

### Database

- **MySQL:** A reliable relational database management system.

---

## Built Tools & Version Controls

- **GitHub:** A platform for version control and collaborative development.
- **Git:** A distributed version control system for tracking changes in source code.

---

## Attachments

### Landing Page
[![Landing Page](https://i.postimg.cc/fTrRnWwd/landpage.png)](https://postimg.cc/kBWmWmRM)

### Login Page
[![Login Page](https://i.postimg.cc/vHBSxb53/Loginpage.png)](https://postimg.cc/nMy168RD)

### Admin Login
[![Admin Login](https://i.postimg.cc/0N4PJcBB/Adminlogin.png)](https://postimg.cc/zLT9sS5C)

### Admin Page
[![Admin Page](https://i.postimg.cc/gjZy3zH6/Admin.png)](https://postimg.cc/1VyNQZT9)

### User Status Page
[![Status Page](https://i.postimg.cc/mr7GpCZd/Statuspage.png)](https://postimg.cc/5H9G6HCv)

### Table Used
[![Wait-List Table](https://i.postimg.cc/FzyMD497/wait-List-Table.png)](https://postimg.cc/8fCXzxfS)

---

## Procedure/Setup

### Node Setup

1. In the root directory, open the terminal and run `npm install`.
2. Run `node server.js`.
3. Navigate to the client directory using `cd client`.
4. Run `npm start`.

### MySQL Setup

1. In MySQL, create a database named "waitlistapp" using the command `create database waitlistapp`.
2. Use the created database with `use waitlistapp`.
3. Create a table using the following command:

```sql
CREATE TABLE waitlist (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255),
  email VARCHAR(255),
  password VARCHAR(255),
  position INT,
  ukeys VARCHAR(255) DEFAULT NULL
);
```

---

Feel free to explore the app, and thank you for your time! 😊
