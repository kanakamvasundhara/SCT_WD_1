class ModernNavigation {
  constructor() {
    this.navbar = document.getElementById("headerNav");
    this.navMenu = document.getElementById("navLinks");
    this.mobileToggle = document.getElementById("menuToggle");
    this.progressBar = document.getElementById("progressBar");
    this.links = document.querySelectorAll(".nav-item");
    this.sections = document.querySelectorAll(".content-section");
    this.init();
  }

  init() {
    window.addEventListener("scroll", () => {
      this.handleNavbar();
      this.updateProgressBar();
      this.highlightLink();
    });

    this.mobileToggle.addEventListener("click", () => {
      this.navMenu.classList.toggle("active");
    });

    this.links.forEach(link => {
      link.addEventListener("click", e => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute("href"));
        if (target) {
          window.scrollTo({
            top: target.offsetTop - 70, // Adjust offset for fixed header
            behavior: "smooth"
          });
          // Close mobile menu after clicking a link
          if (this.navMenu.classList.contains("active")) {
            this.navMenu.classList.remove("active");
          }
        }
      });
    });
  }

  handleNavbar() {
    this.navbar.classList.toggle("scrolled", window.scrollY > 80);
  }

  updateProgressBar() {
    const scrolled = window.scrollY;
    const height = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (scrolled / height) * 100;
    this.progressBar.style.width = `${progress}%`;
  }

  highlightLink() {
    const scrollY = window.scrollY + 120; // Adjust offset for highlighting
    this.sections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      if (scrollY >= top && scrollY < top + height) {
        this.links.forEach(l => l.classList.remove("active"));
        const active = document.querySelector(`.nav-item[href="#${sec.id}"]`);
        if (active) active.classList.add("active");
      }
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new ModernNavigation();
});