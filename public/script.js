document.addEventListener("DOMContentLoaded", () => {

  const data = {
    produtos: [
      { id: 1, nome: "Samsung S23", preco: 3499.90, categoria: "Celulares", imagem: "imagens/samsung.jpg", descricao: "Top", emEstoque: true },
      { id: 2, nome: "Dell Inspiron", preco: 4599.00, categoria: "Notebooks", imagem: "imagens/dell.jpg", descricao: "Potente", emEstoque: false },
      { id: 3, nome: "iPhone 14", preco: 6000, categoria: "Celulares", imagem: "imagens/iphone.jpg", descricao: "Apple", emEstoque: true },
      { id: 4, nome: "MacBook", preco: 8000, categoria: "Notebooks", imagem: "imagens/macbook.jpg", descricao: "Apple", emEstoque: true },
      { id: 5, nome: "Mouse Gamer", preco: 200, categoria: "Acessórios", imagem: "imagens/mouse gamer.jpg", descricao: "RGB", emEstoque: true },
      { id: 6, nome: "Teclado Mecânico", preco: 350, categoria: "Acessórios", imagem: "imagens/teclado mecanico.jpg", descricao: "Gamer", emEstoque: true },
      { id: 7, nome: "PS5", preco: 4500, categoria: "Games", imagem: "imagens/play5.jpg", descricao: "Sony", emEstoque: false },
      { id: 8, nome: "Xbox X", preco: 4200, categoria: "Games", imagem: "imagens/xbox.jpg", descricao: "Microsoft", emEstoque: true }
    ]
  };

  const productList = document.getElementById("product-list");
  const productDetails = document.getElementById("product-details");
  const searchInput = document.getElementById("search");
  const categorySelect = document.getElementById("category");
  const btnRender = document.getElementById("btnRender");

  function formatPrice(preco) {
    return "R$ " + preco.toFixed(2);
  }

  function createProductCard(produto) {
    const card = document.createElement("div");
    card.classList.add("card");
    card.setAttribute("data-id", produto.id);

    card.innerHTML = `
      <img src="${produto.imagem}" width="150">
      <h3>${produto.nome}</h3>
      <p>${formatPrice(produto.preco)}</p>
      <p>${produto.categoria}</p>
      <button class="btn-details">Ver detalhes</button>
    `;

    // 👉 IR PARA PÁGINA DE DETALHES
    card.querySelector(".btn-details").addEventListener("click", () => {
      window.location.href = `detalhes.html?id=${produto.id}`;
    });

    return card;
  }

  function renderProducts(produtos) {
    if (!productList) return;

    productList.innerHTML = "";

    produtos.forEach(prod => {
      const card = createProductCard(prod);
      productList.appendChild(card);
    });
  }

  function renderCategories() {
    if (!categorySelect) return;

    const categorias = ["Todas"];

    data.produtos.forEach(p => {
      if (!categorias.includes(p.categoria)) {
        categorias.push(p.categoria);
      }
    });

    categorySelect.innerHTML = "";

    categorias.forEach(cat => {
      const option = document.createElement("option");
      option.value = cat;
      option.textContent = cat;
      categorySelect.appendChild(option);
    });
  }

  function showProductDetails(produto) {
    if (!productDetails) return;

    productDetails.innerHTML = `
      <h2>${produto.nome}</h2>
      <img src="${produto.imagem}" width="200">
      <p><strong>Preço:</strong> ${formatPrice(produto.preco)}</p>
      <p><strong>Categoria:</strong> ${produto.categoria}</p>
      <p><strong>Estoque:</strong> ${produto.emEstoque ? "Disponível" : "Indisponível"}</p>
      <p>${produto.descricao}</p>
    `;
  }

  function filterProducts() {
    const texto = searchInput?.value.toLowerCase() || "";
    const categoria = categorySelect?.value || "Todas";

    return data.produtos.filter(p => {
      const matchNome = p.nome.toLowerCase().includes(texto);
      const matchCategoria = categoria === "Todas" || p.categoria === categoria;
      return matchNome && matchCategoria;
    });
  }

  // 🔎 PEGAR ID DA URL
  function getProductIdFromURL() {
    const params = new URLSearchParams(window.location.search);
    return parseInt(params.get("id"));
  }

  // EVENTOS
  if (searchInput) {
    searchInput.addEventListener("input", () => {
      renderProducts(filterProducts());
    });
  }

  if (categorySelect) {
    categorySelect.addEventListener("change", () => {
      renderProducts(filterProducts());
    });
  }

  if (btnRender) {
    btnRender.addEventListener("click", () => {
      renderProducts(filterProducts());
    });
  }

  // INICIALIZAÇÃO HOME
  if (productList) {
    renderCategories();
    renderProducts(data.produtos);

    // 👉 PRINT DO CONSOLE
    console.log("IDs dos produtos:");
    document.querySelectorAll(".card").forEach(c => {
      console.log(c.dataset.id);
    });
  }

  // INICIALIZAÇÃO DETALHES
  if (productDetails) {
    const id = getProductIdFromURL();
    const produto = data.produtos.find(p => p.id === id);

    if (produto) {
      showProductDetails(produto);
    }
  }

});


  