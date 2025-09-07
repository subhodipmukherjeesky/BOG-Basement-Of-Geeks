/* ================= HERO SLIDER ================= */
  const slides = [
    {
      image: 'gaming-resources/Farlight.jpg',
      cta: 'Visit Now',
      link: 'https://store.steampowered.com/app/1928420/Farlight_84/',
      title: '#1\nFARLIGHT!'
    },
    {
      image: 'gaming-resources/helldivers.jpg',
      cta: 'Visit Now',
      link: 'https://store.steampowered.com/app/553850/HELLDIVERS_2/',
      title: '#2\nHELLDRIVERS 2'
    },
    {
      image: 'gaming-resources/HollowKnightSilksong.jpg',
      cta: 'Visit Now',
      link: 'https://store.steampowered.com/app/1030300/Hollow_Knight_Silksong/',
      title: '#3 \nHOLLOW KNIGHT: SILKSONG'
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