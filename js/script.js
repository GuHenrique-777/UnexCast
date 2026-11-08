'use strict';

/* Funções auxiliares */
const $ = (seletor) => document.querySelector(seletor);

function formatarCapitulo(segundos) {
    const horas = Math.floor(segundos / 3600);
    const minutos = Math.floor((segundos % 3600) / 60);
    const segundosRestantes = segundos % 60;

    if (horas > 0) {
        return `${horas}:${String(minutos).padStart(2, '0')}:${String(segundosRestantes).padStart(2, '0')}`;
    }

    return `${String(minutos).padStart(2, '0')}:${String(segundosRestantes).padStart(2, '0')}`;
}

/* ============================================================
   DADOS EDITÁVEIS — substitua pelos dados reais da equipe.
   Deixe instagram/linkedin vazios ('') até ter as URLs reais.
   ============================================================ */
const participantes = [
  { nome: 'Lucas Santos Sousa', funcao: 'Apresentador e condutor do debate.', descricao: 'Estudante de Sistemas de Informação na UNEX e fundador do Atrix, startup de tecnologia: um app de produtividade gamificada criado com inteligência artificial.', foto: 'imagens/participante-1.jpg', instagram: 'https://www.instagram.com/llucasalk?exln=cnkzcjB4eXBoMWZy', linkedin: '' },
  { nome: 'Luiz Carlos Bizerra Fernandes', funcao: 'Apresentador e mediador do episódio.', descricao: 'Estudante de Sistemas de Informação na UNEX. Trabalha com marketing.', foto: 'imagens/participante-2.jpg', instagram: 'https://www.instagram.com/luiixcarlos?rpxt=MTNsYzYyYnZxamlzcw==', linkedin: '' },
  { nome: 'Lázaro Oliveira', funcao: 'Convidado do debate sobre inteligência artificial.', descricao: 'Estudante de Jornalismo. Foi bolsista do site Avoador, da UESB, por dois anos e hoje está no Mais Esporte, que transmite o futebol amador de Vitória da Conquista. Faz reportagens com artistas locais e já cobriu o FIB e o JUC.', foto: 'imagens/participante-3.jpg', instagram: 'https://www.instagram.com/lazaro.os7?exln=ZjNpb29zbHBrMzhz', linkedin: '' },
  { nome: 'Luan Pereira', funcao: 'Convidado para discutir os impactos da IA na sociedade.', descricao: 'Estudante de Jornalismo e bolsista há dois anos do site Avoador, da UESB. Também está no Mais Esporte e já cobriu o FIB, o JUC e a Anicon. Disputou, com Lázaro, o Prêmio Abapa de Jornalismo.', foto: 'imagens/participante-4.jpg', instagram: 'https://www.instagram.com/o_luanp?dlrf=MWV4am93czR1aWowYg==', linkedin: '' }
];

const desenvolvedores = [
  { nome: 'Washington Daniel Rodrigues Cruz', funcao: 'Desenvolvimento e estruturação do site', descricao: 'Responsável pela criação da estrutura do projeto, organização das pastas, desenvolvimento da interface e definição do design visual do site.', foto: 'imagens/dev-1.jpg', instagram: 'https://www.instagram.com/wd_rodriguexz?mdxt=eGhxY2o1czBuZ2No&utm_source=qr', linkedin: 'https://www.linkedin.com/in/washington-daniel-rodrigues-cruz-663036390?utm_source=share_via&utm_content=profile&utm_medium=member_ios' },
  { nome: 'Gustavo Henrique Silva Sousa', funcao: 'Implementação, publicação e manutenção', descricao: 'Responsável pela publicação do site, atualização de conteúdos, inserção de vídeos e imagens, organização das informações dos participantes do podcast e correção de bugs.', foto: 'imagens/dev-2.jpg', instagram: 'https://www.instagram.com/gu_henrique_15?exln=OGluNzEwNzdmbXRs', linkedin: 'https://www.linkedin.com/in/gustavo-henrique-silva-sousa-269512357' }
];

/* ============================================================
   Funções auxiliares
   ============================================================ */

   
function criarRedes(pessoa, tipo = 'participante') {
    const redes = [
        { id: 'insta', nome: 'Instagram', url: pessoa.instagram },
        { id: 'linkedin', nome: 'LinkedIn', url: pessoa.linkedin }
    ];
    return redes.map((r) => {
        const linkedinIndisponivel =
            r.id === 'linkedin' && tipo === 'participante';
        const pendente = !r.url || linkedinIndisponivel;
        const href = pendente ? '#' : r.url;
        const alvo = pendente
            ? ''
            : ' target="_blank" rel="noopener noreferrer"';
        const pend = pendente ? ' data-pendente' : '';
        const classe = linkedinIndisponivel
            ? ' class="linkedin-indisponivel"'
            : '';
        const rotulo = linkedinIndisponivel
            ? `LinkedIn indisponível - ${pessoa.nome}`
            : `${r.nome} ${pessoa.nome}${pendente ? ' (link a configurar)' : ''}`;
        return `<a href="${href}" aria-label="${rotulo}"${alvo}${pend}${classe}><svg aria-hidden="true"><use href="#i-${r.id}"/></svg></a>`;
    }).join('');
}

