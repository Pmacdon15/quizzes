# Quizzes

This is a simple application to store quizzes and allow users to access them. In this project we are using Node js, Express  Next.js and MS Sql.
 

## Table of Contents

- [Installation](#Installation)
- [Requirements](#Requirements)
- [Database](#Database)
- [Startup](#Startup)

## Installation

> **Note**
> For easy cloning it is recommended you have git installed.

Navigate to a terminal and directory you want to clone the repository in and type:

 ```bash

git clone https://github.com/Pmacdonald15/shared_workspaces

```

## Requirements

Next we will need to install the Node Modules, I will list the commands here:

```bash

cd quizzes

```

```bash

npm install

```

```bash

cd client

```

```bash

npm install

```

## Database

This project requires a Ms Sql database connection. After downloading and installing Ms Sql, Configure your database and take note of the credentials. There is a file in the repository, in quizzes/server, named schema.sql that has the configuration for the Ms Sql database. Simply copy and paste this code in to the Ms Sql terminal after logging on to the database.

This project Requires a .env file setup in the following manner to connect to the database(using the credentials that you set up the database with): 

 ```.env

MSSQL_SERVER=' '
MSSQL_USER=' '
MSSQL_PASSWORD=' '
MSSQL_DATABASE='quizzes'

```

> [!IMPORTANT]
>The .env file should be located inside of root directory of the project.

## Startup

If you are in the root directory of the project run:

```bash

npm start

```

The server is now running. You can contact the app at localhost:3000/ or using your public Ip address after applying the appropriate port forwarding to your router.

> [!IMPORTANT]
>This is an empty project so far.
