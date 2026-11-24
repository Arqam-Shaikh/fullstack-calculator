# Full Stack Calculator

A full-stack calculator application built using React.js and Python FastAPI. The application performs arithmetic operations through a REST API and provides a responsive, interactive user interface.

## Live Demo

https://fullstack-calculator-taupe.vercel.app

## Technologies Used

- Frontend: React.js, Vite, HTML, CSS, JavaScript
- Backend: Python, FastAPI
- API: REST API
- Deployment: Vercel and Render
- Version Control: Git and GitHub

## Features

- Addition, subtraction, multiplication and division
- Decimal number support
- Clear and backspace functionality
- Keyboard input support
- Calculation history
- Backend-based calculations
- Responsive user interface

## Architecture

React frontend communicates with the FastAPI backend through HTTP POST requests. The backend processes calculations and returns JSON responses.

## API Endpoint

POST `/calculate`

Example request:

{
  "num1": 10,
  "num2": 20,
  "operator": "+"
}

Example response:

{
  "result": 30
}

## Deployment

- Frontend: Vercel
- Backend: Render

## Repository

https://github.com/Arqam-Shaikh/fullstack-calculator