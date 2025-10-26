# Mobile Testing Guide

## Quick Test Checklist

### Desktop Browser Testing
Use Chrome/Firefox DevTools to test responsive design:

1. **Open DevTools** (F12 or Cmd+Opt+I)
2. **Toggle Device Toolbar** (Ctrl+Shift+M or Cmd+Shift+M)
3. **Test these device presets:**

#### Small Phone (iPhone SE)
- Dimensions: 375 x 667
- Test: Navigation, sport cards layout, search functionality

#### Standard Phone (iPhone 12 Pro)
- Dimensions: 390 x 844
- Test: All features, charts, tables, video clips

#### Large Phone (iPhone 14 Pro Max)
- Dimensions: 428 x 926
- Test: Layout optimization, content spacing

#### Tablet (iPad)
- Dimensions: 810 x 1080
- Test: Grid layouts, multi-column views

#### Small Tablet (iPad Mini)
- Dimensions: 768 x 1024
- Test: Breakpoint transitions

### Features to Test

#### 1. Dashboard Page
- ✅ Sport cards display properly
- ✅ Cards stack in single column on mobile
- ✅ Icons and text are readable
- ✅ Tap targets are sufficient (44px minimum)
- ✅ Feature box adapts to screen size

#### 2. Sport Pages
- ✅ Header with back button works
- ✅ Back button is full-width on mobile
- ✅ Search bar is easy to use
- ✅ Search button is properly sized
- ✅ Suggestions are tappable

#### 3. Results Display
- ✅ Summary text is readable
- ✅ Charts render properly
- ✅ Charts stack vertically on mobile
- ✅ Tables scroll horizontally
- ✅ View toggle buttons work
- ✅ All view modes display correctly

#### 4. Video Clips
- ✅ Videos display in single column on mobile
- ✅ Embedded videos maintain 16:9 ratio
- ✅ Video cards are tappable
- ✅ YouTube links work properly

#### 5. Interactive Elements
- ✅ All buttons are tappable (minimum 44px)
- ✅ Touch feedback is visible
- ✅ No hover effects on touch devices
- ✅ Forms are easy to fill
- ✅ Scrolling is smooth

### Test Scenarios

#### Scenario 1: Search for Stats
1. Open app on mobile device
2. Select a sport (e.g., Cricket)
3. Enter a search query or use suggestion
4. Verify results display properly
5. Switch between view modes (All, Chart, Table, Videos)
6. Check all content is readable and accessible

#### Scenario 2: Portrait/Landscape
1. Open app in portrait mode
2. Select a sport and search
3. Rotate device to landscape
4. Verify layout adapts properly
5. Check all content remains accessible

#### Scenario 3: Small Screen
1. Test on 375px width (iPhone SE)
2. Navigate through all pages
3. Verify no horizontal scrolling (except tables)
4. Check all text is readable (minimum 13px)
5. Ensure all buttons are tappable

#### Scenario 4: Tablet
1. Test on 768px width (iPad)
2. Verify grid layouts use 2 columns
3. Check spacing is appropriate
4. Ensure content doesn't look stretched

### Performance Testing

#### Load Time
- Initial page load should be < 2 seconds on 3G
- Navigation between pages should be instant

#### Scrolling
- Smooth 60fps scrolling
- No jank or stuttering
- Lazy loading works properly

#### Touch Response
- Tap response < 100ms
- Visual feedback immediate
- No accidental taps

### Browser Compatibility

Test on these mobile browsers:

#### iOS (Safari)
- [ ] iPhone SE (iOS 15+)
- [ ] iPhone 13 (iOS 16+)
- [ ] iPad (iPadOS 15+)

#### Android (Chrome)
- [ ] Samsung Galaxy S21
- [ ] Google Pixel 6
- [ ] OnePlus 9

#### Alternative Browsers
- [ ] Firefox Mobile
- [ ] Samsung Internet
- [ ] Edge Mobile

### Known Issues / Edge Cases

#### Tables
- Very wide tables require horizontal scrolling
- This is intentional to preserve data visibility
- Scrolling is smooth with touch momentum

#### Video Embeds
- Some YouTube URLs may not parse correctly
- Fallback search link is provided
- iframe requires network connection

#### Landscape Mode
- Small phones in landscape may feel cramped
- All features remain accessible
- Portrait mode is recommended for best experience

### Accessibility Testing

#### Screen Reader
- [ ] VoiceOver (iOS) works correctly
- [ ] TalkBack (Android) works correctly
- [ ] All interactive elements are announced

#### Zoom/Text Size
- [ ] App supports system text size settings
- [ ] Content reflows properly at 200% zoom
- [ ] No content overlap or clipping

#### Touch Targets
- [ ] All buttons minimum 44px x 44px
- [ ] Sufficient spacing between tappable elements
- [ ] No accidental activation

### Quick Test Command

```bash
# Start the development server
cd frontend
npm run dev

# Access from mobile device on same network
# Server will display: "Local: http://localhost:5173/"
# Use your computer's IP instead of localhost
# Example: http://192.168.1.100:5173/
```

### Mobile Device Testing (Real Device)

1. **Connect to same WiFi** as development computer
2. **Find your computer's IP address:**
   - Mac: System Preferences → Network
   - Windows: ipconfig
   - Linux: ifconfig
3. **Access app:** http://YOUR_IP:5173
4. **Test all features** on actual hardware

### Screenshot Testing

Take screenshots at these breakpoints:
- 360px (very small phone)
- 375px (iPhone SE)
- 390px (iPhone 12)
- 428px (iPhone Pro Max)
- 768px (iPad portrait)
- 1024px (iPad landscape)

### Performance Metrics

Target metrics for mobile:
- **First Contentful Paint**: < 1.8s
- **Largest Contentful Paint**: < 2.5s
- **Time to Interactive**: < 3.8s
- **Cumulative Layout Shift**: < 0.1
- **First Input Delay**: < 100ms

### Lighthouse Mobile Score

Run Lighthouse audit in Chrome DevTools:
```
Performance: > 90
Accessibility: > 95
Best Practices: > 95
SEO: > 90
```

### Reporting Issues

When reporting mobile issues, include:
- Device model and OS version
- Browser name and version
- Screen size/resolution
- Screenshot or video
- Steps to reproduce
- Expected vs actual behavior

## Common Issues and Solutions

### Issue: Layout looks broken
**Solution**: Clear browser cache and reload

### Issue: Touch not working
**Solution**: Ensure pointer-events are not disabled in CSS

### Issue: Content too small
**Solution**: Check if user has reduced system text size

### Issue: Videos not loading
**Solution**: Check network connection and YouTube accessibility

### Issue: Charts not displaying
**Solution**: Wait for full page load; check console for errors

## Success Criteria

✅ All features work on mobile devices  
✅ No horizontal scrolling (except tables)  
✅ All text is readable without zoom  
✅ All buttons are easily tappable  
✅ Performance is smooth (60fps)  
✅ Works in portrait and landscape  
✅ Compatible with all major mobile browsers  

The app is mobile-ready when all criteria are met! 🎉

