from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Literal

app = FastAPI(title="Full Stack Calculator API")

# Allow React frontend to communicate with FastAPI
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Request data model
class Calculation(BaseModel):
    num1: float
    num2: float
    operator: Literal["+", "-", "*", "/"]


# Home endpoint
@app.get("/")
def home():
    return {"message": "Calculator Backend is Running!"}


# Health check endpoint
@app.get("/health")
def health():
    return {"status": "healthy"}


# Calculator endpoint
@app.post("/calculate")
def calculate(data: Calculation):

    if data.operator == "+":
        result = data.num1 + data.num2

    elif data.operator == "-":
        result = data.num1 - data.num2

    elif data.operator == "*":
        result = data.num1 * data.num2

    elif data.operator == "/":
        if data.num2 == 0:
            raise HTTPException(
                status_code=400,
                detail="Cannot divide by zero"
            )
        result = data.num1 / data.num2

    return {
        "num1": data.num1,
        "num2": data.num2,
        "operator": data.operator,
        "result": result
    }