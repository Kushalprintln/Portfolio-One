document.addEventListener("DOMContentLoaded", function () {
  // Initialize Lucide icons
  lucide.createIcons();

  // Theme toggle functionality
  const themeToggle = document.getElementById("theme-toggle");
  const themeToggleMobile = document.getElementById("theme-toggle-mobile");
  const html = document.documentElement;

  function toggleTheme() {
    html.classList.toggle("dark");
    localStorage.setItem(
      "theme",
      html.classList.contains("dark") ? "dark" : "light"
    );
  }

  if (themeToggle) {
    themeToggle.addEventListener("click", toggleTheme);
  }

  if (themeToggleMobile) {
    themeToggleMobile.addEventListener("click", toggleTheme);
  }

  // Check for saved theme preference or use system preference
  if (
    localStorage.getItem("theme") === "dark" ||
    (!localStorage.getItem("theme") &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)
  ) {
    html.classList.add("dark");
  } else {
    html.classList.remove("dark");
  }

  // Mobile menu toggle
  const mobileMenuButton = document.getElementById("mobile-menu-button");
  const mobileMenu = document.getElementById("mobile-menu");

  if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener("click", function () {
      mobileMenu.classList.toggle("hidden");
      const icon = mobileMenuButton.querySelector("i");
      if (mobileMenu.classList.contains("hidden")) {
        icon.setAttribute("data-lucide", "menu");
      } else {
        icon.setAttribute("data-lucide", "x");
      }
      lucide.createIcons();
    });
  }

  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        // Close mobile menu if open
        if (mobileMenu && !mobileMenu.classList.contains("hidden")) {
          mobileMenu.classList.add("hidden");
          const icon = mobileMenuButton.querySelector("i");
          icon.setAttribute("data-lucide", "menu");
          lucide.createIcons();
        }

        // Scroll to target
        window.scrollTo({
          top: targetElement.offsetTop - 100,
          behavior: "smooth",
        });
      }
    });
  });

  // Copy email to clipboard
  const copyEmailButton = document.getElementById("copy-email");
  if (copyEmailButton) {
    copyEmailButton.addEventListener("click", function () {
      const email = "kushsonkamble@gmail.com";
      navigator.clipboard
        .writeText(email)
        .then(() => {
          showToast("Email copied to clipboard!");
        })
        .catch((err) => {
          console.error("Failed to copy email: ", err);
          showToast("Failed to copy email");
        });
    });
  }

  // Copy Phone to clipboard
  const copyPhoneButton = document.getElementById("copy-phone");
  if (copyPhoneButton) {
    copyPhoneButton.addEventListener("click", function () {
      const phone = "+91 9096233458";
      navigator.clipboard
        .writeText(phone)
        .then(() => {
          showToast("Phone number copied to clipboard!");
        })
        .catch((err) => {
          console.error("Failed to copy phone: ", err);
          showToast("Failed to copy phone number");
        });
    });
  }

// Web3Forms Integration
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitBtn = document.getElementById('submit-btn');
        const btnText = document.getElementById('btn-text');
        const btnIcon = document.getElementById('btn-icon');
        const btnSpinner = document.getElementById('btn-spinner');
        
        // Show loading state
        submitBtn.disabled = true;
        btnText.textContent = 'Sending...';
        btnIcon.classList.add('hidden');
        btnSpinner.classList.remove('hidden');
        
        try {
            const formData = new FormData(contactForm);
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: formData
            });
            
            const data = await response.json();
            
            if (data.success) {
                showToast('Message sent successfully!');
                contactForm.reset();
                // Reset hCaptcha if used
                if (typeof hcaptcha !== 'undefined') {
                    hcaptcha.reset();
                }
            } else {
                showToast('Error: ' + (data.message || 'Failed to send message'));
            }
        } catch (error) {
            showToast('Network error. Please try again.');
            console.error('Form submission error:', error);
        } finally {
            // Reset button state
            submitBtn.disabled = false;
            btnText.textContent = 'Send Message';
            btnSpinner.classList.add('hidden');
            btnIcon.classList.remove('hidden');
        }
    });
}

  // Show toast notification
  function showToast(message) {
    const toast = document.getElementById("toast");
    const toastMessage = document.getElementById("toast-message");

    if (toast && toastMessage) {
      toastMessage.textContent = message;
      toast.classList.remove("hidden");

      // Hide after 3 seconds
      setTimeout(() => {
        toast.classList.add("hidden");
      }, 3000);
    }
  }

  // Add scroll reveal animations
  function animateOnScroll() {
    const elements = document.querySelectorAll("[data-aos]");

    elements.forEach((element) => {
      const elementPosition = element.getBoundingClientRect().top;
      const screenPosition = window.innerHeight / 1.3;

      if (elementPosition < screenPosition) {
        element.classList.add("aos-animate");
      }
    });
  }

  // Initialize scroll animations
  window.addEventListener("scroll", animateOnScroll);
  animateOnScroll();

  // Add parallax effect to hero section background elements
  window.addEventListener("scroll", function () {
    const scrollPosition = window.pageYOffset;
    const heroSection = document.getElementById("home");

    if (heroSection) {
      const bgElement1 = heroSection.querySelector(
        ".absolute.-top-64.-right-64"
      );
      const bgElement2 = heroSection.querySelector(
        ".absolute.-bottom-96.-left-96"
      );

      if (bgElement1) {
        bgElement1.style.transform = `translateY(${
          scrollPosition * 0.2
        }px) rotate(${scrollPosition * 0.05}deg)`;
      }

      if (bgElement2) {
        bgElement2.style.transform = `translateY(${
          scrollPosition * 0.2
        }px) rotate(-${scrollPosition * 0.05}deg)`;
      }
    }
  });

  // Add hover effect to project cards
  const projectCards = document.querySelectorAll(".project-card");
  projectCards.forEach((card) => {
    card.addEventListener("mousemove", function (e) {
      const x = e.clientX - card.getBoundingClientRect().left;
      const y = e.clientY - card.getBoundingClientRect().top;

      const centerX = card.offsetWidth / 2;
      const centerY = card.offsetHeight / 2;

      const angleX = (y - centerY) / 20;
      const angleY = (centerX - x) / 20;

      card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) scale(1.02)`;
    });

    card.addEventListener("mouseleave", function () {
      card.style.transform =
        "perspective(1000px) rotateX(0) rotateY(0) scale(1)";
    });
  });
});
