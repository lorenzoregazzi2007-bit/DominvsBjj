// --- Preloader Logic ---
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        // Piccolo ritardo per godersi l'effetto wow
        setTimeout(() => {
            preloader.classList.add('slide-up');
            
            // Attiva le animazioni di entrata della hero
            setTimeout(() => {
                document.body.classList.add('loaded');
                setTimeout(() => { preloader.remove(); }, 800);
            }, 100);
        }, 1200);
    } else {
        document.body.classList.add('loaded');
    }
});

document.addEventListener('DOMContentLoaded', () => {
    
    // --- Sticky Navbar Setup ---
    const navbar = document.querySelector('.navbar');
    const menuToggle = document.querySelector('.menu-toggle');
    const closeMenu = document.querySelector('.close-menu');
    const navLinks = document.querySelector('.nav-links');
    const navOverlay = document.querySelector('.nav-overlay');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // --- Mobile Menu Logic ---
    const openMenu = () => {
        navLinks.classList.add('active');
        navOverlay.classList.add('active');
        menuToggle.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevents background scrolling
    };

    const hideMenu = () => {
        navLinks.classList.remove('active');
        navOverlay.classList.remove('active');
        menuToggle.classList.remove('active');
        document.body.style.overflow = '';
    };

    if (menuToggle) {
        menuToggle.addEventListener('click', openMenu);
    }
    
    if (closeMenu) {
        closeMenu.addEventListener('click', hideMenu);
    }
    
    if (navOverlay) {
        navOverlay.addEventListener('click', hideMenu);
    }

    // Close mobile menu when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', hideMenu);
    });

    // --- Scroll Reveal Animations ---
    const revealElements = document.querySelectorAll('.reveal');
    const fadeUpElements = document.querySelectorAll('.fade-in-up');

    // Funzione per animare al trigger
    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const revealPoint = 100; // Trigger l'animazione 100px prima
        
        revealElements.forEach(el => {
            const revealTop = el.getBoundingClientRect().top;
            if (revealTop < windowHeight - revealPoint) {
                el.classList.add('active');
            }
        });
        
        fadeUpElements.forEach(el => {
            const revealTop = el.getBoundingClientRect().top;
            if (revealTop < windowHeight - revealPoint) {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            } else {
                 el.style.opacity = '0';
                 el.style.transform = 'translateY(40px)';
                 el.style.transition = 'all 0.8s ease-out';
            }
        });
    };

    // Trigger iniziale in caso l'utente abbia ricaricato a metà pagina
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Chiamata sincrona al load

    // --- Cookie GDPR Banner Logic ---
    const cookieBanner = document.getElementById('cookie-banner');
    const acceptCookiesBtn = document.getElementById('accept-cookies');
    const necessaryCookiesBtn = document.getElementById('necessary-cookies');

    // Verifica se l'utente ha già fatto una scelta salvata
    const cookieConsent = localStorage.getItem('dominvs_cookie_consent');

    if (!cookieConsent) {
        // Nessuna scelta: mostra il banner bloccando il resto
        cookieBanner.style.display = 'block';
    } else if (cookieConsent === 'all') {
        // Attiva Google Analytics / Pixel qui (placeholder)
        // initializeAnalytics();
    }

    // Gestione Eventi Banner
    acceptCookiesBtn.addEventListener('click', () => {
        localStorage.setItem('dominvs_cookie_consent', 'all');
        cookieBanner.style.display = 'none';
        // initializeAnalytics();
    });

    necessaryCookiesBtn.addEventListener('click', () => {
        localStorage.setItem('dominvs_cookie_consent', 'necessary');
        cookieBanner.style.display = 'none';
        // Rimuove la necessità di analytics
    });

    // --- Gestione Tab Mappe ---
    const mapBtns = document.querySelectorAll('.map-btn');
    const mapViews = document.querySelectorAll('.map-view');
    
    if (mapBtns.length > 0 && mapViews.length > 0) {
        mapBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Disattiva tutti i bottoni
                mapBtns.forEach(b => {
                    b.classList.remove('btn-primary', 'active');
                    b.classList.add('btn-outline');
                });
                
                // Attiva bottone cliccato
                btn.classList.add('btn-primary', 'active');
                btn.classList.remove('btn-outline');
                
                // Nascondi tutte le mappe
                mapViews.forEach(view => view.style.display = 'none');
                
                // Mostra la mappa corretta
                const targetId = btn.getAttribute('data-target');
                document.getElementById(targetId).style.display = 'block';
            });
        });
    }

});
