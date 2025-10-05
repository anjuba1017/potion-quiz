# 🧙‍♀️ El Libro de Recetas Mágicas - Quiz de Química

A magical potion-themed chemistry quiz game with an ink & watercolor storybook aesthetic inspired by vintage fairy tale illustrations.

## 🎨 Design Style

- **Visual Theme**: Hand-drawn illustration with ink outlines and watercolor washes
- **Color Palette**: Warm parchment tones, earthy browns, mystical purples and greens
- **Typography**: Old book fonts (IM Fell English, Almendra)
- **Aesthetic**: Whimsical/fairytale storybook, cozy witch vibes

## ✨ Features

### Core Gameplay
- **10 Random Questions** from a pool of 25 chemistry questions
- **Multiple Choice** answers with A, B, C, D options
- **Hint System**: "Hummm... lo tengo en la punta de la lengua" - eliminates 2 wrong answers (one-time use)
- **Immediate Feedback**: Green for correct, red for incorrect
- **Page-Turn Transitions**: Questions transition like flipping through a grimoire

### Results
- **Video Animations**: Placeholders for Sora-generated videos
  - **6+ correct answers**: Witch creates a successful recipe with bubbling green cauldron
  - **5 or fewer**: Witch creates a failed recipe with dark smoke
- **Score Display**: 
  - Potion bottles visualization (green for correct, empty for incorrect)
  - Skull icon appears after the last correct bottle
  - Percentage circle progress
  - Time tracking
- **Retry Option**: Play again with new random questions

## 🎬 Video Integration Guide

### Recommended Video Specs
- **Format**: MP4 (H.264 codec) - best browser compatibility
- **Backup**: WebM for modern browsers
- **Duration**: 5-10 seconds
- **Resolution**: 1080p or 720p
- **Aspect Ratio**: 16:9

### Animation Scenarios

**Animation 1 - Success (6+ correct)**
- Witch character happily preparing potion
- Cauldron with bubbling green liquid
- Sparkles and magical effects
- Warm, inviting atmosphere

**Animation 2 - Failed (≤5 correct)**
- Witch looking disappointed but encouraging
- Cauldron with dark smoke/failed potion
- Mystical but subdued atmosphere

### How to Add Videos

1. Place your video files in `/public/videos/`:
   ```
   /public/videos/success.mp4
   /public/videos/failed.mp4
   ```

2. Edit `src/components/ResultScreen.jsx`:
   ```jsx
   // Replace the video-placeholder div with:
   <video 
     autoPlay 
     muted 
     playsInline
     className="result-video"
   >
     <source 
       src={isSuccess ? '/videos/success.mp4' : '/videos/failed.mp4'} 
       type="video/mp4" 
     />
   </video>
   ```

3. Adjust the timer in `ResultScreen.jsx` (line 20) to match your video duration

## 🚀 Installation & Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## 📁 Project Structure

```
potion-quiz/
├── src/
│   ├── components/
│   │   ├── StartScreen.jsx      # Welcome screen
│   │   ├── QuestionCard.jsx     # Question display with grimoire style
│   │   ├── HintPopup.jsx        # Hint confirmation modal
│   │   └── ResultScreen.jsx     # Final results with animations
│   ├── data/
│   │   └── questions.js         # 25 chemistry questions
│   ├── App.jsx                  # Main game logic
│   ├── App.css                  # Global styles
│   ├── index.css                # Base styles
│   └── main.jsx                 # Entry point
└── public/
    └── videos/                  # Place video files here (when ready)
```

## 🎮 Game Flow

1. **Start Screen**: "El Libro de Recetas Mágicas" welcome page
2. **Questions (10)**: Each question appears on a grimoire page with page-turn effect
3. **Hint Button**: Available once per game, removes 2 incorrect answers
4. **Animation**: Video plays based on performance (success/failed)
5. **Results**: Shows score, time, potion bottles, and percentage
6. **Restart**: Begin new game with different random questions

## 🎨 Customization

### Colors
Main theme colors are defined in CSS:
- Parchment: `#fdfbf7`, `#f5f1e8`
- Brown tones: `#8b7355`, `#6b5b4b`
- Success green: `#7bc96f`
- Error red: `#f5c6cb`

### Fonts
- Headings: `'IM Fell English', serif`
- Body/Buttons: `'Almendra', serif`

### Background
To add a custom background witch illustration:
1. Place image in `/public/images/background.png`
2. Update `App.css`:
   ```css
   .app {
     background-image: url('/images/background.png');
     background-size: cover;
     background-position: center;
   }
   ```

## 🔊 Audio Integration (Future)

Structure is ready for sound effects:
- Correct answer sound
- Incorrect answer sound
- Page turn sound
- Hint activation sound
- Success/failure music

## 📦 Deployment to Render

1. Push code to GitHub/GitLab
2. Create Static Site on Render
3. Configure:
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`
4. Deploy

## 🧪 Chemistry Questions

All 25 questions cover topics:
- Elements and compounds
- States of matter
- Energy types
- Atomic structure
- Scientific notation
- Chemical bonds
- Periodic table
- Pure substances

## 📝 Notes

- Game uses React hooks for state management
- No backend required - fully client-side
- Responsive design for mobile and desktop
- Video placeholders clearly marked for replacement
- Random question selection ensures replayability

---

**Built with React + Vite**  
*Inspired by classic fairy tale illustrations and vintage storybooks*
