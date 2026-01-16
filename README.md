# 🧬 Interactive Human Anatomy Viewer

A high-quality, interactive 3D human anatomy visualization built with React, Three.js, and @react-three/fiber.

## Features

✨ **Interactive 3D Models** - Rotate, zoom, and pan organ models  
🎯 **Click to Select** - Click on organs to see their names  
💫 **Professional Rendering** - Bloom effects, vignette, and stage lighting  
📱 **Mobile Ready** - Works on desktop and mobile devices  
🧬 **Scientific Data** - Models from Human Reference Atlas (HRA)

## Project Structure

```
anatomy-viewer/
├── src/
│   ├── App.jsx          # Main application component
│   ├── Model.jsx        # 3D model component
│   ├── main.jsx         # React entry point
│   └── index.css        # Styles
├── fetch_organs.py      # Script to download organs from HRA API
├── index.html           # HTML entry point
├── package.json         # Dependencies
└── vite.config.js       # Vite configuration
```

## Installation

```bash
cd anatomy-viewer
npm install
```

## Usage

### Start Development Server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Fetch Additional Organ Models

The project comes with 25 organ models. To fetch more organs from the Human Reference Atlas (HRA) API:

```bash
python fetch_organs.py
```

Options:
1. **List all available organs** - See what's available from HRA
2. **Fetch specific organ(s)** - Download specific organ models
3. **Exit** - Close the script

**Example:**
```
Enter organ name(s) to fetch (comma-separated): Stomach, Spleen, Thyroid
```

### Build for Production

```bash
npm run build
npm run preview
```

## Controls

- **🖱️ Drag** - Rotate the model
- **🔍 Scroll** - Zoom in/out
- **👆 Click** - Select an organ to highlight it

## Available Models

### Currently Included (25 organs):
- Heart, Lungs (both)
- Brain, Eyes (both)
- Liver, Pancreas, Kidneys (both)
- Lymph Node, Large Intestine
- Pelvis, Larynx, Prostate
- Mouth, Palatine Tonsils (both)
- Renal Pelvis (both)
- Adipose, Blood Vasculature
- Intervertebral Disk, Knee (both)

### Frequently Fetched from HRA API:
- Stomach
- Spleen
- Thyroid
- Small Intestine
- Esophagus
- Bladder
- Trachea
- And many more...

## Technologies Used

- **React** - UI framework
- **Three.js** - 3D graphics
- **@react-three/fiber** - React renderer for Three.js
- **@react-three/drei** - Useful helpers & components
- **@react-three/postprocessing** - Visual effects (bloom, vignette)
- **Vite** - Fast build tool

## API Sources

Models are downloaded from:
- **Human Reference Atlas (HRA)** - https://humanatlas.io/
  - API: `https://apps.humanatlas.io/hra-api/v1/reference-organs`
  - Provides scientifically accurate organ models

## Performance Tips

1. **Limit visible organs** - Too many organs in the scene can slow performance
2. **Use mobile data cautiously** - Large GLB files (5-50 MB) consume bandwidth
3. **Close browser tabs** - Free up GPU memory on your device

## Troubleshooting

### Models don't load
- Check that `.glb` files are in the `../3d human anatomy/` directory
- Verify file paths in `Model.jsx`

### Fetch script fails
- Ensure `requests` library is installed: `pip install requests`
- Check internet connection
- Try a different organ name

### Performance issues
- Reduce post-processing effects in `App.jsx`
- Close other applications
- Use a device with better GPU

## License

Models from Human Reference Atlas are provided under their respective licenses.
Code is provided as-is for educational and research purposes.

## Future Enhancements

- [ ] Switch between different organ models
- [ ] Organ comparison tool
- [ ] Anatomical measurements & annotations
- [ ] Save & share specific organ views
- [ ] VR support
- [ ] Full body assembly view
