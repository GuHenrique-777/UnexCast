'use strict';

/* ============================================================
   DADOS EDITÁVEIS — substitua pelos dados reais da equipe.
   Deixe instagram/linkedin vazios ('') até ter as URLs reais.
   ============================================================ */
const participantes = [
  { nome: 'Nome completo', funcao: 'Função no episódio', foto: 'imagens/participante-1.jpg', instagram: '', linkedin: '' },
  { nome: 'Nome completo', funcao: 'Função no episódio', foto: 'imagens/participante-2.jpg', instagram: '', linkedin: '' },
  { nome: 'Nome completo', funcao: 'Função no episódio', foto: 'imagens/participante-3.jpg', instagram: '', linkedin: '' },
  { nome: 'Nome completo', funcao: 'Função no episódio', foto: 'imagens/participante-4.jpg', instagram: '', linkedin: '' }
];

const desenvolvedores = [
  { nome: 'Nome do desenvolvedor', funcao: 'Função no projeto', descricao: 'Breve descrição sobre a participação no desenvolvimento.', foto: 'imagens/dev-1.jpg', instagram: '', linkedin: '' },
  { nome: 'Nome do desenvolvedor', funcao: 'Função no projeto', descricao: 'Breve descrição sobre a participação no desenvolvimento.', foto: 'imagens/dev-2.jpg', instagram: '', linkedin: '' }
];

// Transcrição provisória: tempo em segundos + texto.
const transcricao = [
  { t: 0,   texto: 'Olá, sejam bem-vindos ao UNEXCast. Hoje vamos conversar sobre...' },
  { t: 144, texto: 'Para começar, eu gostaria de perguntar sobre a sua visão...' },
  { t: 252, texto: 'Muito interessante! E como você acredita que isso pode impactar...' }
];

/* ============================================================
   Funções auxiliares
   ============================================================ */
const $ = (seletor) => document.querySelector(seletor);

function formatarTempo(seg) {
  const m = String(Math.floor(seg / 60)).padStart(2, '0');
  const s = String(Math.floor(seg % 60)).padStart(2, '0');
  return `${m}:${s}`;
}

function criarRedes(pessoa) {
  const redes = [
    { id: 'insta', nome: 'Instagram', url: pessoa.instagram },
    { id: 'linkedin', nome: 'LinkedIn', url: pessoa.linkedin }
  ];
  return redes.map((r) => {
    const pendente = !r.url;
    const href = pendente ? '#' : r.url;
    const alvo = pendente ? '' : ' target="_blank" rel="noopener noreferrer"';
    const pend = pendente ? ' data-pendente' : '';
    const rotulo = `${r.nome} de ${pessoa.nome}${pendente ? ' (link a configurar)' : ''}`;
    return `<a href="${href}" aria-label="${rotulo}"${alvo}${pend}><svg aria-hidden="true"><use href="#i-${r.id}"/></svg></a>`;
  }).join('');
}

/* ============================================================
   Renderização dos cartões
   ============================================================ */
$('#listaParticipantes').innerHTML = participantes.map((p) => `
  <li class="part">
    <div class="foto"><img src="${p.foto}" alt="Foto de ${p.nome}" loading="lazy" data-oculta-se-falhar></div>
    <div class="part-info">
      <strong>${p.nome}</strong>
      <span>${p.funcao}</span>
      <div class="redes">${criarRedes(p)}</div>
    </div>
  </li>`).join('');

$('#listaDevs').innerHTML = desenvolvedores.map((d) => `
  <li class="dev">
    <div class="dev-foto"><img src="${d.foto}" alt="Foto de ${d.nome}" loading="lazy" data-oculta-se-falhar></div>
    <div>
      <strong>${d.nome}</strong>
      <p class="funcao">${d.funcao}</p>
      <p>${d.descricao}</p>
      <div class="redes">${criarRedes(d)}</div>
    </div>
  </li>`).join('');

const audio = $('#audio');
const video = $('#video');

$('#transcricao').innerHTML = transcricao.map((l, i) => `
  <li data-i="${i}"><button type="button" data-t="${l.t}">
    <time datetime="PT${l.t}S">${formatarTempo(l.t)}</time><span>${l.texto}</span>
  </button></li>`).join('');

/* Clicar em um trecho leva o áudio até aquele tempo */
$('#transcricao').addEventListener('click', (e) => {
  const btn = e.target.closest('button[data-t]');
  if (!btn) return;
  audio.currentTime = Number(btn.dataset.t);
  audio.play().catch(() => {});
});

