from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Literal

# Create FastAPI application
app = FastAPI(title="Full Stack Calculator API")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "https://fullstack-calculator-taupe.vercel.app"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Request model
class Calculation(BaseModel):
    num1: float
    num2: float
    operator: Literal["+", "-", "*", "/"]


# Home route
@app.get("/")
def home():
    return {"message": "Calculator Backend is Running!"}


# Health check route
@app.get("/health")
def health():
    return {"status": "healthy"}


# Calculation API
@app.post("/calculate")
def calculate(data: Calculation):

    num1 = data.num1
    num2 = data.num2
    operator = data.operator

    if operator == "+":
        result = num1 + num2

    elif operator == "-":
        result = num1 - num2

    elif operator == "*":
        result = num1 * num2

    elif operator == "/":
        if num2 == 0:
            raise HTTPException(
                status_code=400,
                detail="Cannot divide by zero"
            )
        result = num1 / num2

    return {
        "num1": num1,
        "num2": num2,
        "operator": operator,
        "result": result
    }