export const tabExercises = [
  {
    id: "tab_basic_active",
    title: "1. Toggle de Aba Ativa (Active State)",
    category: "Aba Básica",
    difficulty: "Fácil",
    description: "Adicione a lógica básica de clique para abas: ao clicar em um botão `.tab-btn`, remova a classe `'active'` de todas as abas e adicione-a apenas ao botão clicado. Faça o mesmo para os painéis de conteúdo `.tab-panel` correspondentes (usando o atributo `data-tab`).",
    hint: "Use `document.querySelectorAll('.tab-btn')` e `document.querySelectorAll('.tab-panel')`. Para cada botão, adicione um listener de 'click'. Ao clicar, remova 'active' de todos e adicione 'active' ao botão clicado e ao painel correspondente (ex: document.getElementById(btn.dataset.tab)).",
    initialHtml: `<div class="tabs-container">
  <div class="tabs-header flex gap-2 border-b border-slate-800 pb-2">
    <button class="tab-btn active px-4 py-2 rounded-lg text-slate-400 font-mono text-sm transition-colors duration-200" data-tab="tab1">Home</button>
    <button class="tab-btn px-4 py-2 rounded-lg text-slate-400 font-mono text-sm transition-colors duration-200" data-tab="tab2">Perfil</button>
    <button class="tab-btn px-4 py-2 rounded-lg text-slate-400 font-mono text-sm transition-colors duration-200" data-tab="tab3">Config</button>
  </div>
  <div class="tabs-body mt-4">
    <div class="tab-panel active hidden p-4 bg-slate-900 border border-slate-800 rounded-xl text-slate-300 font-mono text-xs" id="tab1">Painel Home</div>
    <div class="tab-panel hidden p-4 bg-slate-900 border border-slate-800 rounded-xl text-slate-300 font-mono text-xs" id="tab2">Painel Perfil</div>
    <div class="tab-panel hidden p-4 bg-slate-900 border border-slate-800 rounded-xl text-slate-300 font-mono text-xs" id="tab3">Painel Configurações</div>
  </div>
</div>
<style>
  .tab-btn.active { color: #f59e0b; background-color: rgba(245, 158, 11, 0.05); border: 1px solid rgba(245, 158, 11, 0.2); }
  .tab-btn:not(.active) { border: 1px solid transparent; }
  .tab-panel.active { display: block; }
</style>`,
    initialCode: `// EXERCÍCIO: tab_basic_active.js
// Implemente o alternador de abas simples mudando a classe 'active'

function solucao() {
  const buttons = document.querySelectorAll('.tab-btn');
  const panels = document.querySelectorAll('.tab-panel');

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      // TODO: Remova classe 'active' de botões e painéis, depois adicione ao botão clicado e painel correspondente

    });
  });
}

solucao();
`,
    test: (doc) => {
      const buttons = doc.querySelectorAll('.tab-btn');
      const panels = doc.querySelectorAll('.tab-panel');

      if (buttons.length < 3) return { pass: false, error: "Devem existir pelo menos 3 botões com a classe '.tab-btn'." };
      if (panels.length < 3) return { pass: false, error: "Devem existir pelo menos 3 painéis com a classe '.tab-panel'." };

      // Simulate click on second button (Perfil)
      buttons[1].click();

      if (!buttons[1].classList.contains('active')) {
        return { pass: false, error: "O segundo botão (.tab-btn) não recebeu a classe 'active' após o clique." };
      }
      if (buttons[0].classList.contains('active')) {
        return { pass: false, error: "O primeiro botão (.tab-btn) ainda tem a classe 'active' após clicar no segundo botão." };
      }
      if (!panels[1].classList.contains('active')) {
        return { pass: false, error: "O painel correspondente (tab2) não recebeu a classe 'active'." };
      }
      if (panels[0].classList.contains('active')) {
        return { pass: false, error: "O painel anterior (tab1) não perdeu a classe 'active'." };
      }

      return { pass: true, message: "Perfeito! Alternador básico de abas funcionando 100%!" };
    }
  },
  {
    id: "tab_sliding_underline",
    title: "2. Barra Deslizante Horizontal (Sliding Underline)",
    category: "Efeito Deslizante",
    difficulty: "Médio",
    description: "Faça com que uma barra de seleção `.indicator` se mova e se redimensione suavemente para ficar exatamente embaixo da aba ativa. Use `offsetLeft` e `offsetWidth` do botão ativo para calcular os estilos inline `left` e `width` do indicador.",
    hint: "Use `indicator.style.left = activeBtn.offsetLeft + 'px'` e `indicator.style.width = activeBtn.offsetWidth + 'px'`. Lembre-se de rodar essa função no início para a aba ativa padrão, e também ao clicar em qualquer aba.",
    initialHtml: `<div class="tabs-container relative">
  <div class="tabs-header flex gap-4 relative pb-2" style="position: relative;">
    <button class="tab-btn active px-4 py-2 font-mono text-sm text-slate-300 transition-colors z-10">Início</button>
    <button class="tab-btn px-4 py-2 font-mono text-sm text-slate-300 transition-colors z-10">Explore</button>
    <button class="tab-btn px-4 py-2 font-mono text-sm text-slate-300 transition-colors z-10">Biblioteca</button>
    
    <!-- Indicador deslizante com transição CSS -->
    <div class="indicator" style="position: absolute; bottom: 0; left: 0; height: 3px; width: 0; background-color: #f59e0b; border-radius: 9999px; transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);"></div>
  </div>
</div>
<style>
  .tab-btn.active { color: #f59e0b; }
  .tab-btn { background: none; border: none; cursor: pointer; }
</style>`,
    initialCode: `// EXERCÍCIO: tab_sliding_underline.js
// Atualize a posição (left) e largura (width) de '.indicator' dinamicamente

function solucao() {
  const btns = document.querySelectorAll('.tab-btn');
  const indicator = document.querySelector('.indicator');

  function atualizarIndicador(elementoAtivo) {
    if (!elementoAtivo) return;
    // TODO: Defina os estilos 'left' e 'width' do indicator em pixels baseados no elementoAtivo

  }

  // Inicializa o indicador no botão padrão ativo
  const inicialAtivo = document.querySelector('.tab-btn.active');
  atualizarIndicador(inicialAtivo);

  // Adiciona cliques para mover
  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      atualizarIndicador(btn);
    });
  });
}

solucao();
`,
    test: (doc) => {
      const indicator = doc.querySelector('.indicator');
      const buttons = doc.querySelectorAll('.tab-btn');

      if (!indicator) return { pass: false, error: "Elemento '.indicator' não encontrado." };
      if (buttons.length < 3) return { pass: false, error: "Botões de abas não encontrados." };

      // Trigger second button click
      buttons[1].click();

      const expectedLeft = buttons[1].offsetLeft + 'px';
      const expectedWidth = buttons[1].offsetWidth + 'px';

      if (indicator.style.left !== expectedLeft) {
        return { pass: false, error: `Estilo left do indicador esperado ser '${expectedLeft}', mas obteve '${indicator.style.left}'` };
      }
      if (indicator.style.width !== expectedWidth) {
        return { pass: false, error: `Estilo width do indicador esperado ser '${expectedWidth}', mas obteve '${indicator.style.width}'` };
      }

      return { pass: true, message: "Incrível! A barra indicadora desliza e escala dinamicamente!" };
    }
  },
  {
    id: "tab_morphing_pill",
    title: "3. Pílula Fluida de Fundo (Morphing Pill)",
    category: "Pílula de Fundo",
    difficulty: "Médio",
    description: "Crie um fundo do tipo 'pílula' (.pill-bg) que desliza atrás das abas. A pílula deve abraçar perfeitamente a aba ativa. Atualize os estilos inline `left` e `width` da pílula. Além disso, quando um botão estiver ativo, ele deve ter a classe `'active'` para atualizar sua cor para melhor contraste.",
    hint: "Similar ao exercício anterior, use `pillBg.style.left = activeBtn.offsetLeft + 'px'` e `pillBg.style.width = activeBtn.offsetWidth + 'px'`. Mude as classes para ativar o contraste de texto adequado.",
    initialHtml: `<div class="tabs-wrapper flex items-center bg-slate-900 border border-slate-800 p-1 rounded-2xl relative w-max">
  <button class="tab-btn active px-4 py-2 font-mono text-xs text-slate-400 font-semibold z-10 transition-colors duration-300">Resumo</button>
  <button class="tab-btn px-4 py-2 font-mono text-xs text-slate-400 font-semibold z-10 transition-colors duration-300">Detalhes</button>
  <button class="tab-btn px-4 py-2 font-mono text-xs text-slate-400 font-semibold z-10 transition-colors duration-300">Logs Completos</button>
  
  <!-- Pílula de fundo deslizante -->
  <div class="pill-bg" style="position: absolute; top: 4px; bottom: 4px; left: 0; width: 0; background-color: #f59e0b; border-radius: 12px; transition: all 0.3s cubic-bezier(0.25, 1, 0.5, 1); z-index: 1;"></div>
</div>
<style>
  .tab-btn { background: none; border: none; cursor: pointer; position: relative; z-index: 5; }
  .tab-btn.active { color: #020617; }
</style>`,
    initialCode: `// EXERCÍCIO: tab_morphing_pill.js
// Atualize left e width de '.pill-bg' e alterne classes de abas

function solucao() {
  const btns = document.querySelectorAll('.tab-btn');
  const pill = document.querySelector('.pill-bg');

  function atualizarPílula(btnAtivo) {
    if (!btnAtivo) return;
    // TODO: Defina pill.style.left e pill.style.width baseados em btnAtivo

  }

  const inicial = document.querySelector('.tab-btn.active');
  atualizarPílula(inicial);

  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      atualizarPílula(btn);
    });
  });
}

solucao();
`,
    test: (doc) => {
      const pill = doc.querySelector('.pill-bg');
      const buttons = doc.querySelectorAll('.tab-btn');

      if (!pill) return { pass: false, error: "Elemento '.pill-bg' não encontrado." };
      if (buttons.length < 3) return { pass: false, error: "Botões de abas não encontrados." };

      // Trigger third button click
      buttons[2].click();

      const expectedLeft = buttons[2].offsetLeft + 'px';
      const expectedWidth = buttons[2].offsetWidth + 'px';

      if (pill.style.left !== expectedLeft) {
        return { pass: false, error: `Estilo left da pílula esperado ser '${expectedLeft}', mas obteve '${pill.style.left}'` };
      }
      if (pill.style.width !== expectedWidth) {
        return { pass: false, error: `Estilo width da pílula esperado ser '${expectedWidth}', mas obteve '${pill.style.width}'` };
      }
      if (!buttons[2].classList.contains('active')) {
        return { pass: false, error: "O botão clicado não recebeu a classe 'active' para mudança de contraste." };
      }

      return { pass: true, message: "Sensacional! A pílula de fundo se move fluidamente com excelente legibilidade!" };
    }
  },
  {
    id: "tab_elastic_spring",
    title: "4. Efeito de Mola Física (Elastic Transition)",
    category: "Física de Animação",
    difficulty: "Avançado",
    description: "Crie uma física de mola elástica (spring) para o indicador de abas. Para isso, altere a propriedade `transition` da `.spring-indicator` via JavaScript ou CSS inline para usar uma curva de Bezier elástica: `all 0.45s cubic-bezier(0.68, -0.6, 0.32, 1.6)`. Adicione também uma mudança temporária de escala no eixo X (`transform: scaleX(1.3)`) sempre que o usuário trocar de aba para simular o efeito de 'esticar' com a velocidade, e remova esse transform temporário após a animação (200ms) voltando para `scaleX(1)`.",
    hint: "Use `indicator.style.transition = 'all 0.45s cubic-bezier(0.68, -0.6, 0.32, 1.6)'`. Ao clicar em um botão, mude o left/width do indicador e adicione `indicator.style.transform = 'scaleX(1.25)'`. Use `setTimeout(() => { indicator.style.transform = 'scaleX(1)'; }, 200)` para desfazer o esticamento.",
    initialHtml: `<div class="tabs-container relative">
  <div class="tabs-header flex gap-4 relative pb-2" style="position: relative;">
    <button class="tab-btn active px-4 py-2 font-mono text-sm text-slate-300 transition-colors z-10">Geral</button>
    <button class="tab-btn px-4 py-2 font-mono text-sm text-slate-300 transition-colors z-10">Segurança</button>
    <button class="tab-btn px-4 py-2 font-mono text-sm text-slate-300 transition-colors z-10">Notificações</button>
    
    <!-- Indicador elástico -->
    <div class="spring-indicator" style="position: absolute; bottom: 0; left: 0; height: 3px; width: 0; background-color: #f59e0b; border-radius: 9999px; transform-origin: center;"></div>
  </div>
</div>
<style>
  .tab-btn.active { color: #f59e0b; }
  .tab-btn { background: none; border: none; cursor: pointer; }
</style>`,
    initialCode: `// EXERCÍCIO: tab_elastic_spring.js
// Configure a transição cubic-bezier elástica e adicione o efeito de esticamento temporário

function solucao() {
  const btns = document.querySelectorAll('.tab-btn');
  const indicator = document.querySelector('.spring-indicator');

  // TODO: Configure a propriedade transition do indicator com o cubic-bezier elástico
  indicator.style.transition = 'all 0.45s cubic-bezier(0.68, -0.6, 0.32, 1.6)';

  function atualizarIndicador(btn) {
    if (!btn) return;
    indicator.style.left = btn.offsetLeft + 'px';
    indicator.style.width = btn.offsetWidth + 'px';

    // TODO: Adicione o efeito temporário de esticamento (scaleX(1.25))
    // e remova-o com setTimeout após 200ms

  }

  const inicial = document.querySelector('.tab-btn.active');
  atualizarIndicador(inicial);

  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      atualizarIndicador(btn);
    });
  });
}

solucao();
`,
    test: (doc) => {
      const indicator = doc.querySelector('.spring-indicator');
      const buttons = doc.querySelectorAll('.tab-btn');

      if (!indicator) return { pass: false, error: "Elemento '.spring-indicator' não encontrado." };
      
      const transitionVal = indicator.style.transition;
      if (!transitionVal.includes('0.68') && !transitionVal.includes('-0.6')) {
        return { pass: false, error: "A transição do indicador não possui a curva de Bezier elástica requerida (cubic-bezier(0.68, -0.6, ...))." };
      }

      // Click second button
      buttons[1].click();

      // Check scale active
      if (!indicator.style.transform.includes('scaleX') || indicator.style.transform === 'scaleX(1)') {
        // May have fired asynchronously, but let's check immediate state right after click
        const currentTransform = indicator.style.transform;
        if (!currentTransform.includes('scaleX')) {
          return { pass: false, error: "O indicador não recebeu o efeito temporário de esticamento (scaleX) no clique." };
        }
      }

      return { pass: true, message: "Sucesso! Animação física elástica configurada corretamente." };
    }
  },
  {
    id: "tab_fade_slide_content",
    title: "5. Transição de Conteúdo (Fade & Slide Panel)",
    category: "Transição de Conteúdo",
    difficulty: "Avançado",
    description: "Ao alternar entre as abas, faça com que os painéis de conteúdo `.tab-panel` apareçam com uma animação fluida de fade-in (opacidade de 0 a 1) combinada com um leve deslocamento vertical (slide-up). Você deve manipular as propriedades `opacity`, `transform` (ex: translate(0, 0) vs translate(0, 10px)) e `transition` dos painéis ativados.",
    hint: "Ao ativar um painel, coloque inicialmente `panel.style.opacity = '0'`, `panel.style.transform = 'translateY(10px)'` e defina `panel.style.transition = 'all 0.3s ease-out'`. Em seguida, para permitir que o navegador compute os estilos de início, use `requestAnimationFrame` ou um `setTimeout` de 10ms para definir `panel.style.opacity = '1'` e `panel.style.transform = 'translateY(0px)'`.",
    initialHtml: `<div class="tabs-container">
  <div class="tabs-header flex gap-2 border-b border-slate-800 pb-2">
    <button class="tab-btn active px-4 py-2 font-mono text-sm text-slate-400" data-panel="panel1">Geral</button>
    <button class="tab-btn px-4 py-2 font-mono text-sm text-slate-400" data-panel="panel2">Avançado</button>
  </div>
  <div class="tabs-body mt-4 relative min-h-[100px]">
    <div class="tab-panel active hidden p-4 bg-slate-900 border border-slate-800 rounded-xl text-slate-300 font-mono text-xs" id="panel1">Painel Geral: Configurações Básicas.</div>
    <div class="tab-panel hidden p-4 bg-slate-900 border border-slate-800 rounded-xl text-slate-300 font-mono text-xs" id="panel2">Painel Avançado: Opções de Desenvolvedor.</div>
  </div>
</div>
<style>
  .tab-btn.active { color: #f59e0b; font-weight: bold; }
  .tab-panel.active { display: block; }
</style>`,
    initialCode: `// EXERCÍCIO: tab_fade_slide_content.js
// Implemente uma transição de fade-in + slide-up suave no painel ativo

function solucao() {
  const btns = document.querySelectorAll('.tab-btn');
  const panels = document.querySelectorAll('.tab-panel');

  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const targetId = btn.dataset.panel;
      panels.forEach(p => {
        p.classList.remove('active');
        p.style.opacity = '0';
      });

      const activePanel = document.getElementById(targetId);
      activePanel.classList.add('active');

      // TODO: Configure o estado inicial de animação (translateY e opacity = 0)
      activePanel.style.opacity = '0';
      activePanel.style.transform = 'translateY(10px)';
      activePanel.style.transition = 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)';

      // TODO: Dispare o estado final (translateY e opacity = 1) no próximo frame de renderização
      setTimeout(() => {
        activePanel.style.opacity = '1';
        activePanel.style.transform = 'translateY(0px)';
      }, 20);
    });
  });
}

solucao();
`,
    test: (doc) => {
      const buttons = doc.querySelectorAll('.tab-btn');
      const panels = doc.querySelectorAll('.tab-panel');

      if (buttons.length < 2) return { pass: false, error: "Botões de aba não encontrados." };

      // Click the second button
      buttons[1].click();

      const activePanel = doc.getElementById('panel2');
      if (!activePanel.classList.contains('active')) {
        return { pass: false, error: "O painel correspondente não foi ativado." };
      }
      
      const transitionVal = activePanel.style.transition;
      if (!transitionVal || !transitionVal.includes('opacity') && !transitionVal.includes('transform') && !transitionVal.includes('all')) {
        return { pass: false, error: "O painel ativado não possui propriedade de transição configurada." };
      }

      return { pass: true, message: "Sensacional! As transições de conteúdo estão extremamente fluidas!" };
    }
  }
];
