"""
Symptom Predictor Model
Predicts possible medical outcomes based on input symptoms
"""

import numpy as np
from typing import List, Dict, Tuple
import json
import os


class SymptomPredictor:
    """
    Machine learning model for predicting medical outcomes from symptoms
    """
    
    def __init__(self, model_path: str = None):
        """
        Initialize the symptom predictor
        
        Args:
            model_path: Path to saved model file (optional)
        """
        self.model = None
        self.symptom_mapping = {}
        self.disease_mapping = {}
        self.is_trained = False
        
        if model_path and os.path.exists(model_path):
            self.load_model(model_path)
    
    def preprocess_symptoms(self, symptoms: List[str]) -> np.ndarray:
        """
        Convert symptom list to feature vector
        
        Args:
            symptoms: List of symptom strings
            
        Returns:
            Feature vector as numpy array
        """
        feature_vector = np.zeros(len(self.symptom_mapping))
        
        for symptom in symptoms:
            symptom_lower = symptom.lower().strip()
            if symptom_lower in self.symptom_mapping:
                idx = self.symptom_mapping[symptom_lower]
                feature_vector[idx] = 1
                
        return feature_vector
    
    def predict(self, symptoms: List[str], top_k: int = 5) -> List[Dict[str, float]]:
        """
        Predict possible diseases/outcomes from symptoms
        
        Args:
            symptoms: List of symptom strings
            top_k: Number of top predictions to return
            
        Returns:
            List of dictionaries containing disease name and probability
        """
        if not self.is_trained:
            return self._get_rule_based_predictions(symptoms, top_k)
        
        # Preprocess input
        features = self.preprocess_symptoms(symptoms)
        
        # Make prediction (placeholder for actual ML model)
        # Replace with actual model prediction
        predictions = self.model.predict_proba([features])[0]
        
        # Get top-k predictions
        top_indices = np.argsort(predictions)[-top_k:][::-1]
        
        results = []
        for idx in top_indices:
            disease_name = self.disease_mapping.get(idx, f"Disease_{idx}")
            probability = float(predictions[idx])
            results.append({
                "disease": disease_name,
                "probability": probability,
                "confidence": probability * 100
            })
        
        return results
    
    def _get_rule_based_predictions(self, symptoms: List[str], top_k: int) -> List[Dict[str, float]]:
        """
        Fallback rule-based prediction when model is not trained
        
        Args:
            symptoms: List of symptom strings
            top_k: Number of predictions to return
            
        Returns:
            List of disease predictions with confidence scores
        """
        # Simple rule-based system for demonstration
        symptom_disease_map = {
            "fever": ["Influenza", "COVID-19", "Malaria", "Common Cold"],
            "cough": ["COVID-19", "Bronchitis", "Pneumonia", "Common Cold"],
            "headache": ["Migraine", "Tension Headache", "Sinusitis"],
            "fatigue": ["Anemia", "Chronic Fatigue Syndrome", "Depression"],
            "nausea": ["Gastroenteritis", "Food Poisoning", "Migraine"],
            "chest pain": ["Angina", "Heart Attack", "Anxiety", "GERD"],
            "shortness of breath": ["Asthma", "Pneumonia", "Heart Failure"],
        }
        
        disease_scores = {}
        symptoms_lower = [s.lower().strip() for s in symptoms]
        
        for symptom in symptoms_lower:
            if symptom in symptom_disease_map:
                for disease in symptom_disease_map[symptom]:
                    disease_scores[disease] = disease_scores.get(disease, 0) + 1
        
        # Normalize scores
        total_symptoms = len(symptoms_lower)
        if total_symptoms > 0:
            for disease in disease_scores:
                disease_scores[disease] = disease_scores[disease] / total_symptoms
        
        # Sort by score and get top-k
        sorted_diseases = sorted(disease_scores.items(), key=lambda x: x[1], reverse=True)[:top_k]
        
        results = []
        for disease, score in sorted_diseases:
            results.append({
                "disease": disease,
                "probability": score,
                "confidence": score * 100,
                "recommendation": "Please consult a healthcare professional for proper diagnosis"
            })
        
        return results if results else [{
            "disease": "Unable to determine",
            "probability": 0.0,
            "confidence": 0.0,
            "recommendation": "Insufficient information. Please consult a doctor."
        }]
    
    def train(self, training_data: List[Dict], validation_split: float = 0.2):
        """
        Train the model on symptom-disease pairs
        
        Args:
            training_data: List of {symptoms: [...], disease: "..."} dictionaries
            validation_split: Fraction of data to use for validation
        """
        # TODO: Implement actual model training
        # This is a placeholder for ML model training
        print(f"Training on {len(training_data)} samples...")
        self.is_trained = True
    
    def save_model(self, save_path: str):
        """
        Save the trained model to disk
        
        Args:
            save_path: Path to save the model
        """
        model_data = {
            "symptom_mapping": self.symptom_mapping,
            "disease_mapping": self.disease_mapping,
            "is_trained": self.is_trained
        }
        
        with open(save_path, 'w') as f:
            json.dump(model_data, f, indent=2)
        
        print(f"Model saved to {save_path}")
    
    def load_model(self, model_path: str):
        """
        Load a trained model from disk
        
        Args:
            model_path: Path to the saved model
        """
        with open(model_path, 'r') as f:
            model_data = json.load(f)
        
        self.symptom_mapping = model_data.get("symptom_mapping", {})
        self.disease_mapping = model_data.get("disease_mapping", {})
        self.is_trained = model_data.get("is_trained", False)
        
        print(f"Model loaded from {model_path}")
    
    def get_recommendations(self, predicted_diseases: List[Dict]) -> Dict[str, List[str]]:
        """
        Get health recommendations based on predicted diseases
        
        Args:
            predicted_diseases: List of disease predictions
            
        Returns:
            Dictionary with recommendations
        """
        recommendations = {
            "immediate_actions": [],
            "lifestyle_changes": [],
            "when_to_see_doctor": []
        }
        
        if not predicted_diseases:
            return recommendations
        
        top_disease = predicted_diseases[0]["disease"]
        confidence = predicted_diseases[0]["confidence"]
        
        # Always recommend seeing a doctor
        recommendations["when_to_see_doctor"].append(
            "Consult a healthcare professional for proper diagnosis and treatment"
        )
        
        if confidence > 70:
            recommendations["immediate_actions"].append(
                "Schedule an appointment with your doctor as soon as possible"
            )
        
        recommendations["lifestyle_changes"].extend([
            "Stay hydrated",
            "Get adequate rest",
            "Monitor your symptoms"
        ])
        
        return recommendations


# Utility function to quickly test the predictor
def test_predictor():
    """Test function for the symptom predictor"""
    predictor = SymptomPredictor()
    
    test_symptoms = ["fever", "cough", "fatigue"]
    print(f"Testing with symptoms: {test_symptoms}")
    
    predictions = predictor.predict(test_symptoms, top_k=3)
    
    print("\nPredictions:")
    for i, pred in enumerate(predictions, 1):
        print(f"{i}. {pred['disease']}: {pred['confidence']:.2f}% confidence")
    
    recommendations = predictor.get_recommendations(predictions)
    print("\nRecommendations:")
    for category, items in recommendations.items():
        print(f"\n{category.replace('_', ' ').title()}:")
        for item in items:
            print(f"  - {item}")


if __name__ == "__main__":
    test_predictor()
