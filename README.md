<div align="center">

# 🚀 Capryos

### *Crypto & Business Made Simple*

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com/)

**Transforming complex crypto and business concepts into clear, actionable knowledge for builders, innovators, and curious minds.**

[Explore Blog](#-features) • [Live Demo](#) • [Documentation](#-tech-stack) • [Community](#-community)

</div>

---

## ✨ What Makes Capryos Different

Capryos isn't just another blog platform—it's a comprehensive learning ecosystem designed to demystify the complex world of cryptocurrency and business. We believe that groundbreaking ideas shouldn't be trapped behind walls of complicated terminology.

### 🎯 Our Mission

**Bridge the gap between innovation and understanding.** We transform sophisticated crypto and business concepts into practical, implementable knowledge that anyone can grasp and apply.

### 🌟 Core Values

- **Clarity First** - Complex concepts made digestible without sacrificing depth
- **Universal Access** - Free, accessible knowledge for everyone
- **Action-Oriented** - Practical takeaways for real-world application
- **Community-Driven** - Built with and for our global community

---

## 🚀 Features

### For Readers
- 📚 **In-Depth Articles** - Comprehensive guides covering blockchain, crypto, and business strategies
- 🔍 **Smart Search** - Find exactly what you need with powerful search functionality
- 🌓 **Dark Mode** - Beautiful reading experience in any lighting condition
- 📱 **Fully Responsive** - Seamless experience across all devices
- 🔖 **Category System** - Organized content by topics for easy navigation

### For Content Creators
- ✍️ **Rich Text Editor** - Create beautiful content with markdown support
- 🖼️ **Media Management** - Upload and manage images effortlessly
- 📊 **Analytics Dashboard** - Track engagement and reader statistics
- 📝 **Draft System** - Work on content before publishing
- 🏷️ **Tagging System** - Organize and categorize your content

### Community Features
- 💌 **Newsletter System** - Automated email delivery for subscribers
- 💬 **Content Suggestions** - Community-driven content ideas
- 🌐 **SEO Optimized** - Built-in SEO tools for maximum reach
- 🔐 **Secure Authentication** - Protected admin area with Supabase Auth

---

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern UI library with hooks
- **TypeScript** - Type-safe development
- **Vite** - Lightning-fast build tool
- **Tailwind CSS** - Utility-first styling
- **React Router** - Client-side routing
- **Lucide Icons** - Beautiful, consistent icons

### Backend & Database
- **Supabase** - Complete backend platform
  - PostgreSQL Database
  - Row Level Security (RLS)
  - Real-time subscriptions
  - Authentication
  - Storage

### Content Management
- **React Markdown** - Markdown parsing with support for:
  - Code syntax highlighting
  - Tables and lists
  - Custom components
  - Raw HTML support

---

## 📦 Installation & Setup

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager
- Supabase account (free tier available)

### Quick Start

```bash
# Clone the repository
git clone https://github.com/yourusername/capryos.git
cd capryos

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your Supabase credentials

# Start development server
npm run dev

# Build for production
npm run build
```

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

---

## 🗄️ Database Schema

The application uses Supabase PostgreSQL with the following main tables:

- **blog_posts** - Store all blog articles with metadata
- **blog_categories** - Organize posts into categories
- **blog_tags** - Tag system for flexible categorization
- **newsletter_subscribers** - Manage email subscriptions
- **content_suggestions** - Community content ideas

All tables include Row Level Security (RLS) policies for secure data access.

---

## 🎨 Project Structure

```
capryos/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── BlogCard.tsx
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── ...
│   ├── pages/              # Page components
│   │   ├── Home.tsx
│   │   ├── Blog.tsx
│   │   ├── BlogPost.tsx
│   │   └── admin/          # Admin dashboard pages
│   ├── contexts/           # React contexts
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Utility functions & configs
│   └── main.tsx           # Application entry point
├── supabase/
│   └── migrations/         # Database migration files
└── public/                # Static assets
```

---

## 🚀 Deployment

### Recommended Platforms

#### Netlify
```bash
npm run build
# Deploy dist/ folder to Netlify
```

#### Vercel
```bash
npm run build
# Deploy with Vercel CLI or GitHub integration
```

#### Custom Server
```bash
npm run build
# Serve the dist/ folder with any static hosting
```

### Environment Setup
Make sure to configure your environment variables in your hosting platform's dashboard.

---

## 🧪 Development

### Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

### Code Quality

The project includes:
- ESLint configuration for code quality
- TypeScript for type safety
- Prettier for code formatting (recommended)

---

## 🤝 Contributing

We welcome contributions from the community! Here's how you can help:

### Ways to Contribute
- 🐛 Report bugs and issues
- 💡 Suggest new features
- 📝 Improve documentation
- 🎨 Design improvements
- 💻 Code contributions

### Contribution Process

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📈 Roadmap

- [ ] Advanced analytics dashboard
- [ ] Multi-language support
- [ ] Comment system for articles
- [ ] User profiles and saved articles
- [ ] RSS feed generation
- [ ] API for third-party integrations
- [ ] Mobile app (React Native)

---

## 🌐 Community

Join our growing community of entrepreneurs, developers, and crypto enthusiasts:

- **Website**: [capryos.com](#)
- **Twitter**: [@capryos](#)
- **LinkedIn**: [Capryos](#)
- **GitHub**: [github.com/capryos](#)
- **Email**: hello@capryos.com

### Community Stats
- 📊 10,000+ Monthly Readers
- 📚 200+ Articles Published
- 🎯 50+ Topics Covered
- 👥 5,000+ Community Members

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

Built with these amazing technologies:
- [React](https://reactjs.org/) - UI framework
- [Supabase](https://supabase.com/) - Backend platform
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Vite](https://vitejs.dev/) - Build tool
- [Lucide Icons](https://lucide.dev/) - Icon library

---

<div align="center">

### 💙 Made with passion by the Capryos Team

**[⬆ Back to Top](#-capryos)**

</div>
