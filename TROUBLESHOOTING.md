# Troubleshooting White Page Issue

If you're seeing a white/blank page, follow these steps:

## Step 1: Check Browser Console
1. Open your browser's Developer Tools (F12)
2. Go to the **Console** tab
3. Look for any red error messages
4. Share the error message if you see one

## Step 2: Check Network Tab
1. In Developer Tools, go to the **Network** tab
2. Refresh the page
3. Look for any files that failed to load (red status)
4. Check if `main.jsx` and CSS files are loading

## Step 3: Verify Dependencies
```bash
npm install
```

## Step 4: Clear Cache and Restart
```bash
# Stop the dev server (Ctrl+C)
# Clear node_modules and reinstall
rm -rf node_modules
npm install
npm run dev
```

## Step 5: Check if React is Rendering
Open browser console and type:
```javascript
document.getElementById('root')
```
If it returns `null`, there's an HTML issue. If it returns an element, React should be rendering.

## Step 6: Common Issues

### Issue: WebGL/Three.js Error
**Solution**: The 3D animations require WebGL. If your browser doesn't support it, the Canvas component might fail. Try:
- Update your graphics drivers
- Use a modern browser (Chrome, Firefox, Edge)
- Disable hardware acceleration if causing issues

### Issue: Logo Not Found
**Solution**: Make sure `logo.png` exists in the `public` folder. The app should still work without it, but you might see a broken image.

### Issue: Port Already in Use
**Solution**: 
```bash
# Kill process on port 3000
npx kill-port 3000
# Or change port in vite.config.js
```

## Step 7: Test with Minimal App
If nothing works, try temporarily replacing `src/App.jsx` with:
```jsx
function App() {
  return <div style={{padding: '50px', color: 'white', background: '#0a0a0f'}}>
    <h1>App is Working!</h1>
    <p>If you see this, React is rendering correctly.</p>
  </div>
}
```

If this works, the issue is in one of the components. Add them back one by one to find the problem.

## Still Not Working?
1. Check the terminal for build errors
2. Verify Node.js version (should be 16+)
3. Try a different browser
4. Check if antivirus/firewall is blocking localhost



