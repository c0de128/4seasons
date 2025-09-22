# Images Directory

This directory is for storing images, logos, and other assets used in your application.

## How to Use Images

### 1. Add your images to this directory
- Upload logo files here (e.g., logo.png, logo.svg)
- Upload other images like icons, backgrounds, etc.

### 2. Import and use in your components
```typescript
import logoPath from "@/assets/images/logo.png";
import backgroundPath from "@/assets/images/background.jpg";

// Then use in your JSX
<img src={logoPath} alt="Company Logo" />
<div style={{ backgroundImage: `url(${backgroundPath})` }}>
```

### 3. For SVG files (recommended for logos)
```typescript
// You can import SVGs directly as React components
import { ReactComponent as Logo } from "@/assets/images/logo.svg";

// Then use as a component
<Logo className="w-8 h-8" />
```

## File Structure
```
client/src/assets/images/
├── logo.png          # Main logo
├── logo-dark.png     # Dark mode logo
├── favicon.ico       # Browser favicon
├── hero-bg.jpg       # Hero section background
└── icons/            # Icon files
    ├── feature1.svg
    └── feature2.svg
```

## Best Practices
- Use SVG for logos and icons (scalable, small file size)
- Use WebP or PNG for photos
- Keep file sizes optimized
- Use descriptive file names
- Consider dark/light mode versions