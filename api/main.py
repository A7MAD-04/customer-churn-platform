from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from schema import CustomerData, PredictionResponse
from predict import predict_churn

app = FastAPI(
    title="Customer Churn Prediction API",
    description="Predicts customer churn probability for telecom customers",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "Churn Prediction API is running"}

@app.get("/health")
def health():
    return {"status": "healthy"}

@app.post("/predict", response_model=PredictionResponse)
def predict(customer: CustomerData):
    result = predict_churn(customer.dict())
    return result