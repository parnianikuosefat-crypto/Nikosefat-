
const languageBtn = document.getElementById("languageBtn");

let currentLanguage = "fa";

function changeLanguage() {
  currentLanguage = currentLanguage === "fa" ? "en" : "fa";

  document.documentElement.lang = currentLanguage;
  document.documentElement.dir =
    currentLanguage === "fa" ? "rtl" : "ltr";

  document.body.classList.toggle(
    "english",
    currentLanguage === "en"
  );

  document.querySelectorAll("[data-fa]").forEach(element => {
    const value = element.getAttribute(
      `data-${currentLanguage}`
    );

    if (value !== null) {
      element.innerHTML = value;
    }
  });

  languageBtn.textContent =
    currentLanguage === "fa" ? "EN" : "FA";

  document.getElementById("searchInput").placeholder =
    currentLanguage === "fa"
      ? "جستجوی عطر..."
      : "Search perfumes...";

  filterProducts();
}

languageBtn.addEventListener("click", changeLanguage);

// Product filtering
let selectedCategory = "all";

const filterButtons = document.querySelectorAll(".filter");
const searchInput = document.getElementById("searchInput");
const products = document.querySelectorAll(".product-card");

function filterProducts() {
  let visibleCount = 0;
  const searchValue = searchInput.value.toLowerCase().trim();

  products.forEach(product => {
    const category = product.dataset.category;
    const title = product.querySelector("h3");

    const productName = title.textContent.toLowerCase();
    const translatedName =
      title.getAttribute(`data-${currentLanguage}`).toLowerCase();

    const categoryMatch =
      selectedCategory === "all" ||
      selectedCategory === category;

    const searchMatch =
      productName.includes(searchValue) ||
      translatedName.includes(searchValue);

    const show = categoryMatch && searchMatch;

    product.style.display = show ? "" : "none";

    if (show) visibleCount++;
  });

  document.getElementById("emptyMessage").hidden =
    visibleCount !== 0;
}

filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    filterButtons.forEach(btn =>
      btn.classList.remove("active")
    );

    button.classList.add("active");
    selectedCategory = button.dataset.filter;

    filterProducts();
  });
});

searchInput.addEventListener("input", filterProducts);

// Demo selection buttons
document.querySelectorAll(".cart").forEach(button => {
  button.addEventListener("click", () => {
    alert(
      currentLanguage === "fa"
        ? "این محصول انتخاب شد!"
        : "Product selected!"
    );
  });
});
