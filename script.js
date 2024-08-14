// Alternar icono de menú y visibilidad de la barra de navegación
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x'); // Cambia el icono del menú
    navbar.classList.toggle('active'); // Muestra/oculta la barra de navegación
}

// Resaltar el enlace activo en la navegación durante el desplazamiento
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 100;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if(top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
            });
        }
    });

    // Fijar el encabezado al desplazarse hacia abajo
    let header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 100);

    // Ocultar la barra de navegación al hacer scroll
    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');
}

// Función para enviar el formulario de contacto a la API
document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault(); 

    // Obtener los valores del formulario
    const name = document.getElementById('Name').value;
    const cedula = document.getElementById('Cedula').value;
    const mobile = document.getElementById('Mobile').value;
    const correo = document.getElementById('Correo').value;
    const message = document.getElementById('Message').value;

    // Crear el objeto de datos
    const data = {
        nombre: name,
        cedula: cedula,
        telefono: mobile,
        email: correo,
        mensaje: message
    };

    // Enviar los datos a la API usando fetch
    fetch('http://54.197.35.254/api/contacto/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            return response.text().then(text => { 
                throw new Error('Error en la solicitud: ' + response.status + ' - ' + text);
            });
        }
    })
    .then(data => {
        console.log('Formulario enviado con éxito:', data);
        alert('Formulario enviado con éxito');
        document.getElementById('contactForm').reset(); 
    })
    .catch(error => {
        console.error('Error al enviar el formulario:', error);
        alert('Hubo un error al enviar el formulario. Por favor, revisa la consola para más detalles.');
    });
});