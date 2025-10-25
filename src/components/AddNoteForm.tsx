import { useState } from 'react';
import { Plus } from 'lucide-react';

interface AddNoteFormProps {
  onAddNote: (note: { title: string; insight: string; topic: string; source_url?: string }) => void;
}

const TOPICS = ['Tech', 'Fitness', 'Life', 'Business', 'Career', 'Other'];

export default function AddNoteForm({ onAddNote }: AddNoteFormProps) {
  const [title, setTitle] = useState('');
  const [insight, setInsight] = useState('');
  const [topic, setTopic] = useState('Tech');
  const [sourceUrl, setSourceUrl] = useState('');
  const [isExpanded, setIsExpanded] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() && insight.trim()) {
      onAddNote({
        title: title.trim(),
        insight: insight.trim(),
        topic,
        source_url: sourceUrl.trim() || undefined,
      });
      setTitle('');
      setInsight('');
      setSourceUrl('');
      setTopic('Tech');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-slate-50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <Plus className="w-5 h-5 text-emerald-600" />
          <h2 className="text-lg font-semibold text-slate-800">Add Learning Note</h2>
        </div>
        <span className="text-slate-400 text-sm">
          {isExpanded ? 'Collapse' : 'Expand'}
        </span>
      </button>

      {isExpanded && (
        <form onSubmit={handleSubmit} className="p-6 pt-0 space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-slate-700 mb-2">
              What content?
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Y Combinator startup advice video"
              className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all text-slate-800 placeholder:text-slate-400"
              required
            />
          </div>

          <div>
            <label htmlFor="insight" className="block text-sm font-medium text-slate-700 mb-2">
              What did I learn?
            </label>
            <textarea
              id="insight"
              value={insight}
              onChange={(e) => setInsight(e.target.value)}
              placeholder="Write your key insights here..."
              rows={4}
              className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all text-slate-800 placeholder:text-slate-400 resize-none"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="topic" className="block text-sm font-medium text-slate-700 mb-2">
                Topic
              </label>
              <select
                id="topic"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all text-slate-800 bg-white"
              >
                {TOPICS.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="sourceUrl" className="block text-sm font-medium text-slate-700 mb-2">
                Source URL (optional)
              </label>
              <input
                type="url"
                id="sourceUrl"
                value={sourceUrl}
                onChange={(e) => setSourceUrl(e.target.value)}
                placeholder="https://..."
                className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all text-slate-800 placeholder:text-slate-400"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3.5 px-6 rounded-lg transition-colors shadow-sm hover:shadow-md"
          >
            Save Learning
          </button>
        </form>
      )}
    </div>
  );
}
