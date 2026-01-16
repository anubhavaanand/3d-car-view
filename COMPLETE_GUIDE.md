# 🧬 Interactive Human Anatomy Viewer - Complete Guide

## ✅ Project Status: READY TO USE

Your interactive 3D anatomy viewer is now **fully functional** with all 34 organ models converted and ready to explore.

---

## 🚀 Quick Start

### Start the Development Server
```bash
cd "/home/anubhavanand/Documents/3d human anatomy/anatomy-viewer"
npm run dev
```

### View in Browser
Open: **http://localhost:5173**

---

## 📋 What's Implemented

### ✨ Features Complete

✅ **34 Organ Models** - All converted to interactive React components  
✅ **Model Switcher** - Dropdown to switch between organs instantly  
✅ **Click Detection** - Click individual parts of organs to highlight & display names  
✅ **Professional Rendering** - Bloom effects, vignette, cinematic lighting  
✅ **Smooth Controls** - Drag to rotate, scroll to zoom, pan support  
✅ **Responsive UI** - Works on desktop and mobile  
✅ **Anatomically Accurate** - Models from Human Reference Atlas (HRA)

---

## 🎮 How to Use

### 1. Select an Organ
- Use the dropdown in the **top right** to choose any of 34 organs
- The model updates instantly

### 2. Explore the Model
- **Drag** your mouse to rotate
- **Scroll** to zoom in/out
- **Right-click + drag** to pan

### 3. Click Components
- Hover over parts to see cursor change
- **Click** any component to highlight it
- The component name appears at the bottom
- **Close** button to deselect

### 4. Available Organs

**Cardiovascular & Respiratory:**
- Heart, Lungs, Blood Vasculature, Trachea, Main Bronchus

**Digestive System:**
- Liver, Pancreas, Mouth, Large Intestine, Small Intestine

**Urinary System:**
- Kidneys (L&R), Urinary Bladder, Ureters (L&R), Renal Pelvis (L&R)

**Endocrine:**
- Thymus, Spleen

**Sensory:**
- Eyes (L&R), Larynx

**Skeletal & Muscular:**
- Pelvis, Knee (L&R), Intervertebral Disk, Spinal Cord, Skin

**Other:**
- Brain, Prostate, Palatine Tonsils (L&R), Lymph Node, Adipose Tissue

---

## 📁 Project Structure

```
anatomy-viewer/
├── src/
│   ├── models/                    # 34 converted organ components
│   │   ├── Heart.jsx
│   │   ├── Brain.jsx
│   │   ├── ... (32 more)
│   │   └── index.js              # Models registry
│   ├── App.jsx                    # Main app with switcher
│   ├── InteractiveWrapper.jsx     # Click detection & highlighting
│   ├── main.jsx                   # React entry point
│   └── index.css                  # Styles
├── package.json                   # Dependencies
├── vite.config.js                 # Vite config
├── convert_all.sh                 # Conversion script (already run)
├── fetch_organs.py                # API fetcher for more organs
└── README.md                       # Quick reference

../3d human anatomy/               # Original GLB files (33 models)
```

---

## 🔧 Technical Details

### Tech Stack
- **React 18.2** - UI framework
- **Three.js 0.160** - 3D graphics
- **@react-three/fiber 6.0.13** - React-Three.js integration
- **@react-three/drei 9.108** - Helpful components
- **@react-three/postprocessing 2.16** - Visual effects
- **Vite 4.5** - Build tool

### How It Works

1. **GLB → React** - `gltfjsx` converts 3D models to React components
2. **InteractiveWrapper** - Adds click detection and highlighting
3. **Models Registry** - All 34 components listed in `src/models/index.js`
4. **App Switcher** - Select organ → load component → render in 3D scene

---

## 📱 Mobile Testing

### On Your Phone
1. Find your laptop's IP:
   ```bash
   hostname -I
   ```

2. On phone, visit: `http://YOUR_IP:5173`

3. Works with touch:
   - **Pinch** to zoom
   - **Two-finger drag** to pan
   - **One finger** to rotate

---

## 🎨 Customization Guide

### Change Default Organ
Edit `src/App.jsx` line 10:
```javascript
const [selectedOrgan, setSelectedOrgan] = useState('heart') // Change to any organ ID
```

Organ IDs: `brain`, `liver`, `kidney-left`, `spleen`, etc.

### Adjust Lighting
Edit `src/App.jsx` line 30:
```javascript
<Stage environment="city" intensity={0.6} adjustCamera={false}>
```
Change `0.6` to higher (1.0) for brighter, lower (0.3) for darker.

### Tweak Effects
Edit `src/App.jsx` lines 40-42:
```javascript
<Bloom luminanceThreshold={0.8} intensity={0.5} />  // Glow strength
<Vignette darkness={0.8} />                        // Edge darkness
```

### Change Camera Position
Edit `src/App.jsx` line 17:
```javascript
camera={{ position: [0, 0, 5], fov: 50 }}
```
`position`: [x, y, z] position of camera
`fov`: field of view (lower = zoomed in)

---

## 🧬 Fetch More Organs

If you want to download additional organs from HRA API:

```bash
cd "/home/anubhavanand/Documents/3d human anatomy/anatomy-viewer"
python fetch_organs.py
```

Options:
1. **List available** - See all 200+ organs
2. **Fetch organs** - Download specific ones
3. **Exit**

Then run the conversion script:
```bash
bash convert_all.sh
```

---

## 🐛 Troubleshooting

### Models don't load
**Problem:** Blank screen or models missing
**Solution:**
1. Check console (F12 → Console tab)
2. Verify `src/models/Heart.jsx` exists
3. Restart: `npm run dev`

### Server won't start
**Problem:** Port 5173 already in use
**Solution:**
```bash
# Kill existing process
lsof -ti:5173 | xargs kill -9

# Then restart
npm run dev
```

### Dropdown not working
**Problem:** Can't switch organs
**Solution:**
- Clear browser cache: Ctrl+Shift+Delete
- Restart server: Ctrl+C, then `npm run dev`
- Check browser console for errors

### Performance issues
**Problem:** Slow / laggy
**Solution:**
- Reduce effect intensity in `App.jsx`
- Close other browser tabs
- Use Firefox/Chrome (not Safari on mobile)

---

## 📊 Performance Tips

1. **Limit orbit complexity** - Keep auto-rotate off
2. **Close UI** when rotating for smooth performance
3. **Use smaller models** for mobile
4. **Reduce Bloom intensity** if lagging

---

## 🎓 Learning Resources

### Three.js Docs
- Official: https://threejs.org/docs/
- React Three Fiber: https://docs.pmnd.rs/react-three-fiber/

### Anatomical Data
- Human Reference Atlas: https://humanatlas.io/
- Models sourced from scientific datasets

---

## 🚀 Future Enhancements

- [ ] Full body assembly (all organs together)
- [ ] Anatomical measurements & labels
- [ ] Organ comparisons (side-by-side)
- [ ] VR/AR mode support
- [ ] Save & share organ views
- [ ] Annotation tools
- [ ] Educational quiz mode

---

## ✅ Checklist Before Demo

- [ ] Server running: `npm run dev`
- [ ] Browser shows models
- [ ] Can switch organs via dropdown
- [ ] Click detection works
- [ ] Rotation/zoom smooth
- [ ] Mobile test passed (optional)

---

## 📞 Support

For issues:
1. Check troubleshooting section above
2. Check browser console (F12)
3. Restart dev server
4. Clear node_modules and reinstall: `npm install`

---

**You're all set! Enjoy exploring the human body in 3D! 🧬✨**
