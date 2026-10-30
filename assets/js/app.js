// ASAF (asafgv.com | @asaf.gv) - Lógica Interativa do Protótipo Estadual SC + 3 Perfis (Banhista, GVC, Admin)

const state = {
  currentScreen: 'home',
  currentRole: 'gvc', // 'banhista' | 'gvc' | 'admin'
  seasonMode: 'inverno', // 'inverno' | 'verao' | 'proposta'
  totalSignatures: 6412,
  goalSignatures: 15000,
  municipalitiesCount: 24, // Lei Estadual 16.585/2015 exige min. 20 municípios
  pendingSignature: null,
  lastConfirmedSignature: {
    name: 'Lucas Martins Silveira',
    initials: 'L. M. S.',
    displayMode: 'initials',
    cpfMasked: '***.482.910-**',
    city: 'Florianópolis - SC',
    neighborhood: 'Campeche',
    profile: 'Guarda-Vidas Civil (GVC)',
    timestamp: '30/10/2026 10:05:18 BRT (UTC-3)',
    hash: '8f4b2e9c1a7d3056f89c0e1d4a7b2c6e9f1a3b5d7e9f0c2a4b6d8e0f1a2b3c4d',
    protocol: 'ASAF-SC-2026-006412'
  },
  // Mural público exibe APENAS INICIAIS para proteger os cidadãos e GVs contra exposição
  supporters: [
    { initials: 'G. R. C.', location: 'Campeche, Florianópolis/SC', profile: 'Guarda-Vidas Civil (GVC)', time: 'há 2 min' },
    { initials: 'M. T. L.', location: 'Centro, Balneário Camboriú/SC', profile: 'Banhista / Moradora', time: 'há 4 min' },
    { initials: 'H. B. S.', location: 'Trindade, Florianópolis/SC', profile: 'Bombeiro Militar', time: 'há 7 min' },
    { initials: 'P. A. M.', location: 'Praia do Rosa, Imbituba/SC', profile: 'Surfista / Atleta', time: 'há 11 min' },
    { initials: 'C. F. O.', location: 'Praia Brava, Itajaí/SC', profile: 'Guarda-Vidas Civil (GVC)', time: 'há 15 min' },
    { initials: 'R. V. N.', location: 'Ferrugem, Garopaba/SC', profile: 'Comerciante Local', time: 'há 19 min' },
    { initials: 'B. L. K.', location: 'Guarda do Embaú, Palhoça/SC', profile: 'Guarda-Vidas Civil (GVC)', time: 'há 24 min' },
    { initials: 'T. N. D.', location: 'Prainha, São Francisco do Sul/SC', profile: 'Banhista / Surfista', time: 'há 29 min' }
  ],
  // Relatos de falta de GVC / problemas em praias enviados por Banhistas e GVCs
  reports: [
    {
      id: 'rep-1',
      beach: 'Praia do Moçambique / Barra da Lagoa (Florianópolis/SC)',
      category: 'Falta de GVC / Posto com Bandeira Preta',
      date: 'Outubro/2026',
      description: 'Sol forte, praia cheia de famílias e surfistas, correntes de retorno ativas e posto fechado com bandeira preta.',
      author: 'Indicado por Banhista (Iniciais: F. M. R.)'
    },
    {
      id: 'rep-2',
      beach: 'Praia Brava & Cabeçudas (Itajaí / Balneário Camboriú - SC)',
      category: 'Jornada Exaustiva & Diária Defasada',
      date: 'Operação Verão SC',
      description: 'Turnos de 9h a 12h sem vínculo trabalhista formal (Lei Estadual 13.880/2006), sem FGTS, férias ou 13º salário.',
      author: 'Relato Protegido GVC (Iniciais: C. F. O.)'
    },
    {
      id: 'rep-3',
      beach: 'Praia da Ferrugem / Silveira (Garopaba/SC)',
      category: 'Praia Desguarnecida Fora de Temporada',
      date: 'Outubro/2026',
      description: 'Finais de semana de primavera com centenas de turistas e surfistas na água sem cobertura de guarda-vidas nos postos.',
      author: 'Indicado por Banhista (Iniciais: R. V. N.)'
    }
  ],
  // Dúvidas de Banhistas respondidas pelos GVCs
  questions: [
    {
      id: 'q-1',
      batherInitials: 'A. P. S. (Banhista — Florianópolis/SC)',
      beach: 'Praia do Campeche / Joaquina',
      question: 'Como identificar uma corrente de retorno quando o posto está fechado fora de temporada e o que fazer se for puxado?',
      answer: 'A corrente de retorno geralmente aparece como uma faixa de água mais escura, com menos espuma quebrando e ondulação mais agitada voltando para o mar aberto. Se entrar em uma, NUNCA nade contra a correnteza em direção à areia: nade paralelamente à praia (para os lados, onde as ondas quebram com espuma branca) ou flutue acenando o braço para pedir socorro e acione o 193.',
      answeredBy: 'Respondido por GVC Verificado (Iniciais: G. R. C.)',
      status: 'answered'
    },
    {
      id: 'q-2',
      batherInitials: 'D. L. M. (Banhista — Joinville/SC)',
      beach: 'Praia dos Ingleses / Santinho',
      question: 'O que significa a Bandeira Preta hasteada na casinha do salva-vidas?',
      answer: 'A Bandeira Preta no posto significa que aquele Posto de Guarda-Vidas está DESATIVADO / SEM GUARDA-VIDAS operando no local. É justamente o que denunciamos na maioria das praias fora da alta temporada.',
      answeredBy: 'Respondido por GVC Verificado (Iniciais: L. M. S.)',
      status: 'answered'
    },
    {
      id: 'q-3',
      batherInitials: 'K. S. B. (Banhista — Palhoça/SC)',
      beach: 'Guarda do Embaú / Pinheira',
      question: 'Nos feriados de novembro os postos do Sul da Ilha e Palhoça já terão guarda-vidas trabalhando o dia todo?',
      answer: '',
      answeredBy: '',
      status: 'pending'
    }
  ],
  // Mural Interno exclusivo dos GVCs e Admins (com suporte a Soft Delete pelo Admin)
  muralPosts: [
    {
      id: 'm-1',
      author: 'Diretoria ASAF (Admin)',
      badge: 'Comunicado Oficial',
      time: 'Hoje, 08:30',
      content: 'Convocamos todos os GVCs de Florianópolis, Litoral Norte e Litoral Sul para mobilização conjunta na ALESC. Já passamos de 24 municípios catarinenses assinando em asafgv.com!',
      isDeleted: false,
      deletedInfo: null
    },
    {
      id: 'm-2',
      author: 'GVC R. M. (Posto Mole / Joaquina)',
      badge: 'Operacional',
      time: 'Ontem, 19:15',
      content: 'Pessoal, estamos levantando fotos atualizadas das condições estruturais dos cadeirões e falta de EPIs em cada praia antes do início da escala de verão. Subam os relatos pela aba do GVC.',
      isDeleted: false,
      deletedInfo: null
    },
    {
      id: 'm-3',
      author: 'GVC T. A. (Itajaí / Praia Brava)',
      badge: 'Articulação Estadual',
      time: 'Ontem, 16:40',
      content: 'Os guarda-vidas civis do Litoral Norte estão fechados com a pauta da ASAF! Precisamos unificar o pedido de redução para 6h sem corte na diária e contratação digna em toda SC.',
      isDeleted: false,
      deletedInfo: null
    },
    {
      id: 'm-4',
      author: 'Usuário Externo (Spam Removido)',
      badge: 'Moderado',
      time: 'Ontem, 14:10',
      content: 'Mensagem fora de tópico removida pela moderação para demonstrar o Soft Delete no banco Django.',
      isDeleted: true,
      deletedInfo: 'Soft Delete por Admin em 29/10/2026 15:02 (Mantido no banco p/ auditoria)'
    }
  ],
  // Agenda de Horários e Compromissos (Gerenciada pelo Admin, Visualizada pelo GVC)
  agendaSlots: [
    { id: 'ag-1', date: '04/11/2026 (Quarta)', time: '14:00 - 16:30', title: 'Audiência Pública ALESC — Pauta Estadual dos GVCs', location: 'Plenário / Comissões ALESC (Florianópolis)', type: 'Mobilização ALESC' },
    { id: 'ag-2', date: '07/11/2026 (Sábado)', time: '09:00 - 11:30', title: 'Assembleia Geral ASAF + Treino Integrado no Mar', location: 'Praia da Joaquina (Posto Central)', type: 'Assembleia & Treino' },
    { id: 'ag-3', date: '10/11/2026 (Terça)', time: '19:30 - 21:00', title: 'Plantão Jurídico Online ASAF (Dúvidas sobre Recertificação e Direitos)', location: 'Videoconferência Exclusiva GVC (Link no Mural)', type: 'Plantão Jurídico' }
  ],
  // Engine de Notícias e Publicações (Públicas e Internas GVC)
  newsArticles: [
    {
      id: 'news-1',
      title: 'ASAF lança portal estadual asafgv.com para unificar petição por Guarda-Vidas o ano inteiro em SC',
      category: 'Mobilização Estadual',
      visibility: 'PUBLIC',
      date: '30 Out 2026',
      summary: 'Com proteção total por iniciais (LGPD) e validação criptográfica de CPF, abaixo-assinado reúne moradores, surfistas, bombeiros e guarda-vidas civis de mais de 20 municípios catarinenses.'
    },
    {
      id: 'news-2',
      title: 'Alerta de Primavera: Calor lota praias catarinenses, mas mais de 90% dos postos seguem fechados',
      category: 'Segurança nas Praias',
      visibility: 'PUBLIC',
      date: '28 Out 2026',
      summary: 'Levantamento da @asaf.gv mostra bandeira preta na grande maioria dos postos de salvamento fora da alta temporada e reforça urgência de efetivo permanente.'
    },
    {
      id: 'news-3',
      title: '[Restrito GVC] Nota Técnica Jurídica sobre a Lei Estadual nº 13.880/2006 e o plano de transição',
      category: 'Boletim Interno GVC',
      visibility: 'INTERNAL_GVC',
      date: '27 Out 2026',
      summary: 'Estudo detalhado elaborado para embasar as reuniões com parlamentares da ALESC e procuradores do Ministério Público do Trabalho (MPT-SC).'
    }
  ]
};

