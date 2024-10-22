# prediction_api.py
from flask import Flask, request, jsonify
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_absolute_error, r2_score
import numpy as np

app = Flask(__name__)

# Load and preprocess the dataset (replace this with the correct path to your dataset)
file_path = '/content/drive/MyDrive/MajorProjec/case_details.csv'
df = pd.read_csv(file_path)

# Convert date columns to datetime format
date_columns = ['date_of_filing', 'date_of_decision']  # Adjust based on your dataset
for col in date_columns:
    df[col] = pd.to_datetime(df[col], errors='coerce')

# Create a target variable representing the number of days between filing and decision
df['timeline_days'] = (df['date_of_decision'] - df['date_of_filing']).dt.days
df = df[df['timeline_days'] >= 0]  # Ensure no negative timelines

# Drop unnecessary columns
columns_to_drop = ['case_no', 'date_of_filing', 'date_of_decision']  # Adjust based on your dataset
df.drop(columns=columns_to_drop, inplace=True)

# Handle categorical variables using one-hot encoding
df_encoded = pd.get_dummies(df, drop_first=True)

# Split data into features and target
X = df_encoded.drop('timeline_days', axis=1)
y = df_encoded['timeline_days']

# Split data into training and test sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)

# Train a RandomForestRegressor model
model = RandomForestRegressor(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

@app.route('/predict-timeline', methods=['POST'])
def predict_timeline():
    data = request.get_json()

    # Extract input data from the request
    case_no = data['case_no']
    type_name = data['type_name']
    desgcode = data['desgcode']
    district_code = data['district_code']
    state_code = data['state_code']
    
    # Create a dataframe with the input features
    input_features = pd.DataFrame({
        'case_no': [case_no],
        'type_name': [type_name],
        'desgcode': [desgcode],
        'district_code': [district_code],
        'state_code': [state_code]
    })

    # Apply the same preprocessing steps (e.g., encoding) as done during training
    input_encoded = pd.get_dummies(input_features).reindex(columns=X_train.columns, fill_value=0)

    # Make a prediction
    predicted_timeline = model.predict(input_encoded)[0]

    return jsonify({'predicted_timeline': predicted_timeline})

if __name__ == '__main__':
    app.run(port=5001)
