import { Search, Filter } from 'lucide-react';

interface FiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedTopic: string;
  onTopicChange: (topic: string) => void;
  notesCount: number;
}

const TOPICS = ['All', 'Tech', 'Fitness', 'Life', 'Business', 'Career', 'Other'];

export default function Filters({
  searchQuery,
  onSearchChange,
  selectedTopic,
  onTopicChange,
  notesCount,
}: FiltersProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-5">
      <div className="flex items-center gap-2 mb-4">
        <Filter className="w-4 h-4 text-slate-600" />
        <h3 className="font-semibold text-slate-800">Filter & Search</h3>
        <span className="ml-auto text-sm text-slate-500">
          {notesCount} {notesCount === 1 ? 'note' : 'notes'}
        </span>
      </div>

      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search notes..."
            className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all text-slate-800 placeholder:text-slate-400"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {TOPICS.map((topic) => (
            <button
              key={topic}
              onClick={() => onTopicChange(topic)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedTopic === topic
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {topic}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
