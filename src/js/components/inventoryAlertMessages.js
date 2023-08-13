const inventoryAlertMessages = {
  inStock: {
    message: 'In Stock',
    color: 'green',
    check: (inventory) => inventory > 10,
  },
  limitedStock: {
    message: 'One of the items in your order has limited stock. Order soon!',
    color: '#F4D00E',
    check: (inventory) => inventory <= 10 && inventory > 0,
  },
  outOfStock: {
    message:
      'One of the items in your order is out of stock. Please check the inventory alerts.',
    color: 'red',
    check: (inventory) => inventory === 0,
  },
};

export default inventoryAlertMessages;
