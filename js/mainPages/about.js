// ── Cursor ──
const cursor = document.getElementById('cursor');
document.addEventListener('mousemove', e => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top  = e.clientY + 'px';
});
document.querySelectorAll('a, button, .tool-card, .quote-block, .ptag').forEach(el => {
  el.addEventListener('mouseenter', () => { cursor.style.transform = 'translate(-50%,-50%) scale(3)'; cursor.style.background = '#f5c842'; });
  el.addEventListener('mouseleave', () => { cursor.style.transform = 'translate(-50%,-50%) scale(1)'; cursor.style.background = '#e84c1e'; });
});

// ── Scroll reveal + skill bars ──
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    e.target.classList.add('visible');

    // Animate skill bars inside revealed cards
    e.target.querySelectorAll('.tool-skill-fill').forEach(bar => {
      bar.style.width = bar.dataset.width;
    });
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// Also watch individual tool cards for bar animation
document.querySelectorAll('.tool-card').forEach(card => {
  observer.observe(card);
});
