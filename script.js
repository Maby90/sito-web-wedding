document.addEventListener('DOMContentLoaded', () => {
    
    // --- Mobile Menu Toggle ---
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close menu when clicking a link
    document.querySelectorAll('.nav-links li a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // --- Smooth Scrolling for anchor links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            // Handle special reserved area link
            if (targetId === '#riservata') {
                document.getElementById('passwordModal').style.display = 'flex';
                return;
            }

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navHeight = document.querySelector('.navbar').offsetHeight;
                window.scrollTo({
                    top: targetElement.offsetTop - navHeight,
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- Reserved Area Password Logic ---
    const passwordModal = document.getElementById('passwordModal');
    const openModalBtn = document.getElementById('openModalBtn');
    const closeModalBtn = document.querySelector('.close-btn');
    const modalSubmitBtn = document.getElementById('modalSubmitPassword');
    const passwordInput = document.getElementById('modalPasswordInput');
    const passwordError = document.getElementById('modalPasswordError');
    const reservedSectionOverlay = document.getElementById('reservedSectionOverlay');
    const closeReservedBtn = document.getElementById('closeReservedBtn');
    
    // The secret password from the user request
    const SECRET_PASSWORD = '5settembre26';

    // Open modal from footer link
    if (openModalBtn) {
        openModalBtn.addEventListener('click', (e) => {
            e.preventDefault();
            passwordModal.style.display = 'flex';
            passwordInput.value = '';
            passwordError.textContent = '';
            passwordInput.focus();
        });
    }

    // Close modal
    closeModalBtn.addEventListener('click', () => {
        passwordModal.style.display = 'none';
    });

    // Close modal if clicked outside
    window.addEventListener('click', (e) => {
        if (e.target === passwordModal) {
            passwordModal.style.display = 'none';
        }
    });

    // Handle password submission
    const checkPassword = () => {
        if (passwordInput.value === SECRET_PASSWORD) {
            passwordModal.style.display = 'none';
            reservedSectionOverlay.style.display = 'block';
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        } else {
            passwordError.textContent = 'Password errata. Riprova!';
            passwordInput.value = '';
        }
    };

    modalSubmitBtn.addEventListener('click', checkPassword);

    passwordInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            checkPassword();
        }
    });

    // Close reserved area
    closeReservedBtn.addEventListener('click', () => {
        reservedSectionOverlay.style.display = 'none';
        document.body.style.overflow = 'auto'; // Restore background scrolling
    });

});
