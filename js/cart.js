// Helper functions for setting and getting cookies
function setCookie(name, value, days) {
    let expires = "";
    if (days) {
      let date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
  }
  
  function getCookie(name) {
    let nameEQ = name + "=";
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  }
  
  // Function to add an item to the cart in cookies
  function addToCart(name, price) {
    // Retrieve current cart from cookies or initialize a new one
    let cart = JSON.parse(getCookie('cart') || '[]');
  
    // Check if the item is already in the cart
    let item = cart.find(product => product.name === name);
    if (item) {
      item.quantity += 1; // Increase quantity if it exists
    } else {
      cart.push({ name, price, quantity: 1 }); // Add new item
    }
  
    // Save updated cart to cookies
    setCookie('cart', JSON.stringify(cart), 7);
    alert("Item added to cart!");
  }
  
  // Function to display cart items (used on the cart page)
  function displayCart() {
    let cart = JSON.parse(getCookie('cart') || '[]');
    let cartItems = document.getElementById('cartItems');
    cartItems.innerHTML = ''; // Clear existing items
  
    let total = 0;
    cart.forEach((item) => {
      let itemTotal = item.price * item.quantity;
      total += itemTotal;
  
      // Display each item in the cart
      let li = document.createElement('li');
      li.textContent = `${item.name} - $${item.price} x ${item.quantity} = $${itemTotal.toFixed(2)}`;
      cartItems.appendChild(li);
    });
  
    document.getElementById('cartTotal').textContent = total.toFixed(2); // Update total
  }
  
  // Function to clear the cart and remove the cookie
  function clearCart() {
    setCookie('cart', '', -1); // Set cart cookie to expire
    displayCart(); // Refresh the display
  }
  
  // Toggle cart display (used on the cart page if needed)
  function toggleCart() {
    let cartSection = document.getElementById('cart');
    cartSection.style.display = cartSection.style.display === 'none' ? 'block' : 'none';
  }
  
  // Initial call to display the cart items if on the cart page
  if (document.getElementById('cartItems')) {
    displayCart();
  }
  