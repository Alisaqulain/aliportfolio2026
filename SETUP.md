# Quick Setup Guide

## 🚀 Getting Started

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Add Your Logo**
   - Place your `logo.png` file in the `public` folder
   - The logo should be a PNG file (preferably 512x512px or larger)
   - It will be used as favicon, header logo, and background watermark

3. **Start Development Server**
   ```bash
   npm run dev
   ```
   The site will open at `http://localhost:3000`

## 📝 Customization Checklist

### Update Personal Information
- [ ] Edit `src/components/Contact.jsx` - Update social links and contact details
- [ ] Edit `src/components/About.jsx` - Update education and profile information
- [ ] Edit `src/components/Experience.jsx` - Update work experience

### Update Projects
- [ ] Edit `src/components/Projects.jsx` - Update project details, links, and technologies
- [ ] Replace placeholder GitHub and demo URLs with actual links

### Update Colors (Optional)
- [ ] Edit CSS variables in `src/index.css` to match your brand colors

### Update Meta Tags
- [ ] Edit `index.html` - Update title and meta description

## 🎨 Features Included

✅ 5D animations with Three.js  
✅ Dark/Light mode toggle  
✅ Fully responsive design  
✅ Smooth scroll animations  
✅ Interactive 3D project cards  
✅ Animated timeline  
✅ Contact form  
✅ Social media links  
✅ WhatsApp floating button  
✅ Logo watermark on all sections  

## 📦 Build for Production

```bash
npm run build
```

The production build will be in the `dist` folder.

## 🐛 Troubleshooting

- **Logo not showing?** Make sure `logo.png` is in the `public` folder
- **3D animations not working?** Ensure all dependencies are installed: `npm install`
- **Styles not loading?** Clear browser cache and restart dev server

## 📞 Need Help?

Check the main README.md for more detailed information.

