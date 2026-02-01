# Website Builder 🎨

An website builder with drag-and-drop interface, real-time collaboration, and design using advanced templates design.

<img width="3167" height="1999" alt="Screenshot 2026-02-01 194406" src="https://github.com/user-attachments/assets/dfec259c-6b49-44f8-9a01-7b3d6a78cca1" />

## Features ✨

### Core Builder
- **Drag & Drop Interface** - Intuitive component placement and arrangement
- **Real-time Canvas Preview** - See changes instantly as you build
- **Responsive Design Testing** - Desktop, tablet, and mobile previews
- **Dark/Light Mode** - Theme switching with smooth transitions
- **Element Properties Panel** - Detailed styling and content editing


### Design Templates
6 Pre-built professional templates:
1. **Minimal Portfolio** - Clean, typography-focused showcase
2. **Luxe Store** - Premium e-commerce experience
3. **Nexus SaaS** - Conversion-optimized tech landing page
4. **Bold Agency** - Dynamic agency portfolio
5. **Journalist CV** - Elegant storytelling template
6. **Creative Pulse** - Vibrant creative design template

### Advanced Features
- **Template Library** - Browse and apply 6+ professional templates
- **Animation Builder** - 8+ CSS animations with visual editor
- **Gradient Generator** - Visual gradient creation tool
- **Element Organization** - Layer panel with hierarchy management
- **Responsive Grid** - Tailwind CSS-based responsive system
- **Export & Publish** - Download as HTML or publish online

## Tech Stack

### Frontend
- **React 18** - UI framework
- **TypeScript** - Type-safe development
- **Vite** - Lightning-fast build tool
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Smooth animations
- **Zustand** - State management
- **React Router** - Client-side routing

### Backend
- **Python 3.13** - Server runtime
- **FastAPI** - High-performance API framework
- **CORS Middleware** - Cross-origin requests
- **Pydantic** - Data validation

## Getting Started

### Prerequisites
- Node.js 16+ and npm
- Python 3.13+

### Quick Start (Windows)
The easiest way to start the application is using the provided batch file:
```bash
start.bat
```
This will automatically install dependencies and start both servers.

### Manual Installation

1. **Clone the repository**
```bash
git clone <repo-url>
cd WebsiteBuilder
```

2. **Install frontend dependencies**
```bash
npm install
```

3. **Set up backend environment**
```bash
cd backend
cp .env.example .env
# Edit .env and add your API keys
```

4. **Install Python dependencies**
```bash
pip install -r requirements.txt
```

### Running the Application

**Terminal 1 - Frontend (Vite dev server)**
```bash
npm run dev
# Runs on http://localhost:5173
```

**Terminal 2 - Backend (FastAPI server)**
```bash
cd backend
python -m uvicorn main:app --reload --port 8000
# Runs on http://localhost:8000
```

### Building for Production

```bash
# Build frontend
npm run build

# Frontend will be in 'dist/' directory
# Serve with your preferred static server
```

## Project Structure

```
WebsiteBuilder/
├── src/                    # React components and pages
│   ├── components/         # Reusable UI components
│   ├── pages/             # Route pages
│   ├── store/             # Zustand state management
│   ├── utils/             # Helper functions
│   ├── hooks/             # Custom React hooks
│   ├── App.tsx            # Main app component
│   └── main.tsx           # Entry point
├── backend/               # Python FastAPI server
│   ├── main.py            # API endpoints
│   ├── requirements.txt    # Python dependencies
│   └── .env.example       # Environment template
├── public/                # Static assets
├── package.json           # Frontend dependencies
├── vite.config.ts         # Vite configuration
└── README.md              # This file
```


## Contributing

1. Create feature branch: `git checkout -b feature/amazing-feature`
2. Commit changes: `git commit -m 'Add amazing feature'`
3. Push to branch: `git push origin feature/amazing-feature`
4. Open Pull Request

## License

MIT License - See LICENSE file for details

## Support

For issues, questions, or suggestions:
- Open an issue on GitHub
- Check documentation

---

Built with ❤️ by the CLOWN AI team
 it helpful!**