// Dados das Praias (Florianópolis + Litoral de SC)
const beachesData = [
  { name: 'Praia dos Ingleses', region: 'Florianópolis (Norte)', inverno: 'ativo', verao: 'ativo', risk: 'Alto fluxo anual e correntes', postsSummer: '6 postos', postsWinter: '1 posto fixo' },
  { name: 'Santinho & Moçambique', region: 'Florianópolis (Norte/Leste)', inverno: 'fechado', verao: 'ativo', risk: 'Mar pesado, buracos e costão', postsSummer: '4 postos', postsWinter: '0 (Bandeira Preta)' },
  { name: 'Praia Brava & Canasvieiras', region: 'Florianópolis (Norte)', inverno: 'fechado', verao: 'ativo', risk: 'Repuxo intenso e turismo anual', postsSummer: '10 postos', postsWinter: '0 (Bandeira Preta)' },
  { name: 'Praia Mole & Joaquina', region: 'Florianópolis (Leste)', inverno: 'ativo', verao: 'ativo', risk: 'Mar de tombo, surfe e costão', postsSummer: '4 postos', postsWinter: 'Posto central ativo' },
  { name: 'Campeche & Morro das Pedras', region: 'Florianópolis (Sul)', inverno: 'fechado', verao: 'ativo', risk: 'Extensa faixa de areia e valas fortes', postsSummer: '6 postos', postsWinter: 'Desprotegida / Parcial' },
  { name: 'Armação, Matadeiro e Açores', region: 'Florianópolis (Sul)', inverno: 'fechado', verao: 'ativo', risk: 'Correntes de retorno severas', postsSummer: '6 postos', postsWinter: '0 (Bandeira Preta)' },
  { name: 'Guarda do Embaú & Pinheira', region: 'Palhoça (Grande Floripa)', inverno: 'fechado', verao: 'ativo', risk: 'Travessia de rio e mar aberto', postsSummer: '4 postos', postsWinter: '0 (Bandeira Preta)' },
  { name: 'Ferrugem, Rosa e Silveira', region: 'Garopaba / Imbituba (Sul SC)', inverno: 'fechado', verao: 'ativo', risk: 'Altíssimo fluxo de surfistas o ano todo', postsSummer: '6 postos', postsWinter: '0 (Bandeira Preta)' }
];

