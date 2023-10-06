const socket = io();

// Escuchar el evento 'productAdded' y actualizar la vista
socket.on('productAdded', product => {
    const prodList = document.getElementById('products_list');
    let products = prodList.innerHTML;
    products += `<div class="product relative p-4 hover:shadow-lg border rounded-lg duration-300 overflow-hidden">
        <div class="mb-3">
            <img 
                class="w-full rounded-lg"
                src=${product.thumbnail}
                alt="product image">
        </div>
        <div class="product-info">
            <h2 class="text-2xl ">
                ${product.title}
            </h2>
            <p class="text-gray-400 leading-5">
                ${product.description}
            </p>
            <button class="rounded bg-blue-600 hover:bg-blue-400 duration-500 text-white font-bold mt-4 w-full p-2">
                $${product.price}/day
            </button>
        </div>
    </div>`;
    prodList.innerHTML = products;
});

const form = document.getElementById('productForm');
form.addEventListener('submit', (event) => {
    event.preventDefault();

    const newProduct = {
        code: form.code.value,
        title: form.title.value,
        description: form.description.value,
        price: parseFloat(form.price.value),
        thumbnail: form.thumbnail.value,
        stock: parseInt(form.stock.value),
    };

    socket.emit('newProduct', newProduct);
});