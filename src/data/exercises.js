export const exercises = [
  {
    id: "menu01_html",
    title: "1. Estrutura HTML do Menu Mobile",
    category: "Estrutura HTML",
    difficulty: "Iniciante",
    description: "Para criar um menu mobile, precisamos de dois elementos básicos: um botão que o usuário clica para abrir/fechar (com a classe `menu-toggle`) e um contêiner de navegação para os links (com a classe `menu-nav` contendo os elementos `menu-link`). Crie esses elementos no HTML.",
    hint: "Crie um <button class=\"menu-toggle\">Menu</button> e depois um <nav class=\"menu-nav\"> com pelo menos três tags <a class=\"menu-link\"> (ex: Home, Projetos, Contato).",
    initialHtml: `<div class="container">
  <!-- TODO: Crie aqui o seu botão de toggle com a classe 'menu-toggle' -->

  <!-- TODO: Crie aqui o seu menu com a classe 'menu-nav' -->
  <!-- O menu deve conter links com a classe 'menu-link' -->
</div>

<style>
  .container {
    padding: 16px;
    background: #0f172a;
    border: 1px solid #1e293b;
    border-radius: 8px;
  }
  .menu-toggle {
    background: #f59e0b;
    color: #000;
    padding: 8px 16px;
    border-radius: 6px;
    font-family: monospace;
    font-weight: bold;
    border: none;
    cursor: pointer;
  }
  .menu-nav {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-top: 12px;
    padding: 12px;
    background: #1e293b;
    border-radius: 8px;
  }
  .menu-link {
    color: #cbd5e1;
    text-decoration: none;
    font-family: monospace;
    font-size: 14px;
  }
  .menu-link:hover {
    color: #f59e0b;
  }
</style>`,
    initialCode: `// EXERCÍCIO: menu01_html
// Não é necessário código JavaScript para este nível.
// Concentre-se em montar a estrutura HTML correta!

function solucao() {
  // Apenas retorne verdadeiro após estruturar o HTML
  return true;
}
solucao();
`,
    test: (doc) => {
      const toggle = doc.querySelector('.menu-toggle');
      const nav = doc.querySelector('.menu-nav');
      
      if (!toggle) {
        return { pass: false, error: "Não foi encontrado nenhum elemento com a classe '.menu-toggle'." };
      }
      if (!nav) {
        return { pass: false, error: "Não foi encontrado nenhum elemento com a classe '.menu-nav'." };
      }
      
      const links = nav.querySelectorAll('.menu-link');
      if (links.length < 3) {
        return { pass: false, error: `O menu '.menu-nav' deve conter pelo menos 3 links com a classe '.menu-link'. Encontrados: ${links.length}` };
      }
      
      return { pass: true, message: "Excelente! Estrutura HTML básica criada com sucesso!" };
    }
  },
  {
    id: "menu02_css",
    title: "2. Posicionamento e Ocultação com CSS",
    category: "Estilização CSS",
    difficulty: "Iniciante",
    description: "Em telas móveis, o menu normalmente fica posicionado fora da tela de forma fixa e desliza para dentro ao ser ativado. Configure o estilo do `.menu-nav` para ficar oculto 100% à direita (`transform: translateX(100%)`) de forma fixa e configure-o para deslizar de volta para `translateX(0)` quando possuir a classe `.open`.",
    hint: "Use `position: fixed; right: 0; top: 0; width: 250px; height: 100vh; transform: translateX(100%); transition: transform 0.3s ease-in-out;` para a classe `.menu-nav`, e `transform: translateX(0);` na classe combinada `.menu-nav.open`.",
    initialHtml: `<div class="app-mockup">
  <div class="header">
    <span class="logo">Meu Site</span>
    <button class="menu-toggle">Menu</button>
  </div>
  
  <nav class="menu-nav">
    <a href="#" class="menu-link">Home</a>
    <a href="#" class="menu-link">Sobre</a>
    <a href="#" class="menu-link">Serviços</a>
  </nav>

  <div class="content">
    Conteúdo principal do site. Adicione o CSS para esconder o menu lateral.
  </div>
</div>

<style>
  .app-mockup {
    position: relative;
    overflow: hidden;
    background: #0f172a;
    border: 1px solid #1e293b;
    border-radius: 8px;
    height: 300px;
    width: 100%;
  }
  .header {
    padding: 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #020617;
    border-bottom: 1px solid #1e293b;
  }
  .logo {
    font-size: 14px;
    font-weight: bold;
    font-family: monospace;
    color: #f59e0b;
  }
  .menu-toggle {
    padding: 4px 12px;
    background: #f59e0b;
    color: #020617;
    border-radius: 4px;
    font-family: monospace;
    font-size: 12px;
    font-weight: bold;
    border: none;
    cursor: pointer;
  }
  .content {
    padding: 24px;
    color: #94a3b8;
    font-size: 12px;
    font-family: monospace;
  }

  .menu-nav {
    position: absolute; /* Usamos absolute aqui para simular o fixed dentro do container de preview */
    top: 0;
    right: 0;
    width: 180px;
    height: 100%;
    background-color: #1e293b;
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 12px;
    z-index: 100;
    
    /* TODO: 1. Esconda o menu movendo-o 100% para a direita usando transform */
    
    /* TODO: 2. Configure a transição suave de 0.3s na propriedade transform */
    
  }

  /* TODO: 3. Quando o menu tiver a classe .open, mude o transform para que ele apareça na tela (translateX(0)) */
  
  
  .menu-link {
    color: #f1f5f9;
    text-decoration: none;
    font-family: monospace;
    font-size: 13px;
    border-bottom: 1px solid #334155;
    padding-bottom: 6px;
  }
</style>`,
    initialCode: `// EXERCÍCIO: menu02_css
// Não é necessário JavaScript para este desafio.
// Foco no CSS transform e transition!

function solucao() {
  return true;
}
solucao();
`,
    test: (doc) => {
      const nav = doc.querySelector('.menu-nav');
      if (!nav) return { pass: false, error: "Elemento '.menu-nav' não encontrado." };
      
      const style = window.getComputedStyle(nav);
      
      nav.classList.add('open');
      const openStyle = window.getComputedStyle(nav);
      const openTransform = openStyle.transform || openStyle.webkitTransform;
      nav.classList.remove('open');
      
      const transitionProp = style.transition || style.transitionProperty;
      if (!transitionProp.includes('transform') && !transitionProp.includes('all')) {
        return { pass: false, error: "A propriedade transition do '.menu-nav' deve aplicar-se à propriedade 'transform' ou 'all'." };
      }
      
      return { pass: true, message: "Perfeito! O menu está posicionado de forma absoluta/fixa e pronto para deslizar com classe .open!" };
    }
  },
  {
    id: "menu03_js",
    title: "3. Interação com JavaScript (Toggle Event)",
    category: "Interatividade JS",
    difficulty: "Médio",
    description: "Adicione interatividade ao botão. Ao clicar em `.menu-toggle`, a classe `.open` deve ser alternada (adicionada/removida) no `.menu-nav` para abrir e fechar o menu.",
    hint: "Selecione `.menu-toggle` e `.menu-nav`. Use `toggleBtn.addEventListener('click', () => { menu.classList.toggle('open'); })`.",
    initialHtml: `<div class="app-mockup">
  <div class="header">
    <span class="logo">Meu Site</span>
    <button class="menu-toggle">Menu</button>
  </div>
  
  <nav class="menu-nav">
    <a href="#" class="menu-link">Home</a>
    <a href="#" class="menu-link">Sobre</a>
  </nav>
</div>

<style>
  .app-mockup {
    position: relative;
    overflow: hidden;
    background: #0f172a;
    border: 1px solid #1e293b;
    border-radius: 8px;
    height: 280px;
    width: 100%;
  }
  .header {
    padding: 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #020617;
    border-bottom: 1px solid #1e293b;
  }
  .logo {
    font-size: 14px;
    font-weight: bold;
    font-family: monospace;
    color: #f59e0b;
  }
  .menu-toggle {
    padding: 4px 12px;
    background: #f59e0b;
    color: #020617;
    border-radius: 4px;
    font-family: monospace;
    font-size: 12px;
    font-weight: bold;
    border: none;
    cursor: pointer;
  }
  .menu-nav {
    position: absolute;
    top: 0;
    right: 0;
    width: 150px;
    height: 100%;
    background-color: #1e293b;
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 12px;
    z-index: 100;
    transform: translateX(100%);
    transition: transform 0.25s ease-in-out;
  }
  .menu-nav.open {
    transform: translateX(0);
  }
  .menu-link {
    color: #f1f5f9;
    text-decoration: none;
    font-family: monospace;
    font-size: 13px;
  }
</style>`,
    initialCode: `// EXERCÍCIO: menu03_js
// Selecione o botão e o menu, e alterne a classe 'open' no clique!

function solucao() {
  const toggleBtn = document.querySelector('.menu-toggle');
  const menu = document.querySelector('.menu-nav');

  // TODO: Adicione o ouvinte de evento 'click' para alternar a classe 'open' no menu
  
}

solucao();
`,
    test: (doc) => {
      const btn = doc.querySelector('.menu-toggle');
      const menu = doc.querySelector('.menu-nav');
      
      if (!btn) return { pass: false, error: "Botão '.menu-toggle' não encontrado." };
      if (!menu) return { pass: false, error: "Menu '.menu-nav' não encontrado." };
      
      btn.click();
      if (!menu.classList.contains('open')) {
        return { pass: false, error: "Ao clicar no botão, a classe 'open' não foi adicionada ao menu." };
      }
      
      btn.click();
      if (menu.classList.contains('open')) {
        return { pass: false, error: "No segundo clique, a classe 'open' deve ser removida do menu." };
      }
      
      return { pass: true, message: "Parabéns! O menu agora abre e fecha dinamicamente no clique." };
    }
  },
  {
    id: "menu04_hamburger",
    title: "4. Animação do Botão Hambúrguer",
    category: "CSS & JS Avançado",
    difficulty: "Médio",
    description: "Um botão de menu mobile profissional se transforma em um 'X' quando o menu está aberto. Crie as 3 barras internas e anime-as usando CSS transitions adicionando a classe `open` tanto no menu quanto no próprio botão de toggle.",
    hint: "Use `transform: translateY(9px) rotate(45deg);` na bar-1, `opacity: 0;` na bar-2 e `transform: translateY(-9px) rotate(-45deg);` na bar-3 quando o botão `.menu-toggle` possuir a classe `.open`.",
    initialHtml: `<div class="app-mockup">
  <div class="header">
    <span class="logo">Meu Site</span>
    
    <button class="menu-toggle">
      <!-- Três barras para o hamburger -->
      <span class="bar bar-1"></span>
      <span class="bar bar-2"></span>
      <span class="bar bar-3"></span>
    </button>
  </div>
  
  <nav class="menu-nav">
    <a href="#" class="menu-link">Home</a>
    <a href="#" class="menu-link">Sobre</a>
  </nav>
</div>

<style>
  .app-mockup {
    position: relative;
    overflow: hidden;
    background: #0f172a;
    border: 1px solid #1e293b;
    border-radius: 8px;
    height: 280px;
    width: 100%;
  }
  .header {
    padding: 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #020617;
    border-bottom: 1px solid #1e293b;
  }
  .logo {
    font-size: 14px;
    font-weight: bold;
    font-family: monospace;
    color: #f59e0b;
  }
  .menu-toggle {
    background: none;
    border: none;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    gap: 6px;
    padding: 4px;
    z-index: 110;
    position: relative;
  }
  .bar {
    width: 28px;
    height: 3px;
    background-color: #f59e0b;
    border-radius: 2px;
    transition: all 0.3s ease-in-out;
  }
  
  /* Animações ao abrir (quando .menu-toggle possuir a classe .open) */
  /* TODO: 1. Faça a barra 1 rotacionar 45deg e descer 9px no eixo Y */
  
  /* TODO: 2. Faça a barra 2 desaparecer (opacity 0) */
  
  /* TODO: 3. Faça a barra 3 rotacionar -45deg e subir 9px no eixo Y (negativo) */


  .menu-nav {
    position: absolute;
    top: 0;
    right: 0;
    width: 150px;
    height: 100%;
    background-color: #1e293b;
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 12px;
    z-index: 100;
    transform: translateX(100%);
    transition: transform 0.3s ease-in-out;
  }
  .menu-nav.open {
    transform: translateX(0);
  }
  .menu-link {
    color: #f1f5f9;
    text-decoration: none;
    font-family: monospace;
  }
</style>`,
    initialCode: `// EXERCÍCIO: menu04_hamburger
// Certifique-se de adicionar a classe 'open' em AMBOS (.menu-toggle e .menu-nav) ao clicar!

function solucao() {
  const toggleBtn = document.querySelector('.menu-toggle');
  const menu = document.querySelector('.menu-nav');

  // TODO: Adicione o clique para colocar a classe 'open' tanto no toggleBtn quanto no menu
  
}

solucao();
`,
    test: (doc) => {
      const btn = doc.querySelector('.menu-toggle');
      const menu = doc.querySelector('.menu-nav');
      
      if (!btn) return { pass: false, error: "Botão '.menu-toggle' não encontrado." };
      if (!menu) return { pass: false, error: "Menu '.menu-nav' não encontrado." };
      
      btn.click();
      
      if (!btn.classList.contains('open')) {
        return { pass: false, error: "A classe 'open' não foi adicionada ao botão '.menu-toggle' para iniciar as animações CSS." };
      }
      if (!menu.classList.contains('open')) {
        return { pass: false, error: "A classe 'open' não foi adicionada ao menu '.menu-nav'." };
      }
      
      const bar2 = doc.querySelector('.bar-2');
      const bar2Style = window.getComputedStyle(bar2);
      if (parseFloat(bar2Style.opacity) !== 0) {
        return { pass: false, error: "A barra do meio '.bar-2' deveria ter opacity = 0 quando o menu estivesse aberto (.open)." };
      }
      
      return { pass: true, message: "Incrível! O ícone de hambúrguer se transforma suavemente em um 'X'!" };
    }
  },
  {
    id: "menu05_accessibility",
    title: "5. Acessibilidade (ARIA) e Trava de Scroll",
    category: "Acessibilidade & UX",
    difficulty: "Avançado",
    description: "UX e Acessibilidade importam! Altere o atributo `aria-expanded` (true/false) e o `aria-label` do botão. Além disso, impeça a rolagem da página ao adicionar a classe `.no-scroll` ao `body` quando o menu estiver aberto.",
    hint: "Use `btn.setAttribute('aria-expanded', isOpen.toString())` e `document.body.classList.toggle('no-scroll', isOpen)`.",
    initialHtml: `<div class="app-mockup">
  <div class="header">
    <span class="logo">Acessível</span>
    
    <button class="menu-toggle" aria-expanded="false" aria-label="Abrir menu">
      Menu
    </button>
  </div>
  
  <nav class="menu-nav">
    <a href="#" class="menu-link">Home</a>
    <a href="#" class="menu-link">Sobre</a>
  </nav>
</div>

<style>
  .app-mockup {
    position: relative;
    overflow: hidden;
    background: #0f172a;
    border: 1px solid #1e293b;
    border-radius: 8px;
    height: 280px;
    width: 100%;
  }
  .header {
    padding: 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #020617;
    border-bottom: 1px solid #1e293b;
  }
  .logo {
    font-size: 14px;
    font-weight: bold;
    font-family: monospace;
    color: #f59e0b;
  }
  .menu-toggle {
    padding: 4px 12px;
    background: #f59e0b;
    color: #020617;
    border-radius: 4px;
    font-family: monospace;
    font-size: 12px;
    font-weight: bold;
    border: none;
    cursor: pointer;
  }
  .menu-nav {
    position: absolute;
    top: 0;
    right: 0;
    width: 150px;
    height: 100%;
    background-color: #1e293b;
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 12px;
    z-index: 100;
    transform: translateX(100%);
    transition: transform 0.25s ease;
  }
  .menu-nav.open {
    transform: translateX(0);
  }
  .menu-link {
    color: #f1f5f9;
    text-decoration: none;
    font-family: monospace;
  }
</style>`,
    initialCode: `// EXERCÍCIO: menu05_accessibility
// Atualize aria-expanded (como string 'true'/'false'), aria-label e impeça o scroll do body.

function solucao() {
  const btn = document.querySelector('.menu-toggle');
  const menu = document.querySelector('.menu-nav');

  btn.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('open');
    btn.classList.toggle('open', isOpen);
    
    // TODO: 1. Altere o atributo 'aria-expanded' do botão para o valor string correspondente ('true' ou 'false')
    
    // TODO: 2. Altere o 'aria-label' para 'Fechar menu' (se aberto) ou 'Abrir menu' (se fechado)
    
    // TODO: 3. Altere a classe 'no-scroll' no document.body (adicione se estiver aberto, remova se estiver fechado)
    
  });
}

solucao();
`,
    test: (doc) => {
      const btn = doc.querySelector('.menu-toggle');
      const menu = doc.querySelector('.menu-nav');
      
      if (!btn) return { pass: false, error: "Botão '.menu-toggle' não encontrado." };
      if (!menu) return { pass: false, error: "Menu '.menu-nav' não encontrado." };
      
      btn.click();
      
      if (btn.getAttribute('aria-expanded') !== 'true') {
        return { pass: false, error: "Ao abrir o menu, o atributo 'aria-expanded' deve ser 'true'." };
      }
      if (btn.getAttribute('aria-label') !== 'Fechar menu') {
        return { pass: false, error: "Ao abrir o menu, o atributo 'aria-label' deve ser 'Fechar menu'." };
      }
      
      if (!doc.body.classList.contains('no-scroll')) {
        return { pass: false, error: "A classe 'no-scroll' deve ser adicionada ao body quando o menu estiver aberto." };
      }
      
      btn.click();
      if (btn.getAttribute('aria-expanded') !== 'false') {
        return { pass: false, error: "Ao fechar o menu, o atributo 'aria-expanded' deve retornar para 'false'." };
      }
      if (btn.getAttribute('aria-label') !== 'Abrir menu') {
        return { pass: false, error: "Ao fechar o menu, o atributo 'aria-label' deve retornar para 'Abrir menu'." };
      }
      if (doc.body.classList.contains('no-scroll')) {
        return { pass: false, error: "A classe 'no-scroll' deve ser removida do body quando o menu estiver fechado." };
      }
      
      return { pass: true, message: "Excepcional! Acessibilidade impecável e experiência de usuário limpa!" };
    }
  },
  {
    id: "menu06_overlay",
    title: "6. Fechando ao clicar Fora (Overlay) e Links",
    category: "Finalização UX",
    difficulty: "Avançado",
    description: "Para concluir nosso menu mobile com chave de ouro, o menu deve fechar automaticamente ao clicar em um link interno ou ao clicar na área escura (Overlay) de fundo.",
    hint: "Adicione ouvintes de clique ao overlay e a cada um dos links que chamam a função de fechar.",
    initialHtml: `<div class="app-mockup">
  <div class="header">
    <span class="logo">Site Completo</span>
    
    <button class="menu-toggle">Menu</button>
  </div>
  
  <!-- Overlay escuro -->
  <div class="menu-overlay"></div>
  
  <nav class="menu-nav">
    <a href="#" class="menu-link">Home</a>
    <a href="#" class="menu-link">Sobre</a>
    <a href="#" class="menu-link">Contato</a>
  </nav>
</div>

<style>
  .app-mockup {
    position: relative;
    overflow: hidden;
    background: #0f172a;
    border: 1px solid #1e293b;
    border-radius: 8px;
    height: 280px;
    width: 100%;
  }
  .header {
    padding: 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #020617;
    border-bottom: 1px solid #1e293b;
  }
  .logo {
    font-size: 14px;
    font-weight: bold;
    font-family: monospace;
    color: #f59e0b;
  }
  .menu-toggle {
    padding: 4px 12px;
    background: #f59e0b;
    color: #020617;
    border-radius: 4px;
    font-family: monospace;
    font-size: 12px;
    font-weight: bold;
    border: none;
    cursor: pointer;
  }
  .menu-overlay {
    position: absolute;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.6);
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.25s ease;
    z-index: 40;
  }
  .menu-overlay.open {
    opacity: 1;
    pointer-events: auto;
  }
  .menu-nav {
    position: absolute;
    top: 0;
    right: 0;
    width: 150px;
    height: 100%;
    background-color: #1e293b;
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 12px;
    z-index: 100;
    transform: translateX(100%);
    transition: transform 0.25s ease;
  }
  .menu-nav.open {
    transform: translateX(0);
  }
  .menu-link {
    color: #f1f5f9;
    text-decoration: none;
    font-family: monospace;
  }
</style>`,
    initialCode: `// EXERCÍCIO: menu06_overlay
// Feche o menu clicando no overlay ou nos links do menu.

function solucao() {
  const btn = document.querySelector('.menu-toggle');
  const menu = document.querySelector('.menu-nav');
  const overlay = document.querySelector('.menu-overlay');
  const links = document.querySelectorAll('.menu-link');

  function fecharMenu() {
    menu.classList.remove('open');
    btn.classList.remove('open');
    overlay.classList.remove('open');
  }

  btn.addEventListener('click', () => {
    menu.classList.toggle('open');
    btn.classList.toggle('open');
    overlay.classList.toggle('open');
  });

  // TODO: 1. Adicione evento de clique no 'overlay' para chamar a função fecharMenu
  

  // TODO: 2. Adicione evento de clique em cada um dos 'links' para também chamar a função fecharMenu
  
}

solucao();
`,
    test: (doc) => {
      const btn = doc.querySelector('.menu-toggle');
      const menu = doc.querySelector('.menu-nav');
      const overlay = doc.querySelector('.menu-overlay');
      const links = doc.querySelectorAll('.menu-link');
      
      if (!btn || !menu || !overlay || links.length === 0) {
        return { pass: false, error: "Elementos necessários (.menu-toggle, .menu-nav, .menu-overlay, .menu-link) não encontrados." };
      }
      
      btn.click();
      if (!menu.classList.contains('open')) {
        return { pass: false, error: "O botão de menu não abriu o menu no teste." };
      }
      
      overlay.click();
      if (menu.classList.contains('open')) {
        return { pass: false, error: "Clicar no overlay deveria ter removido a classe 'open' do menu." };
      }
      
      btn.click();
      
      links[0].click();
      if (menu.classList.contains('open')) {
        return { pass: false, error: "Clicar em um link (.menu-link) deveria ter fechado o menu." };
      }
      
      return { pass: true, message: "Perfeito! Você construiu um menu mobile completo, interativo, acessível e com excelente usabilidade!" };
    }
  }
];
