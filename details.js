window.onload = function () {
    const params = new URLSearchParams(document.location.search)
    const id = params.get("productId")
    
    getProductById(id)
        .then(displayProduct)
}

function getProductById(id) {
    return fetch(`http://localhost:8081/api/products/${id}`)
        .then(response => response.json())
}

function displayProduct(product) {
    console.log(product)
    document.title = `${product.productName} (Northwind Grocery)`

    const isDiscontinued = product.discontinued === "true"
    const isOutOfStock = product.unitsInStock === "0"

    const enablePurchaseButton = (isDiscontinued || isOutOfStock)
        ? "disabled" 
        : `onclick="purchase(${product.productId})"`    
    const toggleDiscontinuedMessage = isDiscontinued 
        ? "show" 
        : "hide"

    const price = Number(product.unitPrice).toFixed(2)
    const html = `
        <article class="product">
            <h2>${product.productName}</h2>
            <div class="discontinued-message ${toggleDiscontinuedMessage}">DISCONTINUED</div>
            
            <div><strong>Price:</strong> ${price}</div>
            <div><strong>Stock:</strong> ${product.unitsInStock}</div>
            <div><strong>Supplier:</strong> ${product.supplier}</div>
            
            <button ${enablePurchaseButton}>Purchase</button>
        </article>
    `
    
    document
        .querySelector("main")
        .insertAdjacentHTML("beforeend", html)
}

function purchase (productId) {
    const errorMessage = `User clicked the Purchase button for product ${productId}, but this feature is not yet implemented.`

    throw new Error(errorMessage)
}
