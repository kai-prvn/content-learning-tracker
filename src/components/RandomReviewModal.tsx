import { Shuffle, X, ExternalLink, Calendar } from 'lucide-react';
import { LearningNote } from '../types';

interface RandomReviewModalProps {
  note: LearningNote | null;
  onClose: () => void;
  onShowAnother: () => void;
}

const TOPIC_COLORS: Record<string, string> = {
  Tech: 'bg-blue-100 text-blue-700',
  Fitness: 'bg-green-100 text-green-700',
  Life: 'bg-purple-100 text-purple-700',
  Business: 'bg-orange-100 text-orange-700',
  Career: 'bg-indigo-100 text-indigo-700',
  Other: 'bg-slate-100 text-slate-700',
};

export default function RandomReviewModal({ note, onClose, onShowAnother }: RandomReviewModalProps) {
  if (!note) return null;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border-2 border-emerald-200">
        <div className="sticky top-0 bg-gradient-to-br from-emerald-50 to-teal-50 border-b border-emerald-200 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 text-emerald-700">
            <Shuffle className="w-5 h-5" />
            <span className="text-sm font-semibold uppercase tracking-wide">Random Review</span>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 transition-colors p-1"
            aria-label="Close modal"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <h2 className="text-2xl font-semibold text-slate-800 leading-snug">
            {note.title}
          </h2>

          <div className="flex items-center gap-3 flex-wrap">
            <span className={`px-3 py-1.5 rounded-full text-sm font-medium ${TOPIC_COLORS[note.topic] || TOPIC_COLORS.Other}`}>
              {note.topic}
            </span>
            <span className="flex items-center gap-2 text-sm text-slate-500">
              <Calendar className="w-4 h-4" />
              {formatDate(note.created_at)}
            </span>
          </div>

          <div className="bg-white rounded-lg p-5 shadow-sm border border-emerald-100">
            <p className="text-slate-700 leading-relaxed whitespace-pre-wrap">
              {note.insight}
            </p>
          </div>

          {note.source_url && (
            <a
              href={note.source_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-emerald-600 hover:text-emerald-700 transition-colors text-sm"
            >
              <ExternalLink className="w-4 h-4" />
              View Source
            </a>
          )}

          <div className="flex gap-3 pt-2">
            <button
              onClick={onShowAnother}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition-colors shadow-sm"
            >
              <Shuffle className="w-4 h-4" />
              Show Another
            </button>
            <button
              onClick={onClose}
              className="px-6 py-3 rounded-lg border border-slate-300 text-slate-700 font-medium hover:bg-white transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
