# Learn Multer: A Simple Guide

This guide will help you understand how to use Multer for handling file uploads, deletions, and updates in a Node.js application.

## Notes

For a detailed explanation of Multer and how it works, check out my comprehensive notes here:
[Multer Notes](https://bony-ambulance-780.notion.site/MULTER-d895a09184224efe8fe97e8c58af3faf)

## How to Use Multer

### 1. Uploading Files

To upload a file, use the `/register` endpoint with a POST request. Include a `username` and an `avatar` file in the request body. The file will be saved on the server, and the username will be stored in the database.

### 2. Removing Files

To remove a user and their avatar file, send a DELETE request to the `/remove/:id` endpoint with the user's ID. The server will delete both the user record and the associated avatar file from the server's storage.

### 3. Updating Files

To update a user's information and avatar, use the `/profile/:id` endpoint with a PUT request. Provide the user's ID, and optionally, a new `username` and `avatar` file. The server will update the user record and replace the old avatar file with the new one.

## How to Start This Code Locally

To run this code on your local machine, follow these steps:

1. **Start the server:** Run the following command in one terminal:
   ```bash
   npm run dev
   ```
2. **Watch TypeScript files for changes:** Open another terminal and run for genrate automatically build file:
   ```bash
   npm run watch
   ```

## Follow and Star

Follow for more upcoming easy peasy tutorial notes and give a star if you found this helpful!
