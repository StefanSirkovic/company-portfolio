document.addEventListener('DOMContentLoaded', () => {
    const statNumbers = document.querySelectorAll('.stat-number');
    const section = document.getElementById('achievements');
    let hasAnimated = false;

    const startCount = (element) => {
        const target = +element.getAttribute('data-target');
        const increment = target / 100; // Odredi brzinu brojeva
        let current = 0;

        const updateCount = () => {
            current += increment;
            if (current < target) {
                element.textContent = Math.ceil(current);
                setTimeout(updateCount, 20); // Vreme između promena brojeva
            } else {
                element.textContent = target;
                element.style.transition = 'transform 0.3s ease, color 0.3s ease'; // Dodaj tranziciju za povećanje
                element.style.transform = 'scale(1.2)'; // Povećaj brojku
                element.style.transformOrigin = 'center';
                element.style.color = '#0C168F'; // Promeni boju tokom povećanja (opcionalno)
                setTimeout(() => {
                    element.style.transform = 'scale(1)'; // Vrati na normalnu veličinu
                   
                    element.style.color = ''; // Vrati originalnu boju (opcionalno)
                }, 300);
            }
        };

        updateCount();
    };

    const checkScroll = () => {
        const sectionPos = section.getBoundingClientRect().top;
        const screenPos = window.innerHeight;

        if (sectionPos < screenPos && !hasAnimated) {
            statNumbers.forEach(num => startCount(num));
            hasAnimated = true;
        }
    };

    window.addEventListener('scroll', checkScroll);
});

document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('.fade-in-section');

    const observerOptions = {
        threshold: 0.2 // Koliko sekcija treba da bude vidljiva (20%) da bi se aktivirala animacija
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // Prestanak osmatranja kada je animacija aktivirana
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });
});
