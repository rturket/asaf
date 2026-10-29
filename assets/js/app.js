// ASAF (@asaf.gv) - Lógica Interativa do Protótipo de Telas

const state = {
  currentScreen: 'home',
  seasonMode: 'inverno', // 'inverno' | 'verao' | 'proposta'
  totalSignatures: 4827,
  goalSignatures: 10000,
  pendingSignature: null,
  lastConfirmedSignature: {
    name: 'Lucas M. Silveira',
    publicName: 'Lucas S.',
    cpfMasked: '***.482.910-**',
    city: 'Florianópolis - SC',
    neighborhood: 'Campeche (Sul da Ilha)',
    profile: 'Guarda-Vidas Civil (GVCV)',
    timestamp: '29/10/2026 11:42:18 BRT (UTC-3)',
    hash: '8f4b2e9c1a7d3056f89c0e1d4a7b2c6e9f1a3b5d7e9f0c2a4b6d8e0f1a2b3c4d',
    protocol: 'ASAF-2026-004827'
  },
  supporters: [
    { name: 'Gabriel R.', location: 'Campeche, Florianópolis', profile: 'Guarda-Vidas Civil (GVCV)', time: 'há 2 min', verified: true },
    { name: 'Mariana T.', location: 'Ingleses, Florianópolis', profile: 'Moradora / Banhista', time: 'há 5 min', verified: true },
    { name: 'Sgt. Henrique B.', location: 'Trindade, Florianópolis', profile: 'Bombeiro Militar', time: 'há 9 min', verified: true },
    { name: 'Pedro A.', location: 'Barra da Lagoa, Florianópolis', profile: 'Surfista / Atleta Aquático', time: 'há 14 min', verified: true },
    { name: 'Camila F.', location: 'Joaquina, Florianópolis', profile: 'Comerciante Local', time: 'há 18 min', verified: true },
    { name: 'Rodrigo V.', location: 'Santinho, Florianópolis', profile: 'Guarda-Vidas Civil (GVCV)', time: 'há 23 min', verified: true },
    { name: 'Beatriz L.', location: 'Armação, Florianópolis', profile: 'Moradora / Banhista', time: 'há 31 min', verified: true },
    { name: 'Thiago N.', location: 'Praia Brava, Florianópolis', profile: 'Guarda-Vidas Civil (GVCV)', time: 'há 39 min', verified: true }
  ],
  reports: [
    {
      beach: 'Posto Praia do Matadeiro / Armação (Sul da Ilha)',
      category: 'Posto Desativado Fora de Temporada',
      date: 'Outubro/2026',
      description: 'Finais de semana de sol na primavera/outono com centenas de banhistas e surfistas na água, correntes de retorno fortíssimas e posto completamente fechado sem nenhum guarda-vidas.',
      author: 'Relato Anônimo Verificado (GVCV - 6 temporadas)'
    },
    {
      beach: 'Região Leste / Norte da Ilha',
      category: 'Jornada Exaustiva & Diária Defasada',
      date: 'Operação Verão',
      description: 'Turnos que chegam a 10h-12h seguidas sob sol escaldante, sem vínculo trabalhista, recebendo apenas ressarcimento diário sem direito a FGTS, 13º ou amparo caso nos machuquemos num resgate no costão.',
      author: 'Relato Anônimo Verificado (GVCV - 4 temporadas)'
    },
    {
      beach: 'Postos da Costa Leste / Sul',
      category: 'Sucateamento de Estrutura e EPI',
      date: 'Setembro/2026',
      description: 'Cadeirões e postos precisando de manutenção estrutural urgente, falta de abrigo adequado contra vento sul/chuva e atraso na reposição de materiais básicos de trabalho.',
      author: 'Associado ASAF Verificado'
    }
  ]
};

