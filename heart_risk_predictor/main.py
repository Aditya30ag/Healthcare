import tensorflow as tf
from tensorflow.keras import models, layers
import numpy as np
from PIL import Image
import cv2
import os
import warnings
import logging
from datetime import datetime

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)

class ECGAnalyzer:
    """
    A class for analyzing ECG images using a CNN model.
    
    Attributes:
        class_names (list): List of possible ECG classifications
        target_size (tuple): Required input image dimensions
        model: TensorFlow model for ECG analysis
    """
    
    def __init__(self, model_path=None):
        """
        Initialize the ECG Analyzer.
        
        Args:
            model_path (str, optional): Path to a pre-trained model
        """
        warnings.filterwarnings('ignore')  # Suppress warnings
        
        self.class_names = ['Normal', 'Abnormal-Rhythm', 'MI', 'ST-Changes']
        self.target_size = (224, 224)
        self.model = self._create_model() if model_path is None else self.load_model(model_path)
        logging.info("ECG Analyzer initialized successfully")
        
    def _create_model(self):
        """
        Create a CNN model for ECG image classification.
        
        Returns:
            tensorflow.keras.Model: Compiled CNN model
        """
        model = models.Sequential([
            # Input layer
            layers.Conv2D(32, (3, 3), activation='relu', input_shape=(224, 224, 3)),
            layers.BatchNormalization(),
            layers.MaxPooling2D((2, 2)),
            
            # First convolutional block
            layers.Conv2D(64, (3, 3), activation='relu'),
            layers.BatchNormalization(),
            layers.MaxPooling2D((2, 2)),
            
            # Second convolutional block
            layers.Conv2D(128, (3, 3), activation='relu'),
            layers.BatchNormalization(),
            layers.MaxPooling2D((2, 2)),
            
            # Third convolutional block
            layers.Conv2D(256, (3, 3), activation='relu'),
            layers.BatchNormalization(),
            layers.MaxPooling2D((2, 2)),
            
            # Flatten and dense layers
            layers.Flatten(),
            layers.Dense(512, activation='relu'),
            layers.BatchNormalization(),
            layers.Dropout(0.5),
            layers.Dense(256, activation='relu'),
            layers.BatchNormalization(),
            layers.Dropout(0.3),
            layers.Dense(len(self.class_names), activation='softmax')
        ])
        
        # Compile model with improved settings
        model.compile(
            optimizer=tf.keras.optimizers.Adam(learning_rate=0.001),
            loss='categorical_crossentropy',
            metrics=['accuracy', tf.keras.metrics.AUC()]
        )
        
        return model

    def predict(self, image_path):
        """
        Predict ECG classification from image.
        
        Args:
            image_path (str): Path to the ECG image file
            
        Returns:
            dict: Prediction results including class, confidence, and analysis
        """
        try:
            # Validate image path
            if not os.path.exists(image_path):
                logging.error(f"Image not found: {image_path}")
                return {
                    'status': 'error',
                    'error_message': 'Image file not found'
                }
            
            # Preprocess image
            try:
                processed_image = self.preprocess_image(image_path)
                logging.info("Image preprocessed successfully")
            except Exception as e:
                logging.error(f"Image preprocessing failed: {str(e)}")
                return {
                    'status': 'error',
                    'error_message': f'Image preprocessing failed: {str(e)}'
                }
            
            # Make prediction
            try:
                predictions = self.model.predict(processed_image, verbose=0)
                predicted_class = self.class_names[np.argmax(predictions[0])]
                confidence = float(np.max(predictions[0]))
                
                analysis = self._generate_analysis(predictions[0])
                
                logging.info(f"Prediction completed: {predicted_class} with {confidence:.2f} confidence")
                
                return {
                    'status': 'success',
                    'prediction': predicted_class,
                    'confidence': confidence,
                    'detailed_analysis': analysis,
                    'timestamp': datetime.now().isoformat()
                }
            except Exception as e:
                logging.error(f"Prediction failed: {str(e)}")
                return {
                    'status': 'error',
                    'error_message': f'Prediction failed: {str(e)}'
                }
                
        except Exception as e:
            logging.error(f"General error in predict(): {str(e)}")
            return {
                'status': 'error',
                'error_message': str(e)
            }

    def preprocess_image(self, image_path):
        """
        Preprocess the ECG image for model input.
        
        Args:
            image_path (str): Path to the image file
            
        Returns:
            numpy.ndarray: Preprocessed image array
        """
        # Read image
        img = cv2.imread(image_path)
        if img is None:
            raise ValueError("Failed to load image")
            
        # Convert to RGB and resize
        img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
        img = cv2.resize(img, self.target_size)
        
        # Enhanced preprocessing pipeline
        # Convert to grayscale
        gray = cv2.cvtColor(img, cv2.COLOR_RGB2GRAY)
        
        # Apply adaptive histogram equalization
        clahe = cv2.createCLAHE(clipLimit=2.0, tileGridSize=(8,8))
        enhanced = clahe.apply(gray)
        
        # Apply Gaussian blur to reduce noise
        blurred = cv2.GaussianBlur(enhanced, (3,3), 0)
        
        # Apply threshold to separate signal from background
        _, binary = cv2.threshold(blurred, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)
        
        # Convert back to RGB
        img = cv2.cvtColor(binary, cv2.COLOR_GRAY2RGB)
        
        # Normalize
        img = img.astype('float32') / 255.0
        
        return np.expand_dims(img, axis=0)

    def _generate_analysis(self, predictions):
        """
        Generate detailed analysis from predictions.
        
        Args:
            predictions (numpy.ndarray): Model predictions
            
        Returns:
            list: Detailed analysis for each class
        """
        analysis = []
        for class_name, prob in zip(self.class_names, predictions):
            confidence_level = 'High' if prob > 0.7 else 'Medium' if prob > 0.4 else 'Low'
            analysis.append({
                'condition': class_name,
                'probability': float(prob),
                'confidence_level': confidence_level,
                'recommendation': self._get_recommendation(class_name, prob)
            })
        return analysis
    
    def _get_recommendation(self, class_name, probability):
        """
        Generate recommendations based on the prediction.
        
        Args:
            class_name (str): Predicted class
            probability (float): Prediction probability
            
        Returns:
            str: Recommendation message
        """
        if probability < 0.4:
            return "Insufficient confidence for reliable recommendation"
            
        recommendations = {
            'Normal': "Regular monitoring recommended",
            'Abnormal-Rhythm': "Further cardiac rhythm assessment advised",
            'MI': "Immediate medical attention recommended",
            'ST-Changes': "Cardiac evaluation recommended"
        }
        
        return recommendations.get(class_name, "Consult with healthcare provider")
    
    def save_model(self, path):
        """
        Save the model to disk.
        
        Args:
            path (str): Path to save the model
        """
        self.model.save(path)
        logging.info(f"Model saved to {path}")
        
    def load_model(self, path):
        """
        Load a pre-trained model.
        
        Args:
            path (str): Path to the model file
            
        Returns:
            tensorflow.keras.Model: Loaded model
        """
        logging.info(f"Loading model from {path}")
        return tf.keras.models.load_model(path)

