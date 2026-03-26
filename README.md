# Bikin CV Gratis

A free, online CV/resume builder for Indonesian job seekers. Create professional CVs in minutes, choose from multiple templates, and download as PDF—completely free.

![Status](https://img.shields.io/badge/status-mvp-green) ![License](https://img.shields.io/badge/license-MIT-blue) ![Vercel](https://img.shields.io/badge/deployed_on-vercel-black)

**Live Demo**: https://bikin-cv-gratis-k63k6fzu8-rfginanjars-projects.vercel.app  
*(Note: Preview deployment requires Vercel authentication. See [Deployment Guide](DEPLOYMENT_GUIDE.md) to make it public.)*

**GitHub**: https://github.com/raclaws/bikin-cv-gratis

## Features

- **4 Professional Templates**: Modern, Classic, Minimal, and Executive styles
- **Live Preview**: See your CV update in real-time as you type
- **PDF Export**: Generate high-quality PDF with one click
- **Local Storage**: Save your draft automatically
- **Mobile Responsive**: Works on desktop, tablet, and mobile
- **No Registration**: Completely free, no sign-up required
- **Indonesian Language**: Built specifically for Indonesian job market

## Tech Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **PDF Generation**: jsPDF + html2canvas
- **Icons**: Font Awesome 6
- **Fonts**: Google Fonts (Inter, Plus Jakarta Sans)
- **Hosting**: Vercel (static deployment)

## Project Structure

```
bikin-cv-gratis/
├── index.html          # Main HTML document
├── style.css           # Main stylesheet
├── app.js              # Main application logic
├── templates.js        # CV template renderers
├── vercel.json         # Vercel deployment config
├── .gitignore          # Git ignore file
└── README.md           # This file
```

## Local Development

1. Clone the repository:
   ```bash
   git clone https://github.com/raclaws/bikin-cv-gratis.git
   cd bikin-cv-gratis
   ```

2. Open `index.html` in a browser or use a local server:
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx serve .
   ```

3. The app will be available at `http://localhost:8000`

## Deployment

The project is configured for automatic deployment on Vercel:

1. Push to GitHub repository
2. Connect repository to Vercel
3. Deploy automatically on every push

## Usage

1. **Fill the form**: Enter your personal information, work experience, education, and skills
2. **Choose a template**: Select from 4 professional CV templates
3. **Preview**: See your CV update in real-time
4. **Download**: Click "Generate CV PDF" to download your CV
5. **Save draft**: Your progress is automatically saved in your browser

## Template Details

| Template | Description | Best For |
|----------|-------------|----------|
| **Modern** | Clean design with color accents | Tech, Creative, Startup |
| **Classic** | Traditional, professional layout | Corporate, Finance, Government |
| **Minimal** | Simple, spacious, elegant | Design, Academic, Minimalist |
| **Executive** | Sophisticated two-column layout | Management, Senior Roles |

## Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+
- Mobile browsers (iOS Safari, Chrome for Android)

## License

MIT License. See LICENSE file for details.

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Contact

- **Developer**: Raka Feisal (raka.feisal@gmail.com)
- **GitHub**: [raclaws](https://github.com/raclaws)
- **Project URL**: [bikin-cv-gratis.vercel.app](https://bikin-cv-gratis.vercel.app)

---

Made with ❤️ for Indonesian job seekers