// Extrai apenas as iniciais de um nome completo (ex: "Rafael Turket Silva" -> "R. T. S.")
function extrairIniciais(nomeCompleto) {
  const ignorar = ['de', 'da', 'do', 'das', 'dos', 'e'];
  const partes = nomeCompleto
    .trim()
    .split(/\s+/)
    .filter((p) => p.length > 0 && !ignorar.includes(p.toLowerCase()));
  if (partes.length === 0) return 'A. S.';
  return partes.map((p) => `${p.charAt(0).toUpperCase()}.`).join(' ');
}

// Navegação entre as 5 Telas do Protótipo
function switchScreen(screenId) {
  state.currentScreen = screenId;

  document.querySelectorAll('.screen-view').forEach((el) => {
    el.classList.remove('active');
  });

  const target = document.getElementById(`screen-${screenId}`);
  if (target) {
    target.classList.add('active');
  }

  document.querySelectorAll('[data-screen-btn]').forEach((btn) => {
    const btnScreen = btn.getAttribute('data-screen-btn');
    if (btnScreen === screenId) {
      btn.classList.add('bg-red-600', 'text-white', 'border-red-500');
      btn.classList.remove('bg-slate-800/80', 'text-slate-300', 'border-slate-700');
    } else {
      btn.classList.remove('bg-red-600', 'text-white', 'border-red-500');
      btn.classList.add('bg-slate-800/80', 'text-slate-300', 'border-slate-700');
    }
  });

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Alternar entre os 3 Perfis de Login (Banhista, GVC, Admin) na Tela 4
function setRoleView(role) {
  state.currentRole = role;

  ['banhista', 'gvc', 'admin'].forEach((r) => {
    const btn = document.getElementById(`btn-role-${r}`);
    const panel = document.getElementById(`panel-role-${r}`);
    if (btn) {
      if (r === role) {
        btn.className = 'px-4 py-2.5 rounded-xl font-extrabold text-xs sm:text-sm uppercase transition-all bg-[#f7d117] text-slate-950 shadow-lg border-2 border-white';
      } else {
        btn.className = 'px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm uppercase transition-all bg-[#061326] text-slate-300 hover:text-white border border-slate-700';
      }
    }
    if (panel) {
      panel.classList.toggle('hidden', r !== role);
    }
  });

  const badge = document.getElementById('header-role-indicator');
  if (badge) {
    const labels = {
      banhista: '🏖️ Logado: Banhista',
      gvc: '🛟 Logado: GVC',
      admin: '🛡️ Logado: Admin ASAF'
    };
    badge.textContent = labels[role] || 'Portal Login';
  }

  renderizarMuralInterno();
  renderizarAgenda();
  renderizarDuvidas();
  renderizarNoticias();
}

// Simulador de Cobertura de Praias (Inverno vs Verão vs Proposta ASAF)
function setSeasonMode(mode) {
  state.seasonMode = mode;

  ['inverno', 'verao', 'proposta'].forEach((m) => {
    const btn = document.getElementById(`btn-season-${m}`);
    if (!btn) return;
    if (m === mode) {
      btn.className = 'px-4 py-2.5 rounded-lg font-semibold text-sm transition-all bg-red-600 text-white shadow-lg shadow-red-600/30 border border-red-400';
    } else {
      btn.className = 'px-4 py-2.5 rounded-lg font-semibold text-sm transition-all bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700';
    }
  });

  const banner = document.getElementById('season-alert-banner');
  const grid = document.getElementById('beaches-grid');
  if (!grid || !banner) return;

  if (mode === 'inverno') {
    banner.className = 'p-4 rounded-xl bg-red-950/70 border border-red-500/40 text-red-100 mb-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4';
    banner.innerHTML = `
      <div>
        <span class="inline-block px-2.5 py-0.5 rounded bg-red-600 text-white text-xs font-bold uppercase tracking-wider mb-1">Alerta Estadual SC: Fora de Temporada (Outono/Inverno/Primavera)</span>
        <p class="text-sm md:text-base font-medium">Mais de <strong>90% das praias de Florianópolis e do litoral catarinense ficam sem postos ativos (Bandeira Preta)</strong> fora do verão. O socorro depende de deslocamento distante via 193.</p>
      </div>
      <div class="text-right shrink-0">
        <div class="text-2xl font-display font-bold text-yellow-400">+90% Fechados</div>
        <div class="text-xs text-red-200">postos em Bandeira Preta</div>
      </div>
    `;
  } else if (mode === 'verao') {
    banner.className = 'p-4 rounded-xl bg-amber-950/70 border border-amber-500/40 text-amber-100 mb-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4';
    banner.innerHTML = `
      <div>
        <span class="inline-block px-2.5 py-0.5 rounded bg-amber-500 text-slate-950 text-xs font-bold uppercase tracking-wider mb-1">Alta Temporada em SC: Sobrecarga e Precarização</span>
        <p class="text-sm md:text-base font-medium">Os postos abrem sustentados por <strong>Guarda-Vidas Civis "Voluntários" (Lei Estadual 13.880/2006)</strong> em turnos exaustivos de <strong>9h a 12h diárias</strong>, sem vínculo trabalhista, férias, 13º ou FGTS.</p>
      </div>
      <div class="text-right shrink-0">
        <div class="text-2xl font-display font-bold text-amber-400">9h a 12h / dia</div>
        <div class="text-xs text-amber-200">sem direitos trabalhistas</div>
      </div>
    `;
  } else {
    banner.className = 'p-4 rounded-xl bg-emerald-950/70 border border-emerald-500/40 text-emerald-100 mb-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4';
    banner.innerHTML = `
      <div>
        <span class="inline-block px-2.5 py-0.5 rounded bg-emerald-500 text-slate-950 text-xs font-bold uppercase tracking-wider mb-1">Pauta ASAF (asafgv.com): Guarda-Vidas o Ano Inteiro + Contratação Digna</span>
        <p class="text-sm md:text-base font-medium">Cobertura permanente de salvamento aquático em Florianópolis e no litoral de SC o ano todo, com jornada justa de 6h/dia sem redução salarial, contratação digna e plano de carreira.</p>
      </div>
      <div class="text-right shrink-0">
        <div class="text-2xl font-display font-bold text-emerald-400">365 Dias</div>
        <div class="text-xs text-emerald-200">de proteção real à vida</div>
      </div>
    `;
  }

  grid.innerHTML = beachesData.map((b) => {
    let statusBadge = '';
    let cardBorder = '';
    let postInfo = '';

    if (mode === 'inverno') {
      if (b.inverno === 'ativo') {
        statusBadge = `<span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"><span class="w-2 h-2 rounded-full bg-emerald-400 marker-safe"></span>Posto Ativo</span>`;
        cardBorder = 'border-emerald-500/30 bg-slate-900/70';
        postInfo = b.postsWinter;
      } else {
        statusBadge = `<span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-red-500/20 text-red-300 border border-red-500/40"><span class="w-2 h-2 rounded-full bg-red-500 marker-danger"></span>SEM GVC</span>`;
        cardBorder = 'border-red-500/40 bg-red-950/20';
        postInfo = b.postsWinter;
      }
    } else if (mode === 'verao') {
      statusBadge = `<span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40"><span class="w-2 h-2 rounded-full bg-amber-400"></span>Ativo (GVC Precarizado)</span>`;
      cardBorder = 'border-amber-500/30 bg-slate-900/70';
      postInfo = `${b.postsSummer} (Jornada 9h-12h)`;
    } else {
      statusBadge = `<span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"><span class="w-2 h-2 rounded-full bg-emerald-400 marker-safe"></span>Cobertura Permanente ASAF</span>`;
      cardBorder = 'border-emerald-500/40 bg-emerald-950/15';
      postInfo = 'Efetivo fixo anual + Turno 6h';
    }

    return `
      <div class="p-4 rounded-xl border ${cardBorder} transition-all">
        <div class="flex items-start justify-between gap-2 mb-2">
          <div>
            <span class="text-xs uppercase tracking-wider text-slate-400 font-semibold">${b.region}</span>
            <h4 class="font-bold text-white text-base">${b.name}</h4>
          </div>
          ${statusBadge}
        </div>
        <p class="text-xs text-slate-300 mb-2"><strong>Risco local:</strong> ${b.risk}</p>
        <div class="text-xs font-semibold text-slate-200 pt-2 border-t border-slate-800 flex items-center justify-between">
          <span>Cobertura:</span>
          <span class="${mode === 'inverno' && b.inverno !== 'ativo' ? 'text-red-400' : 'text-yellow-400'}">${postInfo}</span>
        </div>
      </div>
    `;
  }).join('');
}

// Algoritmo Oficial de Validação de CPF (Módulo 11)
function validarCPF(cpf) {
  const clean = cpf.replace(/\D/g, '');
  if (clean.length !== 11) return false;
  if (/^(\d)\1{10}$/.test(clean)) return false;

  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(clean.charAt(i), 10) * (10 - i);
  }
  let rev = 11 - (sum % 11);
  if (rev === 10 || rev === 11) rev = 0;
  if (rev !== parseInt(clean.charAt(9), 10)) return false;

  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(clean.charAt(i), 10) * (11 - i);
  }
  rev = 11 - (sum % 11);
  if (rev === 10 || rev === 11) rev = 0;
  if (rev !== parseInt(clean.charAt(10), 10)) return false;

  return true;
}

