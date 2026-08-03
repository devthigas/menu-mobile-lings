import React, { useState, useEffect, useRef } from 'react';
import { exercises } from './data/exercises';
import { runExerciseTest } from './utils/testRunner';
import { Navbar } from './components/Navbar';
import { ExerciseList } from './components/ExerciseList';
import { CodeEditor } from './components/CodeEditor';
import { DOMPreview } from './components/DOMPreview';
import { RustlingsTerminal } from './components/RustlingsTerminal';
import { CliModal } from './components/CliModal';
import { CertificateModal } from './components/CertificateModal';
import { HelpCircle, CheckCircle2, ArrowRight, Code, Eye, Terminal, Play, X } from 'lucide-react';

export default function App() {
  const activeExercises = exercises;

  const [currentId, setCurrentId] = useState(() => {
    const savedId = localStorage.getItem('menulings_current_id');
    return savedId || activeExercises[0].id;
  });

  const [completedIds, setCompletedIds] = useState(() => {
    try {
      const saved = localStorage.getItem('menulings_completed');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  const currentExercise = activeExercises.find(ex => ex.id === currentId) || activeExercises[0];

  const [code, setCode] = useState(() => {
    const savedCode = localStorage.getItem(`menulings_code_${currentExercise.id}`);
    return savedCode !== null ? savedCode : currentExercise.initialCode;
  });

  const [testResult, setTestResult] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [showCliModal, setShowCliModal] = useState(false);
  const [showCertModal, setShowCertModal] = useState(false);
  const [showHint, setShowHint] = useState(false);

  // Mobile specific state
  const [mobileTab, setMobileTab] = useState('editor'); // 'editor' | 'preview' | 'terminal'
  const [showMobileExercises, setShowMobileExercises] = useState(false);

  const containerRef = useRef(null);

  // Sync state when exercise changes
  useEffect(() => {
    const savedCode = localStorage.getItem(`menulings_code_${currentExercise.id}`);
    setCode(savedCode !== null ? savedCode : currentExercise.initialCode);
    setTestResult(null);
    setShowHint(false);
    localStorage.setItem('menulings_current_id', currentExercise.id);
  }, [currentId]);

  // Persist code updates
  const handleCodeChange = (newCode) => {
    setCode(newCode);
    localStorage.setItem(`menulings_code_${currentExercise.id}`, newCode);
  };

  // Run DOM tests
  const handleRunTest = () => {
    if (!containerRef.current) return;
    setIsRunning(true);

    setTimeout(() => {
      const result = runExerciseTest(currentExercise, code, containerRef.current);
      setTestResult(result);
      setIsRunning(false);

      // On mobile screens, automatically show terminal tab when test completes
      if (window.innerWidth < 1024) {
        setMobileTab('terminal');
      }

      if (result.passed) {
        if (!completedIds.includes(currentExercise.id)) {
          const updated = [...completedIds, currentExercise.id];
          setCompletedIds(updated);
          localStorage.setItem('menulings_completed', JSON.stringify(updated));

          if (updated.length === activeExercises.length) {
            setShowCertModal(true);
          }
        }
      }
    }, 150);
  };

  // Reset exercise code
  const handleResetCode = () => {
    setCode(currentExercise.initialCode);
    localStorage.removeItem(`menulings_code_${currentExercise.id}`);
    setTestResult(null);
  };

  // Reset all progress
  const handleResetProgress = () => {
    if (window.confirm('Deseja realmente apagar todo o seu progresso no MenuMobileLings?')) {
      setCompletedIds([]);
      localStorage.removeItem('menulings_completed');
      activeExercises.forEach(ex => {
        localStorage.removeItem(`menulings_code_${ex.id}`);
      });
      setCode(currentExercise.initialCode);
      setTestResult(null);
    }
  };

  // Navigate to next exercise
  const currentIndex = activeExercises.findIndex(ex => ex.id === currentId);
  const hasNext = currentIndex < activeExercises.length - 1;

  const handleNextExercise = () => {
    if (hasNext) {
      setCurrentId(activeExercises[currentIndex + 1].id);
      setMobileTab('editor'); // Reset to editor tab on next exercise
    }
  };


  return (
    <div className="flex flex-col h-screen bg-slate-950 text-slate-100 font-sans overflow-hidden">
      {/* Top Navigation */}
      <Navbar
        completedCount={completedIds.length}
        totalCount={activeExercises.length}
        mode={mode}
        onChangeMode={handleModeChange}
        onOpenCli={() => setShowCliModal(true)}
        onResetProgress={handleResetProgress}
        onShowCert={() => setShowCertModal(true)}
        onOpenMobileExercises={() => setShowMobileExercises(true)}
      />

      {/* Main Workspace */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden relative">
        {/* Desktop Sidebar Navigation */}
        <div className="hidden lg:block h-full shrink-0">
          <ExerciseList
            exercises={activeExercises}
            currentId={currentId}
            completedIds={completedIds}
            onSelect={(id) => setCurrentId(id)}
          />
        </div>

        {/* Mobile Drawer Navigation Overlay */}
        {showMobileExercises && (
          <div className="fixed inset-0 z-50 lg:hidden flex">
            {/* Backdrop */}
            <div 
              className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm animate-fadeIn" 
              onClick={() => setShowMobileExercises(false)} 
            />
            {/* Drawer */}
            <div className="relative w-4/5 max-w-xs h-full z-10 animate-slideRight">
              <ExerciseList
                exercises={activeExercises}
                currentId={currentId}
                completedIds={completedIds}
                onSelect={(id) => setCurrentId(id)}
                onClose={() => setShowMobileExercises(false)}
              />
            </div>
          </div>
        )}

        {/* Content Layout */}
        <main className="flex-1 flex flex-col p-3 sm:p-4 gap-3 sm:gap-4 overflow-y-auto lg:overflow-hidden bg-slate-950 pb-20 lg:pb-4">
          
          {/* Exercise Info Card */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-3.5 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-lg">
            <div>
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <span className="bg-amber-500/10 border border-amber-500/30 text-amber-400 font-mono text-[10px] sm:text-[11px] font-bold px-2 py-0.5 rounded-md">
                  {currentExercise.category}
                </span>
                <h2 className="font-mono text-sm sm:text-base font-bold text-white">
                  {currentExercise.title}
                </h2>
              </div>
              <p className="text-xs text-slate-300">
                {currentExercise.description}
              </p>
            </div>

            {/* Status Indicator */}
            {completedIds.includes(currentExercise.id) && (
              <div className="flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-xs font-bold px-3 py-1.5 rounded-xl shrink-0 self-start sm:self-auto">
                <CheckCircle2 className="w-4 h-4" />
                <span>CONCLUÍDO</span>
              </div>
            )}
          </div>

          {/* Hint Drawer */}
          {showHint && (
            <div className="bg-amber-500/10 border border-amber-500/30 text-amber-300 p-3.5 sm:p-4 rounded-xl text-xs flex items-start justify-between gap-3 animate-fadeIn">
              <div className="flex items-start gap-2">
                <HelpCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold">Dica do Exercício:</span> {currentExercise.hint}
                </div>
              </div>
              <button 
                onClick={() => setShowHint(false)}
                className="text-amber-400 hover:text-white font-mono text-[11px] underline shrink-0"
              >
                Fechar
              </button>
            </div>
          )}

          {/* Mobile View Switcher Tabs (Visible on < lg) */}
          <div className="flex lg:hidden bg-slate-900/90 border border-slate-800 p-1 rounded-xl gap-1 shrink-0">
            <button
              onClick={() => setMobileTab('editor')}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-2 rounded-lg text-xs font-mono font-medium transition-all ${
                mobileTab === 'editor'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Code className="w-3.5 h-3.5" />
              <span>Código</span>
            </button>

            <button
              onClick={() => setMobileTab('preview')}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-2 rounded-lg text-xs font-mono font-medium transition-all ${
                mobileTab === 'preview'
                  ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>DOM</span>
            </button>

            <button
              onClick={() => setMobileTab('terminal')}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-2 rounded-lg text-xs font-mono font-medium transition-all relative ${
                mobileTab === 'terminal'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Terminal className="w-3.5 h-3.5 text-amber-400" />
              <span>Terminal</span>
              {testResult && (
                <span className={`w-2 h-2 rounded-full absolute top-1.5 right-1.5 ${testResult.passed ? 'bg-emerald-400' : 'bg-red-400'}`} />
              )}
            </button>
          </div>

          {/* Desktop Grid & Mobile Tabbed Panels */}
          <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-4 min-h-0">
            {/* Code Editor Panel */}
            <div className={`h-full min-h-[300px] lg:min-h-[340px] ${mobileTab === 'editor' ? 'block' : 'hidden lg:block'}`}>
              <CodeEditor
                code={code}
                onChange={handleCodeChange}
                onRun={handleRunTest}
                onReset={handleResetCode}
                onShowHint={() => setShowHint(!showHint)}
                isRunning={isRunning}
              />
            </div>

            {/* DOM Canvas Sandbox & Terminal split */}
            <div className={`flex flex-col gap-4 h-full min-h-[300px] lg:min-h-[340px] ${mobileTab !== 'editor' ? 'block flex-1' : 'hidden lg:flex'}`}>
              {/* DOM Live Preview */}
              <div className={`flex-1 min-h-[220px] ${mobileTab === 'preview' ? 'block h-full' : 'hidden lg:block'}`}>
                <DOMPreview
                  exercise={currentExercise}
                  userCode={code}
                  containerRef={containerRef}
                />
              </div>

              {/* Rustlings Styled Watch Terminal */}
              <div className={`h-full min-h-[240px] lg:h-52 ${mobileTab === 'terminal' ? 'block' : 'hidden lg:block'}`}>
                <RustlingsTerminal
                  result={testResult}
                  isRunning={isRunning}
                  onNextExercise={handleNextExercise}
                  hasNext={hasNext}
                />
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Mobile Sticky Bottom Action Bar */}
      <div className="fixed bottom-0 inset-x-0 bg-slate-900/95 border-t border-slate-800 p-2.5 flex items-center justify-around gap-2 lg:hidden z-40 backdrop-blur-md">
        <button
          onClick={() => setShowHint(!showHint)}
          className="flex items-center gap-1 bg-amber-500/10 text-amber-300 border border-amber-500/30 text-xs px-3 py-2 rounded-xl font-mono"
        >
          <HelpCircle className="w-4 h-4 text-amber-400" />
          <span>Dica</span>
        </button>

        <button
          onClick={handleRunTest}
          disabled={isRunning}
          className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 active:from-amber-400 active:to-amber-500 text-slate-950 font-mono font-bold text-xs py-2.5 px-4 rounded-xl shadow-lg shadow-amber-500/20 active:scale-95 disabled:opacity-50"
        >
          <Play className="w-4 h-4 fill-current" />
          <span>{isRunning ? 'Verificando...' : 'Executar Teste'}</span>
        </button>

        {testResult && testResult.passed && hasNext && (
          <button
            onClick={handleNextExercise}
            className="flex items-center gap-1.5 bg-emerald-500 active:bg-emerald-400 text-slate-950 font-mono font-bold text-xs px-3 py-2.5 rounded-xl shadow-lg shadow-emerald-500/20 animate-pulse"
          >
            <span>Próximo</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Modals */}
      <CliModal
        isOpen={showCliModal}
        onClose={() => setShowCliModal(false)}
      />

      <CertificateModal
        isOpen={showCertModal}
        onClose={() => setShowCertModal(false)}
        totalCount={activeExercises.length}
      />
    </div>
  );
}

