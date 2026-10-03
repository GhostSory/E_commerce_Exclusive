/* ==========================================================================
   Exclusive — script.js
   Interactivité du site : countdown, menu mobile, panier/wishlist,
   retour en haut, newsletter, slider du hero.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initCountdowns();
  initHeroDots();
  initWishlistButtons();
  initCartButtons();
  initBackToTop();
  initNewsletterForm();
  initNavArrows();
  document.getElementById('currentYear').textContent = new Date().getFullYear();
});

/* --------------------------------------------------------------------
   Menu mobile (hamburger)
   -------------------------------------------------------------------- */
function initMobileNav() {
  const toggle = document.getElementById('menuToggle');
  const nav = document.getElementById('mainNav');
  if (!toggle || !nav) return;

  toggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(isOpen));
    toggle.innerHTML = isOpen
      ? '<i class="ri-close-line" aria-hidden="true"></i>'
      : '<i class="ri-menu-line" aria-hidden="true"></i>';
  });

  // Ferme le menu quand on clique sur un lien (mobile)
  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.innerHTML = '<i class="ri-menu-line" aria-hidden="true"></i>';
    });
  });
}

/* --------------------------------------------------------------------
   Comptes à rebours (Flash Sale + bannière musicale)
   Chaque conteneur porte des data-attributes de durée initiale ;
   on calcule une date cible une seule fois (stockée en mémoire) puis
   on affiche le temps restant chaque seconde.
   -------------------------------------------------------------------- */
function initCountdowns() {
  const containers = document.querySelectorAll('[data-duration-days]');

  containers.forEach((container) => {
    const days = Number(container.dataset.durationDays || 0);
    const hours = Number(container.dataset.durationHours || 0);
    const minutes = Number(container.dataset.durationMinutes || 0);
    const seconds = Number(container.dataset.durationSeconds || 0);

    const totalMs =
      (((days * 24 + hours) * 60 + minutes) * 60 + seconds) * 1000;
    const targetTime = Date.now() + totalMs;

    const valueEls = {
      days: container.querySelector('[data-unit="days"]'),
      hours: container.querySelector('[data-unit="hours"]'),
      minutes: container.querySelector('[data-unit="minutes"]'),
      seconds: container.querySelector('[data-unit="seconds"]'),
    };

    const update = () => {
      let remaining = Math.max(0, targetTime - Date.now());

      const d = Math.floor(remaining / (1000 * 60 * 60 * 24));
      remaining -= d * 1000 * 60 * 60 * 24;
      const h = Math.floor(remaining / (1000 * 60 * 60));
      remaining -= h * 1000 * 60 * 60;
      const m = Math.floor(remaining / (1000 * 60));
      remaining -= m * 1000 * 60;
      const s = Math.floor(remaining / 1000);

      if (valueEls.days) valueEls.days.textContent = pad(d);
      if (valueEls.hours) valueEls.hours.textContent = pad(h);
      if (valueEls.minutes) valueEls.minutes.textContent = pad(m);
      if (valueEls.seconds) valueEls.seconds.textContent = pad(s);

      if (targetTime - Date.now() <= 0) {
        clearInterval(timerId);
      }
    };

    update();
    const timerId = setInterval(update, 1000);
  });
}

function pad(value) {
  return String(value).padStart(2, '0');
}

/* --------------------------------------------------------------------
   Points du slider du hero (bascule l'état actif)
   -------------------------------------------------------------------- */
function initHeroDots() {
  const dots = document.querySelectorAll('.hero-banner__dot');
  if (!dots.length) return;

  dots.forEach((dot) => {
    dot.addEventListener('click', () => {
      dots.forEach((d) => {
        d.classList.remove('hero-banner__dot--active');
        d.setAttribute('aria-selected', 'false');
      });
      dot.classList.add('hero-banner__dot--active');
      dot.setAttribute('aria-selected', 'true');
    });
  });
}

/* --------------------------------------------------------------------
   Boutons "wishlist" (coeur) : bascule un état visuel + le compteur
   du header
   -------------------------------------------------------------------- */
