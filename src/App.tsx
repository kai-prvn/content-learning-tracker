import { useState, useEffect } from 'react';
import { Shuffle, BookOpen, Search } from 'lucide-react';
import { LearningNote } from './types';
import AddNoteForm from './components/AddNoteForm';
import NoteCard from './components/NoteCard';
import NoteModal from './components/NoteModal';
import RandomReviewModal from './components/RandomReviewModal';
import Filters from './components/Filters';

const STORAGE_KEY = 'learning-tracker-notes';

function App() {
  const [notes, setNotes] = useState<LearningNote[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('All');
  const [selectedNote, setSelectedNote] = useState<LearningNote | null>(null);
  const [randomNote, setRandomNote] = useState<LearningNote | null>(null);

  useEffect(() => {
    loadNotes();
  }, []);

  useEffect(() => {
    saveNotes();
  }, [notes]);

  const loadNotes = () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setNotes(parsed);
      }
    } catch (error) {
      console.error('Error loading notes:', error);
    }
  };

  const saveNotes = () => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
    } catch (error) {
      console.error('Error saving notes:', error);
    }
  };

  const handleAddNote = (noteData: {
    title: string;
    insight: string;
    topic: string;
    source_url?: string;
  }) => {
    const newNote: LearningNote = {
      id: crypto.randomUUID(),
      ...noteData,
      created_at: new Date().toISOString(),
    };
    setNotes([newNote, ...notes]);
  };

  const handleDeleteNote = (id: string) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  const getFilteredNotes = () => {
    return notes.filter((note) => {
      const matchesSearch =
        note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        note.insight.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesTopic = selectedTopic === 'All' || note.topic === selectedTopic;
      return matchesSearch && matchesTopic;
    });
  };

  const handleRandomReview = () => {
    const filteredNotes = getFilteredNotes();
    if (filteredNotes.length > 0) {
      const randomIndex = Math.floor(Math.random() * filteredNotes.length);
      setRandomNote(filteredNotes[randomIndex]);
    }
  };

  const filteredNotes = getFilteredNotes();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <header className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <BookOpen className="w-8 h-8 text-emerald-600" />
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-800">
              Learning Tracker
            </h1>
          </div>
          <p className="text-slate-600">Capture insights from content you consume and review them later</p>
        </header>

        <div className="space-y-6">
          <AddNoteForm onAddNote={handleAddNote} />

          {notes.length > 0 && (
            <>
              <div className="flex items-center justify-center">
                <button
                  onClick={handleRandomReview}
                  className="flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all"
                >
                  <Shuffle className="w-5 h-5" />
                  Review Random Note
                </button>
              </div>

              <Filters
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                selectedTopic={selectedTopic}
                onTopicChange={setSelectedTopic}
                notesCount={filteredNotes.length}
              />
            </>
          )}

          {filteredNotes.length === 0 && notes.length === 0 && (
            <div className="text-center py-16">
              <BookOpen className="w-16 h-16 text-slate-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-slate-700 mb-2">
                No notes yet. Start capturing your learnings!
              </h3>
              <p className="text-slate-500">
                Add your first note above to begin tracking insights from videos, podcasts, and more.
              </p>
            </div>
          )}

          {filteredNotes.length === 0 && notes.length > 0 && (
            <div className="text-center py-16">
              <Search className="w-16 h-16 text-slate-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-slate-700 mb-2">
                No notes match your filters
              </h3>
              <p className="text-slate-500">
                Try adjusting your search or topic filter
              </p>
            </div>
          )}

          {filteredNotes.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredNotes.map((note) => (
                <NoteCard
                  key={note.id}
                  note={note}
                  onDelete={handleDeleteNote}
                  onClick={() => setSelectedNote(note)}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {selectedNote && (
        <NoteModal note={selectedNote} onClose={() => setSelectedNote(null)} />
      )}

      {randomNote && (
        <RandomReviewModal
          note={randomNote}
          onClose={() => setRandomNote(null)}
          onShowAnother={handleRandomReview}
        />
      )}
    </div>
  );
}

export default App;
