const socket = io();

document.querySelectorAll('#removeFromCart').forEach((btn) => btn.addEventListener('click', (e) => {
    const cartId = document.querySelector('#cartId').value;
    e.preventDefault();
    e.stopPropagation();
    socket.emit('removeFromCart', {
        pid: e.currentTarget.dataset.prod_id,
        cid: cartId,
    })
}))

socket.on('productRemovedFromCart', (data) => {
    createToast("success", "Product removed successfully of the cart");
    const elementToRemove = document.querySelector("[data-prod_id='"+data.pid+"']");
    if(elementToRemove) {
        elementToRemove.parentElement.parentElement.parentElement.remove();
    } else {
        console.error("Element not found!");
    }
})

document.querySelectorAll('#units span[data-stock]').forEach((elem) => elem.addEventListener('click', (e) => {
    e.stopPropagation();
    e.preventDefault();
    console.log(e.currentTarget.dataset.stock);
}))