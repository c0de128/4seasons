# Videos Directory

This directory is for storing video assets used in your application.

## How to Use Videos

### 1. Add your video files to this directory
- Upload MP4 files for best browser compatibility
- Recommended formats: MP4 (H.264), WebM, OGG
- Keep file sizes optimized for web delivery

### 2. Import and use in your components
```typescript
import heroVideo from "@/assets/videos/hero.mp4";

// Then use in your JSX
<video src={heroVideo} autoPlay muted loop />
```

## Current Video Files
- `hero.mp4` - Main hero section background video

## Video Implementation Best Practices

### Attributes Used for Hero Video:
- `autoPlay` - Starts playing automatically (only works when muted)
- `muted` - Required for autoplay to work in most browsers
- `loop` - Video repeats continuously
- `playsInline` - Prevents fullscreen on mobile devices
- `preload="metadata"` - Only loads video metadata initially for better performance

### Performance Considerations:
- Videos should be compressed and optimized for web
- Consider providing multiple formats for better browser support
- Use appropriate preload settings based on video importance
- Add dark overlays for better text readability over video backgrounds

### Accessibility:
- Always provide fallback text for browsers that don't support video
- Consider offering video controls for users who prefer them
- Ensure text contrast is sufficient over video backgrounds

## File Size Guidelines
- Hero videos: Aim for under 10MB
- Background videos: Keep under 5MB when possible
- Consider using video compression tools or services