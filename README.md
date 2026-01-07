# 🎮 Game Zone - Interactive Games Portfolio

A beautifully designed, professional-grade interactive games website featuring three classic puzzles. Built with vanilla HTML, CSS, and JavaScript - no frameworks required!

## ✨ Features

### Games Included
- **Memory Match** - Classic card matching game with flip animations
- **Tic-Tac-Toe** - Two-player strategy game
- **15 Puzzle** - Sliding tile puzzle with move counter and timer

### Design Highlights
- 🎨 Modern glassmorphism design with premium gradients
- ✨ Smooth 60fps animations and micro-interactions
- 📱 Fully responsive design for all devices
- 🎯 Professional visual hierarchy and typography
- 💫 Dynamic background effects
- 🌙 Dark mode compatible styling

### Technical Features
- No external dependencies (pure vanilla JS)
- Solvable 15-puzzle algorithm
- Real-time move counters and timers
- Keyboard and touch-friendly
- Accessible with high contrast support

## 🚀 Quick Start

1. Clone or download this repository
2. Open `index.html` in your browser
3. Start playing!

## 📦 Project Structure

```
games-portfolio/
├── index.html          # Main HTML structure
├── styles.css          # Professional styling (enhanced by frontend-ui-ux-engineer)
├── games.js            # Game logic and interactions
└── README.md           # This file
```

## 🌐 Deploy to GitHub Pages

### Option 1: Automatic Deployment (Recommended)

1. **Create a new repository on GitHub**
   - Name it `your-username.github.io` (for user pages) OR
   - Name it anything (for project pages)

2. **Navigate to your project directory**
   ```bash
   cd E:\Coding Projects\games-portfolio
   ```

3. **Initialize Git and push**
   ```bash
   git init
   git add .
   git commit -m "Initial commit - Game Zone portfolio"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO.git
   git push -u origin main
   ```

4. **Enable GitHub Pages**
   - Go to your repository on GitHub
   - Click **Settings** → **Pages** (in left sidebar)
   - Under **Source**, select:
     - For user pages: `main` branch
     - For project pages: `main` branch, `/ (root)` folder
   - Click **Save**

5. **Access your site**
   - User pages: `https://YOUR-USERNAME.github.io`
   - Project pages: `https://YOUR-USERNAME.github.io/YOUR-REPO`

### Option 2: GitHub Desktop (GUI)

1. Create a repository on GitHub
2. Open GitHub Desktop
3. File → Add Local Repository → Select `games-portfolio`
4. Publish to GitHub (button in top right)
5. Follow steps 4-5 from Option 1 to enable Pages

### Option 3: Manual Upload

1. Create a repository on GitHub
2. Go to repository → Click **Add file** → **Upload files**
3. Upload all files (`index.html`, `styles.css`, `games.js`)
4. Add commit message and click **Commit changes**
5. Follow steps 4-5 from Option 1 to enable Pages

## 🎯 Customization

### Change Colors
Edit the CSS variables in `styles.css`:
```css
:root {
    --primary-gradient: linear-gradient(135deg, #YOUR-COLOR1 0%, #YOUR-COLOR2 100%);
    --secondary-gradient: linear-gradient(135deg, #YOUR-COLOR3 0%, #YOUR-COLOR4 100%);
}
```

### Add More Games
1. Create a new HTML section in `index.html`
2. Add game logic in `games.js`
3. Add corresponding styles in `styles.css`

### Modify Game Difficulty
Edit `games.js` to adjust:
- Memory Game: Change emojis array size for more/fewer cards
- 15 Puzzle: Increase grid size (currently 4x4)

## 🛠️ Technologies Used

- **HTML5** - Semantic markup
- **CSS3** - Modern features (Grid, Flexbox, Custom Properties, Animations)
- **JavaScript (ES6+)** - Game logic, DOM manipulation, event handling

## 📱 Browser Compatibility

- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 🎨 Design Credits

Professional visual design enhanced by **frontend-ui-ux-engineer** AI agent, featuring:
- Glassmorphism effects
- Premium gradient schemes
- Smooth animations
- Responsive layouts
- Micro-interactions

## 📄 License

This project is open source and available for personal and commercial use.

## 🤝 Contributing

Feel free to fork this project and add your own games or features!

## 📧 Support

For questions or issues, please open an issue in the GitHub repository.

---

**Built with ❤️ | Play, Learn, Have Fun!**
