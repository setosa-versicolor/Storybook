# 📖 Whimsy Tales - AI Rhyming Story Generator

A delightful web application that generates humorous rhyming stories with AI-powered illustrations. Simply provide a story prompt, and watch as GPT-4 crafts a witty rhyming tale while DALL-E 3 brings each page to life with whimsical illustrations.

![Whimsy Tales Preview](preview.png)

## ✨ Features

- **AI-Powered Story Generation**: Uses GPT-4 to create clever, rhyming stories with consistent meter and humor
- **Beautiful Illustrations**: Each page features a unique DALL-E 3 generated illustration in a children's book style
- **Interactive Digital Book**: Swipe, tap, or use arrow keys to turn pages like a real book
- **Responsive Design**: Works beautifully on phones, tablets, and desktop computers
- **Smooth Animations**: Page-turning animations and transitions powered by Framer Motion
- **Privacy-First**: Your OpenAI API key is stored locally and never sent to external servers

## 🚀 Quick Start

### Prerequisites

- Node.js 16+ installed
- An OpenAI API key with access to GPT-4 and DALL-E 3

### Local Development

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/rhyme-story-generator.git
   cd rhyme-story-generator
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

5. Click "Enter OpenAI API Key" and add your API key

6. Enter a story prompt and click "Create My Story"!

## 📦 Deployment

### Deploy to GitHub Pages

1. Update `package.json` with your GitHub repository:
   ```json
   "homepage": "https://yourusername.github.io/rhyme-story-generator"
   ```

2. Deploy:
   ```bash
   npm run deploy
   ```

### Deploy to Vercel

1. Push your code to GitHub
2. Import the repository in [Vercel](https://vercel.com)
3. Deploy with default settings

### Deploy to Netlify

1. Push your code to GitHub
2. Import the repository in [Netlify](https://netlify.com)
3. Build command: `npm run build`
4. Publish directory: `build`

## 🎮 Usage

### Navigation

- **Tap/Click**: Tap the left side of the book to go back, right side to go forward
- **Swipe**: Swipe left/right on mobile devices to turn pages
- **Keyboard**: Use arrow keys (← →) or spacebar to navigate
- **Progress Dots**: Click the dots at the bottom to jump to any page

### Story Prompts

The app works best with creative, specific prompts. Try things like:

- "A clumsy dragon who can't stop sneezing"
- "A penguin who dreams of living in the desert"  
- "A wizard whose spells always go hilariously wrong"
- "A cat who thinks it's a dog"
- "A robot learning to dance at a disco"

## 🛠️ Technology Stack

- **React 18** - UI framework
- **Framer Motion** - Animations and gestures
- **OpenAI GPT-4** - Story generation
- **OpenAI DALL-E 3** - Image generation
- **CSS3** - Styling with custom properties
- **Google Fonts** - Abril Fatface, Crimson Pro, Fredoka

## 📁 Project Structure

```
rhyme-story-generator/
├── public/
│   ├── index.html
│   └── manifest.json
├── src/
│   ├── components/
│   │   ├── StoryPrompt.js      # Initial prompt screen
│   │   ├── StoryBook.js        # Interactive book viewer
│   │   ├── LoadingScreen.js    # Loading animation
│   │   └── ApiKeyModal.js      # API key input modal
│   ├── services/
│   │   └── openai.js           # OpenAI API integration
│   ├── App.js                  # Main app component
│   ├── App.css
│   ├── index.js
│   └── index.css               # Global styles
├── package.json
└── README.md
```

## ⚙️ Configuration

### Environment Variables (Optional)

You can pre-configure an API key using environment variables:

```bash
REACT_APP_OPENAI_API_KEY=sk-your-key-here
```

Then modify `src/App.js` to use it:

```javascript
const [apiKey, setApiKey] = useState(process.env.REACT_APP_OPENAI_API_KEY || '');
```

### Customization

- **Colors**: Edit CSS variables in `src/index.css`
- **Fonts**: Update Google Fonts link in `public/index.html`
- **Story Length**: Modify the system prompt in `src/services/openai.js`
- **Image Style**: Adjust the image prompt enhancement in `generateImage()`

## 💰 Cost Considerations

Each story generation uses:
- ~1,000-2,000 tokens for GPT-4 text generation
- 6-8 DALL-E 3 image generations

Estimated cost per story: $0.50 - $1.00 USD (at current OpenAI pricing)

## 🔒 Security Notes

- API keys are stored in browser memory only (not persisted)
- All API calls are made directly from the client to OpenAI
- No backend server or database required
- Consider adding rate limiting for production use

## 🐛 Troubleshooting

### "Failed to generate story"
- Check that your API key is valid
- Ensure you have GPT-4 access on your OpenAI account
- Check your OpenAI usage limits

### Images not loading
- DALL-E 3 has rate limits; try again in a few minutes
- Some prompts may be rejected by content filters
- Check browser console for specific error messages

### Slow generation
- Story generation takes 10-30 seconds
- Image generation adds 30-60 seconds
- This is normal for AI generation

## 📄 License

MIT License - feel free to use this for personal or commercial projects!

## 🙏 Acknowledgments

- [OpenAI](https://openai.com) for GPT-4 and DALL-E 3
- [Framer Motion](https://www.framer.com/motion/) for animations
- [Google Fonts](https://fonts.google.com) for typography

---

Made with ❤️ and a dash of whimsy
