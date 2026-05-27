// ── Cursor ──
const cursor = document.getElementById('cursor');
document.addEventListener('mousemove', e => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top  = e.clientY + 'px';
});
document.querySelectorAll('a, button, .photo-card').forEach(el => {
  el.addEventListener('mouseenter', () => { cursor.style.transform = 'translate(-50%,-50%) scale(3)'; cursor.style.background = '#f5c842'; });
  el.addEventListener('mouseleave', () => { cursor.style.transform = 'translate(-50%,-50%) scale(1)'; cursor.style.background = '#e84c1e'; });
});

// ── Scroll reveal ──
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// ── Lightbox data ──
// Customize titles, descriptions, and tags for each photo here
const photos = [
  { title: 'Photo Title One',    desc: 'Add a short description about this photograph.',   tags: ['Landscape', '2025'] },
  { title: 'Photo Title Two',    desc: 'Add a short description about this photograph.',   tags: ['Portrait', '2025']  },
  { title: 'Photo Title Three',  desc: 'Add a short description about this photograph.',   tags: ['Street', '2025']    },
  { title: 'Photo Title Four',   desc: 'Add a short description about this photograph.',   tags: ['Nature', '2025']    },
  { title: 'Photo Title Five',   desc: 'Add a short description about this photograph.',   tags: ['Architecture', '2025'] },
  { title: 'Photo Title Six',    desc: 'Add a short description about this photograph.',   tags: ['Abstract', '2025']  },
  { title: 'Photo Title Seven',  desc: 'Add a short description about this photograph.',   tags: ['Portrait', '2024']  },
  { title: 'Photo Title Eight',  desc: 'Add a short description about this photograph.',   tags: ['Landscape', '2024'] },
  { title: 'Photo Title Nine',   desc: 'Add a short description about this photograph.',   tags: ['Street', '2024']    },
  { title: 'Photo Title Ten',    desc: 'Add a short description about this photograph.',   tags: ['Nature', '2024']    },
  { title: 'Photo Title Eleven', desc: 'Add a short description about this photograph.',   tags: ['Abstract', '2024']  },
  { title: 'Photo Title Twelve', desc: 'Add a short description about this photograph.',   tags: ['Architecture', '2024'] },
];

let current = 0;
const lightbox  = document.getElementById('lightbox');
const lbImgWrap = document.getElementById('lb-img-wrap');
const lbNum     = document.getElementById('lb-num');
const lbTitle   = document.getElementById('lb-title');
const lbDesc    = document.getElementById('lb-desc');
const lbTags    = document.getElementById('lb-tags');

function openLightbox(index) {
  current = index;
  updateLightbox();
  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function updateLightbox() {
  const p = photos[current];
  const cards = document.querySelectorAll('.photo-card');
  const thumbContent = cards[current].querySelector('.photo-thumb').innerHTML;

  lbImgWrap.innerHTML = thumbContent;
  // Style the placeholder/img to fill the lightbox properly
  const img = lbImgWrap.querySelector('img');
  if (img) {
    img.style.maxWidth  = '65vw';
    img.style.maxHeight = '80vh';
    img.style.objectFit = 'contain';
  }
  const ph = lbImgWrap.querySelector('.photo-placeholder');
  if (ph) {
    ph.style.width  = '500px';
    ph.style.height = '380px';
  }

  lbNum.textContent   = String(current + 1).padStart(2,'0') + ' / ' + String(photos.length).padStart(2,'0');
  lbTitle.textContent = p.title;
  lbDesc.textContent  = p.desc;
  lbTags.innerHTML    = p.tags.map(t => `<span class="lb-tag">${t}</span>`).join('');
}

function closeLightbox() {
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
}

document.querySelectorAll('.photo-card').forEach((card, i) => {
  card.addEventListener('click', () => openLightbox(i));
});

document.getElementById('lb-close').addEventListener('click', closeLightbox);
document.getElementById('lb-prev').addEventListener('click', () => { current = (current - 1 + photos.length) % photos.length; updateLightbox(); });
document.getElementById('lb-next').addEventListener('click', () => { current = (current + 1) % photos.length; updateLightbox(); });

lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });

document.addEventListener('keydown', e => {
  if (!lightbox.classList.contains('open')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft')  { current = (current - 1 + photos.length) % photos.length; updateLightbox(); }
  if (e.key === 'ArrowRight') { current = (current + 1) % photos.length; updateLightbox(); }
});

// Update photo count in header
document.getElementById('photo-count').textContent = photos.length;
