// ---- configuração de contato ----
const WHATSAPP = '557199919749';

const waUrl = (text) => `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`;

const serviceMessage = (service) => service
  ? `Olá! Encontrei o site da LP Gestão e gostaria de saber mais sobre ${service}.`
  : 'Olá! Encontrei o site da LP Gestão e gostaria de mais informações.';

// eventos para Google Tag Manager / Google Ads (ignorados se o GTM não estiver instalado)
window.dataLayer = window.dataLayer || [];
const track = (event, params = {}) => window.dataLayer.push({ event, ...params });

// ---- ano no rodapé ----
document.getElementById('ano').textContent = new Date().getFullYear();

// ---- links de WhatsApp com mensagem por serviço ----
document.querySelectorAll('[data-wa]').forEach(link => {
  const service = link.dataset.wa;
  link.href = waUrl(serviceMessage(service));
  link.addEventListener('click', () => track('whatsapp_click', { service: service || 'geral' }));
});

// ---- menu mobile ----
const toggle = document.querySelector('.nav__toggle');
const menu = document.getElementById('menu-mobile');

const setMenu = (open) => {
  menu.hidden = !open;
  toggle.setAttribute('aria-expanded', String(open));
  toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
};

toggle.addEventListener('click', () => setMenu(menu.hidden));
menu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setMenu(false)));

// ---- formulário → WhatsApp ----
const form = document.getElementById('orcamento');
const formError = form.querySelector('.form__error');

const showError = (msg, field) => {
  formError.textContent = msg;
  formError.hidden = false;
  field.setAttribute('aria-invalid', 'true');
  field.focus();
};

form.addEventListener('input', (e) => {
  e.target.removeAttribute('aria-invalid');
  formError.hidden = true;
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const data = new FormData(form);
  const nome = data.get('nome').trim();
  const whatsapp = data.get('whatsapp').trim();
  const empresa = data.get('empresa').trim();
  const servico = data.get('servico');
  const mensagem = data.get('mensagem').trim();

  if (!nome) return showError('Informe o seu nome.', form.elements.nome);
  if (whatsapp.replace(/\D/g, '').length < 10) return showError('Informe um WhatsApp válido, com DDD.', form.elements.whatsapp);
  if (!servico) return showError('Selecione o serviço de interesse.', form.elements.servico);

  const campos = [
    `*Nome:* ${nome}`,
    `*WhatsApp:* ${whatsapp}`,
    empresa && `*Empresa:* ${empresa}`,
    `*Serviço:* ${servico}`,
    mensagem && `*Mensagem:* ${mensagem}`,
  ].filter(Boolean);
  const texto = ['Olá! Encontrei o site da LP Gestão e gostaria de uma proposta.', '', ...campos].join('\n');

  track('generate_lead', { form: 'proposta', service: servico });
  window.open(waUrl(texto), '_blank', 'noopener');
});

// ---- reveal on scroll ----
const targets = document.querySelectorAll(
  '.section .eyebrow, .section .h2, .about__text, .card, .quote-band__text, .steps li, .features__list li, .accordion, .contact-list, .form'
);
targets.forEach(el => el.classList.add('reveal'));

const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('is-in');
    io.unobserve(entry.target);
  });
}, { rootMargin: '0px 0px -10% 0px', threshold: 0.08 });

targets.forEach((el, i) => {
  el.style.transitionDelay = `${(i % 3) * 80}ms`;
  io.observe(el);
});

// ---- dúvidas: uma aberta por vez ----
const items = document.querySelectorAll('.accordion details');
items.forEach(d => d.addEventListener('toggle', () => {
  if (!d.open) return;
  items.forEach(other => { if (other !== d) other.open = false; });
}));
