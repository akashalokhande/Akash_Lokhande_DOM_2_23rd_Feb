const spinner = document.getElementById("spinner");


async function fetchDataAsync() {
  try {
    spinner.style.display = "block"; // Show spinner
    const response = await fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false"
    );
    const data = await response.json();
    displayData(data);
  } catch (error) {
    console.error("Error fetching data:", error);
  } finally {
    spinner.style.display = "none"; // Hide spinner
  }
}
fetchDataAsync();

// Function to display data in the table
function displayData(data) {
  const tableBody = document.querySelector("#cryptoTable tbody");
  tableBody.innerHTML = "";

  data.forEach((item) => {
    const row = document.createElement("tr");

    const iconNameCell = document.createElement("td");
    iconNameCell.classList.add("icon-name-container");
    const icon = document.createElement("img");
    icon.src = item.image;
    icon.style.width = "30px";
    icon.style.height = "30px";
    icon.style.paddingRight = "8px";
    const name = document.createTextNode(item.name);
    iconNameCell.appendChild(icon);
    iconNameCell.appendChild(document.createTextNode(" "));
    iconNameCell.appendChild(name);
    row.appendChild(iconNameCell);

    const idCell = document.createElement("td");
    idCell.textContent = item.id;
    row.appendChild(idCell);


    const symbolCell = document.createElement("td");
    symbolCell.textContent = item.symbol.toUpperCase();
    row.appendChild(symbolCell);

    const priceCell = document.createElement("td");
    priceCell.textContent = `$${item.current_price.toFixed(2)}`;
    row.appendChild(priceCell);

    const priceChangeCell = document.createElement("td");
    const priceChangeValue = item.price_change_percentage_24h;
    priceChangeCell.textContent = `${priceChangeValue.toFixed(2)}%`;
    if (priceChangeValue < 0) {
      priceChangeCell.classList.add("negative");
    } else {
      priceChangeCell.classList.add("positive");
    }
    row.appendChild(priceChangeCell);

    const volumeCell = document.createElement("td");
    volumeCell.textContent = `$${item.total_volume.toLocaleString()}`;
    row.appendChild(volumeCell);

    tableBody.appendChild(row);
  });
}