def analyze_ecg_image(image_path, model_path=None):
    """
    Analyze an ECG image and return predictions.
    
    Args:
        image_path (str): Path to the ECG image
        model_path (str, optional): Path to a pre-trained model
        
    Returns:
        dict: Analysis results
    """
    try:
        analyzer = ECGAnalyzer(model_path)
        result = analyzer.predict(image_path)
        return result
    except Exception as e:
        logging.error(f"Error in analyze_ecg_image: {str(e)}")
        return {
            'status': 'error',
            'error_message': f'Analysis failed: {str(e)}'
        }

def results(image_path):
    try:
        # Configure logging for the main execution
        logging.basicConfig(
            filename='ecg_analyzer.log',
            level=logging.INFO,
            format='%(asctime)s - %(levelname)s - %(message)s'
        )
        
        
        # Optional: path to pre-trained model
        model_path = None  # 'path_to_your_model.h5'
        
        # Analyze ECG
        result = analyze_ecg_image(image_path, model_path)
        
        # Print results
        if result['status'] == 'success':
            print(result)
            return result
            # print("\nECG Analysis Results:")
            # print(f"Prediction: {result['prediction']}")
            # print(f"Confidence: {result['confidence']:.2f}")
            # print("\nDetailed Analysis:")
            
            # for analysis in result['detailed_analysis']:
            #     print(f"\n{analysis['condition']}:")
            #     print(f"  Probability: {analysis['probability']:.2f}")
            #     print(f"  Confidence Level: {analysis['confidence_level']}")
            #     print(f"  Recommendation: {analysis['recommendation']}")
        else:
            return f"Error: {result['error_message']}"
                
    except Exception as e:
        logging.error(f"Main execution error: {str(e)}")
        print(f"An error occurred: {str(e)}")