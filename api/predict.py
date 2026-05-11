import joblib
import pandas as pd
import numpy as np
from sklearn.preprocessing import LabelEncoder

model = joblib.load("/model/artifacts/churn_model.pkl")
scaler = joblib.load("/model/artifacts/scaler.pkl")
features = joblib.load("/model/artifacts/features.pkl")

def preprocess(data: dict) -> pd.DataFrame:
    df = pd.DataFrame([data])

    service_cols = ['PhoneService','MultipleLines','InternetService',
                    'OnlineSecurity','OnlineBackup','DeviceProtection',
                    'TechSupport','StreamingTV','StreamingMovies']
    df['num_services'] = df[service_cols].apply(
        lambda x: x.isin(['Yes','Fiber optic','DSL']).sum(), axis=1)
    df['high_value'] = (df['MonthlyCharges'] > 64.76).astype(int)

    le = LabelEncoder()
    cat_cols = df.select_dtypes(include='object').columns
    for col in cat_cols:
        df[col] = le.fit_transform(df[col])

    df = df[features]
    return df

def predict_churn(data: dict) -> dict:
    df = preprocess(data)
    probability = model.predict_proba(df)[0][1]

    if probability < 0.3:
        risk_level = "Low"
    elif probability < 0.6:
        risk_level = "Medium"
    else:
        risk_level = "High"

    return {
        "churn_probability": round(float(probability), 4),
        "risk_level": risk_level,
        "prediction": "Will Churn" if probability >= 0.5 else "Will Stay"
    }