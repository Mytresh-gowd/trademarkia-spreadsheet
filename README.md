# Real-Time Collaborative Spreadsheet

This project is a lightweight **real-time collaborative spreadsheet application** built using modern frontend technologies. The application allows multiple users to edit spreadsheet cells simultaneously while viewing updates instantly across all active sessions.

The goal of this project was to simulate a simplified version of Google Sheets while focusing on **real-time synchronization, state management, and collaborative presence indicators**.

---

## Features

* **Spreadsheet Grid Interface**

  * Rows numbered and columns labeled (A, B, C, ...)
  * Editable cells with dynamic updates

* **Formula Support**

  * Basic arithmetic formulas
  * Example:

    * `=A1+A2`
    * `=A1*A2`

* **Real-Time Collaboration**

  * Changes in one browser tab update instantly in all other open sessions.

* **Presence System**

  * Active users viewing the document are displayed in real-time.

* **Write-State Indicator**

  * Displays the saving state of edits:
  * `Saving...`
  * `Saved ✓`

* **Document Dashboard**

  * A simple dashboard to open the spreadsheet editor.

---

## Tech Stack

* **Next.js (App Router)**
* **TypeScript**
* **Tailwind CSS**
* **Firebase Firestore (Realtime Database)**

---

## Project Structure

```
app/
 ├ page.tsx                 → Document dashboard
 └ document/
    └ sheet1/
       └ page.tsx           → Spreadsheet editor

components/
 └ SpreadsheetGrid.tsx      → Spreadsheet UI and logic

lib/
 ├ firebase.ts              → Firebase configuration
 └ formula.ts               → Formula evaluation logic
```

---

## How to Run Locally

Clone the repository:

```
git clone https://github.com/YOUR_USERNAME/trademarkia-spreadsheet.git
```

Install dependencies:

```
npm install
```

Run the development server:

```
npm run dev
```

Open the app in the browser:

```
http://localhost:3000
```

---

## Live Demo

Live Application:
(Add your deployed Render or Vercel link here)

---

## Demonstration Video

(Add your demo video link here)

---

## Assignment Context

This project was developed as part of a **Frontend Engineering Assignment**, focusing on:

* Real-time data synchronization
* Collaborative editing systems
* Clean frontend architecture
* Practical use of modern web technologies
