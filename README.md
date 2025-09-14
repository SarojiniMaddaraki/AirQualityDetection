# Air Quality Detection and Prediction

## Project Overview
This project detects and predicts air quality levels using machine learning. It demonstrates data preprocessing, feature engineering, and predictive modeling. The final goal is to build a model that predicts the Air Quality Index (AQI).

## Dataset
- Source: Kaggle – Air Quality in India
- File: city_day.csv
- Attributes:
  - City
  - Date
  - PM2.5, PM10, NO2, SO2, CO, O3
  - AQI

## Methodology
1. Data Cleaning
   - Standardized column names
   - Removed duplicates and irrelevant rows
2. Missing Value Handling
   - Filled missing values using city-wise and temporal medians
3. Feature Engineering
   - Extracted year, month, and day of week
   - Created rolling averages (3-day, 7-day)
4. Model Building
   - Tested Linear Regression, Random Forest, XGBoost
   - Selected best performing model

## Data Visualizations
- Heatmap for missing values
- Line plots for AQI trends
- Correlation matrix for pollutant relationships

## Web Application
- Backend: Flask (app.py)
- Frontend: React (App.jsx)
- Users enter pollutant values, model predicts AQI

## Project Structure
- app.py : Flask backend
- App.jsx : React frontend
- AirQualityDetection.ipynb : Data preprocessing and model
- city_day.csv : Dataset
- requirements.txt : Dependencies
- README.md : Documentation

## Conclusion
This project demonstrates a complete machine learning pipeline for air quality prediction, including data preprocessing, modeling, and deployment.