/* Destaca o trecho atual enquanto o áudio toca */
audio.addEventListener('timeupdate', () => {
  let atual = 0;
  transcricao.forEach((l, i) => { if (audio.currentTime >= l.t) atual = i; });
  document.querySelectorAll('#transcricao li').forEach((li, i) => {
    li.classList.toggle('atual', i === atual && audio.currentTime > 0);
  });
});

/* ============================================================
   Menu e navegação
   ============================================================ */
const menuBtn = $('#menuBtn');
const menu = $('#menu');

function alternarMenu(abrir) {
  menu.classList.toggle('aberto', abrir);
  menuBtn.setAttribute('aria-expanded', abrir);
  menuBtn.setAttribute('aria-label', abrir ? 'Fechar menu' : 'Abrir menu');
}
menuBtn.addEventListener('click', () => alternarMenu(!menu.classList.contains('aberto')));
menu.addEventListener('click', (e) => { if (e.target.tagName === 'A') alternarMenu(false); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') alternarMenu(false); });

/* Link ativo conforme a seção visível */
const links = document.querySelectorAll('.menu a');
const observador = new IntersectionObserver((entradas) => {
  entradas.forEach((en) => {
    if (!en.isIntersecting) return;
    links.forEach((a) => {
      const ativo = a.getAttribute('href') === '#' + en.target.id;
      a.classList.toggle('ativo', ativo);
      if (ativo) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current');
    });
  });
}, { rootMargin: '-40% 0px -55% 0px' });
links.forEach((a) => {
  const alvo = document.querySelector(a.getAttribute('href'));
  if (alvo) observador.observe(alvo);
});

/* ============================================================
   Abas Transcrição / Legendas
   ============================================================ */
const abas = [$('#tab-transc'), $('#tab-leg')];
function selecionarAba(i) {
  abas.forEach((aba, j) => {
    const sel = i === j;
    aba.setAttribute('aria-selected', sel);
    aba.tabIndex = sel ? 0 : -1;
    document.getElementById(aba.getAttribute('aria-controls')).hidden = !sel;
  });
  abas[i].focus();
}
abas.forEach((aba, i) => {
  aba.addEventListener('click', () => selecionarAba(i));
  aba.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') selecionarAba((i + 1) % abas.length);
    if (e.key === 'ArrowLeft') selecionarAba((i - 1 + abas.length) % abas.length);
  });
});

/* Legendas no vídeo */
const trilha = $('#trilha').track;
trilha.mode = 'hidden';
$('#btnLegendas').addEventListener('click', (e) => {
  const ligar = trilha.mode !== 'showing';
  trilha.mode = ligar ? 'showing' : 'hidden';
  e.currentTarget.setAttribute('aria-pressed', ligar);
  e.currentTarget.textContent = ligar ? 'Desativar legendas no vídeo' : 'Ativar legendas no vídeo';
});

/* Transcrição completa */
$('#btnCompleta').addEventListener('click', (e) => {
  const aberta = $('#transcricao').classList.toggle('aberta');
  e.currentTarget.setAttribute('aria-expanded', aberta);
  e.currentTarget.textContent = aberta ? 'Recolher transcrição' : 'Ver transcrição completa';
  selecionarAba(0);
});

/* ============================================================
   Mídia
   ============================================================ */
const btnPlay = $('#videoPlay');
btnPlay.addEventListener('click', () => {
  video.controls = true;
  video.play().catch(() => {});
});
video.addEventListener('play', () => { btnPlay.classList.add('oculto'); video.controls = true; audio.pause(); });
video.addEventListener('pause', () => { if (video.ended) btnPlay.classList.remove('oculto'); });
audio.addEventListener('play', () => video.pause());

/* Avisos quando os arquivos ainda não existem */
audio.addEventListener('error', () => { $('#avisoAudio').hidden = false; });
video.querySelector('source').addEventListener('error', () => {
  $('#avisoVideo').hidden = false;
  btnPlay.classList.add('oculto');
});

/* ============================================================
   Imagens, links pendentes e ano
   ============================================================ */
document.querySelectorAll('img[data-oculta-se-falhar]').forEach((img) => {
  const ocultar = () => { img.style.display = 'none'; };
  img.addEventListener('error', ocultar);
  if (img.complete && img.naturalWidth === 0) ocultar();
});

document.addEventListener('click', (e) => {
  if (e.target.closest('a[data-pendente]')) e.preventDefault();
});

$('#ano').textContent = new Date().getFullYear();