function preencherCPFTeste() {
  const rnd = (n) => Math.round(Math.random() * n);
  const n = Array.from({ length: 9 }, () => rnd(9));

  let d1 = n.reduce((acc, val, idx) => acc + val * (10 - idx), 0);
  d1 = 11 - (d1 % 11);
  if (d1 >= 10) d1 = 0;

  let d2 = n.reduce((acc, val, idx) => acc + val * (11 - idx), 0) + d1 * 2;
  d2 = 11 - (d2 % 11);
  if (d2 >= 10) d2 = 0;

  const cpfStr = `${n[0]}${n[1]}${n[2]}.${n[3]}${n[4]}${n[5]}.${n[6]}${n[7]}${n[8]}-${d1}${d2}`;
  const input = document.getElementById('pet-cpf');
  if (input) {
    input.value = cpfStr;
    atualizarStatusCPF(cpfStr);
  }
}

function formatarCPF(value) {
  const v = value.replace(/\D/g, '').slice(0, 11);
  if (v.length <= 3) return v;
  if (v.length <= 6) return `${v.slice(0, 3)}.${v.slice(3)}`;
  if (v.length <= 9) return `${v.slice(0, 3)}.${v.slice(3, 6)}.${v.slice(6)}`;
  return `${v.slice(0, 3)}.${v.slice(3, 6)}.${v.slice(6, 9)}-${v.slice(9, 11)}`;
}

function formatarTelefone(value) {
  const v = value.replace(/\D/g, '').slice(0, 11);
  if (v.length <= 2) return v;
  if (v.length <= 7) return `(${v.slice(0, 2)}) ${v.slice(2)}`;
  return `(${v.slice(0, 2)}) ${v.slice(2, 7)}-${v.slice(7)}`;
}

function atualizarStatusCPF(cpfStr) {
  const feedback = document.getElementById('cpf-feedback');
  if (!feedback) return;
  const digits = cpfStr.replace(/\D/g, '');
  if (digits.length === 0) {
    feedback.innerHTML = '';
    return;
  }
  if (digits.length < 11) {
    feedback.innerHTML = '<span class="text-amber-400 text-xs">Digite os 11 dígitos do CPF...</span>';
    return;
  }
  if (validarCPF(cpfStr)) {
    feedback.innerHTML = '<span class="text-emerald-400 text-xs font-semibold">✓ CPF matematicamente válido (Criptografado AES-256 no banco)</span>';
  } else {
    feedback.innerHTML = '<span class="text-red-400 text-xs font-semibold">✕ CPF inválido. Verifique os números ou clique em "Gerar CPF de Teste".</span>';
  }
}

// Atualiza prévia das iniciais em tempo real enquanto o usuário digita o nome
function atualizarPreviaIniciais(nome) {
  const previewEl = document.getElementById('initials-preview-badge');
  if (!previewEl) return;
  const iniciais = extrairIniciais(nome || 'João Carlos da Silva');
  previewEl.textContent = iniciais;
}

async function gerarHashSHA256(texto) {
  if (window.crypto && window.crypto.subtle) {
    const msgBuffer = new TextEncoder().encode(texto);
    const hashBuffer = await window.crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
  }
  let h = '';
  for (let i = 0; i < 64; i++) {
    h += Math.floor(Math.random() * 16).toString(16);
  }
  return h;
}

