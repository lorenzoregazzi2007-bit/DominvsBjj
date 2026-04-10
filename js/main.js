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

    // --- Premium Side Panel Logic (5k Feature) ---
    const panelData = {
        maestro: {
            title: "Professor Paulo",
            subtitle: "Head Coach & Cintura Nera",
            image: "images/maestro.jpg",
            content: "<p>Con anni di esperienza sul tatami e in competizioni internazionali, il Professor Paulo porta a Ferrara e Rovigo il vero spirito del Brazilian Jiu Jitsu.</p><p>Non solo un insegnante, ma una guida per ogni studente: dal principiante che muove i primi passi fino all'agonista più esperto. La sua filosofia unisce il duro lavoro al rispetto reciproco, creando un'accademia che è prima di tutto una grande famiglia.</p><ul><li>Cintura Nera Certificata e riconosciuta</li><li>Esperienza internazionale pluriennale in gara</li><li>Attenzione meticolosa allo sviluppo personale di ogni allievo</li></ul>"
        },
        'course-fundamentals': {
            title: "BJJ Principianti",
            subtitle: "Corso Iniziale",
            image: "images/course-fundamentals.jpg",
            content: "<p>Il corso BJJ Principianti è strutturato idealmente per chi parte completamente da zero e non ha mai praticato arti marziali.</p><p>Il nostro focus iniziale è su due elementi fondamentali: la tua sicurezza totale durante la pratica e l'apprendimento delle difese e dei movimenti base fondamentali.</p><ul><li>Nessuna precedente preparazione atletica richiesta</li><li>Miglioramento garantito di postura e flessibilità</li><li>Apprendimento in un ambiente cooperativo e non competitivo</li></ul>"
        },
        'course-advanced': {
            title: "Intermedi / Agonisti",
            subtitle: "Corso Avanzato",
            image: "images/course-advanced.jpg",
            content: "<p>Dedicato a chi ha già assimilato le basi del Brazilian Jiu Jitsu ed è pronto a un livello superiore di intensità e dettaglio tecnico.</p><p>In questo corso affondiamo lo studio su concatenazioni avanzate, tecniche specifiche di guardia e passaggi di guardia (Lasso, Spider, De La Riva, ecc.).</p><ul><li>Sparring (Roll) ad alta intensità a fine sessione</li><li>Studio approfondito e contestualizzato della tattica</li><li>Preparazione mirata per competizioni nazionali e internazionali</li></ul>"
        },
        'course-nogi': {
            title: "Grappling (No-Gi)",
            subtitle: "Senza Kimono",
            image: "images/course-nogi.jpg",
            content: "<p>Il No-Gi (o Grappling) è la forma di lotta che omette l'utilizzo del kimono tradizionale. L'assenza di prese dirette sui vestiti rende questa disciplina estremamente dinamica e basata su prese anatomiche (polsi, colli, caviglie).</p><p>È il complemento perfetto per chiunque voglia massimizzare le proprie capacità di wrestling, nonché l'allenamento ideale per chi pratica o vuole competere nelle MMA (Mixed Martial Arts).</p><ul><li>Altissimo tasso di consumo calorico garantito</li><li>Migliora esponenzialmente le capacità di scrambling</li><li>Più veloce ed esplosivo della lotta con il Gi</li></ul>"
        },
        'course-kids': {
            title: "Kids & Anti-Bullismo",
            subtitle: "Bambini & Ragazzi",
            image: "images/course-kids.jpg",
            content: "<p>Il nostro programma per bambini e ragazzi è molto più di un corso sportivo. Attraverso il gioco e la disciplina del BJJ, lavoriamo per fornire ai più giovani gli strumenti psicofisici adatti alla crescita.</p><p>Le tecniche di Jiu Jitsu insegnano come difendersi immobilizzando e controllando l'aggressore senza necessariamente dover sferrare colpi. Questo innalza enormemente il senso di sicurezza personale e disinnesca situazioni di bullismo alla radice.</p><ul><li>Divertimento garantito in un ambiente iper-sicuro</li><li>Forte sviluppo della coordinazione e della mobilità motoria</li><li>Crescita dell'autostima e del rispetto delle regole e del prossimo</li></ul>"
        }
    };

    const triggers = document.querySelectorAll('.panel-trigger');
    const sidePanel = document.getElementById('side-panel');
    const sidePanelOverlay = document.getElementById('side-panel-overlay');
    const closePanelBtn = document.getElementById('side-panel-close');
    
    // Elements to update
    const pTitle = document.getElementById('side-panel-title');
    const pSubtitle = document.getElementById('side-panel-subtitle');
    const pDesc = document.getElementById('side-panel-desc');
    const pImage = document.getElementById('side-panel-image');

    const openPanel = (id) => {
        const data = panelData[id];
        if (data && sidePanel) {
            pTitle.innerHTML = data.title;
            pSubtitle.innerHTML = data.subtitle;
            pDesc.innerHTML = data.content;
            pImage.style.backgroundImage = `url('${data.image}')`;
            
            sidePanel.classList.add('active');
            sidePanelOverlay.classList.add('active');
            document.body.style.overflow = 'hidden'; // prevent scrolling
        }
    };

    const closePanel = () => {
        if(sidePanel) {
            sidePanel.classList.remove('active');
            sidePanelOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    };

    if(triggers.length > 0) {
        triggers.forEach(trigger => {
            trigger.addEventListener('click', () => {
                const id = trigger.getAttribute('data-panel-id');
                if(id) openPanel(id);
            });
        });
    }

    if(closePanelBtn) closePanelBtn.addEventListener('click', closePanel);
    if(sidePanelOverlay) sidePanelOverlay.addEventListener('click', closePanel);

});
