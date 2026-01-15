// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize the cart state
    let cart = [
        { name: 'Baskets', price: 100, quantity: 0, liked: false },
        { name: 'Socks', price: 20, quantity: 0, liked: false },
        { name: 'Bag', price: 50, quantity: 0, liked: false }
    ];

    // Get all product card containers (changed to .product-card)
    const productCards = document.querySelectorAll('.product-card');
    
    // Initialize event listeners for each product
    initializeCart();

    // Function to initialize all event listeners
    function initializeCart() {
        // Add event listeners to each product card
        productCards.forEach((container, index) => {
            // Get elements for this specific product
            // Look for buttons within the inner .card-body
            const cardBody = container.querySelector('.card-body');
            const plusBtn = cardBody.querySelector('.fa-plus-circle');
            const minusBtn = cardBody.querySelector('.fa-minus-circle');
            const deleteBtn = cardBody.querySelector('.fa-trash-alt');
            const likeBtn = cardBody.querySelector('.fa-heart');
            const quantitySpan = cardBody.querySelector('.quantity');
            const unitPriceElement = cardBody.querySelector('.unit-price');

            // Parse the unit price from text (remove $ and convert to number)
            const unitPrice = parseFloat(unitPriceElement.textContent.replace('$', '').trim());
            
            // Store initial price in cart
            cart[index].price = unitPrice;

            // Plus button click event
            plusBtn.addEventListener('click', function() {
                cart[index].quantity++;
                updateQuantityDisplay(quantitySpan, cart[index].quantity);
                updateTotalPrice();
            });

            // Minus button click event
            minusBtn.addEventListener('click', function() {
                if (cart[index].quantity > 0) {
                    cart[index].quantity--;
                    updateQuantityDisplay(quantitySpan, cart[index].quantity);
                    updateTotalPrice();
                }
            });

            // Delete button click event
            deleteBtn.addEventListener('click', function() {
                // Remove the product from DOM
                container.remove();
                // Reset cart item
                cart[index].quantity = 0;
                updateTotalPrice();
                
                // Optional: Show message if all items are deleted
                if (document.querySelectorAll('.product-card').length === 0) {
                    alert('All items have been removed from your cart!');
                }
            });

            // Like button click event
            likeBtn.addEventListener('click', function() {
                cart[index].liked = !cart[index].liked;
                updateLikeButton(likeBtn, cart[index].liked);
            });

            // Initialize like button state
            updateLikeButton(likeBtn, cart[index].liked);
        });

        // Initial total price calculation
        updateTotalPrice();
    }

    // Function to update quantity display
    function updateQuantityDisplay(element, quantity) {
        element.textContent = quantity;
    }

    // Function to update like button appearance
    function updateLikeButton(button, isLiked) {
        if (isLiked) {
            button.style.color = 'red';
            button.classList.remove('far');
            button.classList.add('fas');
        } else {
            button.style.color = 'black';
            button.classList.remove('fas');
            button.classList.add('far');
        }
    }

    // Function to calculate and update total price
    function updateTotalPrice() {
        let total = 0;
        
        // Calculate total from cart array
        cart.forEach(item => {
            total += item.price * item.quantity;
        });
        
        // Update the total price display
        const totalElement = document.querySelector('.total');
        totalElement.textContent = `${total} $`;
        
        // Optional: Add some visual feedback when total changes
        totalElement.style.transform = 'scale(1.1)';
        setTimeout(() => {
            totalElement.style.transform = 'scale(1)';
        }, 200);
    }

    // Optional: Add search functionality
    const searchInput = document.querySelector('.form-control');
    const searchButton = document.querySelector('.btn-outline-success');
    
    if (searchInput && searchButton) {
        searchButton.addEventListener('click', function(e) {
            e.preventDefault();
            const searchTerm = searchInput.value.toLowerCase();
            
            productCards.forEach(container => {
                const cardBody = container.querySelector('.card-body');
                const productName = cardBody.querySelector('.card-title').textContent.toLowerCase();
                const productDescription = cardBody.querySelector('.card-text').textContent.toLowerCase();
                
                if (productName.includes(searchTerm) || productDescription.includes(searchTerm)) {
                    container.style.display = 'block';
                } else {
                    container.style.display = 'none';
                }
            });
        });
        
        // Clear search on input change
        searchInput.addEventListener('input', function() {
            if (this.value === '') {
                productCards.forEach(container => {
                    container.style.display = 'block';
                });
            }
        });
    }
});