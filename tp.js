document.querySelector('#btnContacto').addEventListener('click', formularioChequeo)
document.querySelector('#btnAgregar1').addEventListener('click', () => agregar('Correa ajustable', 1000))
document.querySelector('#btnAgregar2').addEventListener('click', () => agregar('Suéter', 2500))
document.querySelector('#btnAgregar3').addEventListener('click', () => agregar('Cama', 6000))
document.querySelector('#btnAgregar4').addEventListener('click', () => agregar('Juguete', 500))
document.querySelector('#btnAgregar5').addEventListener('click', () => agregar('Snacks', 200))
document.querySelector('#btnAgregar6').addEventListener('click', () => agregar('Peluche', 1200))
document.querySelector('#btnAgregar7').addEventListener('click', () => agregar('Bolso Transportador', 7000))
document.querySelector('#btnAgregar8').addEventListener('click', () => agregar('Comedero', 2300))
document.querySelector('#btnVaciar').addEventListener('click', vaciar)
document.querySelector('#btnComprar').addEventListener('click', comprar)

let carrito = []

cargarLocal()
mostrar()

function formularioChequeo(){
    const inputNombreDueno = document.querySelector('#inputNombreDueno')
    const nombreDueno = inputNombreDueno.value.trim()
    const inputNombrePerro = document.querySelector('#inputNombrePerro')
    const nombrePerro = inputNombrePerro.value.trim()
    const inputMail = document.querySelector('#inputMail')
    const mail = inputMail.value.trim()
    const inputMensaje = document.querySelector('#inputMensaje')
    const mensaje = inputMensaje.value.trim()

    if (nombreDueno === ''){
        alert('Ingrese el nombre del dueño por favor.')
        return
    }
    if (nombrePerro === ''){
        alert('Ingrese el nombre de la mascota por favor.')
        return
    }
    if (mail === ''){
        alert('Ingrese el mail por favor.')
        return
    }
    if (!mail.includes('@')){
        alert('El email debe contener un @.')
        return
    }
    if (mensaje === ''){
        alert('Ingrese un mensaje por favor.')
        return
    }

    alert(`Gracias por contactarnos, ${nombreDueno}. Pronto responderemos tu consulta sobre ${nombrePerro}.`)
    inputNombreDueno.value = ''
    inputNombrePerro.value = ''
    inputMail.value = ''
    inputMensaje.value = ''
}

function agregar(nombreProducto, precio){
    const index = carrito.findIndex(item => item.nombreProducto === nombreProducto)
    if (index === -1){
        carrito.push({nombreProducto: nombreProducto, precio: precio, cantidad: 1})
    } else {
        carrito[index].cantidad += 1
    }
    guardarLocal()
    mostrar()
}

function eliminar(index){
    carrito.splice(index, 1)
    guardarLocal()
    mostrar()
}

function vaciar(){
    carrito = []
    guardarLocal()
    mostrar()
}

function mostrar(){
    const listaCompras = document.querySelector('#listaCompras')
    listaCompras.innerHTML = ''
    let total = 0

    for (let i = 0; i < carrito.length; i++){
        let item = carrito[i]
        total += item.precio * item.cantidad

        let li = document.createElement('li')
        li.textContent = `${item.nombreProducto} - $${item.precio} x ${item.cantidad}`

        const btnEliminar = document.createElement('button')
        btnEliminar.textContent = 'Eliminar'
        btnEliminar.addEventListener('click', () => eliminar(i))
        li.appendChild(btnEliminar)
        listaCompras.appendChild(li)
    }
    const totalTexto = document.querySelector('#total')
    totalTexto.innerHTML = `<strong>Total: $${total}</strong>`
}

function comprar(){
    if (carrito.length === 0){
        alert('El carrito está vacío.')
    } else {
        alert('Muchas gracias por tu compra! En breve te contactaremos!')
        vaciar()
    }
}

function guardarLocal(){
    localStorage.setItem('carrito', JSON.stringify(carrito))
}

function cargarLocal(){
    const datos = localStorage.getItem('carrito')
    if (datos){
        carrito = JSON.parse(datos)
    }
}