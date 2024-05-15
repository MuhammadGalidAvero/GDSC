var cart = [];
var totalPayment = 0;

function addToCart(game, price) {
  var gameIndex = cart.findIndex((item) => item.game === game);
  if (gameIndex > -1) {
    cart[gameIndex].qty++;
    cart[gameIndex].total += price;
  } else {
    cart.push({ game, price, qty: 1, total: price });
  }
  updateCart();
}

function removeFromCart(game) {
  var gameIndex = cart.findIndex((item) => item.game === game);
  if (gameIndex > -1) {
    cart.splice(gameIndex, 1);
  }
  updateCart();
}

function updateCart() {
  var cartTable = document.getElementById('cart');
  cartTable.innerHTML = `
    <tr>
      <th>Game</th>
      <th>Harga</th>
      <th>Jumlah</th>
      <th>Total</th>
      <th>Aksi</th>
    </tr>
  `;
  cart.forEach((item, index) => {
    var row = cartTable.insertRow();
    row.insertCell(0).textContent = item.game;
    row.insertCell(1).textContent = item.price;
    row.insertCell(2).textContent = item.qty;
    row.insertCell(3).textContent = item.total;
    var deleteButton = document.createElement('button');
    deleteButton.textContent = 'Hapus';
    deleteButton.onclick = function () {
      removeFromCart(item.game);
    };
    var deleteCell = row.insertCell(4);
    deleteCell.appendChild(deleteButton);
  });
  totalPayment = cart.reduce((sum, item) => sum + item.total, 0);
  document.getElementById('totalPayment').textContent = totalPayment;
}
