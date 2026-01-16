#!/bin/bash

# Convert all GLB files to React components
cd "/home/anubhavanand/Documents/3d human anatomy/anatomy-viewer"

MODELS_DIR="/home/anubhavanand/Documents/3d human anatomy"

# Create models output directory
mkdir -p src/models

# Array of all organ files and their component names
declare -a organs=(
    "3d-vh-m-heart.glb:Heart"
    "3d-vh-m-lung.glb:Lung"
    "3d-allen-m-brain.glb:Brain"
    "3d-vh-m-liver.glb:Liver"
    "3d-vh-m-kidney-l.glb:KidneyLeft"
    "3d-vh-m-kidney-r.glb:KidneyRight"
    "3d-vh-m-pancreas.glb:Pancreas"
    "3d-vh-m-eye-l.glb:EyeLeft"
    "3d-vh-m-eye-r.glb:EyeRight"
    "3d-vh-m-blood-vasculature.glb:BloodVasculature"
    "3d-vh-m-adipose.glb:Adipose"
    "3d-vh-m-pelvis.glb:Pelvis"
    "3d-vh-m-larynx.glb:Larynx"
    "3d-vh-m-prostate.glb:Prostate"
    "3d-vh-m-mouth.glb:Mouth"
    "3d-vh-m-palatine-tonsil-l.glb:PalatineTonsilLeft"
    "3d-vh-m-palatine-tonsil-r.glb:PalatineTonsilRight"
    "3d-vh-m-renal-pelvis-l.glb:RenalPelvisLeft"
    "3d-vh-m-renal-pelvis-r.glb:RenalPelvisRight"
    "3d-nih-m-lymph-node.glb:LymphNode"
    "3d-sbu-m-large-intestine.glb:LargeIntestine"
    "3d-vh-m-intervertebral-disk.glb:IntervertebralDisk"
    "3d-vh-m-knee-l.glb:KneeLeft"
    "3d-vh-m-knee-r.glb:KneeRight"
    "3d-vh-m-main-bronchus.glb:MainBronchus"
    "3d-vh-m-skin.glb:Skin"
    "3d-vh-m-small-intestine.glb:SmallIntestine"
    "3d-vh-m-spinal-cord.glb:SpinalCord"
    "3d-vh-m-spleen.glb:Spleen"
    "3d-vh-m-thymus.glb:Thymus"
    "3d-vh-m-trachea.glb:Trachea"
    "3d-vh-m-ureter-l.glb:UreterLeft"
    "3d-vh-m-ureter-r.glb:UreterRight"
    "3d-vh-m-urinary-bladder.glb:UrinaryBladder"
)

echo "🧬 Converting $((${#organs[@]})) GLB files to React components..."
echo ""

success=0
failed=0

for organ in "${organs[@]}"; do
    IFS=':' read -r glb_file component_name <<< "$organ"
    
    glb_path="$MODELS_DIR/$glb_file"
    output_path="src/models/${component_name}.jsx"
    
    if [ -f "$glb_path" ]; then
        echo "⏳ Converting: $component_name..."
        npx gltfjsx "$glb_path" --output "$output_path" --shadows > /dev/null 2>&1
        
        if [ $? -eq 0 ]; then
            echo "✅ $component_name"
            ((success++))
        else
            echo "❌ Failed: $component_name"
            ((failed++))
        fi
    else
        echo "⚠️  Skipped: $glb_file (not found)"
    fi
done

echo ""
echo "=========================================="
echo "✅ Success: $success"
echo "❌ Failed: $failed"
echo "=========================================="
