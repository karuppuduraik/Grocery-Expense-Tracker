let items = [];

document.getElementById('expenseForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const name = document.getElementById('itemName').value;
  const qty = Number(document.getElementById('itemQty').value);
  const cost = Number(document.getElementById('itemCost').value);
  const date = document.getElementById('itemDate').value;

  const total = qty * cost;
  const item = { name, qty, cost, date, total };

  items.push(item);
  renderTable(items);
  this.reset();
});

function renderTable(data) {
  const tbody = document.querySelector("#expenseTable tbody");
  tbody.innerHTML = "";

  let totalExpense = 0;
  data.forEach((item, index) => {
    totalExpense += item.total;

    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${item.name}</td>
      <td>${item.qty}</td>
      <td>₹${item.cost}</td>
      <td>${item.date}</td>
      <td>₹${item.total}</td>
      <td><button class="delete-btn" onclick="deleteItem(${index})">Delete</button></td>
    `;
    tbody.appendChild(row);
  });

  document.getElementById("totalExpense").textContent = totalExpense;
}

function deleteItem(index) {
  items.splice(index, 1);
  renderTable(items);
}

function filterByDate() {
  const filterDate = document.getElementById("filterDate").value;
  if (!filterDate) return;

  const filtered = items.filter(item => item.date === filterDate);
  renderTable(filtered);
}

function clearFilter() {
  document.getElementById("filterDate").value = "";
  renderTable(items);
}