// Dados das Praias de Florianópolis para o Simulador de Cobertura
const beachesData = [
  { name: 'Praia dos Ingleses', region: 'Norte da Ilha', inverno: 'ativo', verao: 'ativo', risk: 'Alto fluxo anual e correntes', postsSummer: '6 postos', postsWinter: '1 posto fixo' },
  { name: 'Praia do Santinho', region: 'Norte da Ilha', inverno: 'fechado', verao: 'ativo', risk: 'Mar aberto, buracos e costão', postsSummer: '2 postos', postsWinter: '0 (Desprotegida)' },
  { name: 'Praia Brava', region: 'Norte da Ilha', inverno: 'fechado', verao: 'ativo', risk: 'Ondas fortes e repuxo intenso', postsSummer: '3 postos', postsWinter: '0 (Desprotegida)' },
  { name: 'Canasvieiras / Jurerê', region: 'Norte da Ilha', inverno: 'fechado', verao: 'ativo', risk: 'Turismo o ano todo', postsSummer: '7 postos', postsWinter: '0 (Desprotegida)' },
  { name: 'Praia do Moçambique', region: 'Leste da Ilha', inverno: 'fechado', verao: 'ativo', risk: 'Maior praia da ilha, mar pesado', postsSummer: '2 postos', postsWinter: '0 (Desprotegida)' },
  { name: 'Barra da Lagoa', region: 'Leste da Ilha', inverno: 'fechado', verao: 'ativo', risk: 'Canal, correnteza e turistas', postsSummer: '2 postos', postsWinter: '0 (Desprotegida)' },
  { name: 'Praia Mole', region: 'Leste da Ilha', inverno: 'ativo', verao: 'ativo', risk: 'Mar de tombo e correntes fortes', postsSummer: '2 postos', postsWinter: '1 posto fixo' },
  { name: 'Praia da Joaquina', region: 'Leste da Ilha', inverno: 'ativo', verao: 'ativo', risk: 'Costão, surfe e correntes severas', postsSummer: '2 postos', postsWinter: '1 posto fixo' },
  { name: 'Praia do Campeche', region: 'Sul da Ilha', inverno: 'fechado', verao: 'ativo', risk: 'Extensa faixa de areia e valas', postsSummer: '4 postos', postsWinter: 'Coleta/Parcial ou Fechado' },
  { name: 'Morro das Pedras / Caldeirão', region: 'Sul da Ilha', inverno: 'fechado', verao: 'ativo', risk: 'Costão perigoso e corrente sul', postsSummer: '2 postos', postsWinter: '0 (Desprotegida)' },
  { name: 'Armação & Matadeiro', region: 'Sul da Ilha', inverno: 'fechado', verao: 'ativo', risk: 'Correntes de retorno junto à ilha/costão', postsSummer: '3 postos', postsWinter: '0 (Desprotegida)' },
  { name: 'Açores, Solidão e Naufragados', region: 'Extremo Sul', inverno: 'fechado', verao: 'ativo', risk: 'Acesso difícil e mar de alto risco', postsSummer: '3 postos', postsWinter: '0 (Desprotegida)' }
];

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

  // Atualiza botões da barra de protótipo e menu principal
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
        <span class="inline-block px-2.5 py-0.5 rounded bg-red-600 text-white text-xs font-bold uppercase tracking-wider mb-1">Alerta Crítico: Fora de Temporada (Outono/Inverno/Primavera)</span>
        <p class="text-sm md:text-base font-medium">Mais de <strong>90% das praias de Florianópolis ficam sem postos ativos</strong> durante a maior parte do ano. Em caso de afogamento, o socorro depende de deslocamento distante via 193.</p>
      </div>
      <div class="text-right shrink-0">
        <div class="text-2xl font-display font-bold text-yellow-400">Apenas ~3 Praias</div>
        <div class="text-xs text-red-200">com posto fixo anual na Ilha</div>
      </div>
    `;
  } else if (mode === 'verao') {
    banner.className = 'p-4 rounded-xl bg-amber-950/70 border border-amber-500/40 text-amber-100 mb-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4';
    banner.innerHTML = `
      <div>
        <span class="inline-block px-2.5 py-0.5 rounded bg-amber-500 text-slate-950 text-xs font-bold uppercase tracking-wider mb-1">Alta Temporada: Sobrecarga e Precarização</span>
        <p class="text-sm md:text-base font-medium">Os postos abrem no verão sustentados por <strong>Guarda-Vidas Civis "Voluntários" (Lei 13.880/2006)</strong> em turnos exaustivos de <strong>9h a 12h diárias</strong>, sem vínculo trabalhista, férias, 13º ou FGTS.</p>
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
        <span class="inline-block px-2.5 py-0.5 rounded bg-emerald-500 text-slate-950 text-xs font-bold uppercase tracking-wider mb-1">Pauta ASAF: Guarda-Vidas o Ano Inteiro + Contratação Digna</span>
        <p class="text-sm md:text-base font-medium">Cobertura permanente de salvamento aquático nas praias de Florianópolis o ano todo, com jornada justa de 6h/dia sem redução salarial, contratação digna e plano de carreira.</p>
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
        statusBadge = `<span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-red-500/20 text-red-300 border border-red-500/40"><span class="w-2 h-2 rounded-full bg-red-500 marker-danger"></span>SEM GUARDA-VIDAS</span>`;
        cardBorder = 'border-red-500/40 bg-red-950/20';
        postInfo = b.postsWinter;
      }
    } else if (mode === 'verao') {
      statusBadge = `<span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40"><span class="w-2 h-2 rounded-full bg-amber-400"></span>Ativo (GVCV Precarizado)</span>`;
      cardBorder = 'border-amber-500/30 bg-slate-900/70';
      postInfo = `${b.postsSummer} (Jornada 9h-12h)`;
    } else {
      statusBadge = `<span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"><span class="w-2 h-2 rounded-full bg-emerald-400 marker-safe"></span>Cobertura Permanente ASAF</span>`;
      cardBorder = 'border-emerald-500/40 bg-emerald-950/15';
      postInfo = 'Efetivo fixo o ano inteiro + Turno 6h';
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

// Gerador de CPF Válido para facilitar testes no protótipo
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
    feedback.innerHTML = '<span class="text-emerald-400 text-xs font-semibold">✓ CPF matematicamente válido (Dígito Verificador OK)</span>';
  } else {
    feedback.innerHTML = '<span class="text-red-400 text-xs font-semibold">✕ CPF inválido. Verifique os números ou clique em "Gerar CPF de Teste".</span>';
  }
}

