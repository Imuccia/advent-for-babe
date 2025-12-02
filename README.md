# advent-for-babe

🎄 A beautiful Christmas-themed Advent Calendar web application (December 8-25) 🎄

## Features

- Custom Christmas-themed design with falling snowflakes
- Advent calendar from December 8 to December 25
- Interactive calendar boxes with hover effects
- Modal popup for each day's surprise
- Debug mode (all days clickable) and release mode (only today clickable)
- Fully responsive design
- Ready for Netlify deployment

## Configuration

In `script.js`, you can toggle between debug and release mode:

```javascript
const DEBUG_MODE = false; // Set to false for release
```

- **Debug Mode (true)**: All days are clickable for testing
- **Release Mode (false)**: Only today's date is clickable

## Deploy to Netlify

1. Push this repository to GitHub
2. Connect your GitHub repository to Netlify
3. Netlify will automatically deploy the site (no build command needed)

Or use the Netlify CLI:

```bash
npm install -g netlify-cli
netlify deploy --prod
```

## Local Development

Simply open `index.html` in a web browser to preview the calendar.

spostare Eren al 9