function initWishlistButtons() {
  const headerWishlistBtn = document.getElementById('wishlistBtn');
  const toggles = document.querySelectorAll('.wishlist-toggle');
  let count = 0;

  const updateHeaderState = () => {
    if (!headerWishlistBtn) return;
    headerWishlistBtn.setAttribute('aria-pressed', String(count > 0));
    headerWishlistBtn.setAttribute(
      'aria-label',
      `Wishlist, ${count} item${count === 1 ? '' : 's'}`
    );
  };

  toggles.forEach((btn) => {
    btn.addEventListener('click', () => {
      const pressed = btn.getAttribute('aria-pressed') === 'true';
      btn.setAttribute('aria-pressed', String(!pressed));
      count += pressed ? -1 : 1;
      updateHeaderState();
    });
  });

  if (headerWishlistBtn) {
    headerWishlistBtn.addEventListener('click', () => {
      const pressed = headerWishlistBtn.getAttribute('aria-pressed') === 'true';
      headerWishlistBtn.setAttribute('aria-pressed', String(!pressed));
    });
  }
}

/* --------------------------------------------------------------------
   Boutons "Add to Cart" : incrémente le compteur du panier dans le
   header et donne un feedback visuel bref sur le bouton cliqué
   -------------------------------------------------------------------- */
function initCartButtons() {
  const cartCountEl = document.getElementById('cartCount');
  const cartBtn = document.getElementById('cartBtn');
  const addButtons = document.querySelectorAll('.add-to-cart');
  let count = 0;

  addButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      count += 1;

      if (cartCountEl) {
        cartCountEl.textContent = String(count);
        cartCountEl.hidden = false;
      }
      if (cartBtn) {
        cartBtn.setAttribute(
          'aria-label',
          `Shopping cart, ${count} item${count === 1 ? '' : 's'}`
        );
      }

      const originalText = btn.textContent;
      btn.textContent = 'Added ✓';
      btn.classList.add('is-added');
      setTimeout(() => {
        btn.textContent = originalText;
        btn.classList.remove('is-added');
      }, 1200);
    });
  });
}

/* --------------------------------------------------------------------
   Bouton "retour en haut"
   -------------------------------------------------------------------- */
function initBackToTop() {
  const btn = document.getElementById('backToTop');
  if (!btn) return;

  const toggleVisibility = () => {
    btn.hidden = window.scrollY < 400;
  };

  window.addEventListener('scroll', toggleVisibility, { passive: true });
  toggleVisibility();

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* --------------------------------------------------------------------
   Formulaire newsletter : validation basique côté client et message
   de confirmation (aucun envoi réseau — à brancher sur un vrai
   service quand le site sera mis en ligne)
   -------------------------------------------------------------------- */
function initNewsletterForm() {
  const form = document.getElementById('newsletterForm');
  const input = document.getElementById('newsletterEmail');
  const message = document.getElementById('newsletterMessage');
  if (!form || !input || !message) return;

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const email = input.value.trim();
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (!isValid) {
      message.textContent = 'Please enter a valid email address.';
      message.style.color = '#ff6b6b';
      return;
    }

    message.textContent = 'Thanks for subscribing!';
    message.style.color = '#00ff66';
    form.reset();
  });
}

/* --------------------------------------------------------------------
   Flèches de navigation (Flash Sale, Categories, etc.) : fait défiler
   horizontalement la section de contenu la plus proche si besoin.
   Pour l'instant purement décoratif / prêt à être branché sur un
   vrai carrousel si le contenu dépasse la largeur de l'écran.
   -------------------------------------------------------------------- */
function initNavArrows() {
  document.querySelectorAll('.nav-arrow').forEach((arrow) => {
    arrow.addEventListener('click', () => {
      const section = arrow.closest('section')?.nextElementSibling;
      if (!section) return;
      const direction = arrow.getAttribute('aria-label')?.includes('Previous') ? -1 : 1;
      section.scrollBy({ left: direction * 280, behavior: 'smooth' });
    });
  });
}
