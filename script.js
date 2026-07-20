const toggle=document.querySelector('.menu-toggle');const nav=document.querySelector('.nav-links');toggle.addEventListener('click',()=>{const open=nav.classList.toggle('open');toggle.setAttribute('aria-expanded',open)});document.querySelectorAll('.nav-links a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')}),{threshold:.12});document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));


// Continuous identity sequence:
// Vegetarian. -> Non-Vegetarian. -> Milletarian® -> repeat
const identityStage = document.querySelector('.identity-stage');
const identityWord = document.getElementById('identityWord');
const identityTagline = document.getElementById('identityTagline');

if (identityStage && identityWord && identityTagline) {
  const sequence = [
    { kind: 'word', text: 'Vegetarian.', hold: 1450 },
    { kind: 'word', text: 'Non-Vegetarian.', hold: 1450 },
    { kind: 'brand', hold: 2300 }
  ];
  let step = 0;

  function showIdentityStep() {
    const current = sequence[step];

    identityStage.classList.remove('show-brand');
    identityTagline.classList.remove('visible');
    identityWord.style.opacity = '0';
    identityWord.style.transform = window.innerWidth <= 900
      ? 'translate(-50%,18px)'
      : 'translateY(18px)';

    setTimeout(() => {
      if (current.kind === 'word') {
        identityWord.textContent = current.text;
        identityWord.style.filter = 'blur(0)';
        identityWord.style.opacity = '1';
        identityWord.style.transform = window.innerWidth <= 900
          ? 'translate(-50%,0)'
          : 'translateY(0)';
      } else {
        identityStage.classList.add('show-brand');
        setTimeout(() => identityTagline.classList.add('visible'), 480);
      }

      setTimeout(() => {
        step = (step + 1) % sequence.length;
        showIdentityStep();
      }, current.hold);
    }, 420);
  }

  showIdentityStep();
}


// Monsoon Offer popup
const promoOverlay = document.getElementById('promoOverlay');
const promoClose = document.getElementById('promoClose');
const copyPromoCode = document.getElementById('copyPromoCode');
const promoCode = document.getElementById('promoCode');
const promoShopNow = document.getElementById('promoShopNow');

if (promoOverlay) {
  const openPromo = () => {
    promoOverlay.classList.add('visible');
    promoOverlay.setAttribute('aria-hidden', 'false');
    document.body.classList.add('promo-open');
  };

  const closePromo = () => {
    promoOverlay.classList.remove('visible');
    promoOverlay.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('promo-open');
  };

  // Show on every page visit or refresh
  setTimeout(openPromo, 1400);

  promoClose?.addEventListener('click', closePromo);
  promoShopNow?.addEventListener('click', closePromo);

  promoOverlay.addEventListener('click', (event) => {
    if (event.target === promoOverlay) {
      closePromo();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (
      event.key === 'Escape' &&
      promoOverlay.classList.contains('visible')
    ) {
      closePromo();
    }
  });

  copyPromoCode?.addEventListener('click', async () => {
    const code = promoCode?.textContent?.trim() || 'HEALTH50';

    try {
      await navigator.clipboard.writeText(code);
    } catch {
      const temp = document.createElement('textarea');
      temp.value = code;
      document.body.appendChild(temp);
      temp.select();
      document.execCommand('copy');
      temp.remove();
    }

    copyPromoCode.textContent = 'Copied!';
    copyPromoCode.classList.add('copied');

    setTimeout(() => {
      copyPromoCode.textContent = 'Copy Code';
      copyPromoCode.classList.remove('copied');
    }, 1800);
  });
}