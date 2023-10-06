const socket = io();

const cartId = document.querySelector('#cart_id').value;
document.querySelector('#addToCart').addEventListener('click', (e) => {
    socket.emit('addToCart', {
        pid: e.target.dataset.id,
        cid: cartId,
    })
})

socket.on('productAddedToCart', () => {
    createToast("success", "Product added successfully to cart");
})