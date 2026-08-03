import React, { useState } from 'react';
import { X, Terminal, Copy, Check, ExternalLink } from 'lucide-react';

export function CliModal({ isOpen, onClose }) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const cliInstructions = `
# Executando o MenuMobileLings no Terminal

1. Navegue até a pasta do repositório:
   cd menu-mobile-lings

2. Instale as dependências (requer Node 18+):
   npm install

3. Inicie o watcher interativo no seu terminal:
   npx domlings watch

   # Ou rode um exercício específico:
   npx domlings run menu01_html
`.trim();

  const handleCopy = () => {
    navigator.clipboard.writeText(cliInstructions);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-xl shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="bg-slate-950 px-6 py-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2 text-amber-400 font-mono font-bold text-sm">
            <Terminal className="w-5 h-5" />
            <span>Modo Terminal (CLI Rustlings)</span>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-4">
          <p className="text-sm text-slate-300 leading-relaxed">
            Se você prefere resolver os exercícios no seu editor de código local (VS Code, Neovim, etc) com um <span className="font-mono text-amber-400">watcher</span> no terminal (exatamente como o rustlings original), você pode executar no Node.js!
          </p>

          {/* Code Block */}
          <div className="relative bg-slate-950 border border-slate-800 rounded-xl p-4 font-mono text-xs text-slate-200">
            <button
              onClick={handleCopy}
              className="absolute top-3 right-3 p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition-colors flex items-center gap-1 text-[11px]"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copiado!' : 'Copiar'}</span>
            </button>
            <pre className="whitespace-pre-wrap">{cliInstructions}</pre>
          </div>

          <div className="bg-amber-500/10 border border-amber-500/20 p-4 rounded-xl text-xs text-amber-300 space-y-1">
            <p className="font-bold">💡 Como funciona o watcher no terminal?</p>
            <p className="text-slate-300">
              Ele monitora o arquivo do exercício em tempo real. A cada salvamento (`Ctrl + S`), ele re-executa a validação do DOM e imprime o relatório em cores no seu terminal!
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-950 px-6 py-3 border-t border-slate-800 text-right">
          <button
            onClick={onClose}
            className="bg-slate-800 hover:bg-slate-700 text-slate-200 px-4 py-2 rounded-xl text-xs font-semibold font-mono transition-colors"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
}
