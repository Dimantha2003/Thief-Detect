import sys
import os
import json
import warnings
import logging

# Shut up TensorFlow so it doesn't break our JSON output
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3'
logging.getLogger('tensorflow').setLevel(logging.FATAL)
warnings.filterwarnings("ignore")

from deepface import DeepFace

def check_face(unknown_image_path):
    # Point exactly to your known_faces folder
    base_dir = os.path.dirname(os.path.abspath(__file__))
    known_faces_dir = os.path.join(base_dir, '..', 'backend', 'known_faces')
    
    if not os.path.exists(known_faces_dir):
        return {"error": f"Directory not found: {known_faces_dir}"}

    try:
        # THE MAGIC: DeepFace scans the whole folder looking for a match
        results = DeepFace.find(
            img_path=unknown_image_path, 
            db_path=known_faces_dir, 
            enforce_detection=False, # Don't crash if the webcam crop is slightly blurry
            silent=True # Keep the terminal output clean
        )
        
        # If the result isn't empty, WE GOT A MATCH
        if len(results) > 0 and not results[0].empty:
            # Grab the file path of the matched image
            matched_file_path = results[0].iloc[0]['identity']
            
            # Extract just the name (e.g., gets "Dimantha" from "Dimantha.jpg")
            filename = os.path.basename(matched_file_path)
            criminal_name = os.path.splitext(filename)[0]
            
            return {"match": True, "name": criminal_name}
            
        return {"match": False, "message": "No match found in database."}

    except Exception as e:
        return {"error": str(e)}

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print(json.dumps({"error": "No image path provided."}))
        sys.exit(1)
        
    result = check_face(sys.argv[1])
    print(json.dumps(result))