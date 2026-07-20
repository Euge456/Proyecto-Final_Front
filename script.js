// ===============================
// VARIABLES GLOBALES
// ===============================
const API_URL = "https://fakestoreapi.com/products";
let productos = [];
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const listaAnillosFijos = [
    { id: 101, title: "Anillo Aura Oro Solitario", price: 350000.00, image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=500&auto=format&fit=crop&q=60" },
    { id: 102, title: "Anillo Eternidad Plata 925", price: 85000.00, image: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=500&auto=format&fit=crop&q=60" },
    { id: 103, title: "Anillo de Oro Rosa Elegance", price: 290000.00, image: "https://images.unsplash.com/photo-1598560917505-59a3ad559071?w=500&auto=format&fit=crop&q=60" },
    { id: 104, title: "Sello de Plata Minimalista", price: 75000.00, image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=500&auto=format&fit=crop&q=60" },
    { id: 105, title: "Anillo Oro Trenzado 18k", price: 410000.00, image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=500&auto=format&fit=crop&q=60" },
    { id: 106, title: "Anillo de Plata Ondas", price: 70000.00, image: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=500&auto=format&fit=crop&q=60" },
    { id: 107, title: "Alianza de Oro Clásica", price: 210000.00, image: "https://images.unsplash.com/photo-1598560917505-59a3ad559071?w=500&auto=format&fit=crop&q=60" },
    { id: 108, title: "Anillo Plata con Circonia", price: 95000.00, image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=500&auto=format&fit=crop&q=60" },
    { id: 109, title: "Anillo Oro y Diamante Real", price: 680000.00, image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=500&auto=format&fit=crop&q=60" },
    { id: 110, title: "Anillo Plata Enlazada", price: 80000.00, image: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=500&auto=format&fit=crop&q=60" },
    { id: 111, title: "Anillo Compromiso Oro Blanco", price: 520000.00, image: "https://images.unsplash.com/photo-1598560917505-59a3ad559071?w=500&auto=format&fit=crop&q=60" },
    { id: 112, title: "Anillo Plata Ajustable Modern", price: 72000.00, image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=500&auto=format&fit=crop&q=60" },
    { id: 113, title: "Anillo Corona de Oro", price: 340000.00, image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=500&auto=format&fit=crop&q=60" },
    { id: 114, title: "Anillo Plata Doble Carril", price: 110000.00, image: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=500&auto=format&fit=crop&q=60" },
    { id: 115, title: "Anillo Oro Texturado", price: 275000.00, image: "https://images.unsplash.com/photo-1598560917505-59a3ad559071?w=500&auto=format&fit=crop&q=60" },
    { id: 116, title: "Anillo Plata Martillada 925", price: 88000.00, image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=500&auto=format&fit=crop&q=60" },
    { id: 117, title: "Anillo Marquesa Oro 18k", price: 490000.00, image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=500&auto=format&fit=crop&q=60" },
    { id: 118, title: "Anillo de Plata Cruzado", price: 78000.00, image: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=500&auto=format&fit=crop&q=60" },
    { id: 119, title: "Anillo Oro Iniciales", price: 310000.00, image: "https://images.unsplash.com/photo-1598560917505-59a3ad559071?w=500&auto=format&fit=crop&q=60" },
    { id: 120, title: "Anillo Trenza Plata Pura", price: 90000.00, image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=500&auto=format&fit=crop&q=60" }
];

// ===============================
// CARGAR PRODUCTOS DESDE API O LISTA PROPIA
// ===============================
async function obtenerProductos() {
    if (document.getElementById("lista-anillos")) {
        productos = listaAnillosFijos;
        mostrarAnillosCentrados(productos);
    } 
    else if (document.getElementById("lista-productos")) {
        try {
            const respuesta = await fetch(API_URL);
            const todosLosProductos = await respuesta.json();
            productos = todosLosProductos.filter(prod => prod.category === "jewelery");
            mostrarProductos(productos);
        } catch (error) {
            console.log("Error al cargar productos de joyería:", error);
        }
    }
}

// ===============================
// MOSTRAR PRODUCTOS EN EL DOM (INDEX GENERAL)
// ===============================
function mostrarProductos(listaProductos) {
    const contenedor = document.getElementById("lista-productos");
    if (!contenedor) return;
    contenedor.innerHTML = "";

    listaProductos.forEach(producto => {
        const card = document.createElement("div");
        card.classList.add("producto-card");

        card.innerHTML = `
        <div class="card">
            <img src="${producto.image}" class="card-img-top" alt="${producto.title}">
            <div class="card-body">
                <h5 class="card-title">${producto.title}</h5>
                <p class="card-price">$${producto.price.toLocaleString('es-AR')}</p>
                <button class="btn-add-cart" onclick="agregarAlCarrito(${producto.id})">
                    Agregar al carrito
                </button>
            </div>
        </div>
        `;
        contenedor.appendChild(card);
    });
}

// ===============================
// MOSTRAR ANILLOS CON TEXTOS Y PRECIOS CENTRADOS
// ===============================
function mostrarAnillosCentrados(listaAnillos) {
    const contenedor = document.getElementById("lista-anillos");
    if (!contenedor) return;
    contenedor.innerHTML = "";

    listaAnillos.forEach(anillo => {
        const card = document.createElement("div");
        card.classList.add("producto-card");

        card.innerHTML = `
        <div class="card">
            <img src="${anillo.image}" class="card-img-top" alt="${anillo.title}">
            <div class="card-body text-center">
                <h5 class="card-title text-center w-100">${anillo.title}</h5>
                <p class="card-price text-center w-100">$${anillo.price.toLocaleString('es-AR')}</p>
                <button class="btn-add-cart w-100" onclick="agregarAlCarrito(${anillo.id})">
                    Agregar al carrito
                </button>
            </div>
        </div>
        `;
        contenedor.appendChild(card);
    });
}

// ===============================
// AGREGAR PRODUCTOS AL CARRITO 
// ===============================
function agregarAlCarrito(id) {
    const producto = productos.find(producto => producto.id === id);
    const existe = carrito.find(item => item.id === id);

    if (existe) {
        existe.cantidad++;
    } else {
        carrito.push({
            id: producto.id,
            titulo: producto.title,
            precio: producto.price,
            imagen: producto.image,
            cantidad: 1
        });
    }

    guardarCarrito();
    actualizarCarrito();

    const aviso = document.createElement('div');
    aviso.textContent = 'Se ha agregado al carrito';
    
    aviso.style.position = 'fixed';
    aviso.style.bottom = '40px'; 
    aviso.style.left = '50%';
    aviso.style.transform = 'translateX(-50%)'; 
    
    aviso.style.backgroundColor = '#c5a059'; 
    aviso.style.color = '#000000';
    aviso.style.padding = '15px 30px';
    aviso.style.borderRadius = '5px';
    aviso.style.zIndex = '9999';
    aviso.style.boxShadow = '0 8px 24px rgba(0,0,0,0.2)';
    
    aviso.style.opacity = '0';
    aviso.style.transition = 'opacity 0.2s ease-in-out'; 
    
    document.body.appendChild(aviso);

    setTimeout(() => {
        aviso.style.opacity = '1';
    }, 10);

    setTimeout(() => {
        aviso.style.opacity = '0';
        setTimeout(() => aviso.remove(), 200); 
    }, 800); 
}

// ===============================
// GUARDAR EN LOCAL STORAGE
// ===============================
function guardarCarrito() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

// ===============================
// MOSTRAR Y ACTUALIZAR CARRITO
// ===============================
function actualizarCarrito() {
    const contenedorCarrito = document.getElementById("productos-carrito");
    const contador = document.getElementById("contador");
    const totalHTML = document.getElementById("total-carrito");

    if (!contenedorCarrito || !contador || !totalHTML) return;

    contenedorCarrito.innerHTML = "";
    let totalProductos = 0;
    let totalCompra = 0;

    if (carrito.length === 0) {
        contenedorCarrito.innerHTML = `
        <p class="text-center text-muted my-4">Tu carrito está vacío.</p>
        `;
    }

    carrito.forEach(producto => {
        totalProductos += producto.cantidad;
        totalCompra += producto.precio * producto.cantidad;

        const item = document.createElement("div");
        item.classList.add("mb-3", "pb-3", "border-bottom");

        item.innerHTML = `
        <div class="d-flex align-items-center justify-content-between">
            <div class="d-flex align-items-center">
                <img src="${producto.imagen}" width="50" height="50" class="cart-item-img me-3" alt="${producto.titulo}" style="object-fit: cover;">
                <div>
                    <h6 class="mb-1 small fw-semibold">${producto.titulo.substring(0, 20)}...</h6>
                    <p class="mb-0 small text-gold fw-medium">$${producto.precio.toLocaleString('es-AR')}</p>
                </div>
            </div>
            <div class="d-flex align-items-center">
                <button class="btn btn-sm btn-light border btn-quantity" onclick="cambiarCantidad(${producto.id}, -1)">-</button>
                <span class="mx-2 small fw-bold">${producto.cantidad}</span>
                <button class="btn btn-sm btn-light border btn-quantity" onclick="cambiarCantidad(${producto.id}, 1)">+</button>
                <button class="btn btn-sm btn-link text-danger ms-2 text-decoration-none" onclick="eliminarProducto(${producto.id})">✕</button>
            </div>
        </div>
        `;
        contenedorCarrito.appendChild(item);
    });

    contador.textContent = totalProductos;
    totalHTML.textContent = "$" + totalCompra.toLocaleString('es-AR');
}

// ===============================
// CAMBIAR CANTIDAD
// ===============================
function cambiarCantidad(id, cambio) {
    const producto = carrito.find(item => item.id === id);
    if (!producto) return;
    
    producto.cantidad += cambio;

    if (producto.cantidad <= 0) {
        eliminarProducto(id);
        return;
    }

    guardarCarrito();
    actualizarCarrito();
}

// ===============================
// ELIMINAR PRODUCTO
// ===============================
function eliminarProducto(id) {
    carrito = carrito.filter(producto => producto.id !== id);
    guardarCarrito();
    actualizarCarrito();
}

// ===============================
// MENSAJE AL USUARIO (FORMULARIO)
// ===============================
function mostrarMensaje(texto) {
    const mensaje = document.getElementById("mensaje-formulario");
    if (mensaje) {
        mensaje.textContent = texto;
        mensaje.style.color = "#c5a059";
        setTimeout(() => {
            mensaje.textContent = "";
        }, 3000);
    }
}

// ===============================
// VALIDACIÓN FORMULARIO
// ===============================
const formulario = document.getElementById("formulario-contacto");
if (formulario) {
    formulario.addEventListener("submit", function(event) {
        const email = document.getElementById("email").value;
        const formatoEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!formatoEmail.test(email)) {
            event.preventDefault();
            mostrarMensaje("Por favor, ingresá un correo electrónico válido");
        }
    });
}

// ===============================
// FINALIZAR COMPRA
// ===============================
const botonCompra = document.getElementById("finalizar-compra");
if (botonCompra) {
    botonCompra.addEventListener("click", () => {
        
        if (carrito.length === 0) {
            const contenedorModalVacio = document.createElement('div');
            contenedorModalVacio.innerHTML = `
                <div class="modal fade" id="modalCarritoVacio" tabindex="-1" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered">
                        <div class="modal-content text-center p-4 border-0 shadow">
                            <h5 class="fw-bold text-uppercase" style="color: #c5a059;">Tu carrito está vacío</h5>
                            <p class="text-muted mb-0 small">Agregá algún producto antes de proceder al pago.</p>
                        </div>
                    </div>
                </div>
            `;
            document.body.appendChild(contenedorModalVacio);

            const miModalVacio = new bootstrap.Modal(document.getElementById('modalCarritoVacio'));
            miModalVacio.show();

            setTimeout(() => {
                miModalVacio.hide();
                document.getElementById('modalCarritoVacio').remove();
            }, 2500);
            
            return; 
        }

        const contenedorModal = document.createElement('div');
        contenedorModal.innerHTML = `
            <div class="modal fade" id="modalPagoAura" tabindex="-1" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content text-center p-4 border-0 shadow">
                        <h5 class="fw-bold text-uppercase" style="color: #c5a059;">¡Muchas gracias por tu compra!</h5>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(contenedorModal);

        const miModal = new bootstrap.Modal(document.getElementById('modalPagoAura'));
        miModal.show();

        carrito = [];
        guardarCarrito();
        actualizarCarrito();

        setTimeout(() => {
            miModal.hide();
            document.getElementById('modalPagoAura').remove();
        }, 3000);
    });
}

// ===============================
// INICIALIZAR PÁGINA
// ===============================
obtenerProductos();
actualizarCarrito();