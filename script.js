document.addEventListener("DOMContentLoaded", () => {
  // navigation toggle (already working)
  const hamburger = document.getElementById("hamburger");
  const navLinks  = document.getElementById("nav-links");
  hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("show");
  });

  // slider logic
  const tabs    = document.querySelectorAll('.category-tabs .tab');
  const wrapper = document.querySelector('.slider-wrapper');
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');

  // helper to compute scroll offset of a card inside wrapper
  function scrollToCard(card) {
    const wrapperRect = wrapper.getBoundingClientRect();
    const cardRect    = card.getBoundingClientRect();
    // distance from wrapper’s left edge, plus current scrollLeft
    const left = (cardRect.left - wrapperRect.left) + wrapper.scrollLeft;

    wrapper.scrollTo({ left, behavior: 'smooth' });
  }

  // click a tab → scroll wrapper to that category’s first card
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const cat  = tab.dataset.cat;
      const card = wrapper.querySelector(`.project-card[data-cat="${cat}"]`);
      if (card) scrollToCard(card);
    });
  });

  // Prev / Next buttons (paging by ~70% of visible width)
  const scrollAmount = () => Math.floor(wrapper.clientWidth * 0.7);

  prevBtn.addEventListener('click', () =>
    wrapper.scrollBy({ left: -scrollAmount(), behavior: 'smooth' })
  );
  nextBtn.addEventListener('click', () =>
    wrapper.scrollBy({ left: +scrollAmount(), behavior: 'smooth' })
  );
});