const momentos = [
    { tempo: 0, titulo: "Abertura" },
    { tempo: 47, titulo: "Quem está na mesa" },
    { tempo: 344, titulo: "IA na arte, no design e na cultura" },
    { tempo: 840, titulo: "IA nos filmes" },
    { tempo: 928, titulo: "Voz de artista que já morreu: homenagem ou abuso?" },
    { tempo: 1106, titulo: "Quem consome também faz a IA bombar" },
    { tempo: 1407, titulo: "O que aconteceu com os videoclipes?" },
    { tempo: 1680, titulo: "O receio pelas próximas gerações" },
    { tempo: 1781, titulo: "IA nos estudos: ferramenta ou muleta?" },
    { tempo: 1920, titulo: '"Parece bonito ser burro" e o brain rot' },
    { tempo: 2197, titulo: "O professor contra o celular" },
    { tempo: 2280, titulo: "Cérebro sem descanso e o fim do tédio" },
    { tempo: 2420, titulo: "A infância antes do celular" },
    { tempo: 2704, titulo: "ENEM e estudos com IA" },
    { tempo: 2871, titulo: "O jornalismo e a IA" },
    { tempo: 3725, titulo: "A IA vai tirar empregos ou criar novos?" },
    { tempo: 4089, titulo: "Quando um vídeo falso engana até jornalista" },
    { tempo: 4250, titulo: "Eleições e desinformação" },
    { tempo: 4365, titulo: "Big techs: dá para frear a IA?" },
    { tempo: 4486, titulo: "Recado para os jovens" }
];

/* ============================================================
   Momentos do episódio
   ============================================================ */

const listaMomentos = $('#listaMomentos');

function formatarCapitulo(segundos) {
    const horas = Math.floor(segundos / 3600);
    const minutos = Math.floor((segundos % 3600) / 60);
    const segundosRestantes = segundos % 60;

    if (horas > 0) {
        return `${horas}:${String(minutos).padStart(2, '0')}:${String(segundosRestantes).padStart(2, '0')}`;
    }

    return `${String(minutos).padStart(2, '0')}:${String(segundosRestantes).padStart(2, '0')}`;
}

if (listaMomentos) {
    listaMomentos.innerHTML = momentos.map((m) => `
        <li>
            <button
                type="button"
                class="momento-item"
                data-tempo="${m.tempo}"
            >
                <span class="momento-tempo">
                    ${formatarCapitulo(m.tempo)}
                </span>

                <span class="momento-titulo">
                    ${m.titulo}
                </span>

                <svg aria-hidden="true">
                    <use href="#i-play"/>
                </svg>
            </button>
        </li>
    `).join('');
}

/* ============================================================
   Controle do vídeo do YouTube
   ============================================================ */

let playerYoutube = null;

window.onYouTubeIframeAPIReady = function () {
    playerYoutube = new YT.Player('youtubePlayer');
};

const scriptYoutube = document.createElement('script');
scriptYoutube.src = 'https://www.youtube.com/iframe_api';
document.head.appendChild(scriptYoutube);

if (listaMomentos) {
    listaMomentos.addEventListener('click', function (event) {
        const botao = event.target.closest('.momento-item');

        if (!botao || !playerYoutube) return;

        const tempo = Number(botao.dataset.tempo);

        playerYoutube.seekTo(tempo, true);
        playerYoutube.playVideo();
    });
}

/* ============================================================
   Renderização dos cartões
   ============================================================ */
$('#listaParticipantes').innerHTML = participantes.map((p) => `
  <li class="part">
    <div class="foto">
      <img src="${p.foto}" alt="Foto de ${p.nome}" loading="lazy">
    </div>

    <div class="part-info">
      <strong>${p.nome}</strong>
      <span>${p.funcao}</span>

      <div class="redes">
        ${criarRedes(p)}
      </div>

      <details class="part-detalhes">
        <summary>Mais informações</summary>
        <p>${p.descricao}</p>
      </details>

    </div>
  </li>
`).join('');

$('#listaDevs').innerHTML = desenvolvedores.map((d) => `
  <li class="dev">
    <div class="dev-foto"><img src="${d.foto}" alt="Foto de ${d.nome}" loading="lazy" data-oculta-se-falhar></div>
    <div>
      <strong>${d.nome}</strong>
      <p class="funcao">${d.funcao}</p>
      <p>${d.descricao}</p>
      <div class="redes">${criarRedes(d, 'desenvolvedor')}</div>
    </div>
  </li>`).join('');


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
/* Link ativo conforme a seção visível */
const links = document.querySelectorAll('.menu a');

function ativarLink(id) {
  links.forEach((a) => {
    const ativo = a.getAttribute('href') === '#' + id;
    a.classList.toggle('ativo', ativo);
    if (ativo) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current');
  });
}

let travadoAte = 0; // evita o destaque "pular" durante a rolagem suave

const observador = new IntersectionObserver((entradas) => {
  if (Date.now() < travadoAte) return;
  entradas.forEach((en) => { if (en.isIntersecting) ativarLink(en.target.id); });
}, { rootMargin: '-40% 0px -55% 0px' });

links.forEach((a) => {
  const alvo = document.querySelector(a.getAttribute('href'));
  if (alvo) observador.observe(alvo);
});

/* Ao clicar, o link clicado fica ativo (Sobre e Participantes ficam lado a lado) */
menu.addEventListener('click', (e) => {
  const a = e.target.closest('a');
  if (!a) return;
  ativarLink(a.getAttribute('href').slice(1));
  travadoAte = Date.now() + 1000;
});

/* No fim da página, Desenvolvedores fica ativo */
window.addEventListener('scroll', () => {
  if (Date.now() < travadoAte) return;
  if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) {
    ativarLink('desenvolvedores');
  }
}, { passive: true });
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

document.addEventListener('click', function(event) {
    const linkedin = event.target.closest('.linkedin-indisponivel');

    if (linkedin) {
        event.preventDefault();

        alert('Perfil do LinkedIn indisponível no momento.');
    }
});