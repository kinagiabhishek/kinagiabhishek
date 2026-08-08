// Abhishek Kinagi Portfolio Interactivity
document.addEventListener('DOMContentLoaded', () => {
  // Animated Counters
  const counters = [
    { id: 'leetcode-total', target: 286 },
    { id: 'leetcode-easy', target: 146 },
    { id: 'leetcode-med', target: 133 },
    { id: 'leetcode-hard', target: 7 }
  ];

  const animateCounter = (element, target) => {
    let current = 0;
    const increment = Math.ceil(target / 40);
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        element.textContent = target;
        clearInterval(timer);
      } else {
        element.textContent = current;
      }
    }, 30);
  };

  // Intersection Observer for Animations
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        counters.forEach(counter => {
          const el = document.getElementById(counter.id);
          if (el && entry.target.contains(el)) {
            animateCounter(el, counter.target);
          }
        });
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  const leetcodeSection = document.getElementById('leetcode');
  if (leetcodeSection) {
    observer.observe(leetcodeSection);
  }
});
