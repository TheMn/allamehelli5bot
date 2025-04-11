# Allamehelli5Bot - Telegram Bot for High School Teachers

This Telegram bot is designed to streamline communication and information sharing for teachers at Allamehelli5 High School. It provides features for teachers to manage their details, share course syllabi, and receive messages from administrators. Administrators can also broadcast messages to all teachers.

## Purpose

The primary goals of this bot are:

*   **Centralized Information:** Provide a single platform for teachers to access and update their information.
*   **Syllabus Management:** Allow teachers to easily share their course syllabi with school administrators.
*   **Admin Communication:** Enable administrators to quickly send announcements and updates to all teachers.
*   **Efficiency:** Reduce the time and effort required for information management and communication.

## Features

**For Teachers:**

*   **Login:** Secure login using their phone number and national ID.
*   **Profile Information:** View their personal details (name, field, national ID, degree, etc.).
*   **Profile Editing:** Update their profile information, including their field of expertise, bank account details, and optionally a scanned photo.
*   **Salary Information:** Access information about their salary structure.
*   **Syllabus Submission:** Submit their course syllabus for the current term.
*   **Logout:** Securely log out of their account.
* **Support:** cancel command for cancelling ongoing operations, help and home command for showing the main menu.

**For Administrators:**

*   **Broadcast Messages:** Send text messages to all teachers simultaneously.
*   **Forward Messages:** Forward audio or image messages to all teachers.

## Technologies Used

*   **Google Apps Script:** The core logic of the bot is written in Google Apps Script.
*   **Telegram Bot API:** Used for interacting with the Telegram platform.
*   **Google Sheets:** Used as a database to store teacher information and bot state.
* **JSON:** Used for data parsing.

## Usage Examples

**Teacher:**

1.  Send `/start` to the bot, then enter your phone number and national ID.
2.  Use `/info` to view your profile details.
3.  Use `/edit` to update your profile information.
4.  Use `/syllabus` to submit your course syllabus.

**Administrator:**

1. Send `/sendToAll` to send a message to all teachers.
2. Send `/forwardToAll` to forward a message to all teachers.
