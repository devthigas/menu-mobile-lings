import React, { useEffect } from 'react';
import { Award, X, Sparkles, CheckCircle2, Trophy } from 'lucide-react';
import confetti from 'canvas-confetti';

export function CertificateModal({ isOpen, onClose, totalCount }) {
  useEffect(() => {
    if (isOpen) {
      confetti({
        particleCount: 120,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border-2 border-amber-500/50 rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden text-center relative glow-amber">
        
        {/* Top Header graphic */}
        <div className="bg-gradient-to-br from-amber-500 via-orange-600 to-red-600 p-8 text-slate-950 flex flex-col items-center relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-slate-950/70 hover:text-slate-950 p-1 rounded-full hover:bg-black/10 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          
          <div className="bg-slate-950 text-amber-400 p-4 rounded-2xl shadow-xl mb-3 border border-amber-400/30">
            <Trophy className="w-12 h-12 stroke-[2.5]" />
          </div>

          <h2 className="font-mono font-black text-2xl tracking-tight text-slate-950 uppercase">
            Parabéns! Mestre do DOM
          </h2>
          <p className="text-xs text-slate-900 font-semibold mt-1">
            Você completou todos os {totalCount} exercícios do DOMlings!
          </p>
        </div>

        {/* Certificate Card Body */}
        <div className="p-8 space-y-6">
          <div className="bg-slate-950/80 border border-amber-500/30 rounded-2xl p-6 relative">
            <div className="flex justify-center mb-2">
              <Sparkles className="w-6 h-6 text-amber-400" />
            </div>
            <h3 className="font-serif italic text-lg text-slate-200">
              Certificado de Conclusão DOMlings
            </h3>
            <p className="text-xs text-slate-400 mt-2">
              Demonstrou domínio em seleção de nós, navegação na árvore DOM, alteração de estilos, manipulação de eventos e delegação de eventos em JavaScript.
            </p>
            <div className="mt-4 pt-4 border-t border-slate-800 flex justify-between items-center text-[10px] font-mono text-slate-500">
              <span>DATA: {new Date().toLocaleDateString('pt-BR')}</span>
              <span className="text-emerald-400 font-bold">✓ 100% VERIFICADO</span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-bold font-mono py-3 rounded-xl shadow-lg shadow-amber-500/20 transition-all text-sm"
          >
            Continuar Explorando
          </button>
        </div>
      </div>
    </div>
  );
}
