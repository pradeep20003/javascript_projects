let productDiv = document.querySelector(".product");
var CategoryListDiv = document.querySelector(".CategoryList");
let allCat = [];
let displayProduct = async (allcheckCat = []) => {
  productDiv.innerHTML = "";

  let product = await fetch("https://fakestoreapi.com/products");
  let finalproduct = await product.json();
  finalproduct.forEach((element) => {
    //category data
    if (!allCat.includes(element.category)) {
      CategoryListDiv.innerHTML += `  <label for="">
                    <input type="checkbox" onclick='categoryFilter()' value="${element.category}">${element.category}
                </label>`;
      allCat.push(element.category);
    }

    if (allcheckCat.length == 0) {
      allcheckCat = allCat;
    }

    if (allcheckCat.includes(element.category)) {
      //product data
      productDiv.innerHTML += `<div class="productItems">
                <img src="${element.image}" alt="">
                <h4>${element.category}</h4>
                <p>${element.price}| ⭐${element.rating.rate}</p>
                <h3>${element.title}</h3>
            </div>`;
    }
  });
};
displayProduct();
let categoryFilter = () => {
  let checkInput = document.querySelectorAll("input[type ='checkbox']");
  let checkData = [];
  checkInput.forEach((e) => {
    if (e.checked) {
      checkData.push(e.value);
    }
  });
  displayProduct(checkData);
};
