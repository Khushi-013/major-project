import numpy as np
import pandas as pd
import joblib

def predict_label(model, onehot_encoder, label_encoder, target_encoder, input):

  # Define the input as a DataFrame (for consistency with the training format)
  input_data = pd.DataFrame([input],
                            columns=['crime_type', 'dv_case', 'filed_case_type'])

  # One-hot encode the categorical features (crime_type, filed_case_type)
  encoded_input_features = onehot_encoder.transform(input_data[['crime_type', 'filed_case_type']])
  encoded_input_features_df = pd.DataFrame(encoded_input_features, columns=onehot_encoder.get_feature_names_out())

  # Label encode 'dv_case'
  input_data['dv_case'] = label_encoder.transform(input_data['dv_case'])

  # Combine the one-hot encoded features with 'dv_case'
  input_encoded = pd.concat([encoded_input_features_df.reset_index(drop=True), input_data[['dv_case']].reset_index(drop=True)], axis=1)

  # Now your input is fully encoded and ready for prediction

  # Predict using the loaded model
  predicted_class = model.predict(input_encoded)

  # Decode the predicted class (if you want the original 'days_bin' labels)
  predicted_class_decoded = target_encoder.inverse_transform(predicted_class)

  return predicted_class_decoded[0]


