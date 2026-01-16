# 🧬 QUICK START REFERENCE

## ⚡ 60-Second Setup

```bash
# 1. Navigate to project
cd "/home/anubhavanand/Documents/3d human anatomy/anatomy-viewer"

# 2. Start server
npm run dev

# 3. Open browser
# Go to: http://localhost:5173
```

## 🎮 Controls

| Action | Control |
|--------|---------|
| Rotate | Drag mouse |
| Zoom | Scroll wheel |
| Pan | Right-click + drag |
| Select Organ | Click on it |
| Deselect | Click Close button |

## 📖 Read These Files

| File | Purpose |
|------|---------|
| `MASTER_README.md` | **Everything** - Your instructions + implementation |
| `IMPLEMENTATION_COMPLETE.md` | Summary of what was built |
| `COMPLETE_BODY_README.md` | Features & how to use |

## 🧬 Available Organs (34 Total)

**Head:**
Brain, Eyes (L&R), Mouth, Larynx, Thymus, Palatine Tonsils (L&R)

**Chest:**
Heart, Lungs (L&R), Blood Vasculature, Main Bronchus, Trachea

**Abdomen:**
Liver, Pancreas, Small Intestine, Large Intestine, Spleen, Adipose Tissue

**Pelvis:**
Pelvis, Prostate, Urinary Bladder, Ureters (L&R), Renal Pelvis (L&R)

**Other:**
Kidneys (L&R), Knee (L&R), Intervertebral Disk, Spinal Cord, Skin, Lymph Node

## 🔧 Customize

### Change Camera Zoom
Edit `src/App.jsx` line 14:
```javascript
camera={{ position: [0, 0, 8], fov: 50 }}
                              ↑
                    Lower = closer view
```

### Adjust Lighting
Edit `src/App.jsx` line 24:
```javascript
<Stage environment="city" intensity={0.6} ...>
                                   ↑
                    Higher = brighter
```

### Modify Effects
Edit `src/App.jsx` lines 35-36:
```javascript
<Bloom intensity={0.5} />
<Vignette darkness={0.8} />
```

## ❌ Troubleshooting

**Blank screen?** → F12 → Check console  
**No models?** → Ctrl+R → Refresh page  
**Slow?** → Close other tabs  
**Port in use?** → `lsof -ti:5173 | xargs kill -9`  

## 📱 Mobile Access

```bash
# Get your IP
hostname -I

# Visit on phone (same Wi-Fi):
http://YOUR_IP:5173
```

## 📁 Key Files

```
src/
├── App.jsx          ← Main app
├── CompleteBody.jsx ← All 34 organs
├── models/          ← React components
│   └── Heart.jsx (and 33 more)
└── index.css        ← Styling

public/
└── *.glb files      ← 3D model assets
```

## 🚀 Server Commands

```bash
# Start development
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## ✅ Everything Complete

Your project has:
- ✅ 34 organ models
- ✅ All converted to React
- ✅ Professional rendering
- ✅ Click detection
- ✅ Beautiful UI
- ✅ Full documentation

**Start here:** http://localhost:5173

---

For complete details, read: **MASTER_README.md**
