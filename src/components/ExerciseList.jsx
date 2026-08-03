import React from 'react';
import { CheckCircle2, Circle, Code2, Lock, ChevronRight, X } from 'lucide-react';

export function ExerciseList({ exercises, currentId, completedIds, onSelect, onClose }) {
  return (
    <aside className="w-full lg:w-80 bg-slate-900/95 border-r border-slate-800 flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-slate-800 bg-slate-900/80 flex items-center justify-between">
        <h2 className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-2">
          <span>Trilha de Exercícios</span>
          <span className="text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded font-bold">
            {completedIds.length} / {exercises.length}
          </span>
        </h2>

        {onClose && (
          <button
            onClick={onClose}
            className="lg:hidden p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            title="Fechar menu"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Exercises List */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {exercises.map((ex) => {
          const isCurrent = ex.id === currentId;
          const isCompleted = completedIds.includes(ex.id);
          
          return (
            <button
              key={ex.id}
              onClick={() => {
                onSelect(ex.id);
                if (onClose) onClose();
              }}
              className={`w-full text-left p-3 rounded-xl border transition-all duration-200 flex items-start gap-3 group relative ${
                isCurrent
                  ? 'bg-amber-500/10 border-amber-500/50 text-white shadow-lg shadow-amber-500/10'
                  : isCompleted
                  ? 'bg-slate-800/40 border-emerald-500/20 hover:border-emerald-500/40 text-slate-300'
                  : 'bg-slate-900/40 border-slate-800 hover:border-slate-700 text-slate-400 hover:text-slate-200'
              }`}
            >
              {/* Status Icon */}
              <div className="mt-0.5 shrink-0">
                {isCompleted ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                ) : isCurrent ? (
                  <div className="w-4 h-4 rounded-full border-2 border-amber-400 flex items-center justify-center animate-pulse">
                    <div className="w-1.5 h-1.5 bg-amber-400 rounded-full" />
                  </div>
                ) : (
                  <Circle className="w-4 h-4 text-slate-600 group-hover:text-slate-400" />
                )}
              </div>

              {/* Title & Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1 mb-1">
                  <span className={`text-xs font-mono font-medium truncate ${isCurrent ? 'text-amber-300' : ''}`}>
                    {ex.title}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-[10px]">
                  <span className="bg-slate-800 px-2 py-0.5 rounded text-slate-400 border border-slate-700/60">
                    {ex.category}
                  </span>
                  <span className={`px-1.5 py-0.5 rounded ${
                    ex.difficulty === 'Fácil' 
                      ? 'text-emerald-400 bg-emerald-500/10' 
                      : ex.difficulty === 'Médio'
                      ? 'text-amber-400 bg-amber-500/10'
                      : 'text-purple-400 bg-purple-500/10'
                  }`}>
                    {ex.difficulty}
                  </span>
                </div>
              </div>

              {/* Arrow */}
              {isCurrent && (
                <ChevronRight className="w-4 h-4 text-amber-400 shrink-0 self-center" />
              )}
            </button>
          );
        })}
      </div>
    </aside>
  );
}
