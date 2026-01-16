#!/usr/bin/env python3
"""
HRA Organ Fetcher - Fetches organ models from Human Reference Atlas API
Usage: python fetch_organs.py
"""

import requests
import json
import os
from pathlib import Path

# HRA API Endpoint
HRA_API_URL = "https://apps.humanatlas.io/hra-api/v1/reference-organs"
OUTPUT_DIR = "../3d human anatomy"  # Sibling directory with existing models

def get_available_organs():
    """Fetch list of available organs from HRA API"""
    try:
        print("📡 Fetching available organs from HRA API...")
        response = requests.get(HRA_API_URL, timeout=10)
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        print(f"❌ Error fetching from HRA API: {e}")
        return None

def fetch_organ(organ_label):
    """Fetch a specific organ by label"""
    try:
        data = get_available_organs()
        if not data:
            return None
        
        for item in data:
            if organ_label.lower() in item.get('label', '').lower():
                glb_url = item.get('object', {}).get('file')
                if not glb_url:
                    print(f"⚠️  No GLB file found for {item['label']}")
                    return None
                
                print(f"✅ Found: {item['label']}")
                print(f"📥 Downloading from: {glb_url}")
                
                response = requests.get(glb_url, timeout=30)
                response.raise_for_status()
                
                # Create output directory if it doesn't exist
                os.makedirs(OUTPUT_DIR, exist_ok=True)
                
                filename = f"{organ_label.replace(' ', '_').replace('-', '_')}.glb"
                filepath = os.path.join(OUTPUT_DIR, filename)
                
                with open(filepath, 'wb') as f:
                    f.write(response.content)
                
                file_size = os.path.getsize(filepath) / (1024 * 1024)  # Convert to MB
                print(f"✅ Success! Saved as '{filepath}' ({file_size:.2f} MB)")
                return filepath
        
        print(f"❌ Organ '{organ_label}' not found in HRA API")
        return None
        
    except Exception as e:
        print(f"❌ Error: {e}")
        return None

def list_available_organs():
    """List all available organs from HRA API"""
    data = get_available_organs()
    if not data:
        return
    
    print("\n📋 Available Organs from HRA API:\n")
    for idx, item in enumerate(data, 1):
        label = item.get('label', 'Unknown')
        rui_code = item.get('rui_code', 'N/A')
        print(f"{idx:2d}. {label:40s} (RUI: {rui_code})")
    
    print(f"\n✅ Total: {len(data)} organs available")

def main():
    print("\n" + "="*60)
    print("🧬 HRA Organ Model Fetcher")
    print("="*60 + "\n")
    
    while True:
        print("\nOptions:")
        print("1. List all available organs")
        print("2. Fetch specific organ(s)")
        print("3. Exit")
        
        choice = input("\nSelect option (1-3): ").strip()
        
        if choice == '1':
            list_available_organs()
        
        elif choice == '2':
            organs = input("\nEnter organ name(s) to fetch (comma-separated): ").strip()
            for organ in organs.split(','):
                organ = organ.strip()
                if organ:
                    fetch_organ(organ)
                    print()
        
        elif choice == '3':
            print("\n👋 Goodbye!")
            break
        
        else:
            print("❌ Invalid option. Please try again.")

if __name__ == "__main__":
    main()
