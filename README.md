# Allamehelli5Bot - Telegram Bot for High School Teachers

This Telegram bot is designed to streamline communication and information sharing for teachers at Allamehelli5 High School. It provides features for teachers to manage their details, share course syllabi, and receive messages from administrators. Administrators can also broadcast messages to all teachers.

## Purpose

The primary goals of this bot are:

*   **Centralized Information:** Provide a single platform for teachers to access and update their information.
*   **Syllabus Management:** Allow teachers to easily share their course syllabi with school administrators.
*   **Admin Communication:** Enable administrators to quickly send announcements and updates to all teachers.
*   **Efficiency:** Reduce the time and effort required for information management and communication.

## Features

### For Teachers:

*   **Login:** Secure login using their phone number and national ID.
*   **Profile Information:** View their personal details (name, field, national ID, degree, etc.).
*   **Profile Editing:** Update their profile information, including their field of expertise, bank account details, and optionally a scanned photo.
*   **Salary Information:** Access information about their salary structure.
*   **Syllabus Submission:** Submit their course syllabus for the current term.
*   **Logout:** Securely log out of their account.
*   **Support:** Cancel command for cancelling ongoing operations, help and home command for showing the main menu.

### For Administrators:

*   **Broadcast Messages:** Send text messages to all teachers simultaneously.
*   **Forward Messages:** Forward audio or image messages to all teachers.

## Technologies Used

*   **Google Apps Script:** The core logic of the bot is written in Google Apps Script.
*   **Telegram Bot API:** Used for interacting with the Telegram platform.
*   **Google Sheets:** Used as a database to store teacher information and bot state.
*   **JSON:** Used for data parsing.

## Setup and Configuration

1.  **Create a Google Sheet:**
    *   Create a new Google Sheet to store the bot's data.
    *   Create three sheets named `TEACHERS`, `STATES`, and `PEOPLE`.
    *   The `TEACHERS` sheet should contain the teachers' information, including `first_name`, `last_name`, `phone_number`, `melli_code`, `telegram_id`, etc.
    *   The `STATES` sheet should have two columns: `telegram_id` and `state_name`.
    *   The `PEOPLE` sheet should have three columns: `telegram_id`, `phone_number`, and `logged_in`.
2.  **Create a Google Apps Script Project:**
    *   Create a new Google Apps Script project and copy the code from the `.gs` files into it.
    *   In `Statics.gs`, you will need to set the `SPREADSHEET_ID` variable to the ID of your Google Sheet.
    *   You will also need to set the `ADMIN_IDs` variable to the Telegram IDs of the administrators.
3.  **Create a Telegram Bot:**
    *   Create a new Telegram bot using the BotFather.
    *   Get the bot's API token and add it to your script's properties.
4.  **Deploy the Script as a Web App:**
    *   Deploy the script as a web app, and get the web app URL.
5.  **Set the Webhook:**
    *   Run the `setWebhook` function to set the webhook for your bot, using your web app URL.

## Usage

### Teacher Commands

*   `/start`: Starts the bot and initiates the login process.
*   `/info`: Displays the teacher's profile information.
*   `/edit`: Shows the menu for editing profile information.
*   `/field`: Allows the teacher to update their last field of study.
*   `/bank`: Allows the teacher to update their bank account number.
*   `/photo`: Allows the teacher to send a scanned photo.
*   `/syllabus`: Allows the teacher to submit their course syllabus.
*   `/salary`: Displays the teacher's salary information.
*   `/logout`: Logs the teacher out of the bot.
*   `/cancel`: Cancels the current operation and returns to the main menu.
*   `/home`: Returns to the main menu.
*   `/help`: Shows the main menu.

### Administrator Commands

*   `/sendToAll`: Sends a text message to all teachers.
*   `/forwardToAll`: Forwards a message to all teachers.
*   `/cancel`: Cancels the current operation and returns to the main menu.
*   `/home`: Returns to the main menu.
*   `/help`: Shows the main menu.
