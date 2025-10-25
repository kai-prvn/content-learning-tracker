import { useState } from 'react';
import { Trash2, ExternalLink, Calendar } from 'lucide-react';
import { LearningNote } from '../types';

interface NoteCardProps {
  note: LearningNote;
  onDelete: (id: string) => void;
  onClick: () => void;
}

const TOPIC_COLORS: Record<string, string> = {
  Tech: 'bg-blue-100 text-blue-700',
  Fitness: 'bg-green-100 text-green-700',
  Life: 'bg-purple-100 text-purple-700',
  Business: 'bg-orange-100 text-orange-700',
  Career: 'bg-indigo-100 text-indigo-700',
  Other: 'bg-slate-100 text-slate-700',
};

export default function NoteCard({ note, onDelete, onClick }: NoteCardProps) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleDelete = () => {
    onDelete(note.id);
    setShowDeleteConfirm(false);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const truncateInsight = (text: string, maxLength: number = 150) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 hover:shadow-md transition-shadow overflow-hidden group">
        <div className="p-5">
          <div className="flex items-start justify-between gap-3 mb-3">
            <h3
              onClick={onClick}
              className="font-semibold text-slate-800 text-lg leading-snug flex-1 cursor-pointer hover:text-emerald-600 transition-colors"
            >
              {note.title}
            </h3>
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="text-slate-400 hover:text-red-500 transition-colors p-1 opacity-0 group-hover:opacity-100"
              aria-label="Delete note"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>

          <p
            onClick={onClick}
            className="text-slate-600 text-sm leading-relaxed mb-4 cursor-pointer"
          >
            {truncateInsight(note.insight)}
          </p>

          <div className="flex items-center justify-between gap-3 flex-wrap">
            <div className="flex items-center gap-2 flex-wrap">
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${TOPIC_COLORS[note.topic] || TOPIC_COLORS.Other}`}>
                {note.topic}
              </span>
              <span className="flex items-center gap-1.5 text-xs text-slate-500">
                <Calendar className="w-3.5 h-3.5" />
                {formatDate(note.created_at)}
              </span>
            </div>

            {note.source_url && (
              <a
                href={note.source_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-xs text-emerald-600 hover:text-emerald-700 transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                <ExternalLink className="w-3.5 h-3.5" />
                Source
              </a>
            )}
          </div>
        </div>
      </div>

      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-sm w-full p-6">
            <h3 className="text-lg font-semibold text-slate-800 mb-2">Delete this note?</h3>
            <p className="text-slate-600 text-sm mb-6">
              This action cannot be undone. The note will be permanently deleted.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 px-4 py-2.5 rounded-lg border border-slate-300 text-slate-700 font-medium hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 px-4 py-2.5 rounded-lg bg-red-600 text-white font-medium hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
