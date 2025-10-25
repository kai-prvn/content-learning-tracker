# Content Learning Tracker 📝

A clean, minimal web app to capture and review key insights from educational content (videos, podcasts, articles, documentaries).

## 🎯 Problem

As a student consuming diverse educational content, I was forgetting key insights within days. I had no system to capture and review what I learned.

## ✨ Solution

Built a quick-capture system with spaced repetition (random review) to help retain learnings long-term.

## 🚀 Features

- **Quick Capture**: Save notes with title, insight, topic, and optional source link
- **Random Review**: Spaced repetition - shows random notes from your collection
- **Smart Filtering**: Filter by topic or search across all notes
- **Clean Design**: Mobile-first, calming colors, distraction-free
- **Persistent Storage**: Notes saved in Supabase cloud database
- **Fast & Responsive**: Works on phone, tablet, and desktop

## 🛠️ Tech Stack

- **Frontend**: React + TypeScript
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **Database**: Supabase (PostgreSQL)
- **Deployment**: Netlify
- **Development**: Built with Bolt.new (AI-assisted)

## 🏃 Running Locally

1. Clone the repository:
```bash
git clone https://github.com/kai-prvn/content-learning-tracker.git
cd content-learning-tracker
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file in root with your Supabase credentials:
```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Run development server:
```bash
npm run dev
```

5. Open [http://localhost:5173](http://localhost:5173)



## 💡 What I Learned

Building this project taught me:
- **Product thinking**: Identifying a real problem and building a focused solution
- **AI-assisted development**: Using Bolt.new to accelerate development
- **React + TypeScript**: Component-based architecture and type safety
- **Supabase**: Backend-as-a-service, database setup, authentication
- **Deployment**: CI/CD with Netlify
- **Troubleshooting**: Debugging issues (database vs localStorage trade-offs)

## 🔮 Future Improvements

- [ ] Export notes as Markdown/CSV
- [ ] Dark mode toggle
- [ ] Edit existing notes
- [ ] Tags/categories beyond topics
- [ ] Note statistics and insights
- [ ] Sync across devices (PWA)
- [ ] Daily review reminders
- [ ] Notion/Obsidian integration

## 📝 Project Context

**Built as:** Project #1 in my journey to learn product design and development  
**Timeline:** Built in ~2 hours over 1 day  
**Status:** Active personal use, continuously iterating based on feedback

## 🤝 Contributing

This is a personal learning project, but suggestions and feedback are welcome! Feel free to:
- Open an issue with feature suggestions
- Share how you'd improve the UX/UI
- Fork and build your own version

## 📄 License

MIT License - feel free to use this for learning!

---

**Built with ❤️ as part of my product development learning journey**