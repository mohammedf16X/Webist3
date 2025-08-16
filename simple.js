// ===== Simple JavaScript for D7ME Website =====

// Global variables
let currentLanguage = 'ar';
let currentPage = 'home';

// Language content
const content = {
    ar: {
        welcome: 'أهلاً بكم في سيرفر دحمي الرسمي',
        warning: 'إذا في مشكلة في الموقع اضغط على نافذة التواصل وادخل سيرفر الديسكورد حقنا وافتح تكت',
        home: 'الرئيسية',
        hacks: 'الهاكات',
        contact: 'التواصل',
        footer: 'جميع الحقوق محفوظة ل دحمي'
    },
    en: {
        welcome: 'Welcome to D7ME Official Server',
        warning: 'If there is a problem with the website, click on the contact window and enter our Discord server and open a ticket',
        home: 'Home',
        hacks: 'Hacks',
        contact: 'Contact',
        footer: 'All rights reserved to D7ME'
    }
};

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded');
    
    // Hide loading screen after 2 seconds
    setTimeout(() => {
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
            loadingScreen.style.opacity = '0';
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 500);
        }
    }, 2000);
    
    // Setup event listeners
    setupEventListeners();
    
    // Update language
    updateLanguage();
});

function setupEventListeners() {
    // Burger menu
    const burgerMenu = document.getElementById('burger-menu');
    const navMenu = document.getElementById('nav-menu');
    const closeMenu = document.getElementById('close-menu');
    
    if (burgerMenu && navMenu) {
        burgerMenu.addEventListener('click', function() {
            console.log('Burger menu clicked');
            navMenu.classList.add('active');
            burgerMenu.classList.add('active');
        });
    }
    
    if (closeMenu && navMenu) {
        closeMenu.addEventListener('click', function() {
            console.log('Close menu clicked');
            navMenu.classList.remove('active');
            burgerMenu.classList.remove('active');
        });
    }
    
    // Navigation links
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const page = this.getAttribute('data-page');
            if (page) {
                showPage(page);
                navMenu.classList.remove('active');
                burgerMenu.classList.remove('active');
            }
        });
    });
    
    // Language selector
    const languageSelector = document.getElementById('language-selector');
    if (languageSelector) {
        languageSelector.addEventListener('change', function() {
            currentLanguage = this.value;
            updateLanguage();
        });
    }
    
    // Android hacks card
    const androidHacksCard = document.querySelector('.android-hacks');
    if (androidHacksCard) {
        androidHacksCard.addEventListener('click', function() {
            const deltaModal = document.getElementById('delta-modal');
            if (deltaModal) {
                deltaModal.style.display = 'flex';
            }
        });
    }
    
    // Close modal
    const closeModal = document.querySelector('.close-modal');
    const deltaModal = document.getElementById('delta-modal');
    if (closeModal && deltaModal) {
        closeModal.addEventListener('click', function() {
            deltaModal.style.display = 'none';
        });
        
        deltaModal.addEventListener('click', function(e) {
            if (e.target === deltaModal) {
                deltaModal.style.display = 'none';
            }
        });
    }
    
    // Social links
    const discordLink = document.querySelector('.discord-link');
    const youtubeLink = document.querySelector('.youtube-link');
    
    if (discordLink) {
        discordLink.addEventListener('click', function() {
            window.open('https://discord.gg/azc', '_blank');
        });
    }
    
    if (youtubeLink) {
        youtubeLink.addEventListener('click', function() {
            window.open('https://youtube.com/@d7me_azc?si=1kcJyAQ4D4U7wfWw', '_blank');
        });
    }
}

function showPage(pageId) {
    console.log('Showing page:', pageId);
    
    // Hide all pages
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
        page.style.display = 'none';
    });
    
    // Show selected page
    const targetPage = document.getElementById(pageId + '-page');
    if (targetPage) {
        targetPage.style.display = 'block';
        currentPage = pageId;
    }
    
    // Update active nav link
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-page') === pageId) {
            link.classList.add('active');
        }
    });
}

function updateLanguage() {
    console.log('Updating language to:', currentLanguage);
    
    // Update hero title
    const heroTitle = document.querySelector('.hero-title span');
    if (heroTitle) {
        heroTitle.textContent = content[currentLanguage].welcome;
    }
    
    // Update warning text
    const warningText = document.querySelector('.warning-text');
    if (warningText) {
        warningText.textContent = content[currentLanguage].warning;
    }
    
    // Update navigation
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        const page = link.getAttribute('data-page');
        if (page && content[currentLanguage][page]) {
            link.textContent = content[currentLanguage][page];
        }
    });
    
    // Update footer
    const footerText = document.querySelector('.footer-text');
    if (footerText) {
        footerText.innerHTML = content[currentLanguage].footer.replace('دحمي', '<span class="highlight">دحمي</span>');
    }
}

// Simple animations
function addSimpleAnimations() {
    // Add fade-in class to elements when they come into view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    });
    
    // Observe cards
    const cards = document.querySelectorAll('.hack-card, .contact-card');
    cards.forEach(card => observer.observe(card));
}

// Initialize animations after page load
setTimeout(addSimpleAnimations, 3000);

