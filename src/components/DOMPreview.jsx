import React, { useState, useEffect, useRef } from 'react';
import { Eye, Code2, Layers, RefreshCw } from 'lucide-react';

function renderLivePreview(userHtml, userCode, containerEl) {
  if (!containerEl) return;
  try {
    containerEl.innerHTML = userHtml || '';
    if (userCode) {
      const scopedDoc = {
        getElementById: (id) => containerEl.querySelector(`#${id}`),
        querySelector: (selector) => containerEl.querySelector(selector),
        querySelectorAll: (selector) => containerEl.querySelectorAll(selector),
        getElementsByClassName: (className) => containerEl.getElementsByClassName(className),
        getElementsByTagName: (tagName) => containerEl.getElementsByTagName(tagName),
        createElement: (tagName) => document.createElement(tagName),
        body: containerEl,
        defaultView: window,
        addEventListener: (...args) => containerEl.addEventListener(...args),
        removeEventListener: (...args) => containerEl.removeEventListener(...args)
      };

      const runCode = new Function('document', 'console', 'window', `
        try {
          ${userCode}
        } catch (err) {
          // Silent catch for live preview typing syntax errors
        }
      `);

      runCode(scopedDoc, console, window);
    }
  } catch (e) {
    // Ignore top-level parse errors while user is actively typing
  }
}

export function DOMPreview({ exercise, userCode, userHtml, containerRef }) {
  const [activeTab, setActiveTab] = useState('visual'); // 'visual' | 'html'
  const [domHtml, setDomHtml] = useState('');

  // Update HTML string whenever containerRef changes
  const updateHtmlView = () => {
    if (containerRef.current) {
      setDomHtml(containerRef.current.innerHTML);
    }
  };

  useEffect(() => {
    if (containerRef.current) {
      // Live render user's HTML and JS instantly!
      renderLivePreview(userHtml !== undefined ? userHtml : exercise.initialHtml, userCode, containerRef.current);
      updateHtmlView();

      // Observe DOM mutations to dynamically update live HTML view!
      const observer = new MutationObserver(() => updateHtmlView());
      observer.observe(containerRef.current, {
        attributes: true,
        childList: true,
        subtree: true,
        characterData: true
      });
      return () => observer.disconnect();
    }
  }, [exercise, userCode, userHtml, containerRef]);

  return (
    <div className="flex flex-col h-full bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
      {/* Header */}
      <div className="bg-slate-950 px-4 py-3 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-sky-400" />
          <span className="font-mono text-xs text-slate-300 font-semibold">
            Visualização do DOM em Tempo Real
          </span>
        </div>

        {/* View Mode Toggle */}
        <div className="flex bg-slate-900 p-0.5 rounded-lg border border-slate-800">
          <button
            onClick={() => setActiveTab('visual')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-mono transition-colors ${
              activeTab === 'visual'
                ? 'bg-slate-800 text-sky-400 font-semibold shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Renderizado</span>
          </button>

          <button
            onClick={() => {
              updateHtmlView();
              setActiveTab('html');
            }}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-mono transition-colors ${
              activeTab === 'html'
                ? 'bg-slate-800 text-sky-400 font-semibold shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>Inspetor HTML</span>
          </button>
        </div>
      </div>

      {/* Content Canvas */}
      <div className="flex-1 p-4 bg-slate-950/60 overflow-auto relative">
        {activeTab === 'visual' ? (
          <div className="h-full flex flex-col">
            <div className="text-[11px] font-mono text-slate-500 mb-2 flex items-center justify-between">
              <span>Área de Renderização do Navegador:</span>
              <span className="text-amber-500/80">document.body / #app</span>
            </div>

            {/* Target DOM Element Mount point */}
            <div className="flex-1 bg-slate-900/90 border border-slate-800 rounded-xl p-6 shadow-inner flex flex-col justify-center items-center">
              <div 
                ref={containerRef}
                className="dom-sandbox-target w-full max-w-md bg-slate-950 p-6 rounded-xl border border-slate-800 text-slate-100 font-sans shadow-lg prose prose-invert"
              />
            </div>
          </div>
        ) : (
          <div className="h-full flex flex-col font-mono text-xs">
            <div className="text-[11px] font-mono text-slate-500 mb-2">
              Estrutura da Árvore de Nós (DOM HTML):
            </div>
            <pre className="flex-1 bg-slate-900 border border-slate-800 p-4 rounded-xl text-emerald-400 overflow-auto font-mono">
              {domHtml || '<!-- DOM Vazio -->'}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
