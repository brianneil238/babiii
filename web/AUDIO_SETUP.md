# Audio Setup Instructions

To add your birthday song to this project:

## Step 1: Prepare Your Audio File
- Convert your song to MP3 format (recommended) or OGG format
- Keep the file size reasonable (under 10MB for better loading)
- Name it `birthday-song.mp3` (or `birthday-song.ogg`)

## Step 2: Add the Audio File
1. Place your audio file in the `web/public/` folder
2. The file should be named exactly: `birthday-song.mp3`

## Step 3: How It Works
- The song will automatically start playing when the countdown reaches 1
- It will start 500ms before the "HAPPY" text appears
- The song will loop continuously throughout the experience
- A volume control button (🔊/🔇) will appear in the top-right corner
- Initial volume is set to 70% for comfortable listening

## Supported Formats
- **MP3** (recommended): `birthday-song.mp3`
- **OGG**: `birthday-song.ogg`

## 🔧 Troubleshooting - Song Not Playing?

### Quick Fixes:
1. **Check the console** - Open browser dev tools (F12) and look for error messages
2. **Use the manual button** - A "🎵 Start Song" button will appear if auto-play fails
3. **Test the audio file** - Open `audio-test.html` in your browser to debug

### Common Issues & Solutions:

#### 1. Browser Autoplay Policy
**Problem**: Modern browsers block autoplay without user interaction
**Solution**: 
- Click the "🎵 Start Song" button that appears
- Or interact with the page first (click, scroll, etc.)

#### 2. Audio File Not Found
**Problem**: File path is incorrect or file is corrupted
**Solution**:
- Verify file is in `web/public/birthday-song.mp3`
- Check file size (should be visible in file explorer)
- Try playing the file in other media players

#### 3. Audio Format Not Supported
**Problem**: Browser can't play the audio format
**Solution**:
- Convert to MP3 format (most compatible)
- Use online converters like: convertio.co, online-audio-converter.com

#### 4. File Too Large
**Problem**: Audio file is too big and takes too long to load
**Solution**:
- Compress the audio (aim for under 5MB)
- Use lower bitrate (128kbps is usually sufficient)

### Debug Steps:

1. **Open the test page**: Navigate to `audio-test.html` in your browser
2. **Check file accessibility**: Click "Check File" button
3. **Test audio playback**: Click "Test Play" button
4. **Check browser console**: Look for error messages (F12 → Console)

### Console Messages to Look For:
- ✅ "Audio started successfully!" = Working
- ❌ "Audio autoplay failed" = Browser policy issue
- ❌ "Audio error occurred" = File or format problem
- ❌ "File not accessible" = Path or server issue

### Manual Override:
If autoplay fails, the app now includes:
- A manual "🎵 Start Song" button
- Better error handling and logging
- Fallback to continue without audio

## File Structure
```
web/
├── public/
│   ├── birthday-song.mp3  ← Place your song here
│   ├── audio-test.html    ← Test page for debugging
│   └── vite.svg
└── src/
    └── App.tsx
```

## Still Having Issues?
1. Check the browser console for specific error messages
2. Use the `audio-test.html` page to isolate the problem
3. Verify your audio file plays in other applications
4. Try a different browser to rule out browser-specific issues

The audio will automatically integrate with the birthday experience once working!