function iniciarAssinaturaPeticao(event) {
  event.preventDefault();

  const name = document.getElementById('pet-name').value.trim();
  const cpf = document.getElementById('pet-cpf').value.trim();
  const contact = document.getElementById('pet-contact').value.trim();
  const city = document.getElementById('pet-city').value.trim();
  const neighborhood = document.getElementById('pet-neighborhood').value.trim();
  const profile = document.getElementById('pet-profile').value;
  const displayModeEl = document.getElementById('pet-privacy-mode');
  const displayMode = displayModeEl ? displayModeEl.value : 'initials';
  const lgpdConsent = document.getElementById('pet-lgpd').checked;
  const errorBox = document.getElementById('pet-error-box');

  if (!validarCPF(cpf)) {
    errorBox.classList.remove('hidden');
    errorBox.textContent = 'Por favor, informe um CPF válido para garantir a legitimidade jurídica da assinatura (ou use o botão "Gerar CPF de Teste").';
    return;
  }

  if (!name || name.split(' ').length < 2) {
    errorBox.classList.remove('hidden');
    errorBox.textContent = 'Informe seu Nome e Sobrenome completos para o documento oficial de protocolo (no site público aparecerão apenas suas iniciais).';
    return;
  }

  if (!lgpdConsent) {
    errorBox.classList.remove('hidden');
    errorBox.textContent = 'É necessário aceitar o termo de finalidade específica (LGPD) para validar sua assinatura.';
    return;
  }

  errorBox.classList.add('hidden');

  const initials = extrairIniciais(name);
  const digits = cpf.replace(/\D/g, '');
  const cpfMasked = `***.${digits.slice(3, 6)}.${digits.slice(6, 9)}-**`;

  state.pendingSignature = {
    name,
    initials,
    displayMode,
    cpfMasked,
    contact,
    city,
    neighborhood: neighborhood || 'Centro',
    profile
  };

  const modal = document.getElementById('otp-modal');
  const contactLabel = document.getElementById('otp-contact-display');
  if (contactLabel) contactLabel.textContent = contact;
  if (modal) modal.classList.remove('hidden');
}

function preencherOTPTeste() {
  const otpInput = document.getElementById('otp-code-input');
  if (otpInput) otpInput.value = '481930';
}

function fecharModalOTP() {
  const modal = document.getElementById('otp-modal');
  if (modal) modal.classList.add('hidden');
}

async function confirmarAssinaturaOTP() {
  const otpInput = document.getElementById('otp-code-input');
  if (!otpInput || otpInput.value.trim().length < 4) {
    alert('Digite o código de 6 dígitos ou clique em "Preencher Código de Teste (481930)".');
    return;
  }

  const pending = state.pendingSignature;
  if (!pending) return;

  state.totalSignatures += 1;
  const nowStr = new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' }) + ' BRT (UTC-3)';
  const rawAudit = `${pending.name}|${pending.cpfMasked}|${nowStr}|${state.totalSignatures}|ASAF-SC`;
  const hash = await gerarHashSHA256(rawAudit);
  const protocol = `ASAF-SC-2026-00${state.totalSignatures}`;

  state.lastConfirmedSignature = {
    ...pending,
    timestamp: nowStr,
    hash,
    protocol
  };

  // No mural público mostra SOMENTE AS INICIAIS (ou "Apoiador Verificado (Iniciais)") para evitar expor pessoas
  const publicLabel = pending.displayMode === 'anonymous_initials'
    ? `Sigiloso (${pending.initials})`
    : pending.initials;

  state.supporters.unshift({
    initials: publicLabel,
    location: `${pending.neighborhood}, ${pending.city}`,
    profile: pending.profile,
    time: 'agora mesmo'
  });

  fecharModalOTP();
  atualizarContadoresEMural();
  renderizarComprovanteECard();
  switchScreen('comprovante');
}

function renderizarComprovanteECard() {
  const sig = state.lastConfirmedSignature;
  const setTxt = (id, val) => {
    const el = document.getElementById(id);
    if (el) el.textContent = val;
  };

  setTxt('rec-protocol', sig.protocol);
  setTxt('rec-name', `${sig.name} (Restrito ao Documento Oficial)`);
  setTxt('rec-public-initials', `Exibido no site apenas como: ${sig.initials}`);
  setTxt('rec-cpf', sig.cpfMasked);
  setTxt('rec-location', `${sig.neighborhood} — ${sig.city}`);
  setTxt('rec-profile', sig.profile);
  setTxt('rec-time', sig.timestamp);
  setTxt('rec-hash', sig.hash);

  // No Card do Instagram Stories também usa apenas as Iniciais para proteger o apoiador
  setTxt('story-name', `Iniciais: ${sig.initials}`);
  setTxt('story-profile', `${sig.profile} • ${sig.city}`);
  setTxt('story-number', `#${state.totalSignatures.toLocaleString('pt-BR')}`);
}

function atualizarContadoresEMural() {
  const pct = Math.min(100, ((state.totalSignatures / state.goalSignatures) * 100)).toFixed(1);

  document.querySelectorAll('.sig-counter-num').forEach((el) => {
    el.textContent = state.totalSignatures.toLocaleString('pt-BR');
  });

  document.querySelectorAll('.sig-progress-bar').forEach((el) => {
    el.style.width = `${pct}%`;
  });

  const wall = document.getElementById('supporters-wall');
  if (wall) {
    wall.innerHTML = state.supporters.slice(0, 8).map((s) => `
      <div class="p-3.5 rounded-xl bg-[#091b36]/90 border border-slate-800 flex items-center justify-between gap-3">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-full bg-red-600/20 border border-[#f7d117]/50 text-[#f7d117] font-bold flex items-center justify-center text-xs shrink-0">
            ${s.initials.slice(0, 4)}
          </div>
          <div>
            <div class="flex flex-wrap items-center gap-2">
              <span class="font-bold text-white text-sm">Iniciais: ${s.initials}</span>
              <span class="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 font-medium">✓ Doc. Oficial OK (Sigilo Público)</span>
            </div>
            <div class="text-xs text-slate-300">${s.location} • <span class="text-[#f7d117]">${s.profile}</span></div>
          </div>
        </div>
        <span class="text-xs text-slate-400 shrink-0">${s.time}</span>
      </div>
    `).join('');
  }
}

// =========================================================================
// FUNÇÕES DOS 3 PERFIS DE LOGIN (BANHISTA, GVC, ADMIN) & ENGINE DE NOTÍCIAS
// =========================================================================

