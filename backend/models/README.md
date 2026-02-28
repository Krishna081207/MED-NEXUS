# Models Directory

This directory contains machine learning models for medical predictions in the MED-NEXUS system.

## Symptom Predictor

The `SymptomPredictor` class provides functionality to predict possible medical outcomes based on input symptoms.

### Features

- **Symptom Analysis**: Takes a list of symptoms and predicts possible diseases
- **Rule-Based Fallback**: Uses a rule-based system when ML model is not available
- **Confidence Scoring**: Provides confidence levels for each prediction
- **Health Recommendations**: Generates actionable health recommendations
- **Model Persistence**: Save and load trained models

### Usage

```python
from models.symptom_predictor import SymptomPredictor

# Initialize predictor
predictor = SymptomPredictor()

# Make predictions
symptoms = ["fever", "cough", "fatigue"]
predictions = predictor.predict(symptoms, top_k=3)

# Get recommendations
recommendations = predictor.get_recommendations(predictions)
```

### Testing

Run the test function:
```bash
python models/symptom_predictor.py
```

## Future Enhancements

- [ ] Integrate actual ML models (Random Forest, Neural Networks)
- [ ] Add more comprehensive symptom-disease mappings
- [ ] Implement training pipeline with medical datasets
- [ ] Add support for symptom severity levels
- [ ] Include demographic factors (age, gender, medical history)
- [ ] Multi-language support for symptoms
- [ ] Integration with medical knowledge bases
