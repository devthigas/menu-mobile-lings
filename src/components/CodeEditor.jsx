import React, { useState, useRef } from 'react';
import Editor from '@monaco-editor/react';
import { Play, RotateCcw, HelpCircle, Code, Smartphone } from 'lucide-react';

const QUICK_SNIPPETS = [
  { label: 'document', value: 'document' },
  { label: '.getElementById()', value: "document.getElementById('')" },
  { label: '.querySelector()', value: "document.querySelector('')" },
  { label: '.querySelectorAll()', value: "document.querySelectorAll('')" },
  { label: '.addEventListener()', value: "addEventListener('click', (e) => {\n  \n})" },
  { label: '.createElement()', value: "document.createElement('')" },
  { label: '.textContent', value: ".textContent = ''" },
  { label: '.innerHTML', value: ".innerHTML = ''" },
  { label: '.style.', value: ".style." },
  { label: '.classList.add()', value: ".classList.add('')" },
  { label: '.remove()', value: ".remove()" },
  { label: '.closest()', value: ".closest('')" },
  { label: 'const', value: 'const ' },
  { label: '=>', value: ' => ' },
  { label: "''", value: "''" },
  { label: '""', value: '""' },
  { label: ';', value: ';' },
  { label: '{}', value: '{}' },
  { label: '()', value: '()' },
];

const QUICK_HTML_SNIPPETS = [
  { label: '<button>', value: '<button class="menu-toggle">Menu</button>' },
  { label: '<nav>', value: '<nav class="menu-nav">\n  \n</nav>' },
  { label: '<a>', value: '<a href="#" class="menu-link">Link</a>' },
  { label: 'class=""', value: 'class=""' },
  { label: '<span>', value: '<span class="bar bar-1"></span>' },
  { label: '<div>', value: '<div class="menu-overlay"></div>' },
  { label: 'aria-expanded', value: 'aria-expanded="false"' },
  { label: 'aria-label', value: 'aria-label="Abrir menu"' },
];

export function CodeEditor({ code, onChange, htmlCode, onHtmlChange, onRun, onReset, onShowHint, isRunning }) {
  const [activeTab, setActiveTab] = useState('js'); // 'js' | 'html'
  const editorRef = useRef(null);

  const handleEditorDidMount = (editor) => {
    editorRef.current = editor;
  };

  const currentCode = activeTab === 'html' ? htmlCode : code;
  const currentOnChange = activeTab === 'html' ? onHtmlChange : onChange;
  const currentSnippets = activeTab === 'html' ? QUICK_HTML_SNIPPETS : QUICK_SNIPPETS;

  // Insert code snippet at current selection or cursor position
  const handleInsertSnippet = (snippetText) => {
    if (!editorRef.current) {
      currentOnChange((currentCode || '') + snippetText);
      return;
    }
    const editor = editorRef.current;
    const selection = editor.getSelection();
    
    editor.executeEdits('mobile-quick-keyboard', [
      {
        range: selection,
        text: snippetText,
        forceMoveMarkers: true,
      },
    ]);
    editor.focus();
  };

  const handleKeyDown = (e) => {
    // Ctrl + Enter or Cmd + Enter to execute tests
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      onRun();
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
      {/* Editor Header / Toolbar */}
      <div className="bg-slate-950 px-3 sm:px-4 py-2 sm:py-2.5 border-b border-slate-800 flex flex-wrap items-center justify-between gap-2 min-h-[50px]">
        {/* Tabs HTML / JS */}
        <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => setActiveTab('html')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
              activeTab === 'html'
                ? 'bg-amber-500/20 text-amber-300 font-bold border border-amber-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Code className="w-3.5 h-3.5 text-amber-400" />
            <span>index.html</span>
          </button>

          <button
            onClick={() => setActiveTab('js')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
              activeTab === 'js'
                ? 'bg-amber-500/20 text-amber-300 font-bold border border-amber-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Code className="w-3.5 h-3.5 text-sky-400" />
            <span>script.js</span>
          </button>
        </div>

        {/* Action Buttons Toolbar */}
        <div className="flex items-center gap-2 shrink-0 ml-auto">
          <button
            onClick={onShowHint}
            className="flex items-center gap-1 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-300 text-xs px-2.5 py-1.5 rounded-lg transition-colors font-mono"
            title="Ver Dica"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span className="inline">Dica</span>
          </button>

          <button
            onClick={onReset}
            className="flex items-center gap-1 bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 text-xs px-2.5 py-1.5 rounded-lg transition-colors font-mono"
            title="Restaurar código inicial"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="inline">Restaurar</span>
          </button>

          <button
            onClick={onRun}
            disabled={isRunning}
            className="flex items-center gap-1.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs px-4 py-1.5 rounded-lg shadow-lg shadow-amber-500/20 transition-all font-mono active:scale-95 disabled:opacity-50 shrink-0"
            title="Executar testes do exercício (Ctrl + Enter)"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>{isRunning ? 'Verificando...' : 'Testar'}</span>
          </button>
        </div>
      </div>

      {/* Quick Mobile Keyboard Chips Bar */}
      <div className="bg-slate-950/90 border-b border-slate-800/80 px-2 py-1.5 flex items-center gap-1.5 overflow-x-auto no-scrollbar select-none">
        <div className="flex items-center text-[10px] font-mono text-amber-400/80 px-1 shrink-0 gap-1">
          <Smartphone className="w-3 h-3" />
          <span className="hidden sm:inline">Atalhos:</span>
        </div>
        {currentSnippets.map((snippet, idx) => (
          <button
            key={idx}
            onClick={() => handleInsertSnippet(snippet.value)}
            className="shrink-0 bg-slate-800/90 hover:bg-amber-500/20 active:bg-amber-500/40 text-amber-300 border border-slate-700/80 hover:border-amber-500/40 px-2 py-1 rounded text-[11px] font-mono transition-all touch-manipulation"
          >
            {snippet.label}
          </button>
        ))}
      </div>

      {/* Editor Body */}
      <div className="flex-1 min-h-[260px] sm:min-h-[300px] relative bg-[#1e1e1e]" onKeyDown={handleKeyDown}>
        <Editor
          key={activeTab}
          height="100%"
          defaultLanguage={activeTab === 'html' ? 'html' : 'javascript'}
          theme="vs-dark"
          value={currentCode}
          onMount={handleEditorDidMount}
          onChange={(val) => currentOnChange(val || '')}
          options={{
            fontSize: 13,
            fontFamily: "'Fira Code', 'JetBrains Mono', Consolas, monospace",
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            automaticLayout: true,
            tabSize: 2,
            wordWrap: 'on',
            lineNumbersMinChars: 3,
            padding: { top: 12, bottom: 12 },
            quickSuggestions: true,
            fixedOverflowWidgets: true,
            domReadOnly: false,
            folding: false
          }}
        />
      </div>
    </div>
  );
}