// 1. BANHISTA: Indicar falta de GVC / problema em praia
function enviarRelatoPraia(event) {
  event.preventDefault();
  const beach = document.getElementById('rep-beach').value.trim();
  const category = document.getElementById('rep-category').value;
  const desc = document.getElementById('rep-desc').value.trim();
  const initialsInput = document.getElementById('rep-initials');
  const initials = initialsInput && initialsInput.value.trim() ? extrairIniciais(initialsInput.value) : 'A. N.';

  if (!beach || !desc) return;

  state.reports.unshift({
    id: `rep-${Date.now()}`,
    beach,
    category,
    date: 'Outubro/2026 (Novo)',
    description: desc,
    author: `Indicado no Portal (Iniciais protegidas: ${initials})`
  });

  document.getElementById('rep-beach').value = '';
  document.getElementById('rep-desc').value = '';

  const msg = document.getElementById('rep-success-msg');
  if (msg) {
    msg.classList.remove('hidden');
    setTimeout(() => msg.classList.add('hidden'), 4000);
  }

  renderizarRelatos();
}

function renderizarRelatos() {
  const container = document.getElementById('reports-list');
  if (!container) return;

  container.innerHTML = state.reports.map((r) => `
    <div class="p-4 rounded-xl bg-[#061326] border border-slate-800">
      <div class="flex flex-wrap items-center justify-between gap-2 mb-1.5">
        <span class="px-2.5 py-0.5 rounded bg-red-500/20 text-red-300 border border-red-500/30 text-xs font-bold uppercase">${r.category}</span>
        <span class="text-xs text-slate-400">${r.date}</span>
      </div>
      <h4 class="font-bold text-white text-sm sm:text-base mb-1">${r.beach}</h4>
      <p class="text-xs sm:text-sm text-slate-300 leading-relaxed mb-2">"${r.description}"</p>
      <div class="text-xs text-[#f7d117] font-medium">🛡️ ${r.author}</div>
    </div>
  `).join('');
}

// 2. BANHISTA ENVIAR DÚVIDA & GVC RESPONDER DÚVIDA
function enviarDuvidaBanhista(event) {
  event.preventDefault();
  const name = document.getElementById('q-bather-name').value.trim();
  const beach = document.getElementById('q-bather-beach').value.trim();
  const question = document.getElementById('q-bather-text').value.trim();
  if (!beach || !question) return;

  const initials = extrairIniciais(name || 'Banhista SC');
  state.questions.unshift({
    id: `q-${Date.now()}`,
    batherInitials: `${initials} (Banhista — SC)`,
    beach,
    question,
    answer: '',
    answeredBy: '',
    status: 'pending'
  });

  document.getElementById('q-bather-beach').value = '';
  document.getElementById('q-bather-text').value = '';
  renderizarDuvidas();
}

function responderDuvidaGVC(questionId) {
  const input = document.getElementById(`ans-input-${questionId}`);
  if (!input || !input.value.trim()) return;

  const q = state.questions.find((item) => item.id === questionId);
  if (q) {
    q.answer = input.value.trim();
    q.answeredBy = state.currentRole === 'admin'
      ? 'Respondido pela Diretoria ASAF (Admin)'
      : 'Respondido por GVC Verificado (Iniciais: L. M. S.)';
    q.status = 'answered';
    renderizarDuvidas();
  }
}

function renderizarDuvidas() {
  const listBanhista = document.getElementById('questions-list-banhista');
  const listGVC = document.getElementById('questions-list-gvc');

  const htmlBanhista = state.questions.map((q) => `
    <div class="p-4 rounded-xl bg-[#061326] border border-slate-800 space-y-2">
      <div class="flex items-center justify-between gap-2">
        <span class="text-xs font-bold text-sky-300">${q.beach} • ${q.batherInitials}</span>
        <span class="px-2 py-0.5 rounded text-[11px] font-bold ${q.status === 'answered' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'}">
          ${q.status === 'answered' ? '✓ Respondida por GVC' : '⏳ Aguardando GVC'}
        </span>
      </div>
      <p class="text-sm font-semibold text-white">❓ "${q.question}"</p>
      ${q.status === 'answered' ? `
        <div class="p-3 rounded-lg bg-[#091b36] border border-emerald-500/30 text-xs text-slate-200 space-y-1">
          <div class="font-bold text-[#f7d117]">🛟 ${q.answeredBy}:</div>
          <p>${q.answer}</p>
        </div>
      ` : ''}
    </div>
  `).join('');

  if (listBanhista) listBanhista.innerHTML = htmlBanhista;

  if (listGVC) {
    listGVC.innerHTML = state.questions.map((q) => `
      <div class="p-4 rounded-xl bg-[#061326] border border-slate-800 space-y-2.5">
        <div class="flex items-center justify-between gap-2">
          <span class="text-xs font-bold text-sky-300">${q.beach} • ${q.batherInitials}</span>
          <span class="px-2 py-0.5 rounded text-[11px] font-bold ${q.status === 'answered' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-red-500/20 text-red-300'}">
            ${q.status === 'answered' ? '✓ Respondida' : '🔔 Pendente de Resposta GVC'}
          </span>
        </div>
        <p class="text-sm font-semibold text-white">❓ "${q.question}"</p>
        ${q.status === 'answered' ? `
          <div class="p-3 rounded-lg bg-[#091b36] border border-emerald-500/30 text-xs text-slate-200">
            <strong class="text-[#f7d117]">${q.answeredBy}:</strong> ${q.answer}
          </div>
        ` : `
          <div class="flex flex-col sm:flex-row gap-2 pt-1">
            <input id="ans-input-${q.id}" type="text" placeholder="Escreva a orientação técnica de guarda-vidas para este banhista..."
              class="flex-1 px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white text-xs" />
            <button onclick="responderDuvidaGVC('${q.id}')" class="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shrink-0">
              Responder como GVC
            </button>
          </div>
        `}
      </div>
    `).join('');
  }
}

// 3. MURAL INTERNO GVC & SOFT DELETE PELO ADMIN
function postarMuralInterno(event) {
  event.preventDefault();
  const input = document.getElementById('mural-new-text');
  if (!input || !input.value.trim()) return;

  state.muralPosts.unshift({
    id: `m-${Date.now()}`,
    author: state.currentRole === 'admin' ? 'Diretoria ASAF (Admin)' : 'GVC Associado (Iniciais: L. M. S.)',
    badge: state.currentRole === 'admin' ? 'Comunicado Diretoria' : 'Mural GVC SC',
    time: 'Agora mesmo',
    content: input.value.trim(),
    isDeleted: false,
    deletedInfo: null
  });

  input.value = '';
  renderizarMuralInterno();
}

