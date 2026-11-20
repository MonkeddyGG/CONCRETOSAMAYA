document.addEventListener('DOMContentLoaded', () => {
    // 1. Año dinámico en el footer
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // 2. Menú Hamburguesa Responsivo (Móvil)
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const icon = hamburger.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.classList.replace('fa-bars', 'fa-xmark');
            } else {
                icon.classList.replace('fa-xmark', 'fa-bars');
            }
        });

        // Cerrar menú al hacer clic en un enlace
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                hamburger.querySelector('i').classList.replace('fa-xmark', 'fa-bars');
            });
        });
    }

    // 3. Sombra en el Header al hacer scroll y resaltado de sección activa
    const header = document.getElementById('header');
    const sections = document.querySelectorAll('section[id]');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        const scrollPos = window.scrollY + 140;
        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');

            if (scrollPos >= top && scrollPos < top + height) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });

    // 4. Filtro de Galería
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            galleryItems.forEach(item => {
                const category = item.getAttribute('data-category');
                if (filterValue === 'all' || filterValue === category) {
                    item.classList.remove('hide');
                } else {
                    item.classList.add('hide');
                }
            });
        });
    });

    // 5. Lightbox para ampliar imágenes de la galería
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const lightboxClose = document.getElementById('lightbox-close');

    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const img = item.querySelector('img');
            const title = item.querySelector('h4').textContent;
            const subtitle = item.querySelector('p').textContent;

            lightboxImg.src = img.src;
            lightboxCaption.textContent = `${title} — ${subtitle}`;
            lightbox.classList.add('active');
        });
    });

    if (lightboxClose) {
        lightboxClose.addEventListener('click', () => {
            lightbox.classList.remove('active');
        });
    }

    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                lightbox.classList.remove('active');
            }
        });
    }

    // 6. Autocompletar servicio al hacer clic desde las tarjetas de "Servicios"
    const serviceLinks = document.querySelectorAll('.service-link');
    const servicioSelect = document.getElementById('servicio-select');

    serviceLinks.forEach(link => {
        link.addEventListener('click', () => {
            const selectedService = link.getAttribute('data-service');
            if (servicioSelect && selectedService) {
                servicioSelect.value = selectedService;
            }
        });
    });

    // 7. Calculadora de Metros Cúbicos (m³) de Concreto
    const btnCalcular = document.getElementById('btn-calcular');
    const resultadoM3 = document.getElementById('resultado-m3');
    const btnUsarVolumen = document.getElementById('btn-usar-volumen');
    const inputCantidad = document.getElementById('cantidad');
    let volumenCalculado = 0;

    if (btnCalcular) {
        btnCalcular.addEventListener('click', () => {
            const largo = parseFloat(document.getElementById('calc-largo').value);
            const ancho = parseFloat(document.getElementById('calc-ancho').value);
            const espesorCm = parseFloat(document.getElementById('calc-espesor').value);
            const factor = parseFloat(document.getElementById('calc-desperdicio').value);

            if (isNaN(largo) || isNaN(ancho) || isNaN(espesorCm) || largo <= 0 || ancho <= 0 || espesorCm <= 0) {
                alert('Por favor ingresa valores válidos mayores a 0 en largo, ancho y espesor.');
                return;
            }

            const espesorMetros = espesorCm / 100;
            volumenCalculado = (largo * ancho * espesorMetros * factor).toFixed(2);
            resultadoM3.textContent = `${volumenCalculado} m³`;
        });
    }

    if (btnUsarVolumen) {
        btnUsarVolumen.addEventListener('click', () => {
            if (volumenCalculado > 0) {
                servicioSelect.value = 'Concreto Premezclado';
                inputCantidad.value = `${volumenCalculado} m³ aprox.`;
                inputCantidad.focus();
            } else {
                alert('Primero calcula un volumen ingresando las medidas.');
            }
        });
    }

    // 8. Envío de Cotización directamente a WhatsApp de Concretos y Agregados AMAYA
    const quoteForm = document.getElementById('quote-form');
    if (quoteForm) {
        quoteForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const nombre = document.getElementById('nombre').value.trim();
            const telefono = document.getElementById('telefono').value.trim();
            const servicio = document.getElementById('servicio-select').value;
            const cantidad = document.getElementById('cantidad').value.trim() || 'Por definir';
            const ubicacion = document.getElementById('ubicacion-obra').value.trim();
            const detalles = document.getElementById('detalles').value.trim() || 'Sin comentarios adicionales';

            const numeroAmaya = '527891063997'; // Teléfono oficial de la empresa
            const mensaje = `Hola *Concretos y Agregados AMAYA*, solicito una cotización:%0A%0A` +
                `👤 *Cliente:* ${encodeURIComponent(nombre)}%0A` +
                `📞 *Teléfono:* ${encodeURIComponent(telefono)}%0A` +
                `🏗️ *Servicio/Producto:* ${encodeURIComponent(servicio)}%0A` +
                `📏 *Cantidad estimada:* ${encodeURIComponent(cantidad)}%0A` +
                `📍 *Ubicación de obra:* ${encodeURIComponent(ubicacion)}%0A` +
                `📝 *Detalles:* ${encodeURIComponent(detalles)}`;

            const whatsappUrl = `https://wa.me/${numeroAmaya}?text=${mensaje}`;
            window.open(whatsappUrl, '_blank', 'noopener');
        });
    }
});