import pandas as pd
import numpy as np
from sklearn.preprocessing import LabelEncoder, StandardScaler
from sklearn.model_selection import train_test_split
from sklearn.ensemble import GradientBoostingClassifier
import joblib
import os

df = pd.read_csv('/model/data/WA_Fn-UseC_-Telco-Customer-Churn.csv')

df['TotalCharges'] = pd.to_numeric(df['TotalCharges'], errors='coerce')
df['TotalCharges'] = df['TotalCharges'].fillna(df['TotalCharges'].median())
df.drop('customerID', axis=1, inplace=True)
df['Churn'] = df['Churn'].map({'Yes': 1, 'No': 0})

service_cols = ['PhoneService','MultipleLines','InternetService',
                'OnlineSecurity','OnlineBackup','DeviceProtection',
                'TechSupport','StreamingTV','StreamingMovies']
df['num_services'] = df[service_cols].apply(
    lambda x: x.isin(['Yes','Fiber optic','DSL']).sum(), axis=1)
df['high_value'] = (df['MonthlyCharges'] > 64.76).astype(int)

for col in df.select_dtypes(include='object').columns:
    df[col] = LabelEncoder().fit_transform(df[col])

X = df.drop('Churn', axis=1)
y = df['Churn']

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42, stratify=y)

model = GradientBoostingClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

scaler = StandardScaler()
scaler.fit(X_train)

os.makedirs('/model/artifacts', exist_ok=True)
joblib.dump(model, '/model/artifacts/churn_model.pkl')
joblib.dump(scaler, '/model/artifacts/scaler.pkl')
joblib.dump(list(X.columns), '/model/artifacts/features.pkl')

print("Model retrained and saved successfully!")