function softDeleteMuralPost(postId) {
  const post = state.muralPosts.find((p) => p.id === postId);
  if (!post) return;
  post.isDeleted = true;
  const now = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  post.deletedInfo = `Soft Delete por Admin às ${now} (is_deleted=True no PostgreSQL/Django)`;
  renderizarMuralInterno();
}

function restaurarMuralPost(postId) {
  const post = state.muralPosts.find((p) => p.id === postId);
  if (!post) return;
  post.isDeleted = false;
  post.deletedInfo = null;
  renderizarMuralInterno();
}

function renderizarMuralInterno() {
  const gvcContainer = document.getElementById('mural-list-gvc');
  const adminContainer = document.getElementById('mural-list-admin');

  // GVC vê apenas posts ativos (SoftDeleteManager: is_deleted=False)
  if (gvcContainer) {
    const activePosts = state.muralPosts.filter((p) => !p.isDeleted);
    gvcContainer.innerHTML = activePosts.map((p) => `
      <div class="p-4 rounded-xl bg-[#061326] border border-slate-800 space-y-1.5">
        <div class="flex items-center justify-between gap-2">
          <div class="flex items-center gap-2">
            <span class="font-bold text-white text-xs sm:text-sm">${p.author}</span>
            <span class="px-2 py-0.5 rounded bg-sky-500/20 text-sky-300 text-[10px] font-bold uppercase">${p.badge}</span>
          </div>
          <span class="text-xs text-slate-400">${p.time}</span>
        </div>
        <p class="text-xs sm:text-sm text-slate-200 leading-relaxed">${p.content}</p>
      </div>
    `).join('');
  }

  // Admin vê todos os posts (all_objects), podendo aplicar Soft Delete ou Restaurar
  if (adminContainer) {
    adminContainer.innerHTML = state.muralPosts.map((p) => `
      <div class="p-4 rounded-xl border transition-all ${p.isDeleted ? 'bg-red-950/25 border-red-500/40 opacity-80' : 'bg-[#061326] border-slate-800'}">
        <div class="flex flex-wrap items-center justify-between gap-2 mb-1.5">
          <div class="flex items-center gap-2">
            <span class="font-bold text-white text-xs sm:text-sm">${p.author}</span>
            <span class="px-2 py-0.5 rounded text-[10px] font-bold uppercase ${p.isDeleted ? 'bg-red-600 text-white' : 'bg-sky-500/20 text-sky-300'}">
              ${p.isDeleted ? '🗑️ SOFT DELETED' : p.badge}
            </span>
          </div>
          <div>
            ${p.isDeleted ? `
              <button onclick="restaurarMuralPost('${p.id}')" class="px-2.5 py-1 rounded bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-bold">
                ↩ Restaurar Registro
              </button>
            ` : `
              <button onclick="softDeleteMuralPost('${p.id}')" class="px-2.5 py-1 rounded bg-red-600/80 hover:bg-red-600 text-white text-[11px] font-bold">
                🗑️ Apagar (Soft Delete)
              </button>
            `}
          </div>
        </div>
        <p class="text-xs sm:text-sm text-slate-200">${p.content}</p>
        ${p.isDeleted ? `<div class="mt-2 text-[11px] font-mono text-red-300">🔒 Auditoria Django: ${p.deletedInfo}</div>` : ''}
      </div>
    `).join('');
  }
}

// 4. AGENDA DE HORÁRIOS (ADMIN ADMINISTRA, GVC VISUALIZA)
function adicionarHorarioAgenda(event) {
  event.preventDefault();
  const date = document.getElementById('ag-date').value.trim();
  const time = document.getElementById('ag-time').value.trim();
  const title = document.getElementById('ag-title').value.trim();
  const location = document.getElementById('ag-location').value.trim();
  if (!date || !time || !title) return;

  state.agendaSlots.unshift({
    id: `ag-${Date.now()}`,
    date,
    time,
    title,
    location: location || 'Florianópolis / SC',
    type: 'Horário Oficial ASAF'
  });

  document.getElementById('ag-date').value = '';
  document.getElementById('ag-time').value = '';
  document.getElementById('ag-title').value = '';
  document.getElementById('ag-location').value = '';
  renderizarAgenda();
}

function removerHorarioAgenda(slotId) {
  state.agendaSlots = state.agendaSlots.filter((s) => s.id !== slotId);
  renderizarAgenda();
}

function renderizarAgenda() {
  const gvcAgenda = document.getElementById('agenda-list-gvc');
  const adminAgenda = document.getElementById('agenda-list-admin');

  if (gvcAgenda) {
    gvcAgenda.innerHTML = state.agendaSlots.map((s) => `
      <div class="p-3.5 rounded-xl bg-[#061326] border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <div class="flex items-center gap-2">
            <span class="text-xs font-mono font-bold text-[#f7d117]">${s.date} • ${s.time}</span>
            <span class="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300">${s.type}</span>
          </div>
          <div class="font-bold text-white text-sm mt-0.5">${s.title}</div>
          <div class="text-xs text-slate-400">📍 ${s.location}</div>
        </div>
      </div>
    `).join('');
  }

  if (adminAgenda) {
    adminAgenda.innerHTML = state.agendaSlots.map((s) => `
      <div class="p-3.5 rounded-xl bg-[#061326] border border-slate-800 flex items-center justify-between gap-3">
        <div>
          <div class="text-xs font-mono font-bold text-[#f7d117]">${s.date} (${s.time})</div>
          <div class="font-bold text-white text-xs sm:text-sm">${s.title}</div>
          <div class="text-xs text-slate-400">📍 ${s.location}</div>
        </div>
        <button onclick="removerHorarioAgenda('${s.id}')" class="px-2.5 py-1 rounded bg-red-600/30 hover:bg-red-600 text-red-200 hover:text-white text-xs font-bold shrink-0">
          Remover
        </button>
      </div>
    `).join('');
  }
}

// 5. ENGINE DE NOTÍCIAS E PUBLICAÇÕES (PÚBLICAS + INTERNAS GVC)
function publicarNoticiaAdmin(event) {
  event.preventDefault();
  const title = document.getElementById('news-title').value.trim();
  const category = document.getElementById('news-category').value;
  const visibility = document.getElementById('news-visibility').value;
  const summary = document.getElementById('news-summary').value.trim();
  if (!title || !summary) return;

  state.newsArticles.unshift({
    id: `news-${Date.now()}`,
    title,
    category,
    visibility,
    date: 'Hoje (Novo)',
    summary
  });

  document.getElementById('news-title').value = '';
  document.getElementById('news-summary').value = '';
  renderizarNoticias();
}

