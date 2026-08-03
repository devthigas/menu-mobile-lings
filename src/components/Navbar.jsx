import React from 'react';
import { Terminal, Award, Download, RotateCcw, List, Menu } from 'lucide-react';

export function Navbar({ 
  completedCount, 
  totalCount, 
  onOpenCli, 
  onResetProgress, 
  onShowCert, 
  onOpenMobileExercises 
}) {
  const percentage = Math.round((completedCount / totalCount) * 100) || 0;

  return (
    <header className="bg-slate-900 border-b border-slate-800 text-white px-3 sm:px-6 py-3 sm:py-4 flex flex-col md:flex-row items-center justify-between gap-3 shadow-xl">
      {/* Brand & Subtitle & Mobile Menu Trigger */}
      <div className="flex items-center justify-between w-full md:w-auto">
        <div className="flex items-center gap-2.5 sm:gap-3">
          <div className="bg-gradient-to-tr from-amber-500 to-orange-600 p-2 sm:p-2.5 rounded-xl shadow-lg shadow-amber-500/20 text-slate-950 font-black shrink-0">
            <Menu className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.5]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-mono text-lg sm:text-xl font-bold tracking-tight bg-gradient-to-r from-amber-400 via-orange-300 to-amber-200 bg-clip-text text-transparent">
                MenuMobileLings
              </h1>
              <span className="bg-amber-500/10 text-amber-400 border border-amber-500/30 text-[10px] sm:text-xs px-2 py-0.5 rounded-full font-mono font-medium">
                Menu Mobile
              </span>
            </div>
            <p className="text-[11px] sm:text-xs text-slate-400 hidden xs:block">
              Aprenda a criar Menus Mobile incríveis com HTML, CSS e JavaScript do zero!
            </p>
          </div>
        </div>

        {/* Mobile exercise list trigger button */}
        <button
          onClick={onOpenMobileExercises}
          className="lg:hidden flex items-center gap-1.5 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-400 px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all active:scale-95"
          title="Abrir Lista de Exercícios"
        >
          <List className="w-4 h-4" />
          <span>Exercícios ({completedCount}/{totalCount})</span>
        </button>
      </div>

      {/* Progress & Actions */}
      <div className="flex items-center gap-2 sm:gap-4 w-full md:w-auto justify-between md:justify-end">
        {/* Overall Progress Bar */}
        <div className="flex items-center gap-2 sm:gap-3 bg-slate-800/80 border border-slate-700/60 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl">
          <div className="text-right">
            <div className="text-[10px] sm:text-xs text-slate-400">Progresso</div>
            <div className="text-xs sm:text-sm font-mono font-bold text-amber-400">
              {completedCount}/{totalCount} ({percentage}%)
            </div>
          </div>
          <div className="w-16 sm:w-24 bg-slate-950 h-2.5 rounded-full overflow-hidden border border-slate-800">
            <div 
              className="bg-gradient-to-r from-amber-500 to-emerald-400 h-full transition-all duration-500 ease-out"
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {completedCount === totalCount && totalCount > 0 && (
            <button
              onClick={onShowCert}
              className="flex items-center gap-1.5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-lg text-xs font-semibold shadow-lg shadow-emerald-500/20 transition-all animate-pulse shrink-0"
            >
              <Award className="w-4 h-4" />
              <span className="hidden sm:inline">Certificado</span>
            </button>
          )}

          <button
            onClick={onOpenCli}
            className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-lg text-xs font-medium transition-colors"
            title="Como rodar localmente no seu terminal"
          >
            <Download className="w-4 h-4 text-amber-400 shrink-0" />
            <span className="hidden sm:inline">Modo CLI</span>
          </button>

          <button
            onClick={onResetProgress}
            className="p-1.5 sm:p-2 bg-slate-800/60 hover:bg-red-950/40 text-slate-400 hover:text-red-400 border border-slate-700/60 hover:border-red-800/50 rounded-lg text-xs transition-colors"
            title="Reiniciar todo o progresso"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
}


