import { X, ExternalLink, Calendar } from 'lucide-react';
import { LearningNote } from '../types';

interface NoteModalProps {
  note: LearningNote;
  onClose: () => void;
}

const TOPIC_COLORS: Record<string, string> = {
  Tech: 'bg-blue-100 text-blue-700',
  Fitness: 'bg-green-100 text-green-700',
  Life: 'bg-purple-100 text-purple-700',
  Business: 'bg-orange-100 text-orange-700',
  Career: 'bg-indigo-100 text-indigo-700',
  Other: 'bg-slate-100 text-slate-700',
};

export default function NoteModal({ note, onClose }: NoteModalProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-slate-200 px-6 py-4 flex items-start justify-between">
          <h2 className="text-2xl font-semibold text-slate-800 pr-8 leading-snug">
            {note.title}
          </h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 transition-colors p-1 flex-shrink-0"
            aria-label="Close modal"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="flex items-center gap-3 flex-wrap">
            <span className={`px-3 py-1.5 rounded-full text-sm font-medium ${TOPIC_COLORS[note.topic] || TOPIC_COLORS.Other}`}>
              {note.topic}
            </span>
            <span className="flex items-center gap-2 text-sm text-slate-500">
              <Calendar className="w-4 h-4" />
              {formatDate(note.created_at)}
            </span>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-slate-700 mb-2 uppercase tracking-wide">
              Key Insights
            </h3>
            <p className="text-slate-700 leading-relaxed whitespace-pre-wrap">
              {note.insight}
            </p>
          </div>

          {note.source_url && (
            <div>
              <h3 className="text-sm font-semibold text-slate-700 mb-2 uppercase tracking-wide">
                Source
              </h3>
              <a
                href={note.source_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-emerald-600 hover:text-emerald-700 transition-colors break-all"
              >
                <ExternalLink className="w-4 h-4 flex-shrink-0" />
                <span className="text-sm">{note.source_url}</span>
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
