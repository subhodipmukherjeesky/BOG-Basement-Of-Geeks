
document.addEventListener('DOMContentLoaded', () => {

  /* ================= HERO SLIDER ================= */
  const slides = [
    {
      image: 'BOG_Events/Event_1/assets/dsevent.png',
      cta: 'Book Your Slot Now',
      link: 'BOG_Events/Event_1/eventpage1.html',
      title: 'Watch out latest\nDemon Slayer Movie\nMeet Up Event in PVR!'
    },
    {
      image: 'BOG_Events/Event_2/assets/gaming_event.jpg',
      cta: 'Register Now',
      link: 'BOG_Events/Event_2/eventpage2.html',
      title: 'Play, Compete, Conquer,\nEpic Gaming & Esports\nBOG Gaming Fest 2025!'
    },
    {
      image: 'BOG_Events/Event_3/assets/codersmeetup.png',
      cta: 'Explore Now',
      link: 'BOG_Events/Event_3/eventpage3.html',
      title: 'Think. Build. Innovate \nUnleash Your Coding Superpowers\nBOG Hackathon 2025!'
    },
    {
      image: 'BOG_Events/Event_4/assets/sportsevent.jpg',
      cta: 'Participate Now',
      link: 'BOG_Events/Event_4/eventpage4.html',
      title: 'Run, Play, Win! \nGet Ready for Action\nAnnual Sports Fest 2025!'
    }
  ];

  const slidesRoot = document.querySelector('.hero-slides');
  const heroTitle = document.getElementById('heroTitle');
  const heroCta = document.getElementById('heroCta');
  const prevBtn = document.getElementById('prevSlide');
  const nextBtn = document.getElementById('nextSlide');

  let sliderCurrent = 0;
  const slideTransitionMs = 800;
  const visibleMs = 5000;
  let sliderAuto = null;

  if (slidesRoot) {
    // Create slides
    slides.forEach((s, i) => {
      const div = document.createElement('div');
      div.className = 'slide' + (i === 0 ? ' active' : '');
      div.style.backgroundImage = `url('${s.image}')`;
      slidesRoot.appendChild(div);
    });

    const slideEls = slidesRoot.querySelectorAll('.slide');

    function renderSlides() {
      slideEls.forEach((el, i) => {
        el.classList.toggle('active', i === sliderCurrent);
      });
      if (heroTitle) heroTitle.innerHTML = slides[sliderCurrent].title.split('\n').join('<br/>');
      if (heroCta) {
        heroCta.textContent = slides[sliderCurrent].cta;
        heroCta.setAttribute('href', slides[sliderCurrent].link);
      }
    }

    function goSlide(n) {
      sliderCurrent = (sliderCurrent + n + slides.length) % slides.length;
      renderSlides();
    }
    

    // Auto controls
    function startSliderAuto() {
      stopSliderAuto();
      sliderAuto = setInterval(() => goSlide(1), visibleMs + slideTransitionMs);
    }
    function stopSliderAuto() {
      if (sliderAuto) {
        clearInterval(sliderAuto);
        sliderAuto = null;
      }
    }
    function restartSliderAuto() {
      stopSliderAuto();
      startSliderAuto();
    }

    // Buttons (guarded)
    if (prevBtn) prevBtn.addEventListener('click', () => { goSlide(-1); restartSliderAuto(); });
    if (nextBtn) nextBtn.addEventListener('click', () => { goSlide(1); restartSliderAuto(); });

    // Pause on hover / touch, resume on leave / touchend
    slidesRoot.addEventListener('mouseenter', stopSliderAuto);
    slidesRoot.addEventListener('mouseleave', startSliderAuto);
    slidesRoot.addEventListener('touchstart', stopSliderAuto, { passive: true });
    slidesRoot.addEventListener('touchend', startSliderAuto);

    // initial render + auto
    renderSlides();
    startSliderAuto();
  } else {
    console.warn('Hero slider root (.hero-slides) not found in DOM.');
  }

  /* ============== Volunteer & Event Progress Card ============== */
  (function() {
    function animateValue(el, start, end, duration) {
      if (!el) return;
      const range = end - start;
      let startTime = null;
      function step(ts) {
        if (!startTime) startTime = ts;
        const progress = Math.min((ts - startTime) / duration, 1);
        el.textContent = Math.round(start + range * progress);
        if (progress < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    }

    function animateProgressBar(barEl, fromPct, toPct, duration) {
      if (!barEl) return;
      let startTime = null;
      function step(ts) {
        if (!startTime) startTime = ts;
        const progress = Math.min((ts - startTime) / duration, 1);
        const value = fromPct + (toPct - fromPct) * progress;
        barEl.style.width = value + '%';
        if (progress < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    }

    function initCard(card) {
      if (!card) return;
      const cardCurrent = parseInt(card.dataset.current, 10) || 0;
      const total = parseInt(card.dataset.total, 10) || 1;
      const pct = Math.min(100, Math.round((cardCurrent / total) * 100));

      const progressInner = card.querySelector('.ves-progress-inner');
      const spans = card.querySelectorAll('.ves-count span');
      const countCurrent = spans[0] || null;
      const countTotal = spans[spans.length - 1] || null;

      if (countTotal) countTotal.textContent = total;
      if (countCurrent) animateValue(countCurrent, 0, cardCurrent, 800);
      if (progressInner) animateProgressBar(progressInner, 0, pct, 800);
    }

    document.querySelectorAll('.ves-card').forEach(initCard);

    const volBtn = document.getElementById('ves_vol_button');
    if (volBtn) volBtn.addEventListener('click', e => { e.preventDefault(); alert('Become a Volunteer clicked!'); });
    const evtBtn = document.getElementById('ves_evt_button');
    if (evtBtn) evtBtn.addEventListener('click', e => { e.preventDefault(); alert('Submit a Session clicked!'); });

    // expose updater
    window.vesUpdateProgress = function(cardId, newCurrent, newTotal) {
      const card = document.getElementById(cardId);
      if (!card) return;
      card.dataset.current = newCurrent;
      card.dataset.total = newTotal;
      initCard(card);
    };
  })();

  /* ================= BOG SNAP IMAGE & TEXT SLIDING ================= */
  (function() {
    const progressBar = document.getElementById('bogsnap1_progressBar');
    const stepCounter = document.getElementById('bogsnap1_stepCounter');
    const cardDescription = document.getElementById('bogsnap1_desc');
    const card = document.querySelector('.bogsnap1_card');
    const imageWrapper = document.getElementById('bogsnap1_imageWrapper');

    // corrected data array (fixed missing quote/comma)
    const data = [
      {
        desc: "Digimon Beatbreak Anime Reveals New Visual.Starting in October 2025,  first in about two years, will begin airing.",
        bg: "https://a.storyblok.com/f/178900/1460x821/acdee753f5/digimon-beatbreak-character.jpg/m/1200x0/filters:quality(95)format(webp)"
      },
      {
        desc: "The Conjuring: Last Rites’ Jolts Box Office Back to Life, Now Targeting Colossal $75M-Plus Opening",
        bg: "https://www.hollywoodreporter.com/wp-content/uploads/2025/07/rev-1-CLR-03361r_High_Res_JPEG-H-2025.jpg?w=1296&h=730&crop=1"
      },
      {
        desc: "Call of Duty: Black Ops 6 Update Causing Major Issue for Some Players",
        bg: "https://static0.gamerantimages.com/wordpress/wp-content/uploads/2025/09/untitled-design-3-1.jpg?q=70&fit=crop&w=1100&h=618&dpr=1"
      },
      {
        desc: "Meta unveils AI-powered ad tools to boost festive season sales in India",
        bg: "https://www.computerworld.com/wp-content/uploads/2024/07/shutterstock_editorial_2303237423-1.jpg?quality=50&strip=all"
      },
      {
        desc: "Women Asia Cup hockey: India thrashes Thailand 11-0 in campaign-opener",
        bg: "https://th-i.thgim.com/public/incoming/wnqbqu/article70015565.ece/alternates/LANDSCAPE_1200/IMG_TH17UDITA_2_1_CDC9EQ7E.jpg"
      }
    ];

    if (!card || !progressBar || !stepCounter || !cardDescription || !imageWrapper) {
      console.warn('BOG Snap: one or more required elements missing; skipping BOG Snap init.');
      return;
    }

    // preload images
    data.forEach(item => {
      const img = new Image();
      img.src = item.bg;
    });

    let currentStep = 0; // index-based
    const totalSteps = data.length;
    const cycleTime = 5000;
    let intervalId = null;

    function updateCard() {
      const step = data[currentStep];
      progressBar.style.width = ((currentStep + 1) / totalSteps) * 100 + '%';
      stepCounter.textContent = `Step ${currentStep + 1} of ${totalSteps}`;

      // text fade
      cardDescription.style.opacity = 0;
      setTimeout(() => {
        cardDescription.textContent = step.desc;
        cardDescription.style.opacity = 1;
      }, 300);

      // add new image and fade out the oldest
      const newImg = document.createElement('img');
      newImg.src = step.bg;
      newImg.className = 'fade-in';
      imageWrapper.appendChild(newImg);

      const imgs = imageWrapper.querySelectorAll('img');
      if (imgs.length > 1) {
        const old = imgs[0];
        old.classList.remove('fade-in');
        old.classList.add('fade-out');
        setTimeout(() => old.remove(), 600);
      }
    }

    function nextStep() {
      updateCard();
      currentStep = (currentStep + 1) % totalSteps;
    }

    function startCycle() {
      stopCycle();
      intervalId = setInterval(nextStep, cycleTime);
      // show first immediately
      nextStep();
    }
    function stopCycle() {
      if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
      }
    }

    // Pause on hover / touch
    card.addEventListener('mouseenter', stopCycle);
    card.addEventListener('mouseleave', startCycle);
    card.addEventListener('touchstart', stopCycle, { passive: true });
    card.addEventListener('touchend', startCycle);

    startCycle();
  })();

}); // DOMContentLoaded end
