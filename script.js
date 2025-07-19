document.addEventListener("DOMContentLoaded", function() {
    // Navbar scroll effects
    const navbar = document.querySelector('.nav-main');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add scrolled class for background effect
        if (scrollTop > 50) {
            navbar.classList.add('scrolled'); 
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Hide/show navbar on scroll (optional)
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });

    // Active link highlighting
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-main .link');
    
    function updateActiveLink() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveLink);
    updateActiveLink(); // Initial call

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Update active link
                navLinks.forEach(link => link.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });

    // Mobile menu functionality
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const menuLinks = document.querySelector('.menu-links');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            this.classList.toggle('active');
            menuLinks.classList.toggle('active');
            
            // Animate menu items
            const links = menuLinks.querySelectorAll('.link');
            if (menuLinks.classList.contains('active')) {
                links.forEach((link, index) => {
                    link.style.animation = `linkSlideIn 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards ${index * 0.1}s`;
                });
            } else {
                links.forEach(link => {
                    link.style.animation = 'none';
                });
            }
        });
        
        // Close mobile menu when clicking on a link
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth <= 900) {
                    mobileMenuBtn.classList.remove('active');
                    menuLinks.classList.remove('active');
                }
            });
        });
    }

    // Contact Me button scroll
    const contactBtn = document.querySelector('.contact-me');
    if(contactBtn) {
      contactBtn.addEventListener('click', function() {
        document.getElementById('contact').scrollIntoView({behavior: 'smooth'});
      });
    }
  
    // Animate skill bars on scroll into view (use cubic-bezier)
    function animateSkillBars() {
      const bars = document.querySelectorAll('.skill-level-modern');
      bars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0';
        setTimeout(() => {
          bar.style.transition = 'width 1.2s cubic-bezier(.77,0,.18,1)';
          bar.style.width = width;
        }, 200);
      });
    }
    
    function isInViewport(element) {
      const rect = element.getBoundingClientRect();
      return (
        rect.top < window.innerHeight && rect.bottom > 0
      );
    }
    
    // Animate skill bars when skills section is in view
    const skillsSection = document.querySelector('.skills-section-modern');
    let skillsAnimated = false;
    function checkSkillsInView() {
      if (!skillsAnimated && skillsSection && isInViewport(skillsSection)) {
        animateSkillBars();
        skillsAnimated = true;
      }
    }
    window.addEventListener('scroll', checkSkillsInView);
    checkSkillsInView();
  });
  
  // Theme toggle logic
  document.addEventListener("DOMContentLoaded", function() {
    // Theme toggle button
    let themeBtn = document.createElement('button');
    themeBtn.className = 'theme-toggle';
    themeBtn.title = 'Toggle light/dark mode';
    themeBtn.innerHTML = '<i class="fa-solid fa-moon"></i>';
    document.body.appendChild(themeBtn);
  
    function setTheme(light) {
      if (light) {
        document.body.classList.add('light-mode');
        themeBtn.classList.add('light');
        themeBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
        localStorage.setItem('theme', 'light');
      } else {
        document.body.classList.remove('light-mode');
        themeBtn.classList.remove('light');
        themeBtn.innerHTML = '<i class="fa-solid fa-moon"></i>';
        localStorage.setItem('theme', 'dark');
      }
    }
  
    // Load theme from storage
    setTheme(localStorage.getItem('theme') === 'light');
  
    themeBtn.addEventListener('click', function() {
      setTheme(!document.body.classList.contains('light-mode'));
    });
  });
  
  // Certificate section: open certificate link in new tab (example logic)
  document.addEventListener("DOMContentLoaded", function() {
    // Certificate button click handler (if you want to open a link or modal)
    document.querySelectorAll('.certificate-btn-modern').forEach(btn => {
      btn.addEventListener('click', function(e) {
        e.preventDefault();
        const certText = this.closest('.certificate-card-modern').querySelector('p').innerText;
        alert('Certificate: ' + certText);
         Or: window.open('Microsoft Azure .pdf', '_blank');
         Or: window.open('Rudra patel.pdf', '_blank');
      });
    });
  });
  
  // Project click handler function
  function openProject(projectId) {
    const projectNames = {
      'calculator': 'Calculator',
      'calculator-code': 'Calculator Code',
      'spotify': 'Spotify',
      'spotify--clone': 'Spotify Code', 
      'icmr-app': 'ICMR App',
      'icmr-app-code': 'ICMR App Code',
      'storyboard': 'Storyboard',
      'storyboard-code': 'Storyboard Code',
      'student-leave-figma': 'Student Leave Figma',
      'student-leave-figma-code': 'Student Leave Figma Code',
      'todo-app': 'Todo App',
      'todo-app-code': 'Todo App Code'
    };
    
    const projectUrls = {
      // Live project URLs
      'calculator': 'https://rudraptl16.github.io/Calculator/',
      'spotify--clone': 'https://rudraptl16.github.io/Spotify---Clone/',
      'speak-app':'https://github.com/Rudraptl16/Speak-App',
      'word-counter': 'https://rudraptl16.github.io/Word-Counter/',
      'portfolio': 'https://rudraptl16.github.io/Portfolio/',
      'todo-app': 'https://rudraptl16.github.io/Todo-App/',
      
      // GitHub repository URLs
      'calculator-code': 'https://github.com/Rudraptl16/Calculator',
      'spotify--clone-code': 'https://github.com/Rudraptl16/Spotify---Clone',
      'speak-app-code': 'https://github.com/Rudraptl16/Speak-App',
      'word-counter-code': 'https://github.com/Rudraptl16/Word-Counter',
      'portfolio-code': 'https://github.com/Rudraptl16/Portfolio',
      'todo-app-code': 'https://github.com/Rudraptl16/Todo-App'
    };
    
    const projectName = projectNames[projectId] || 'Project';
    const url = projectUrls[projectId];
    
    if (url) {
      // Show loading notification
      const isCode = projectId.includes('-code');
      const action = isCode ? 'opening code repository' : 'opening live project';
      
      showNotification(`🔄 ${action} for ${projectName}...`, 'info');
      
      // Add button loading effect
      const button = event.target.closest('.project-link-modern');
      if (button) {
        const originalContent = button.innerHTML;
        button.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Loading...';
        button.style.pointerEvents = 'none';
        
        setTimeout(() => {
          button.innerHTML = originalContent;
          button.style.pointerEvents = 'auto';
        }, 1500);
      }
      
      // Open in new tab after a short delay for better UX
      setTimeout(() => {
        window.open(url, '_blank', 'noopener,noreferrer');
        
        // Show success notification
        const successMessage = isCode ? 
          `✅ ${projectName} repository opened successfully!` : 
          `✅ ${projectName} project opened successfully!`;
        showNotification(successMessage, 'success');
      }, 800);
      
    } else {
      // Show error notification if project not found
      showNotification('❌ Project not found or URL not configured', 'error');
    }
  }
  
  // Make openProject function globally available
  window.openProject = openProject;
  
  // Animate project cards on scroll (2026 life modern, cubic-bezier)
  function animateProjectCards() {
    const cards = document.querySelectorAll('.project-card-modern');
    if (cards.length > 0) {
      cards[0].classList.add('visible');
    }
    const trigger = window.innerHeight * 0.92;
    cards.forEach(card => {
      const rect = card.getBoundingClientRect();
      if (rect.top < trigger) {
        card.classList.add('visible');
        // Animation handled by CSS cubic-bezier
      }
    });
  }
  window.addEventListener('scroll', animateProjectCards);
  window.addEventListener('DOMContentLoaded', animateProjectCards);
  
  // Project card active effect on click and notification
  document.addEventListener("DOMContentLoaded", function() {
    document.querySelectorAll('.project-card-modern').forEach(card => {
      card.addEventListener('click', function() {
        document.querySelectorAll('.project-card-modern.active').forEach(c => c.classList.remove('active'));
        this.classList.add('active');
        const title = this.querySelector('.project-info-modern h4');
        if (title) showNotification(`Project "${title.innerText}" selected`);
      });
    });
  });
  
  // Enhanced notification utility with types
  function showNotification(message, type = 'info', timeout = 3000) {
    let notif = document.querySelector('.custom-notification');
    if (!notif) {
      notif = document.createElement('div');
      notif.className = 'custom-notification';
      document.body.appendChild(notif);
    }
    
    // Set notification type and styling
    notif.className = `custom-notification notification-${type}`;
    notif.innerHTML = message;
    notif.classList.add('show');
    
    // Auto-remove notification
    setTimeout(() => {
      notif.classList.remove('show');
      setTimeout(() => { 
        if (notif.parentNode) notif.remove(); 
      }, 400);
    }, timeout);
  }
  
  // Navbar active style on scroll and theme
  function updateNavbarActive() {
    const nav = document.querySelector('.nav-main');
    if (!nav) return;
    if (window.scrollY > 10) {
      if (document.body.classList.contains('light-mode')) {
        nav.classList.add('active-light');
        nav.classList.remove('active-dark');
      } else {
        nav.classList.add('active-dark');
        nav.classList.remove('active-light');
      }
    } else {
      nav.classList.remove('active-dark', 'active-light');
    }
  }
  window.addEventListener('scroll', updateNavbarActive);
  window.addEventListener('DOMContentLoaded', updateNavbarActive);
  
  // Update navbar on theme toggle
  document.addEventListener("DOMContentLoaded", function() {
    const observer = new MutationObserver(updateNavbarActive);
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
  });

  // ========================================
  // SCROLL TRIGGERED ANIMATIONS
  // ========================================
  function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe all elements with scroll-trigger class
    document.querySelectorAll('.scroll-trigger').forEach(el => {
        observer.observe(el);
    });
  }

  // ========================================
  // ENHANCED CUBIC ANIMATIONS
  // ========================================
  function initCubicAnimations() {
    // Add floating animation to icons
    const icons = document.querySelectorAll('.edu-icon-modern, .skill-icon-modern, .cert-icon-modern, .about-icon-modern');
    icons.forEach((icon, index) => {
        icon.style.animationDelay = `${1.2 + index * 0.1}s, ${2 + index * 0.2}s`;
    });

    // Add staggered card animations
    const cards = document.querySelectorAll('.education-card-modern, .skill-card-modern, .certificate-card-modern, .about-card-modern, .project-card-modern');
    cards.forEach((card, index) => {
        card.style.animationDelay = `${0.6 + index * 0.2}s`;
    });

    // Add button shine effects
    const buttons = document.querySelectorAll('.certificate-btn-modern, .about-btn-modern, .project-link-modern');
    buttons.forEach((button, index) => {
        button.style.animationDelay = `${1.5 + index * 0.1}s`;
    });
  }

  // ========================================
  // SPECIAL ANIMATION EFFECTS
  // ========================================
  function initSpecialAnimations() {
    // Add glow effect to section headers
    const headers = document.querySelectorAll('.about-section-modern h3, .projects-section-modern h3');
    headers.forEach(header => {
        header.addEventListener('mouseenter', () => {
            header.style.animation = 'glowPulse 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        });
        header.addEventListener('mouseleave', () => {
            header.style.animation = '';
        });
    });

    // Add card hover effects
    const cards = document.querySelectorAll('.about-card-modern, .project-card-modern');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-8px) scale(1.02)';
            card.style.boxShadow = '0 12px 40px rgba(255, 224, 102, 0.25)';
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
            card.style.boxShadow = '';
        });
    });

    // Add tech tag animations
    const techTags = document.querySelectorAll('.tech-tag-modern');
    techTags.forEach((tag, index) => {
        tag.style.animationDelay = `${1.8 + index * 0.1}s`;
        tag.addEventListener('mouseenter', () => {
            tag.style.transform = 'scale(1.1) rotate(5deg)';
            tag.style.boxShadow = '0 4px 12px rgba(255, 224, 102, 0.3)';
        });
        tag.addEventListener('mouseleave', () => {
            tag.style.transform = 'scale(1) rotate(0deg)';
            tag.style.boxShadow = '';
        });
    });
  }

  // ========================================
  // PARALLAX EFFECTS
  // ========================================
  function initParallaxEffects() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.parallax');
        
        parallaxElements.forEach(element => {
            const speed = element.dataset.speed || 0.5;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });
  }

  // ========================================
  // TEXT ANIMATION EFFECTS
  // ========================================
  function initTextAnimations() {
    // Add typing effect to main heading
    const mainHeading = document.querySelector('.hero-content h1');
    if (mainHeading) {
        const text = mainHeading.textContent;
        mainHeading.textContent = '';
        mainHeading.style.opacity = '1';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                mainHeading.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };
        
        setTimeout(typeWriter, 1000);
    }

    // Add shine effect to important text
    const shineTexts = document.querySelectorAll('.shine-text');
    shineTexts.forEach(text => {
        text.style.background = 'linear-gradient(90deg, #ffe066, #ffd700, #ffe066)';
        text.style.backgroundSize = '200% 100%';
        text.style.webkitBackgroundClip = 'text';
        text.style.webkitTextFillColor = 'transparent';
        text.style.animation = 'textShine 3s cubic-bezier(0.25, 0.46, 0.45, 0.94) infinite';
    });
  }

  // ========================================
  // INTERACTIVE ANIMATIONS
  // ========================================
  function initInteractiveAnimations() {
    // Add click ripple effect
    document.addEventListener('click', (e) => {
        const ripple = document.createElement('div');
        ripple.style.position = 'fixed';
        ripple.style.width = '20px';
        ripple.style.height = '20px';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(255, 224, 102, 0.6)';
        ripple.style.pointerEvents = 'none';
        ripple.style.left = e.clientX - 10 + 'px';
        ripple.style.top = e.clientY - 10 + 'px';
        ripple.style.animation = 'rippleEffect 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards';
        
        document.body.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });

    // Add CSS for ripple effect
    const style = document.createElement('style');
    style.textContent = `
        @keyframes rippleEffect {
            0% {
                transform: scale(0);
                opacity: 1;
            }
            100% {
                transform: scale(40);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
  }

  // ========================================
  // LOADING ANIMATIONS
  // ========================================
  function initLoadingAnimations() {
    // Add loading animation to page
    const loadingElements = document.querySelectorAll('.loading-animation');
    loadingElements.forEach((element, index) => {
        element.style.animationDelay = `${index * 0.1}s`;
    });

    // Add page entrance animation
    document.body.style.opacity = '0';
    document.body.style.transform = 'scale(0.95)';
    document.body.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
        document.body.style.transform = 'scale(1)';
    }, 100);
  }

  // ========================================
  // PERFORMANCE OPTIMIZATIONS
  // ========================================
  function initPerformanceOptimizations() {
    // Use requestAnimationFrame for smooth animations
    let ticking = false;
    
    function updateAnimations() {
        if (!ticking) {
            requestAnimationFrame(() => {
                // Update any performance-critical animations here
                ticking = false;
            });
            ticking = true;
        }
    }

    // Debounce scroll events
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        scrollTimeout = setTimeout(updateAnimations, 16);
    });
  }

  // ========================================
  // CONTACT FORM FUNCTIONALITY
  // ========================================
  function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;

    // Form validation and submission
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const formData = new FormData(this);
      const name = formData.get('name');
      const email = formData.get('email');
      const subject = formData.get('subject');
      const message = formData.get('message');
      
      // Basic validation
      if (!name || !email || !subject || !message) {
        showNotification('❌ Please fill in all fields', 'error');
        return;
      }
      
      if (!isValidEmail(email)) {
        showNotification('❌ Please enter a valid email address', 'error');
        return;
      }
      
      // Show loading state
      const submitBtn = this.querySelector('.submit-btn-modern');
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';
      submitBtn.disabled = true;
      
      // Simulate form submission (replace with actual backend integration)
      setTimeout(() => {
        // Success simulation
        showNotification('✅ Message sent successfully! I\'ll get back to you soon.', 'success');
        
        // Reset form
        this.reset();
        
        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        
        // Add success animation
        submitBtn.style.background = 'linear-gradient(135deg, #4CAF50, #45a049)';
        setTimeout(() => {
          submitBtn.style.background = 'linear-gradient(135deg, #ffe066, #ffd700)';
        }, 2000);
        
      }, 2000);
    });

    // Real-time validation
    const inputs = contactForm.querySelectorAll('input, textarea');
    inputs.forEach(input => {
      input.addEventListener('blur', function() {
        validateField(this);
      });
      
      input.addEventListener('input', function() {
        if (this.classList.contains('error')) {
          validateField(this);
        }
      });
    });

    // Floating label animation
    inputs.forEach(input => {
      input.addEventListener('focus', function() {
        this.parentElement.classList.add('focused');
      });
      
      input.addEventListener('blur', function() {
        if (!this.value) {
          this.parentElement.classList.remove('focused');
        }
      });
    });
  }

  // Email validation
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Field validation
  function validateField(field) {
    const value = field.value.trim();
    const fieldType = field.type;
    const fieldName = field.name;
    
    let isValid = true;
    let errorMessage = '';
    
    // Required field validation
    if (!value) {
      isValid = false;
      errorMessage = `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is required`;
    } else {
      // Email validation
      if (fieldType === 'email' && !isValidEmail(value)) {
        isValid = false;
        errorMessage = 'Please enter a valid email address';
      }
      
      // Name validation
      if (fieldName === 'name' && value.length < 2) {
        isValid = false;
        errorMessage = 'Name must be at least 2 characters long';
      }
      
      // Subject validation
      if (fieldName === 'subject' && value.length < 5) {
        isValid = false;
        errorMessage = 'Subject must be at least 5 characters long';
      }
      
      // Message validation
      if (fieldName === 'message' && value.length < 10) {
        isValid = false;
        errorMessage = 'Message must be at least 10 characters long';
      }
    }
    
    // Update field styling
    const inputGroup = field.closest('.input-group-modern, .textarea-group-modern');
    if (isValid) {
      inputGroup.classList.remove('error');
      inputGroup.classList.add('valid');
      removeErrorMessage(inputGroup);
    } else {
      inputGroup.classList.remove('valid');
      inputGroup.classList.add('error');
      showErrorMessage(inputGroup, errorMessage);
    }
    
    return isValid;
  }

  // Show error message
  function showErrorMessage(inputGroup, message) {
    removeErrorMessage(inputGroup);
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    errorDiv.style.cssText = `
      color: #f44336;
      font-size: 0.85rem;
      margin-top: 5px;
      animation: errorSlideIn 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    `;
    
    inputGroup.appendChild(errorDiv);
  }

  // Remove error message
  function removeErrorMessage(inputGroup) {
    const existingError = inputGroup.querySelector('.error-message');
    if (existingError) {
      existingError.remove();
    }
  }

  // ========================================
  // CONTACT CARD INTERACTIONS
  // ========================================
  function initContactInteractions() {
    // Contact card hover effects
    const contactCards = document.querySelectorAll('.contact-card-modern');
    contactCards.forEach(card => {
      card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-8px) scale(1.02)';
        this.style.boxShadow = '0 12px 40px rgba(255, 224, 102, 0.25)';
        
        const icon = this.querySelector('.contact-icon-modern');
        if (icon) {
          icon.style.transform = 'scale(1.1) rotate(5deg)';
        }
      });
      
      card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
        this.style.boxShadow = '';
        
        const icon = this.querySelector('.contact-icon-modern');
        if (icon) {
          icon.style.transform = 'scale(1) rotate(0deg)';
        }
      });
      
      // Click to copy functionality
      card.addEventListener('click', function() {
        const details = this.querySelector('.contact-details-modern p');
        if (details) {
          const text = details.textContent;
          
          // Copy to clipboard
          navigator.clipboard.writeText(text).then(() => {
            showNotification(`📋 ${text} copied to clipboard!`, 'success');
            
            // Add copy animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
              this.style.transform = '';
            }, 150);
          }).catch(() => {
            showNotification('❌ Failed to copy to clipboard', 'error');
          });
        }
      });
    });

    // Social link interactions
    const socialLinks = document.querySelectorAll('.social-link-modern');
    socialLinks.forEach(link => {
      link.addEventListener('mouseenter', function() {
        const icon = this.querySelector('i');
        if (icon) {
          icon.style.transform = 'scale(1.2) rotate(10deg)';
        }
      });
      
      link.addEventListener('mouseleave', function() {
        const icon = this.querySelector('i');
        if (icon) {
          icon.style.transform = 'scale(1) rotate(0deg)';
        }
      });
    });
  }

  // ========================================
  // TYPING EFFECT FOR HOME H2 TAGS
  // ========================================
  function initTypingEffect() {
    const h2Elements = document.querySelectorAll('.home-modern-info h2');
    if (h2Elements.length === 0) return;

    let currentIndex = 0;
    const texts = Array.from(h2Elements).map(h2 => h2.textContent);
    
    // Clear all h2 elements initially
    h2Elements.forEach(h2 => {
      h2.textContent = '';
      h2.classList.add('typing-text');
    });

    function typeText() {
      if (currentIndex >= texts.length) {
        // All texts completed, add completed class to all
        h2Elements.forEach(h2 => h2.classList.add('completed'));
        return;
      }

      const currentH2 = h2Elements[currentIndex];
      const text = texts[currentIndex];
      let charIndex = 0;

      function typeChar() {
        if (charIndex < text.length) {
          currentH2.textContent += text.charAt(charIndex);
          charIndex++;
          setTimeout(typeChar, 100); // Speed of typing
        } else {
          // Current text completed
          currentH2.classList.add('completed');
          currentIndex++;
          
          // Wait before starting next text
          setTimeout(typeText, 1000);
        }
      }

      typeChar();
    }

    // Start typing effect after a delay
    setTimeout(typeText, 2000);
  }

  // ========================================
  // INITIALIZATION
  // ========================================
  document.addEventListener('DOMContentLoaded', () => {
    // Initialize all animation systems
    initScrollAnimations();
    initCubicAnimations();
    initSpecialAnimations();
    initParallaxEffects();
    initTextAnimations();
    initInteractiveAnimations();
    initLoadingAnimations();
    initPerformanceOptimizations();
    initContactForm();
    initContactInteractions();
    initTypingEffect(); // Add typing effect initialization
    
    // Add scroll-trigger class to elements
    document.querySelectorAll('.education-card-modern, .skill-card-modern, .certificate-card-modern, .about-card-modern, .project-card-modern, .contact-card-modern').forEach(el => {
        el.classList.add('scroll-trigger');
    });
    
    // Add parallax class to background elements
    document.querySelectorAll('.hero-bg, .section-bg').forEach(el => {
        el.classList.add('parallax');
        el.dataset.speed = '0.3';
    });
    
    // Add shine-text class to important headings
    document.querySelectorAll('h1, h2, .highlight').forEach(el => {
        el.classList.add('shine-text');
    });
  });

  