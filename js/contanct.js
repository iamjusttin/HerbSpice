function sendWhatsAppMessage() {
    const name = document.getElementById("fname").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;
  
    const whatsappMessage = `I am ${name}\n${email}\n${message}`;
    const whatsappUrl = `https://wa.me/+97430786689?text=${encodeURIComponent(whatsappMessage)}`;
  
    window.open(whatsappUrl, '_blank');
  }