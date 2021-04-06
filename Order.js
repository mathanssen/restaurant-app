export default class Order {
  constructor(customerName, customerBillingAddress, shippingAddress) {
    this.cart = [];
    this.discountPercent = 0;
    this.customerName = customerName;
    this.customerBillingAddress = customerBillingAddress;
    this.shippingAddress = shippingAddress;
    this.subtotalAmount = 0;
    this.finalAmount = 0;
    this.orderDate = new Date();
  }

  setCart(cart) {
    this.cart = cart;
  }

  calculateSubtotal() {
    for (let food = 0; food < this.cart.length; food++) {
      var foodAmount = this.cart[food].Price * this.cart[food].quantity;
      this.subtotalAmount += foodAmount;
    }
  }

  calculateDiscount() {
    if (this.subtotalAmount > 100) {
      this.discountPercent = 0.3;
    } else if (this.subtotalAmount > 80 && this.subtotalAmount <= 100) {
      this.discountPercent = 0.2;
    } else {
      this.discountPercent = 0.05;
    }
  }

  calculateFinalAmount() {
    var num = (1 - this.discountPercent) * this.subtotalAmount;
    this.finalAmount = num.toFixed(2);
  }

  calculatePayment() {
    this.calculateSubtotal();
    this.calculateDiscount();
    this.calculateFinalAmount();
  }
}