// Gera Hash SHA-256 Real usando Web Crypto API
async function gerarHashSHA256(texto) {
  if (window.crypto && window.crypto.subtle) {
    const msgBuffer = new TextEncoder().encode(texto);
    const hashBuffer = await window.crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
  }
  // Fallback simples
  let h = '';
  for (let i = 0; i < 64; i++) {
    h += Math.floor(Math.random() * 16).toString(16);
  }
  return h;
}

// Submissão Inicial da Petição -> Abre Modal de Confirmação OTP (2ª Etapa)
function iniciarAssinaturaPeticao(event) {
  event.preventDefault();

  const name = document.getElementById('pet-name').value.trim();
  const cpf = document.getElementById('pet-cpf').value.trim();
  const contact = document.getElementById('pet-contact').value.trim();
  const city = document.getElementById('pet-city').value.trim();
  const neighborhood = document.getElementById('pet-neighborhood').value.trim();
  const profile = document.getElementById('pet-profile').value;
  const lgpdConsent = document.getElementById('pet-lgpd').checked;
  const errorBox = document.getElementById('pet-error-box');

  if (!validarCPF(cpf)) {
    errorBox.classList.remove('hidden');
    errorBox.textContent = 'Por favor, informe um CPF válido para garantir a legitimidade jurídica da assinatura (ou use o botão "Gerar CPF de Teste").';
    return;
  }

  if (!name || name.split(' ').length < 2) {
    errorBox.classList.remove('hidden');
    errorBox.textContent = 'Informe seu Nome e Sobrenome completos conforme documento oficial.';
    return;
  }

  if (!lgpdConsent) {
    errorBox.classList.remove('hidden');
    errorBox.textContent = 'É necessário aceitar o termo de finalidade específica (LGPD) para validar sua assinatura.';
    return;
  }

  errorBox.classList.add('hidden');

  const parts = name.split(/\s+/);
  const publicName = `${parts[0]} ${parts[parts.length - 1].charAt(0)}.`;
  const digits = cpf.replace(/\D/g, '');
  const cpfMasked = `***.${digits.slice(3, 6)}.${digits.slice(6, 9)}-**`;

  state.pendingSignature = {
    name,
    publicName,
    cpfMasked,
    contact,
    city,
    neighborhood: neighborhood || 'Centro',
    profile
  };

  // Exibe modal OTP
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
  const protocol = `ASAF-2026-00${state.totalSignatures}`;

  state.lastConfirmedSignature = {
    ...pending,
    timestamp: nowStr,
    hash,
    protocol
  };

  // Adiciona no topo do mural público (respeitando anonimização LGPD)
  state.supporters.unshift({
    name: pending.publicName,
    location: `${pending.neighborhood}, ${pending.city}`,
    profile: pending.profile,
    time: 'agora mesmo',
    verified: true
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
  setTxt('rec-name', sig.name);
  setTxt('rec-cpf', sig.cpfMasked);
  setTxt('rec-location', `${sig.neighborhood} — ${sig.city}`);
  setTxt('rec-profile', sig.profile);
  setTxt('rec-time', sig.timestamp);
  setTxt('rec-hash', sig.hash);

  // Atualiza Card Visual do Instagram Stories (@asaf.gv)
  setTxt('story-name', sig.publicName);
  setTxt('story-profile', sig.profile);
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
      <div class="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-between gap-3">
        <div class="flex items-center gap-3">
          <div class="w-9 h-9 rounded-full bg-red-600/20 border border-red-500/40 text-red-400 font-bold flex items-center justify-center text-sm shrink-0">
            ${s.name.charAt(0)}
          </div>
          <div>
            <div class="flex items-center gap-2">
              <span class="font-bold text-white text-sm">${s.name}</span>
              <span class="text-[11px] px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 font-medium">✓ CPF Validado</span>
            </div>
            <div class="text-xs text-slate-400">${s.location} • <span class="text-yellow-400/90">${s.profile}</span></div>
          </div>
        </div>
        <span class="text-xs text-slate-500 shrink-0">${s.time}</span>
      </div>
    `).join('');
  }
}

// Cadastro de Relato de Sucateamento (Tela 4 - Área Guarda-Vidas)
function enviarRelatoGuardaVidas(event) {
  event.preventDefault();
  const beach = document.getElementById('rep-beach').value.trim();
  const category = document.getElementById('rep-category').value;
  const desc = document.getElementById('rep-desc').value.trim();
  const anon = document.getElementById('rep-anon').checked;

  if (!beach || !desc) return;

  state.reports.unshift({
    beach,
    category,
    date: 'Outubro/2026 (Novo)',
    description: desc,
    author: anon ? 'Relato Anônimo Protegido (GVCV/CBMSC)' : 'Associado ASAF Verificado'
  });

  document.getElementById('rep-beach').value = '';
  document.getElementById('rep-desc').value = '';

  const msg = document.getElementById('rep-success-msg');
  if (msg) {
    msg.classList.remove('hidden');
    setTimeout(() => msg.classList.add('hidden'), 5000);
  }

  renderizarRelatos();
}

function renderizarRelatos() {
  const container = document.getElementById('reports-list');
  if (!container) return;

  container.innerHTML = state.reports.map((r) => `
    <div class="p-5 rounded-xl bg-slate-900/90 border border-slate-800">
      <div class="flex flex-wrap items-center justify-between gap-2 mb-2">
        <span class="px-2.5 py-1 rounded bg-red-500/20 text-red-300 border border-red-500/30 text-xs font-bold uppercase">${r.category}</span>
        <span class="text-xs text-slate-400">${r.date}</span>
      </div>
      <h4 class="font-bold text-white text-base mb-1.5">${r.beach}</h4>
      <p class="text-sm text-slate-300 leading-relaxed mb-3">"${r.description}"</p>
      <div class="text-xs text-yellow-400/90 font-medium flex items-center gap-1.5">
        <span>🛡️</span> <span>${r.author}</span>
      </div>
    </div>
  `).join('');
}

// Exportação de Amostra CSV Auditável para ALESC / Câmara / MPSC / MPT
function exportarAmostraCSV() {
  const headers = ['Protocolo', 'Nome_Apoiador', 'CPF_Mascarado_LGPD', 'Municipio_UF', 'Bairro', 'Perfil', 'Timestamp_UTC3', 'Hash_SHA256_Auditoria'];
  const rows = [
    [
      state.lastConfirmedSignature.protocol,
      state.lastConfirmedSignature.name,
      state.lastConfirmedSignature.cpfMasked,
      state.lastConfirmedSignature.city,
      state.lastConfirmedSignature.neighborhood,
      state.lastConfirmedSignature.profile,
      state.lastConfirmedSignature.timestamp,
      state.lastConfirmedSignature.hash
    ],
    ['ASAF-2026-004826', 'Gabriel Ribeiro Costa', '***.731.209-**', 'Florianópolis - SC', 'Campeche', 'Guarda-Vidas Civil (GVCV)', '29/10/2026 11:39:02 BRT', '3c9e1a0b5f8d2e4c6a1b9d0e7f3a5c8b2d4e6f8a0c1e3b5d7f9a2c4e6b8d0f1a'],
    ['ASAF-2026-004825', 'Mariana Tavares Luz', '***.194.882-**', 'Florianópolis - SC', 'Ingleses', 'Moradora / Banhista', '29/10/2026 11:35:40 BRT', '7a1c3e5f9b2d4a6c8e0f1b3d5a7c9e2f4b6d8a0c2e4f6a8b0d2f4c6e8a0b2d4f']
  ];

  const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(';'), ...rows.map((e) => e.join(';'))].join('\n');
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', 'caderno_assinaturas_auditoria_ASAF.csv');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function copiarTextoCompartilhamento() {
  const texto = `🚨 Assinei a Petição Oficial da ASAF (@asaf.gv) em defesa dos Guarda-Vidas de Florianópolis!\n\n🏖️ Mais de 90% das praias ficam SEM guarda-vidas fora da temporada e os Guarda-Vidas Civis sofrem com sucateamento e falta de direitos.\n\n✊ Pautas: Reajuste Digno | Redução de Carga Horária sem redução salarial | Guarda-Vidas o Ano Inteiro | Contratação Digna | Plano de Carreira.\n\nAssine também com seu CPF: https://asaf-floripa.org.br`;
  navigator.clipboard.writeText(texto).then(() => {
    const btn = document.getElementById('btn-copy-share');
    if (btn) {
      const orig = btn.innerHTML;
      btn.innerHTML = '✓ Texto Copiado para o WhatsApp / Instagram!';
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