function renderizarNoticias() {
  const publicFeed = document.getElementById('public-news-grid');
  const gvcFeed = document.getElementById('gvc-news-list');

  if (publicFeed) {
    const pubArticles = state.newsArticles.filter((a) => a.visibility === 'PUBLIC');
    publicFeed.innerHTML = pubArticles.map((a) => `
      <article class="p-5 rounded-2xl bg-[#0a1e3c]/85 border border-slate-700/80 hover:border-[#f7d117] transition-all flex flex-col justify-between">
        <div>
          <div class="flex items-center justify-between gap-2 mb-2">
            <span class="px-2.5 py-0.5 rounded bg-[#e61919] text-white text-[11px] font-bold uppercase">${a.category}</span>
            <span class="text-xs text-slate-400">${a.date}</span>
          </div>
          <h4 class="font-display text-lg font-bold text-white uppercase mb-2">${a.title}</h4>
          <p class="text-xs sm:text-sm text-slate-200 leading-relaxed">${a.summary}</p>
        </div>
        <div class="pt-3 mt-4 border-t border-slate-800 text-xs text-[#f7d117] font-bold">
          Portal asafgv.com • Redação Oficial ASAF
        </div>
      </article>
    `).join('');
  }

  if (gvcFeed) {
    gvcFeed.innerHTML = state.newsArticles.map((a) => `
      <div class="p-3.5 rounded-xl bg-[#061326] border border-slate-800">
        <div class="flex items-center justify-between gap-2 mb-1">
          <span class="px-2 py-0.5 rounded text-[10px] font-bold uppercase ${a.visibility === 'INTERNAL_GVC' ? 'bg-amber-500 text-slate-950' : 'bg-sky-500/20 text-sky-300'}">
            ${a.visibility === 'INTERNAL_GVC' ? '🔒 Exclusivo GVC' : '🌐 Público (asafgv.com)'} • ${a.category}
          </span>
          <span class="text-xs text-slate-400">${a.date}</span>
        </div>
        <h5 class="font-bold text-white text-sm">${a.title}</h5>
        <p class="text-xs text-slate-300 mt-1">${a.summary}</p>
      </div>
    `).join('');
  }
}

// Exportação de Amostra CSV Auditável para ALESC / Câmara / MPSC / MPT
function exportarAmostraCSV() {
  const headers = ['Protocolo', 'Iniciais_Publicas_Site', 'Nome_Documento_Oficial', 'CPF_Mascarado_LGPD', 'Municipio_SC', 'Bairro', 'Perfil', 'Timestamp_UTC3', 'Hash_SHA256_Auditoria'];
  const rows = [
    [
      state.lastConfirmedSignature.protocol,
      state.lastConfirmedSignature.initials,
      state.lastConfirmedSignature.name,
      state.lastConfirmedSignature.cpfMasked,
      state.lastConfirmedSignature.city,
      state.lastConfirmedSignature.neighborhood,
      state.lastConfirmedSignature.profile,
      state.lastConfirmedSignature.timestamp,
      state.lastConfirmedSignature.hash
    ],
    ['ASAF-SC-2026-006411', 'G. R. C.', 'Gabriel Ribeiro Costa', '***.731.209-**', 'Florianópolis - SC', 'Campeche', 'Guarda-Vidas Civil (GVC)', '30/10/2026 09:58:02 BRT', '3c9e1a0b5f8d2e4c6a1b9d0e7f3a5c8b2d4e6f8a0c1e3b5d7f9a2c4e6b8d0f1a'],
    ['ASAF-SC-2026-006410', 'M. T. L.', 'Mariana Tavares Luz', '***.194.882-**', 'Balneário Camboriú - SC', 'Centro', 'Banhista / Moradora', '30/10/2026 09:51:40 BRT', '7a1c3e5f9b2d4a6c8e0f1b3d5a7c9e2f4b6d8a0c2e4f6a8b0d2f4c6e8a0b2d4f']
  ];

  const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(';'), ...rows.map((e) => e.join(';'))].join('\n');
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', 'caderno_assinaturas_estadual_ASAFGV_SC.csv');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function copiarTextoCompartilhamento() {
  const texto = `🚨 Assinei a Petição Estadual da ASAF (@asaf.gv) em defesa dos Guarda-Vidas de Florianópolis e de toda Santa Catarina!\n\n🔒 No site público aparecem apenas suas iniciais (100% seguro pela LGPD), e sua assinatura valida o documento oficial entregue à ALESC, Governo de SC e MP.\n\n✊ Pautas: Reajuste Digno | Redução de Carga Horária s/ redução salarial | Guarda-Vidas o Ano Inteiro | Contratação Digna | Plano de Carreira.\n\nAssine agora em: https://asafgv.com`;
  navigator.clipboard.writeText(texto).then(() => {
    const btn = document.getElementById('btn-copy-share');
    if (btn) {
      const orig = btn.innerHTML;
      btn.innerHTML = '✓ Link de asafgv.com Copiado para o WhatsApp!';
      setTimeout(() => { btn.innerHTML = orig; }, 3000);
    }
  });
}

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
  setSeasonMode('inverno');
  atualizarContadoresEMural();
  renderizarComprovanteECard();
  renderizarRelatos();
  setRoleView('gvc');

  const nameInput = document.getElementById('pet-name');
  if (nameInput) {
    nameInput.addEventListener('input', (e) => {
      atualizarPreviaIniciais(e.target.value);
    });
  }

  const cpfInput = document.getElementById('pet-cpf');
  if (cpfInput) {
    cpfInput.addEventListener('input', (e) => {
      e.target.value = formatarCPF(e.target.value);
      atualizarStatusCPF(e.target.value);
    });
  }

  const phoneInput = document.getElementById('pet-contact');
  if (phoneInput) {
    phoneInput.addEventListener('input', (e) => {
      const val = e.target.value;
      if (/^\d|\(/.test(val) && !val.includes('@')) {
        e.target.value = formatarTelefone(val);
      }
    });
  }

  const toggleTitulo = document.getElementById('toggle-titulo-eleitor');
  if (toggleTitulo) {
    toggleTitulo.addEventListener('change', (e) => {
      const box = document.getElementById('titulo-eleitor-box');
      if (box) {
        box.classList.toggle('hidden', !e.target.checked);
      }
    });
  }
});
