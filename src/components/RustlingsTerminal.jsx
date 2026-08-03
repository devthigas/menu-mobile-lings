import React from 'react';
import { Terminal, ArrowRight, CheckCircle, AlertTriangle, Sparkles } from 'lucide-react';

export function RustlingsTerminal({ result, isRunning, onNextExercise, hasNext }) {
  
  // Format ANSI escape codes into styled React HTML elements!
  const parseAnsiText = (text) => {
    if (!text) return null;

    // Simple parser for common ANSI colors used in testRunner
    const parts = text.split(/(\x1b\[[0-9;]*m)/);
    let currentColor = 'text-slate-300';

    return parts.map((part, i) => {
      if (part === '\x1b[31m') {
        currentColor = 'text-red-400 font-bold';
        return null;
      } else if (part === '\x1b[32m') {
        currentColor = 'text-emerald-400 font-bold';
        return null;
      } else if (part === '\x1b[33m') {
        currentColor = 'text-amber-400 font-semibold';
        return null;
      } else if (part === '\x1b[36m') {
        currentColor = 'text-cyan-300';
        return null;
      } else if (part === '\x1b[0m') {
        currentColor = 'text-slate-300';
        return null;
      }
      return <span key={i} className={currentColor}>{part}</span>;
    });
  };

  return (
    <div className="flex flex-col h-full bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl font-mono text-xs">
      {/* Terminal Titlebar */}
      <div className="bg-slate-900 px-4 py-2.5 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-amber-500/80" />
            <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
          </div>
          <span className="text-slate-400 font-bold text-[11px] ml-2 flex items-center gap-1.5">
            <Terminal className="w-3.5 h-3.5 text-amber-400" />
            domlings watch runner
          </span>
        </div>

        {result && result.passed && hasNext && (
          <button
            onClick={onNextExercise}
            className="flex items-center gap-1.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 px-3 py-1 rounded-lg text-xs font-bold font-mono transition-all animate-bounce"
          >
            <span>Próximo Exercício</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Terminal Output Screen */}
      <div className="flex-1 p-4 bg-slate-950 font-mono overflow-y-auto leading-relaxed select-text">
        {isRunning ? (
          <div className="flex items-center gap-3 text-amber-400 py-4 animate-pulse">
            <Terminal className="w-4 h-4" />
            <span>Compilando e executando testes do DOM...</span>
          </div>
        ) : result ? (
          <pre className="whitespace-pre-wrap break-words font-mono text-slate-300">
            {parseAnsiText(result.formattedTerminalOutput)}
          </pre>
        ) : (
          <div className="text-slate-500 py-4 flex flex-col gap-2">
            <div className="flex items-center gap-2 text-slate-400 font-bold">
              <span>Ready for test run</span>
            </div>
            <p>Pressione o botão <span className="text-amber-400">"Testar (Ctrl+Enter)"</span> acima para validar seu código de exercício.</p>
            <p className="text-[11px] text-slate-600">O robô do DOMlings verificará a árvore DOM e dará feedback em tempo real.</p>
          </div>
        )}
      </div>
    </div>
  );
}
