function headerComponent() {
  let main = document.getElementById("main");

  //creating head div and appending it to main
  let headDiv = document.createElement("div");
  headDiv.setAttribute("class", "d-flex bg-dark");
  headDiv.setAttribute("style", "height:50px");
  main.appendChild(headDiv);

  //creating logo div and appending it to head div
  let logoDiv = document.createElement("div");
  logoDiv.setAttribute("class", "d-flex flex-column align-items-center justify-content-center")
  logoDiv.setAttribute("style", "height:50px; width:30% ; color:white;");
  headDiv.appendChild(logoDiv);

  let logo = document.createElement("div");
  logo.innerHTML = "<small style='color:red'>E-</small><small>Shop</small>";

  logoDiv.appendChild(logo);

  let logoTitle = document.createElement("div");
  logoTitle.innerHTML = "<small>purchase any item on one tap</small>";
  logoDiv.appendChild(logoTitle);

  //creating search div and appending it to head div
  let searcDiv = document.createElement("div");
  searcDiv.setAttribute("style", "height:50px; width:70%");
  searcDiv.setAttribute("class", "d-flex align-items-center");
  headDiv.appendChild(searcDiv);

  let search = document.createElement("input");
  search.setAttribute("placeholder", "Search item by name or brand");
  search.setAttribute("style", "width:100% ; height:40px ; border-radius:10px;")
  searcDiv.appendChild(search);

  //creating options div and appending it to head div
  let optionsDiv = document.createElement("div");
  optionsDiv.setAttribute("style", "height:50px; width:30%");
  optionsDiv.setAttribute("class", "d-flex align-items-center justify-content-around text-white ");
  headDiv.appendChild(optionsDiv);

  let signIn = document.createElement("div");
  signIn.innerHTML = "Sign in"
  signIn.setAttribute("class", "btn text-white");
  optionsDiv.appendChild(signIn);

  let signUp = document.createElement("div");
  signUp.innerHTML = "Sign up"
  signUp.setAttribute("class", "btn text-white");
  signUp.addEventListener("click", function () {
    signUpComponent();
  });
  optionsDiv.appendChild(signUp);

}

function cardComponent() {
  let main = document.getElementById("main");
  let items = JSON.parse(localStorage.getItem("items"));

  let cardContainer = document.createElement("div");
  cardContainer.setAttribute("id", "CardContainer");
  cardContainer.setAttribute("class", "container");
  // cardContainer.setAttribute("style","display:flex;");
  main.appendChild(cardContainer);

  let row = document.createElement("div");
  row.setAttribute("class", "row");
  cardContainer.appendChild(row);

  for (let data of items) {
    let col = document.createElement("div");
    col.setAttribute("class", "col-3");
    // col.setAttribute("style","border:1px solid black;");

    row.appendChild(col);

    let div = document.createElement("div");
    div.setAttribute("style", "height:371px;width:100%;margin-top:20px;margin-bottom:20px; box-shadow:1px 1px 10px 1px;")
    div.setAttribute("class", "d-flex flex-column justify-content-center align-items-center")
    col.appendChild(div);

    let image = document.createElement("img");
    image.setAttribute("style", "height:245px")
    image.src = data.thumbnail;
    div.appendChild(image)

    let title = document.createElement("h6");
    title.innerText = data.title;
    div.appendChild(title);

    let brand = document.createElement("div");
    brand.innerHTML = `<small>${data.brand}</small>`;
    div.appendChild(brand);

    let price = document.createElement("h3");
    price.setAttribute("class", "bi bi-currency-rupee text-success");
    price.innerHTML = data.price;
    div.appendChild(price);

    let viewMore = document.createElement("button");
    viewMore.innerText = "view more";
    viewMore.setAttribute("class", "btn btn-warning");
    viewMore.setAttribute("style", "width:100%");
    viewMore.addEventListener("click", function () {
      viewMoreComponent(data);
      //console.log(data);

    })
    div.appendChild(viewMore);

  }

}

function viewMoreComponent(data) {
  let main = document.getElementById("main");
  main.removeChild(document.getElementById("CardContainer"));

  let viewMoreDiv = document.createElement("div");
  viewMoreDiv.setAttribute("class", "container d-flex")
  viewMoreDiv.setAttribute("style", "width:100%; height:620px;")
  main.appendChild(viewMoreDiv);

  let row = document.createElement("div");
  row.setAttribute("class", "row")
  viewMoreDiv.appendChild(row);

  let leftCol = document.createElement("div");
  leftCol.setAttribute("class", "col-md-6");
  leftCol.setAttribute("style", "height:100%;box-shadow:5px 5px 10px 1px");

  let mainImage = document.createElement("img");
  mainImage.setAttribute("style", "width:100%;height:480px");
  mainImage.src = data.thumbnail;
  leftCol.appendChild(mainImage);

  let imagesDiv = document.createElement("div");
  imagesDiv.setAttribute("style", "width:100%;height:120px;")
  leftCol.appendChild(imagesDiv);

  for (let image of data.images) {
    let img = document.createElement("img");
    img.setAttribute("style", "width:30%;height:100px")
    img.src = image;
    img.addEventListener("click", function () {
      let temp = mainImage.src;
      mainImage.src = image;
      image = temp;
    })
    imagesDiv.appendChild(img);

  }

  viewMoreDiv.appendChild(leftCol);

  let rightCol = document.createElement("div");
  rightCol.setAttribute("class", "col-md-6 d-flex flex-column p-5 align-items-cengter");
  rightCol.setAttribute("style", "height:100%;box-shadow:5px 5px 10px 1px");

  let title = document.createElement("h4");
  title.setAttribute("style", "font-size:20px; font-weight:bolder")
  title.innerHTML = `${data.title} <b class="text-primary">[${data.brand}]</b><hr>`;
  rightCol.appendChild(title);

  let description = document.createElement("p");
  description.innerHTML = `${data.description}`
  rightCol.appendChild(description);

  let warrantyInfo = document.createElement("p");
  warrantyInfo.innerHTML = `<b>Warranty Information :</b> ${data.warrantyInformation}`;
  rightCol.appendChild(warrantyInfo);

  let shippingInfo = document.createElement("p");
  shippingInfo.innerHTML = `<b>Shipping Information :</b> ${data.shippingInformation}`;
  rightCol.appendChild(shippingInfo);

  let returnInfo = document.createElement("p");
  returnInfo.innerHTML = `<b>Return Policy :</b> ${data.returnPolicy}`;
  rightCol.appendChild(returnInfo);

  let ratingInfo = document.createElement("p");
  ratingInfo.innerHTML = `<b>Rating : </b><span class='text-warning' style='font-size:20px; font-weight:bolder;'>${data.rating}/5</span>`;
  rightCol.appendChild(ratingInfo);

  let priceInfo = document.createElement("p");
  priceInfo.innerHTML = `<b>Offered price :</b> <del class='text-danger'>${data.price}</del> <span class='text-success' style='font-weight:bolder; font-size:25px;'>${(data.price - (data.price * data.discountPercentage) / 100).toFixed(2)} Rs.</span>`;
  rightCol.appendChild(priceInfo);

  let buyNow = document.createElement("button");
  buyNow.innerHTML = "Buy now";
  buyNow.setAttribute("class", "btn btn-warning mt-4");
  rightCol.appendChild(buyNow);

  viewMoreDiv.appendChild(rightCol);
}

function signUpComponent() {
  let main = document.getElementById("main");
  main.innerHTML = "";
  main.setAttribute("class", "d-flex justify-content-center align-items-center");
  main.setAttribute("style", "width:100%;height:695px;");

  let formDiv = document.createElement("div");
  formDiv.setAttribute("style", "width:30%;min-height:100px;box-shadow:5px 5px 10px 1px;border-radius:5px");
  formDiv.setAttribute("class", "d-flex flex-column");


  let emailInput = document.createElement("input");
  emailInput.setAttribute("type", "email");
  emailInput.setAttribute("placeholder", "Enter email");
  emailInput.setAttribute("class", "form-control mt-2");
  emailInput.addEventListener("keyup", function () { return validateEmail(emailInput.value, emailError) });

  formDiv.appendChild(emailInput);

  let emailError = document.createElement("small");
  emailError.setAttribute("style", "height:21px;color:red");
  formDiv.appendChild(emailError);

  let mobileInput = document.createElement("input");
  mobileInput.setAttribute("type", "text");
  mobileInput.setAttribute("placeholder", "Enter mobile");
  mobileInput.setAttribute("class", "form-control mt-2");
  mobileInput.addEventListener("keyup", () => validateMobile(mobileInput.value, mobileError));
  formDiv.appendChild(mobileInput);

  let mobileError = document.createElement("small");
  mobileError.setAttribute("style", "height:21px;color:red");
  formDiv.appendChild(mobileError);

  let passwordInput = document.createElement("input");
  passwordInput.setAttribute("type", "password");
  passwordInput.setAttribute("placeholder", "Enter password");
  passwordInput.setAttribute("class", "form-control mt-2");
  passwordInput.addEventListener("keyup", () => validatePassword(passwordInput.value, passwordError));
  formDiv.appendChild(passwordInput);

  let passwordError = document.createElement("small");
  passwordError.setAttribute("style", "height:21px;color:red");
  formDiv.appendChild(passwordError);

  let submit = document.createElement("button");
  submit.innerHTML = "Submit"
  submit.setAttribute("class", "btn btn-warning form-control mt-2");
  submit.addEventListener("click", function () {
    let username = emailInput.value;
    let mobile = mobileInput.value;
    let password = passwordInput.value;

    let newUser = { username, mobile, password };

    let userList = JSON.parse(localStorage.getItem("user-list"));
    let isUserAlreadyPresent = userList.some((user) => {
      return user.username == newUser.username;
    })

    if (validateForm(newUser, emailError, mobileError, passwordError)) {
      if (!isUserAlreadyPresent) {
        userList.push(newUser);
        localStorage.setItem("user-list", JSON.stringify(userList));
        alert("sign up success");
      }
      else {
        alert("user already registered");
      }
    }
  })
  formDiv.appendChild(submit);

  main.appendChild(formDiv);
}

function rakeTask() {
  !localStorage.getItem("user-list") && localStorage.setItem("user-list", "[]");
}

function validateEmail(username, emailError) {
  let status = true;
  let email = username;
  function countAtTheRate() {
    count = 0;
    for (let i = 0; i < email.length; i++) {
      if (email.charAt(i) == "@")
        count++;
    }
    return count;
  }


  if (email.length == 0) {
    status = false;
    emailError.innerText = "email is required";
  }
  else if (countAtTheRate() > 1) {
    status = false;
    emailError.innerText = "only one @ allowed";
  }
  else if (!email.endsWith(".com")) {
    status = false;
    emailError.innerText = "email must ends with .com";
  }
  else if (!email.includes("@gmail")) {
    status = false;
    emailError.innerText = "email must includes gmail after @";
  }
  else
    emailError.innerText = "";
  return status;

}

function validateMobile(mobile, mobileError) {
  let status = true;
  let mobileNumber = mobile;

  if (mobileNumber.length == 0) {
    status = false;
    mobileError.innerText = "mobile number is required";
  }
  else if (isNaN(mobileNumber)) {
    status = false;
    mobileError.innerText = "Only digits are allowed";
  }
  else if (mobileNumber.startsWith("0")) {
    status = false;
    mobileError.innerText = "Mobile number must not start with 0";
  }
  else if (mobileNumber.length != 10) {
    status = false;
    mobileError.innerText = "invalid mobile number";
  }
  else
    mobileError.innerText = "";
  return status;
}

function validatePassword(password, passwordError) {
  let status = true

  if (password.length == 0) {
    status = false;
    passwordError.innerText = "password is required";
  }
  else if (password.length < 6 || password.length > 10) {
    status = false;
    passwordError.innerText = "invalid password";
  }
  else
    passwordError.innerText = "";

  return status;
}

function validateForm(userObj, emailError, mobileError, passwordError) {
  let passwordStatus = validatePassword(userObj.password, passwordError);
  let emailStatus = validateEmail(userObj.username, emailError);
  let mobileStatus = validateMobile(userObj.mobile, mobileError);

  if (passwordStatus && emailStatus && mobileStatus)
    return true;
  return false;
}

function loadData() {
  let Json = [
    {
      "id": 1,
      "title": "Essence Mascara Lash Princess",
      "description": "The Essence Mascara Lash Princess is a popular mascara known for its volumizing and lengthening effects. Achieve dramatic lashes with this long-lasting and cruelty-free formula.",
      "category": "beauty",
      "price": 9.99,
      "discountPercentage": 10.48,
      "rating": 2.56,
      "stock": 99,
      "tags": [
        "beauty",
        "mascara"
      ],
      "brand": "Essence",
      "sku": "BEA-ESS-ESS-001",
      "weight": 4,
      "dimensions": {
        "width": 15.14,
        "height": 13.08,
        "depth": 22.99
      },
      "warrantyInformation": "1 week warranty",
      "shippingInformation": "Ships in 3-5 business days",
      "availabilityStatus": "In Stock",
      "reviews": [
        {
          "rating": 3,
          "comment": "Would not recommend!",
          "date": "2025-04-30T09:41:02.053Z",
          "reviewerName": "Eleanor Collins",
          "reviewerEmail": "eleanor.collins@x.dummyjson.com"
        },
        {
          "rating": 4,
          "comment": "Very satisfied!",
          "date": "2025-04-30T09:41:02.053Z",
          "reviewerName": "Lucas Gordon",
          "reviewerEmail": "lucas.gordon@x.dummyjson.com"
        },
        {
          "rating": 5,
          "comment": "Highly impressed!",
          "date": "2025-04-30T09:41:02.053Z",
          "reviewerName": "Eleanor Collins",
          "reviewerEmail": "eleanor.collins@x.dummyjson.com"
        }
      ],
      "returnPolicy": "No return policy",
      "minimumOrderQuantity": 48,
      "meta": {
        "createdAt": "2025-04-30T09:41:02.053Z",
        "updatedAt": "2025-04-30T09:41:02.053Z",
        "barcode": "5784719087687",
        "qrCode": "https://cdn.dummyjson.com/public/qr-code.png"
      },
      "images": [
        "https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/1.webp"
      ],
      "thumbnail": "https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/thumbnail.webp"
    },
    {
      "id": 2,
      "title": "Eyeshadow Palette with Mirror",
      "description": "The Eyeshadow Palette with Mirror offers a versatile range of eyeshadow shades for creating stunning eye looks. With a built-in mirror, it's convenient for on-the-go makeup application.",
      "category": "beauty",
      "price": 19.99,
      "discountPercentage": 18.19,
      "rating": 2.86,
      "stock": 34,
      "tags": [
        "beauty",
        "eyeshadow"
      ],
      "brand": "Glamour Beauty",
      "sku": "BEA-GLA-EYE-002",
      "weight": 9,
      "dimensions": {
        "width": 9.26,
        "height": 22.47,
        "depth": 27.67
      },
      "warrantyInformation": "1 year warranty",
      "shippingInformation": "Ships in 2 weeks",
      "availabilityStatus": "In Stock",
      "reviews": [
        {
          "rating": 5,
          "comment": "Great product!",
          "date": "2025-04-30T09:41:02.053Z",
          "reviewerName": "Savannah Gomez",
          "reviewerEmail": "savannah.gomez@x.dummyjson.com"
        },
        {
          "rating": 4,
          "comment": "Awesome product!",
          "date": "2025-04-30T09:41:02.053Z",
          "reviewerName": "Christian Perez",
          "reviewerEmail": "christian.perez@x.dummyjson.com"
        },
        {
          "rating": 1,
          "comment": "Poor quality!",
          "date": "2025-04-30T09:41:02.053Z",
          "reviewerName": "Nicholas Bailey",
          "reviewerEmail": "nicholas.bailey@x.dummyjson.com"
        }
      ],
      "returnPolicy": "7 days return policy",
      "minimumOrderQuantity": 20,
      "meta": {
        "createdAt": "2025-04-30T09:41:02.053Z",
        "updatedAt": "2025-04-30T09:41:02.053Z",
        "barcode": "9170275171413",
        "qrCode": "https://cdn.dummyjson.com/public/qr-code.png"
      },
      "images": [
        "https://cdn.dummyjson.com/product-images/beauty/eyeshadow-palette-with-mirror/1.webp"
      ],
      "thumbnail": "https://cdn.dummyjson.com/product-images/beauty/eyeshadow-palette-with-mirror/thumbnail.webp"
    },
    {
      "id": 3,
      "title": "Powder Canister",
      "description": "The Powder Canister is a finely milled setting powder designed to set makeup and control shine. With a lightweight and translucent formula, it provides a smooth and matte finish.",
      "category": "beauty",
      "price": 14.99,
      "discountPercentage": 9.84,
      "rating": 4.64,
      "stock": 89,
      "tags": [
        "beauty",
        "face powder"
      ],
      "brand": "Velvet Touch",
      "sku": "BEA-VEL-POW-003",
      "weight": 8,
      "dimensions": {
        "width": 29.27,
        "height": 27.93,
        "depth": 20.59
      },
      "warrantyInformation": "3 months warranty",
      "shippingInformation": "Ships in 1-2 business days",
      "availabilityStatus": "In Stock",
      "reviews": [
        {
          "rating": 4,
          "comment": "Would buy again!",
          "date": "2025-04-30T09:41:02.053Z",
          "reviewerName": "Alexander Jones",
          "reviewerEmail": "alexander.jones@x.dummyjson.com"
        },
        {
          "rating": 5,
          "comment": "Highly impressed!",
          "date": "2025-04-30T09:41:02.053Z",
          "reviewerName": "Elijah Cruz",
          "reviewerEmail": "elijah.cruz@x.dummyjson.com"
        },
        {
          "rating": 1,
          "comment": "Very dissatisfied!",
          "date": "2025-04-30T09:41:02.053Z",
          "reviewerName": "Avery Perez",
          "reviewerEmail": "avery.perez@x.dummyjson.com"
        }
      ],
      "returnPolicy": "No return policy",
      "minimumOrderQuantity": 22,
      "meta": {
        "createdAt": "2025-04-30T09:41:02.053Z",
        "updatedAt": "2025-04-30T09:41:02.053Z",
        "barcode": "8418883906837",
        "qrCode": "https://cdn.dummyjson.com/public/qr-code.png"
      },
      "images": [
        "https://cdn.dummyjson.com/product-images/beauty/powder-canister/1.webp"
      ],
      "thumbnail": "https://cdn.dummyjson.com/product-images/beauty/powder-canister/thumbnail.webp"
    },
    {
      "id": 4,
      "title": "Red Lipstick",
      "description": "The Red Lipstick is a classic and bold choice for adding a pop of color to your lips. With a creamy and pigmented formula, it provides a vibrant and long-lasting finish.",
      "category": "beauty",
      "price": 12.99,
      "discountPercentage": 12.16,
      "rating": 4.36,
      "stock": 91,
      "tags": [
        "beauty",
        "lipstick"
      ],
      "brand": "Chic Cosmetics",
      "sku": "BEA-CHI-LIP-004",
      "weight": 1,
      "dimensions": {
        "width": 18.11,
        "height": 28.38,
        "depth": 22.17
      },
      "warrantyInformation": "3 year warranty",
      "shippingInformation": "Ships in 1 week",
      "availabilityStatus": "In Stock",
      "reviews": [
        {
          "rating": 4,
          "comment": "Great product!",
          "date": "2025-04-30T09:41:02.053Z",
          "reviewerName": "Liam Garcia",
          "reviewerEmail": "liam.garcia@x.dummyjson.com"
        },
        {
          "rating": 5,
          "comment": "Great product!",
          "date": "2025-04-30T09:41:02.053Z",
          "reviewerName": "Ruby Andrews",
          "reviewerEmail": "ruby.andrews@x.dummyjson.com"
        },
        {
          "rating": 5,
          "comment": "Would buy again!",
          "date": "2025-04-30T09:41:02.053Z",
          "reviewerName": "Clara Berry",
          "reviewerEmail": "clara.berry@x.dummyjson.com"
        }
      ],
      "returnPolicy": "7 days return policy",
      "minimumOrderQuantity": 40,
      "meta": {
        "createdAt": "2025-04-30T09:41:02.053Z",
        "updatedAt": "2025-04-30T09:41:02.053Z",
        "barcode": "9467746727219",
        "qrCode": "https://cdn.dummyjson.com/public/qr-code.png"
      },
      "images": [
        "https://cdn.dummyjson.com/product-images/beauty/red-lipstick/1.webp"
      ],
      "thumbnail": "https://cdn.dummyjson.com/product-images/beauty/red-lipstick/thumbnail.webp"
    },
    {
      "id": 5,
      "title": "Red Nail Polish",
      "description": "The Red Nail Polish offers a rich and glossy red hue for vibrant and polished nails. With a quick-drying formula, it provides a salon-quality finish at home.",
      "category": "beauty",
      "price": 8.99,
      "discountPercentage": 11.44,
      "rating": 4.32,
      "stock": 79,
      "tags": [
        "beauty",
        "nail polish"
      ],
      "brand": "Nail Couture",
      "sku": "BEA-NAI-NAI-005",
      "weight": 8,
      "dimensions": {
        "width": 21.63,
        "height": 16.48,
        "depth": 29.84
      },
      "warrantyInformation": "1 month warranty",
      "shippingInformation": "Ships overnight",
      "availabilityStatus": "In Stock",
      "reviews": [
        {
          "rating": 2,
          "comment": "Poor quality!",
          "date": "2025-04-30T09:41:02.053Z",
          "reviewerName": "Benjamin Wilson",
          "reviewerEmail": "benjamin.wilson@x.dummyjson.com"
        },
        {
          "rating": 5,
          "comment": "Great product!",
          "date": "2025-04-30T09:41:02.053Z",
          "reviewerName": "Liam Smith",
          "reviewerEmail": "liam.smith@x.dummyjson.com"
        },
        {
          "rating": 1,
          "comment": "Very unhappy with my purchase!",
          "date": "2025-04-30T09:41:02.053Z",
          "reviewerName": "Clara Berry",
          "reviewerEmail": "clara.berry@x.dummyjson.com"
        }
      ],
      "returnPolicy": "No return policy",
      "minimumOrderQuantity": 22,
      "meta": {
        "createdAt": "2025-04-30T09:41:02.053Z",
        "updatedAt": "2025-04-30T09:41:02.053Z",
        "barcode": "4063010628104",
        "qrCode": "https://cdn.dummyjson.com/public/qr-code.png"
      },
      "images": [
        "https://cdn.dummyjson.com/product-images/beauty/red-nail-polish/1.webp"
      ],
      "thumbnail": "https://cdn.dummyjson.com/product-images/beauty/red-nail-polish/thumbnail.webp"
    },
    {
      "id": 6,
      "title": "Calvin Klein CK One",
      "description": "CK One by Calvin Klein is a classic unisex fragrance, known for its fresh and clean scent. It's a versatile fragrance suitable for everyday wear.",
      "category": "fragrances",
      "price": 49.99,
      "discountPercentage": 1.89,
      "rating": 4.37,
      "stock": 29,
      "tags": [
        "fragrances",
        "perfumes"
      ],
      "brand": "Calvin Klein",
      "sku": "FRA-CAL-CAL-006",
      "weight": 7,
      "dimensions": {
        "width": 29.36,
        "height": 27.76,
        "depth": 20.72
      },
      "warrantyInformation": "1 week warranty",
      "shippingInformation": "Ships overnight",
      "availabilityStatus": "In Stock",
      "reviews": [
        {
          "rating": 2,
          "comment": "Very disappointed!",
          "date": "2025-04-30T09:41:02.053Z",
          "reviewerName": "Layla Young",
          "reviewerEmail": "layla.young@x.dummyjson.com"
        },
        {
          "rating": 4,
          "comment": "Fast shipping!",
          "date": "2025-04-30T09:41:02.053Z",
          "reviewerName": "Daniel Cook",
          "reviewerEmail": "daniel.cook@x.dummyjson.com"
        },
        {
          "rating": 3,
          "comment": "Not as described!",
          "date": "2025-04-30T09:41:02.053Z",
          "reviewerName": "Jacob Cooper",
          "reviewerEmail": "jacob.cooper@x.dummyjson.com"
        }
      ],
      "returnPolicy": "90 days return policy",
      "minimumOrderQuantity": 9,
      "meta": {
        "createdAt": "2025-04-30T09:41:02.053Z",
        "updatedAt": "2025-04-30T09:41:02.053Z",
        "barcode": "2451534060749",
        "qrCode": "https://cdn.dummyjson.com/public/qr-code.png"
      },
      "images": [
        "https://cdn.dummyjson.com/product-images/fragrances/calvin-klein-ck-one/1.webp",
        "https://cdn.dummyjson.com/product-images/fragrances/calvin-klein-ck-one/2.webp",
        "https://cdn.dummyjson.com/product-images/fragrances/calvin-klein-ck-one/3.webp"
      ],
      "thumbnail": "https://cdn.dummyjson.com/product-images/fragrances/calvin-klein-ck-one/thumbnail.webp"
    },
    {
      "id": 7,
      "title": "Chanel Coco Noir Eau De",
      "description": "Coco Noir by Chanel is an elegant and mysterious fragrance, featuring notes of grapefruit, rose, and sandalwood. Perfect for evening occasions.",
      "category": "fragrances",
      "price": 129.99,
      "discountPercentage": 16.51,
      "rating": 4.26,
      "stock": 58,
      "tags": [
        "fragrances",
        "perfumes"
      ],
      "brand": "Chanel",
      "sku": "FRA-CHA-CHA-007",
      "weight": 7,
      "dimensions": {
        "width": 24.5,
        "height": 25.7,
        "depth": 25.98
      },
      "warrantyInformation": "3 year warranty",
      "shippingInformation": "Ships overnight",
      "availabilityStatus": "In Stock",
      "reviews": [
        {
          "rating": 4,
          "comment": "Highly impressed!",
          "date": "2025-04-30T09:41:02.053Z",
          "reviewerName": "Ruby Andrews",
          "reviewerEmail": "ruby.andrews@x.dummyjson.com"
        },
        {
          "rating": 5,
          "comment": "Awesome product!",
          "date": "2025-04-30T09:41:02.053Z",
          "reviewerName": "Leah Henderson",
          "reviewerEmail": "leah.henderson@x.dummyjson.com"
        },
        {
          "rating": 5,
          "comment": "Very happy with my purchase!",
          "date": "2025-04-30T09:41:02.053Z",
          "reviewerName": "Xavier Wright",
          "reviewerEmail": "xavier.wright@x.dummyjson.com"
        }
      ],
      "returnPolicy": "No return policy",
      "minimumOrderQuantity": 1,
      "meta": {
        "createdAt": "2025-04-30T09:41:02.053Z",
        "updatedAt": "2025-04-30T09:41:02.053Z",
        "barcode": "4091737746820",
        "qrCode": "https://cdn.dummyjson.com/public/qr-code.png"
      },
      "images": [
        "https://cdn.dummyjson.com/product-images/fragrances/chanel-coco-noir-eau-de/1.webp",
        "https://cdn.dummyjson.com/product-images/fragrances/chanel-coco-noir-eau-de/2.webp",
        "https://cdn.dummyjson.com/product-images/fragrances/chanel-coco-noir-eau-de/3.webp"
      ],
      "thumbnail": "https://cdn.dummyjson.com/product-images/fragrances/chanel-coco-noir-eau-de/thumbnail.webp"
    },
    {
      "id": 8,
      "title": "Dior J'adore",
      "description": "J'adore by Dior is a luxurious and floral fragrance, known for its blend of ylang-ylang, rose, and jasmine. It embodies femininity and sophistication.",
      "category": "fragrances",
      "price": 89.99,
      "discountPercentage": 14.72,
      "rating": 3.8,
      "stock": 98,
      "tags": [
        "fragrances",
        "perfumes"
      ],
      "brand": "Dior",
      "sku": "FRA-DIO-DIO-008",
      "weight": 4,
      "dimensions": {
        "width": 27.67,
        "height": 28.28,
        "depth": 11.83
      },
      "warrantyInformation": "1 week warranty",
      "shippingInformation": "Ships in 2 weeks",
      "availabilityStatus": "In Stock",
      "reviews": [
        {
          "rating": 5,
          "comment": "Great value for money!",
          "date": "2025-04-30T09:41:02.053Z",
          "reviewerName": "Nicholas Bailey",
          "reviewerEmail": "nicholas.bailey@x.dummyjson.com"
        },
        {
          "rating": 4,
          "comment": "Great value for money!",
          "date": "2025-04-30T09:41:02.053Z",
          "reviewerName": "Penelope Harper",
          "reviewerEmail": "penelope.harper@x.dummyjson.com"
        },
        {
          "rating": 4,
          "comment": "Great product!",
          "date": "2025-04-30T09:41:02.053Z",
          "reviewerName": "Emma Miller",
          "reviewerEmail": "emma.miller@x.dummyjson.com"
        }
      ],
      "returnPolicy": "7 days return policy",
      "minimumOrderQuantity": 10,
      "meta": {
        "createdAt": "2025-04-30T09:41:02.053Z",
        "updatedAt": "2025-04-30T09:41:02.053Z",
        "barcode": "1445086097250",
        "qrCode": "https://cdn.dummyjson.com/public/qr-code.png"
      },
      "images": [
        "https://cdn.dummyjson.com/product-images/fragrances/dior-j'adore/1.webp",
        "https://cdn.dummyjson.com/product-images/fragrances/dior-j'adore/2.webp",
        "https://cdn.dummyjson.com/product-images/fragrances/dior-j'adore/3.webp"
      ],
      "thumbnail": "https://cdn.dummyjson.com/product-images/fragrances/dior-j'adore/thumbnail.webp"
    },
    {
      "id": 9,
      "title": "Dolce Shine Eau de",
      "description": "Dolce Shine by Dolce & Gabbana is a vibrant and fruity fragrance, featuring notes of mango, jasmine, and blonde woods. It's a joyful and youthful scent.",
      "category": "fragrances",
      "price": 69.99,
      "discountPercentage": 0.62,
      "rating": 3.96,
      "stock": 4,
      "tags": [
        "fragrances",
        "perfumes"
      ],
      "brand": "Dolce & Gabbana",
      "sku": "FRA-DOL-DOL-009",
      "weight": 6,
      "dimensions": {
        "width": 27.28,
        "height": 29.88,
        "depth": 18.3
      },
      "warrantyInformation": "3 year warranty",
      "shippingInformation": "Ships in 1 month",
      "availabilityStatus": "Low Stock",
      "reviews": [
        {
          "rating": 4,
          "comment": "Would buy again!",
          "date": "2025-04-30T09:41:02.053Z",
          "reviewerName": "Mateo Bennett",
          "reviewerEmail": "mateo.bennett@x.dummyjson.com"
        },
        {
          "rating": 4,
          "comment": "Highly recommended!",
          "date": "2025-04-30T09:41:02.053Z",
          "reviewerName": "Nolan Gonzalez",
          "reviewerEmail": "nolan.gonzalez@x.dummyjson.com"
        },
        {
          "rating": 5,
          "comment": "Very happy with my purchase!",
          "date": "2025-04-30T09:41:02.053Z",
          "reviewerName": "Aurora Lawson",
          "reviewerEmail": "aurora.lawson@x.dummyjson.com"
        }
      ],
      "returnPolicy": "7 days return policy",
      "minimumOrderQuantity": 2,
      "meta": {
        "createdAt": "2025-04-30T09:41:02.053Z",
        "updatedAt": "2025-04-30T09:41:02.053Z",
        "barcode": "3023868210708",
        "qrCode": "https://cdn.dummyjson.com/public/qr-code.png"
      },
      "images": [
        "https://cdn.dummyjson.com/product-images/fragrances/dolce-shine-eau-de/1.webp",
        "https://cdn.dummyjson.com/product-images/fragrances/dolce-shine-eau-de/2.webp",
        "https://cdn.dummyjson.com/product-images/fragrances/dolce-shine-eau-de/3.webp"
      ],
      "thumbnail": "https://cdn.dummyjson.com/product-images/fragrances/dolce-shine-eau-de/thumbnail.webp"
    },
    {
      "id": 10,
      "title": "Gucci Bloom Eau de",
      "description": "Gucci Bloom by Gucci is a floral and captivating fragrance, with notes of tuberose, jasmine, and Rangoon creeper. It's a modern and romantic scent.",
      "category": "fragrances",
      "price": 79.99,
      "discountPercentage": 14.39,
      "rating": 2.74,
      "stock": 91,
      "tags": [
        "fragrances",
        "perfumes"
      ],
      "brand": "Gucci",
      "sku": "FRA-GUC-GUC-010",
      "weight": 7,
      "dimensions": {
        "width": 20.92,
        "height": 21.68,
        "depth": 11.2
      },
      "warrantyInformation": "6 months warranty",
      "shippingInformation": "Ships overnight",
      "availabilityStatus": "In Stock",
      "reviews": [
        {
          "rating": 1,
          "comment": "Very dissatisfied!",
          "date": "2025-04-30T09:41:02.053Z",
          "reviewerName": "Cameron Perez",
          "reviewerEmail": "cameron.perez@x.dummyjson.com"
        },
        {
          "rating": 5,
          "comment": "Very happy with my purchase!",
          "date": "2025-04-30T09:41:02.053Z",
          "reviewerName": "Daniel Cook",
          "reviewerEmail": "daniel.cook@x.dummyjson.com"
        },
        {
          "rating": 4,
          "comment": "Highly impressed!",
          "date": "2025-04-30T09:41:02.053Z",
          "reviewerName": "Addison Wright",
          "reviewerEmail": "addison.wright@x.dummyjson.com"
        }
      ],
      "returnPolicy": "No return policy",
      "minimumOrderQuantity": 2,
      "meta": {
        "createdAt": "2025-04-30T09:41:02.053Z",
        "updatedAt": "2025-04-30T09:41:02.053Z",
        "barcode": "3170832177880",
        "qrCode": "https://cdn.dummyjson.com/public/qr-code.png"
      },
      "images": [
        "https://cdn.dummyjson.com/product-images/fragrances/gucci-bloom-eau-de/1.webp",
        "https://cdn.dummyjson.com/product-images/fragrances/gucci-bloom-eau-de/2.webp",
        "https://cdn.dummyjson.com/product-images/fragrances/gucci-bloom-eau-de/3.webp"
      ],
      "thumbnail": "https://cdn.dummyjson.com/product-images/fragrances/gucci-bloom-eau-de/thumbnail.webp"
    },
    {
      "id": 11,
      "title": "Annibale Colombo Bed",
      "description": "The Annibale Colombo Bed is a luxurious and elegant bed frame, crafted with high-quality materials for a comfortable and stylish bedroom.",
      "category": "furniture",
      "price": 1899.99,
      "discountPercentage": 8.57,
      "rating": 4.77,
      "stock": 88,
      "tags": [
        "furniture",
        "beds"
      ],
      "brand": "Annibale Colombo",
      "sku": "FUR-ANN-ANN-011",
      "weight": 10,
      "dimensions": {
        "width": 28.16,
        "height": 25.36,
        "depth": 17.28
      },
      "warrantyInformation": "1 year warranty",
      "shippingInformation": "Ships in 1 month",
      "availabilityStatus": "In Stock",
      "reviews": [
        {
          "rating": 2,
          "comment": "Would not recommend!",
          "date": "2025-04-30T09:41:02.053Z",
          "reviewerName": "Christopher West",
          "reviewerEmail": "christopher.west@x.dummyjson.com"
        },
        {
          "rating": 4,
          "comment": "Highly impressed!",
          "date": "2025-04-30T09:41:02.053Z",
          "reviewerName": "Vivian Carter",
          "reviewerEmail": "vivian.carter@x.dummyjson.com"
        },
        {
          "rating": 1,
          "comment": "Poor quality!",
          "date": "2025-04-30T09:41:02.053Z",
          "reviewerName": "Mason Wright",
          "reviewerEmail": "mason.wright@x.dummyjson.com"
        }
      ],
      "returnPolicy": "No return policy",
      "minimumOrderQuantity": 1,
      "meta": {
        "createdAt": "2025-04-30T09:41:02.053Z",
        "updatedAt": "2025-04-30T09:41:02.053Z",
        "barcode": "3610757456581",
        "qrCode": "https://cdn.dummyjson.com/public/qr-code.png"
      },
      "images": [
        "https://cdn.dummyjson.com/product-images/furniture/annibale-colombo-bed/1.webp",
        "https://cdn.dummyjson.com/product-images/furniture/annibale-colombo-bed/2.webp",
        "https://cdn.dummyjson.com/product-images/furniture/annibale-colombo-bed/3.webp"
      ],
      "thumbnail": "https://cdn.dummyjson.com/product-images/furniture/annibale-colombo-bed/thumbnail.webp"
    },
    {
      "id": 12,
      "title": "Annibale Colombo Sofa",
      "description": "The Annibale Colombo Sofa is a sophisticated and comfortable seating option, featuring exquisite design and premium upholstery for your living room.",
      "category": "furniture",
      "price": 2499.99,
      "discountPercentage": 14.4,
      "rating": 3.92,
      "stock": 60,
      "tags": [
        "furniture",
        "sofas"
      ],
      "brand": "Annibale Colombo",
      "sku": "FUR-ANN-ANN-012",
      "weight": 6,
      "dimensions": {
        "width": 12.75,
        "height": 20.55,
        "depth": 19.06
      },
      "warrantyInformation": "Lifetime warranty",
      "shippingInformation": "Ships in 1 week",
      "availabilityStatus": "In Stock",
      "reviews": [
        {
          "rating": 3,
          "comment": "Very unhappy with my purchase!",
          "date": "2025-04-30T09:41:02.053Z",
          "reviewerName": "Christian Perez",
          "reviewerEmail": "christian.perez@x.dummyjson.com"
        },
        {
          "rating": 5,
          "comment": "Fast shipping!",
          "date": "2025-04-30T09:41:02.053Z",
          "reviewerName": "Lillian Bishop",
          "reviewerEmail": "lillian.bishop@x.dummyjson.com"
        },
        {
          "rating": 1,
          "comment": "Poor quality!",
          "date": "2025-04-30T09:41:02.053Z",
          "reviewerName": "Lillian Simmons",
          "reviewerEmail": "lillian.simmons@x.dummyjson.com"
        }
      ],
      "returnPolicy": "7 days return policy",
      "minimumOrderQuantity": 1,
      "meta": {
        "createdAt": "2025-04-30T09:41:02.053Z",
        "updatedAt": "2025-04-30T09:41:02.053Z",
        "barcode": "1777662847736",
        "qrCode": "https://cdn.dummyjson.com/public/qr-code.png"
      },
      "images": [
        "https://cdn.dummyjson.com/product-images/furniture/annibale-colombo-sofa/1.webp",
        "https://cdn.dummyjson.com/product-images/furniture/annibale-colombo-sofa/2.webp",
        "https://cdn.dummyjson.com/product-images/furniture/annibale-colombo-sofa/3.webp"
      ],
      "thumbnail": "https://cdn.dummyjson.com/product-images/furniture/annibale-colombo-sofa/thumbnail.webp"
    },
    {
      "id": 13,
      "title": "Bedside Table African Cherry",
      "description": "The Bedside Table in African Cherry is a stylish and functional addition to your bedroom, providing convenient storage space and a touch of elegance.",
      "category": "furniture",
      "price": 299.99,
      "discountPercentage": 19.09,
      "rating": 2.87,
      "stock": 64,
      "tags": [
        "furniture",
        "bedside tables"
      ],
      "brand": "Furniture Co.",
      "sku": "FUR-FUR-BED-013",
      "weight": 2,
      "dimensions": {
        "width": 13.47,
        "height": 24.99,
        "depth": 27.35
      },
      "warrantyInformation": "5 year warranty",
      "shippingInformation": "Ships overnight",
      "availabilityStatus": "In Stock",
      "reviews": [
        {
          "rating": 4,
          "comment": "Excellent quality!",
          "date": "2025-04-30T09:41:02.053Z",
          "reviewerName": "Aaliyah Hanson",
          "reviewerEmail": "aaliyah.hanson@x.dummyjson.com"
        },
        {
          "rating": 4,
          "comment": "Excellent quality!",
          "date": "2025-04-30T09:41:02.053Z",
          "reviewerName": "Liam Smith",
          "reviewerEmail": "liam.smith@x.dummyjson.com"
        },
        {
          "rating": 4,
          "comment": "Highly recommended!",
          "date": "2025-04-30T09:41:02.053Z",
          "reviewerName": "Avery Barnes",
          "reviewerEmail": "avery.barnes@x.dummyjson.com"
        }
      ],
      "returnPolicy": "7 days return policy",
      "minimumOrderQuantity": 3,
      "meta": {
        "createdAt": "2025-04-30T09:41:02.053Z",
        "updatedAt": "2025-04-30T09:41:02.053Z",
        "barcode": "6441287925979",
        "qrCode": "https://cdn.dummyjson.com/public/qr-code.png"
      },
      "images": [
        "https://cdn.dummyjson.com/product-images/furniture/bedside-table-african-cherry/1.webp",
        "https://cdn.dummyjson.com/product-images/furniture/bedside-table-african-cherry/2.webp",
        "https://cdn.dummyjson.com/product-images/furniture/bedside-table-african-cherry/3.webp"
      ],
      "thumbnail": "https://cdn.dummyjson.com/product-images/furniture/bedside-table-african-cherry/thumbnail.webp"
    },
    {
      "id": 14,
      "title": "Executive Conference Chair",
      "description": "The Knoll Saarinen Executive Conference Chair is a modern and ergonomic chair, perfect for your office or conference room with its timeless design.",
      "category": "furniture",
      "price": 499.99,
      "discountPercentage": 2.01,
      "rating": 4.88,
      "stock": 26,
      "tags": [
        "furniture",
        "office chairs"
      ],
      "brand": "Knoll",
      "sku": "FUR-KNO-KNO-014",
      "weight": 10,
      "dimensions": {
        "width": 13.81,
        "height": 7.5,
        "depth": 5.62
      },
      "warrantyInformation": "2 year warranty",
      "shippingInformation": "Ships overnight",
      "availabilityStatus": "In Stock",
      "reviews": [
        {
          "rating": 2,
          "comment": "Waste of money!",
          "date": "2025-04-30T09:41:02.053Z",
          "reviewerName": "Ella Cook",
          "reviewerEmail": "ella.cook@x.dummyjson.com"
        },
        {
          "rating": 2,
          "comment": "Very dissatisfied!",
          "date": "2025-04-30T09:41:02.053Z",
          "reviewerName": "Clara Berry",
          "reviewerEmail": "clara.berry@x.dummyjson.com"
        },
        {
          "rating": 5,
          "comment": "Would buy again!",
          "date": "2025-04-30T09:41:02.053Z",
          "reviewerName": "Elena Long",
          "reviewerEmail": "elena.long@x.dummyjson.com"
        }
      ],
      "returnPolicy": "60 days return policy",
      "minimumOrderQuantity": 5,
      "meta": {
        "createdAt": "2025-04-30T09:41:02.053Z",
        "updatedAt": "2025-04-30T09:41:02.053Z",
        "barcode": "8919386859966",
        "qrCode": "https://cdn.dummyjson.com/public/qr-code.png"
      },
      "images": [
        "https://cdn.dummyjson.com/product-images/furniture/knoll-saarinen-executive-conference-chair/1.webp",
        "https://cdn.dummyjson.com/product-images/furniture/knoll-saarinen-executive-conference-chair/2.webp",
        "https://cdn.dummyjson.com/product-images/furniture/knoll-saarinen-executive-conference-chair/3.webp"
      ],
      "thumbnail": "https://cdn.dummyjson.com/product-images/furniture/knoll-saarinen-executive-conference-chair/thumbnail.webp"
    },
    {
      "id": 15,
      "title": "Bathroom Sink With Mirror",
      "description": "The Wooden Bathroom Sink with Mirror is a unique and stylish addition to your bathroom, featuring a wooden sink countertop and a matching mirror.",
      "category": "furniture",
      "price": 799.99,
      "discountPercentage": 8.8,
      "rating": 3.59,
      "stock": 7,
      "tags": [
        "furniture",
        "bathroom"
      ],
      "brand": "Bath Trends",
      "sku": "FUR-BAT-WOO-015",
      "weight": 10,
      "dimensions": {
        "width": 7.98,
        "height": 8.88,
        "depth": 28.46
      },
      "warrantyInformation": "3 year warranty",
      "shippingInformation": "Ships in 3-5 business days",
      "availabilityStatus": "Low Stock",
      "reviews": [
        {
          "rating": 4,
          "comment": "Fast shipping!",
          "date": "2025-04-30T09:41:02.053Z",
          "reviewerName": "Logan Torres",
          "reviewerEmail": "logan.torres@x.dummyjson.com"
        },
        {
          "rating": 5,
          "comment": "Very pleased!",
          "date": "2025-04-30T09:41:02.053Z",
          "reviewerName": "Aria Parker",
          "reviewerEmail": "aria.parker@x.dummyjson.com"
        },
        {
          "rating": 3,
          "comment": "Poor quality!",
          "date": "2025-04-30T09:41:02.053Z",
          "reviewerName": "Dylan Wells",
          "reviewerEmail": "dylan.wells@x.dummyjson.com"
        }
      ],
      "returnPolicy": "60 days return policy",
      "minimumOrderQuantity": 2,
      "meta": {
        "createdAt": "2025-04-30T09:41:02.053Z",
        "updatedAt": "2025-04-30T09:41:02.053Z",
        "barcode": "1958104402873",
        "qrCode": "https://cdn.dummyjson.com/public/qr-code.png"
      },
      "images": [
        "https://cdn.dummyjson.com/product-images/furniture/wooden-bathroom-sink-with-mirror/1.webp",
        "https://cdn.dummyjson.com/product-images/furniture/wooden-bathroom-sink-with-mirror/2.webp",
        "https://cdn.dummyjson.com/product-images/furniture/wooden-bathroom-sink-with-mirror/3.webp"
      ],
      "thumbnail": "https://cdn.dummyjson.com/product-images/furniture/wooden-bathroom-sink-with-mirror/thumbnail.webp"
    },
    {
      "id": 16,
      "title": "Apple",
      "description": "Fresh and crisp apples, perfect for snacking or incorporating into various recipes.",
      "category": "groceries",
      "price": 1.99,
      "discountPercentage": 12.62,
      "rating": 4.19,
      "stock": 8,
      "tags": [
        "fruits"
      ],
      "sku": "GRO-BRD-APP-016",
      "weight": 9,
      "dimensions": {
        "width": 13.66,
        "height": 11.01,
        "depth": 9.73
      },
      "warrantyInformation": "3 year warranty",
      "shippingInformation": "Ships in 2 weeks",
      "availabilityStatus": "In Stock",
      "reviews": [
        {
          "rating": 5,
          "comment": "Very satisfied!",
          "date": "2025-04-30T09:41:02.053Z",
          "reviewerName": "Sophia Brown",
          "reviewerEmail": "sophia.brown@x.dummyjson.com"
        },
        {
          "rating": 1,
          "comment": "Very dissatisfied!",
          "date": "2025-04-30T09:41:02.053Z",
          "reviewerName": "Scarlett Bowman",
          "reviewerEmail": "scarlett.bowman@x.dummyjson.com"
        },
        {
          "rating": 3,
          "comment": "Very unhappy with my purchase!",
          "date": "2025-04-30T09:41:02.053Z",
          "reviewerName": "William Gonzalez",
          "reviewerEmail": "william.gonzalez@x.dummyjson.com"
        }
      ],
      "returnPolicy": "90 days return policy",
      "minimumOrderQuantity": 7,
      "meta": {
        "createdAt": "2025-04-30T09:41:02.053Z",
        "updatedAt": "2025-04-30T09:41:02.053Z",
        "barcode": "7962803553314",
        "qrCode": "https://cdn.dummyjson.com/public/qr-code.png"
      },
      "images": [
        "https://cdn.dummyjson.com/product-images/groceries/apple/1.webp"
      ],
      "thumbnail": "https://cdn.dummyjson.com/product-images/groceries/apple/thumbnail.webp"
    },
    {
      "id": 17,
      "title": "Beef Steak",
      "description": "High-quality beef steak, great for grilling or cooking to your preferred level of doneness.",
      "category": "groceries",
      "price": 12.99,
      "discountPercentage": 9.61,
      "rating": 4.47,
      "stock": 86,
      "tags": [
        "meat"
      ],
      "sku": "GRO-BRD-BEE-017",
      "weight": 10,
      "dimensions": {
        "width": 18.9,
        "height": 5.77,
        "depth": 18.57
      },
      "warrantyInformation": "3 year warranty",
      "shippingInformation": "Ships overnight",
      "availabilityStatus": "In Stock",
      "reviews": [
        {
          "rating": 3,
          "comment": "Would not recommend!",
          "date": "2025-04-30T09:41:02.053Z",
          "reviewerName": "Eleanor Tyler",
          "reviewerEmail": "eleanor.tyler@x.dummyjson.com"
        },
        {
          "rating": 4,
          "comment": "Fast shipping!",
          "date": "2025-04-30T09:41:02.053Z",
          "reviewerName": "Alexander Jones",
          "reviewerEmail": "alexander.jones@x.dummyjson.com"
        },
        {
          "rating": 5,
          "comment": "Great value for money!",
          "date": "2025-04-30T09:41:02.053Z",
          "reviewerName": "Natalie Harris",
          "reviewerEmail": "natalie.harris@x.dummyjson.com"
        }
      ],
      "returnPolicy": "60 days return policy",
      "minimumOrderQuantity": 43,
      "meta": {
        "createdAt": "2025-04-30T09:41:02.053Z",
        "updatedAt": "2025-04-30T09:41:02.053Z",
        "barcode": "5640063409695",
        "qrCode": "https://cdn.dummyjson.com/public/qr-code.png"
      },
      "images": [
        "https://cdn.dummyjson.com/product-images/groceries/beef-steak/1.webp"
      ],
      "thumbnail": "https://cdn.dummyjson.com/product-images/groceries/beef-steak/thumbnail.webp"
    },
    {
      "id": 18,
      "title": "Cat Food",
      "description": "Nutritious cat food formulated to meet the dietary needs of your feline friend.",
      "category": "groceries",
      "price": 8.99,
      "discountPercentage": 9.58,
      "rating": 3.13,
      "stock": 46,
      "tags": [
        "pet supplies",
        "cat food"
      ],
      "sku": "GRO-BRD-FOO-018",
      "weight": 10,
      "dimensions": {
        "width": 18.08,
        "height": 9.26,
        "depth": 21.86
      },
      "warrantyInformation": "1 year warranty",
      "shippingInformation": "Ships overnight",
      "availabilityStatus": "In Stock",
      "reviews": [
        {
          "rating": 3,
          "comment": "Would not recommend!",
          "date": "2025-04-30T09:41:02.053Z",
          "reviewerName": "Noah Lewis",
          "reviewerEmail": "noah.lewis@x.dummyjson.com"
        },
        {
          "rating": 3,
          "comment": "Very unhappy with my purchase!",
          "date": "2025-04-30T09:41:02.053Z",
          "reviewerName": "Ruby Andrews",
          "reviewerEmail": "ruby.andrews@x.dummyjson.com"
        },
        {
          "rating": 2,
          "comment": "Very disappointed!",
          "date": "2025-04-30T09:41:02.053Z",
          "reviewerName": "Ethan Thompson",
          "reviewerEmail": "ethan.thompson@x.dummyjson.com"
        }
      ],
      "returnPolicy": "No return policy",
      "minimumOrderQuantity": 18,
      "meta": {
        "createdAt": "2025-04-30T09:41:02.053Z",
        "updatedAt": "2025-04-30T09:41:02.053Z",
        "barcode": "1483991328610",
        "qrCode": "https://cdn.dummyjson.com/public/qr-code.png"
      },
      "images": [
        "https://cdn.dummyjson.com/product-images/groceries/cat-food/1.webp"
      ],
      "thumbnail": "https://cdn.dummyjson.com/product-images/groceries/cat-food/thumbnail.webp"
    },
    {
      "id": 19,
      "title": "Chicken Meat",
      "description": "Fresh and tender chicken meat, suitable for various culinary preparations.",
      "category": "groceries",
      "price": 9.99,
      "discountPercentage": 13.7,
      "rating": 3.19,
      "stock": 97,
      "tags": [
        "meat"
      ],
      "sku": "GRO-BRD-CHI-019",
      "weight": 1,
      "dimensions": {
        "width": 11.03,
        "height": 22.11,
        "depth": 16.01
      },
      "warrantyInformation": "1 year warranty",
      "shippingInformation": "Ships in 1 month",
      "availabilityStatus": "In Stock",
      "reviews": [
        {
          "rating": 5,
          "comment": "Great product!",
          "date": "2025-04-30T09:41:02.053Z",
          "reviewerName": "Mateo Bennett",
          "reviewerEmail": "mateo.bennett@x.dummyjson.com"
        },
        {
          "rating": 4,
          "comment": "Highly recommended!",
          "date": "2025-04-30T09:41:02.053Z",
          "reviewerName": "Jackson Evans",
          "reviewerEmail": "jackson.evans@x.dummyjson.com"
        },
        {
          "rating": 3,
          "comment": "Not worth the price!",
          "date": "2025-04-30T09:41:02.053Z",
          "reviewerName": "Sadie Morales",
          "reviewerEmail": "sadie.morales@x.dummyjson.com"
        }
      ],
      "returnPolicy": "7 days return policy",
      "minimumOrderQuantity": 22,
      "meta": {
        "createdAt": "2025-04-30T09:41:02.053Z",
        "updatedAt": "2025-04-30T09:41:02.053Z",
        "barcode": "8829514594521",
        "qrCode": "https://cdn.dummyjson.com/public/qr-code.png"
      },
      "images": [
        "https://cdn.dummyjson.com/product-images/groceries/chicken-meat/1.webp",
        "https://cdn.dummyjson.com/product-images/groceries/chicken-meat/2.webp"
      ],
      "thumbnail": "https://cdn.dummyjson.com/product-images/groceries/chicken-meat/thumbnail.webp"
    },
    {
      "id": 20,
      "title": "Cooking Oil",
      "description": "Versatile cooking oil suitable for frying, sautéing, and various culinary applications.",
      "category": "groceries",
      "price": 4.99,
      "discountPercentage": 9.33,
      "rating": 4.8,
      "stock": 10,
      "tags": [
        "cooking essentials"
      ],
      "sku": "GRO-BRD-COO-020",
      "weight": 5,
      "dimensions": {
        "width": 19.95,
        "height": 27.54,
        "depth": 24.86
      },
      "warrantyInformation": "Lifetime warranty",
      "shippingInformation": "Ships in 1-2 business days",
      "availabilityStatus": "In Stock",
      "reviews": [
        {
          "rating": 5,
          "comment": "Very happy with my purchase!",
          "date": "2025-04-30T09:41:02.053Z",
          "reviewerName": "Victoria McDonald",
          "reviewerEmail": "victoria.mcdonald@x.dummyjson.com"
        },
        {
          "rating": 2,
          "comment": "Would not recommend!",
          "date": "2025-04-30T09:41:02.053Z",
          "reviewerName": "Hazel Evans",
          "reviewerEmail": "hazel.evans@x.dummyjson.com"
        },
        {
          "rating": 5,
          "comment": "Would buy again!",
          "date": "2025-04-30T09:41:02.053Z",
          "reviewerName": "Zoe Bennett",
          "reviewerEmail": "zoe.bennett@x.dummyjson.com"
        }
      ],
      "returnPolicy": "30 days return policy",
      "minimumOrderQuantity": 46,
      "meta": {
        "createdAt": "2025-04-30T09:41:02.053Z",
        "updatedAt": "2025-04-30T09:41:02.053Z",
        "barcode": "4874727824518",
        "qrCode": "https://cdn.dummyjson.com/public/qr-code.png"
      },
      "images": [
        "https://cdn.dummyjson.com/product-images/groceries/cooking-oil/1.webp"
      ],
      "thumbnail": "https://cdn.dummyjson.com/product-images/groceries/cooking-oil/thumbnail.webp"
    },
    {
      "id": 21,
      "title": "Cucumber",
      "description": "Crisp and hydrating cucumbers, ideal for salads, snacks, or as a refreshing side.",
      "category": "groceries",
      "price": 1.49,
      "discountPercentage": 0.16,
      "rating": 4.07,
      "stock": 84,
      "tags": [
        "vegetables"
      ],
      "sku": "GRO-BRD-CUC-021",
      "weight": 4,
      "dimensions": {
        "width": 12.8,
        "height": 28.38,
        "depth": 21.34
      },
      "warrantyInformation": "2 year warranty",
      "shippingInformation": "Ships in 1-2 business days",
      "availabilityStatus": "In Stock",
      "reviews": [
        {
          "rating": 4,
          "comment": "Great product!",
          "date": "2025-04-30T09:41:02.053Z",
          "reviewerName": "Lincoln Kelly",
          "reviewerEmail": "lincoln.kelly@x.dummyjson.com"
        },
        {
          "rating": 4,
          "comment": "Great value for money!",
          "date": "2025-04-30T09:41:02.053Z",
          "reviewerName": "Savannah Gomez",
          "reviewerEmail": "savannah.gomez@x.dummyjson.com"
        },
        {
          "rating": 2,
          "comment": "Poor quality!",
          "date": "2025-04-30T09:41:02.053Z",
          "reviewerName": "James Davis",
          "reviewerEmail": "james.davis@x.dummyjson.com"
        }
      ],
      "returnPolicy": "7 days return policy",
      "minimumOrderQuantity": 2,
      "meta": {
        "createdAt": "2025-04-30T09:41:02.053Z",
        "updatedAt": "2025-04-30T09:41:02.053Z",
        "barcode": "5300066378225",
        "qrCode": "https://cdn.dummyjson.com/public/qr-code.png"
      },
      "images": [
        "https://cdn.dummyjson.com/product-images/groceries/cucumber/1.webp"
      ],
      "thumbnail": "https://cdn.dummyjson.com/product-images/groceries/cucumber/thumbnail.webp"
    },
    {
      "id": 22,
      "title": "Dog Food",
      "description": "Specially formulated dog food designed to provide essential nutrients for your canine companion.",
      "category": "groceries",
      "price": 10.99,
      "discountPercentage": 10.27,
      "rating": 4.55,
      "stock": 71,
      "tags": [
        "pet supplies",
        "dog food"
      ],
      "sku": "GRO-BRD-FOO-022",
      "weight": 10,
      "dimensions": {
        "width": 16.93,
        "height": 27.15,
        "depth": 9.29
      },
      "warrantyInformation": "No warranty",
      "shippingInformation": "Ships in 1-2 business days",
      "availabilityStatus": "In Stock",
      "reviews": [
        {
          "rating": 5,
          "comment": "Excellent quality!",
          "date": "2025-04-30T09:41:02.053Z",
          "reviewerName": "Nicholas Edwards",
          "reviewerEmail": "nicholas.edwards@x.dummyjson.com"
        },
        {
          "rating": 5,
          "comment": "Awesome product!",
          "date": "2025-04-30T09:41:02.053Z",
          "reviewerName": "Zachary Lee",
          "reviewerEmail": "zachary.lee@x.dummyjson.com"
        },
        {
          "rating": 4,
          "comment": "Great product!",
          "date": "2025-04-30T09:41:02.053Z",
          "reviewerName": "Nova Cooper",
          "reviewerEmail": "nova.cooper@x.dummyjson.com"
        }
      ],
      "returnPolicy": "60 days return policy",
      "minimumOrderQuantity": 43,
      "meta": {
        "createdAt": "2025-04-30T09:41:02.053Z",
        "updatedAt": "2025-04-30T09:41:02.053Z",
        "barcode": "5906686116469",
        "qrCode": "https://cdn.dummyjson.com/public/qr-code.png"
      },
      "images": [
        "https://cdn.dummyjson.com/product-images/groceries/dog-food/1.webp"
      ],
      "thumbnail": "https://cdn.dummyjson.com/product-images/groceries/dog-food/thumbnail.webp"
    },
    {
      "id": 23,
      "title": "Eggs",
      "description": "Fresh eggs, a versatile ingredient for baking, cooking, or breakfast.",
      "category": "groceries",
      "price": 2.99,
      "discountPercentage": 11.05,
      "rating": 2.53,
      "stock": 9,
      "tags": [
        "dairy"
      ],
      "sku": "GRO-BRD-EGG-023",
      "weight": 2,
      "dimensions": {
        "width": 11.42,
        "height": 7.44,
        "depth": 16.95
      },
      "warrantyInformation": "1 week warranty",
      "shippingInformation": "Ships in 1 week",
      "availabilityStatus": "In Stock",
      "reviews": [
        {
          "rating": 3,
          "comment": "Disappointing product!",
          "date": "2025-04-30T09:41:02.053Z",
          "reviewerName": "Penelope King",
          "reviewerEmail": "penelope.king@x.dummyjson.com"
        },
        {
          "rating": 3,
          "comment": "Poor quality!",
          "date": "2025-04-30T09:41:02.053Z",
          "reviewerName": "Eleanor Tyler",
          "reviewerEmail": "eleanor.tyler@x.dummyjson.com"
        },
        {
          "rating": 4,
          "comment": "Very pleased!",
          "date": "2025-04-30T09:41:02.053Z",
          "reviewerName": "Benjamin Foster",
          "reviewerEmail": "benjamin.foster@x.dummyjson.com"
        }
      ],
      "returnPolicy": "No return policy",
      "minimumOrderQuantity": 32,
      "meta": {
        "createdAt": "2025-04-30T09:41:02.053Z",
        "updatedAt": "2025-04-30T09:41:02.053Z",
        "barcode": "3478638588469",
        "qrCode": "https://cdn.dummyjson.com/public/qr-code.png"
      },
      "images": [
        "https://cdn.dummyjson.com/product-images/groceries/eggs/1.webp"
      ],
      "thumbnail": "https://cdn.dummyjson.com/product-images/groceries/eggs/thumbnail.webp"
    },
    {
      "id": 24,
      "title": "Fish Steak",
      "description": "Quality fish steak, suitable for grilling, baking, or pan-searing.",
      "category": "groceries",
      "price": 14.99,
      "discountPercentage": 4.23,
      "rating": 3.78,
      "stock": 74,
      "tags": [
        "seafood"
      ],
      "sku": "GRO-BRD-FIS-024",
      "weight": 6,
      "dimensions": {
        "width": 14.95,
        "height": 26.31,
        "depth": 11.27
      },
      "warrantyInformation": "1 month warranty",
      "shippingInformation": "Ships in 3-5 business days",
      "availabilityStatus": "In Stock",
      "reviews": [
        {
          "rating": 2,
          "comment": "Would not buy again!",
          "date": "2025-04-30T09:41:02.053Z",
          "reviewerName": "Caleb Perkins",
          "reviewerEmail": "caleb.perkins@x.dummyjson.com"
        },
        {
          "rating": 5,
          "comment": "Excellent quality!",
          "date": "2025-04-30T09:41:02.053Z",
          "reviewerName": "Isabella Jackson",
          "reviewerEmail": "isabella.jackson@x.dummyjson.com"
        },
        {
          "rating": 4,
          "comment": "Great value for money!",
          "date": "2025-04-30T09:41:02.053Z",
          "reviewerName": "Nathan Dixon",
          "reviewerEmail": "nathan.dixon@x.dummyjson.com"
        }
      ],
      "returnPolicy": "60 days return policy",
      "minimumOrderQuantity": 50,
      "meta": {
        "createdAt": "2025-04-30T09:41:02.053Z",
        "updatedAt": "2025-04-30T09:41:02.053Z",
        "barcode": "9595036192098",
        "qrCode": "https://cdn.dummyjson.com/public/qr-code.png"
      },
      "images": [
        "https://cdn.dummyjson.com/product-images/groceries/fish-steak/1.webp"
      ],
      "thumbnail": "https://cdn.dummyjson.com/product-images/groceries/fish-steak/thumbnail.webp"
    },
    {
      "id": 25,
      "title": "Green Bell Pepper",
      "description": "Fresh and vibrant green bell pepper, perfect for adding color and flavor to your dishes.",
      "category": "groceries",
      "price": 1.29,
      "discountPercentage": 0.16,
      "rating": 3.25,
      "stock": 33,
      "tags": [
        "vegetables"
      ],
      "sku": "GRO-BRD-GRE-025",
      "weight": 2,
      "dimensions": {
        "width": 15.33,
        "height": 26.65,
        "depth": 14.44
      },
      "warrantyInformation": "1 month warranty",
      "shippingInformation": "Ships in 1 week",
      "availabilityStatus": "In Stock",
      "reviews": [
        {
          "rating": 4,
          "comment": "Highly recommended!",
          "date": "2025-04-30T09:41:02.053Z",
          "reviewerName": "Avery Carter",
          "reviewerEmail": "avery.carter@x.dummyjson.com"
        },
        {
          "rating": 3,
          "comment": "Would not recommend!",
          "date": "2025-04-30T09:41:02.053Z",
          "reviewerName": "Henry Hill",
          "reviewerEmail": "henry.hill@x.dummyjson.com"
        },
        {
          "rating": 5,
          "comment": "Excellent quality!",
          "date": "2025-04-30T09:41:02.053Z",
          "reviewerName": "Addison Wright",
          "reviewerEmail": "addison.wright@x.dummyjson.com"
        }
      ],
      "returnPolicy": "30 days return policy",
      "minimumOrderQuantity": 12,
      "meta": {
        "createdAt": "2025-04-30T09:41:02.053Z",
        "updatedAt": "2025-04-30T09:41:02.053Z",
        "barcode": "2365227493323",
        "qrCode": "https://cdn.dummyjson.com/public/qr-code.png"
      },
      "images": [
        "https://cdn.dummyjson.com/product-images/groceries/green-bell-pepper/1.webp"
      ],
      "thumbnail": "https://cdn.dummyjson.com/product-images/groceries/green-bell-pepper/thumbnail.webp"
    },
    {
      "id": 26,
      "title": "Green Chili Pepper",
      "description": "Spicy green chili pepper, ideal for adding heat to your favorite recipes.",
      "category": "groceries",
      "price": 0.99,
      "discountPercentage": 1,
      "rating": 3.66,
      "stock": 3,
      "tags": [
        "vegetables"
      ],
      "sku": "GRO-BRD-GRE-026",
      "weight": 7,
      "dimensions": {
        "width": 15.38,
        "height": 18.12,
        "depth": 19.92
      },
      "warrantyInformation": "2 year warranty",
      "shippingInformation": "Ships in 1 week",
      "availabilityStatus": "Low Stock",
      "reviews": [
        {
          "rating": 4,
          "comment": "Great product!",
          "date": "2025-04-30T09:41:02.053Z",
          "reviewerName": "Luna Russell",
          "reviewerEmail": "luna.russell@x.dummyjson.com"
        },
        {
          "rating": 1,
          "comment": "Waste of money!",
          "date": "2025-04-30T09:41:02.053Z",
          "reviewerName": "Noah Lewis",
          "reviewerEmail": "noah.lewis@x.dummyjson.com"
        },
        {
          "rating": 3,
          "comment": "Very disappointed!",
          "date": "2025-04-30T09:41:02.053Z",
          "reviewerName": "Clara Berry",
          "reviewerEmail": "clara.berry@x.dummyjson.com"
        }
      ],
      "returnPolicy": "30 days return policy",
      "minimumOrderQuantity": 39,
      "meta": {
        "createdAt": "2025-04-30T09:41:02.053Z",
        "updatedAt": "2025-04-30T09:41:02.053Z",
        "barcode": "9335000538563",
        "qrCode": "https://cdn.dummyjson.com/public/qr-code.png"
      },
      "images": [
        "https://cdn.dummyjson.com/product-images/groceries/green-chili-pepper/1.webp"
      ],
      "thumbnail": "https://cdn.dummyjson.com/product-images/groceries/green-chili-pepper/thumbnail.webp"
    },
    {
      "id": 27,
      "title": "Honey Jar",
      "description": "Pure and natural honey in a convenient jar, perfect for sweetening beverages or drizzling over food.",
      "category": "groceries",
      "price": 6.99,
      "discountPercentage": 14.4,
      "rating": 3.97,
      "stock": 34,
      "tags": [
        "condiments"
      ],
      "sku": "GRO-BRD-HON-027",
      "weight": 2,
      "dimensions": {
        "width": 9.28,
        "height": 21.72,
        "depth": 17.74
      },
      "warrantyInformation": "1 month warranty",
      "shippingInformation": "Ships in 1-2 business days",
      "availabilityStatus": "In Stock",
      "reviews": [
        {
          "rating": 1,
          "comment": "Very disappointed!",
          "date": "2025-04-30T09:41:02.053Z",
          "reviewerName": "Autumn Gomez",
          "reviewerEmail": "autumn.gomez@x.dummyjson.com"
        },
        {
          "rating": 4,
          "comment": "Highly impressed!",
          "date": "2025-04-30T09:41:02.053Z",
          "reviewerName": "Benjamin Wilson",
          "reviewerEmail": "benjamin.wilson@x.dummyjson.com"
        },
        {
          "rating": 2,
          "comment": "Very disappointed!",
          "date": "2025-04-30T09:41:02.053Z",
          "reviewerName": "Nicholas Edwards",
          "reviewerEmail": "nicholas.edwards@x.dummyjson.com"
        }
      ],
      "returnPolicy": "90 days return policy",
      "minimumOrderQuantity": 47,
      "meta": {
        "createdAt": "2025-04-30T09:41:02.053Z",
        "updatedAt": "2025-04-30T09:41:02.053Z",
        "barcode": "6354306346329",
        "qrCode": "https://cdn.dummyjson.com/public/qr-code.png"
      },
      "images": [
        "https://cdn.dummyjson.com/product-images/groceries/honey-jar/1.webp"
      ],
      "thumbnail": "https://cdn.dummyjson.com/product-images/groceries/honey-jar/thumbnail.webp"
    },
    {
      "id": 28,
      "title": "Ice Cream",
      "description": "Creamy and delicious ice cream, available in various flavors for a delightful treat.",
      "category": "groceries",
      "price": 5.49,
      "discountPercentage": 8.69,
      "rating": 3.39,
      "stock": 27,
      "tags": [
        "desserts"
      ],
      "sku": "GRO-BRD-CRE-028",
      "weight": 1,
      "dimensions": {
        "width": 14.83,
        "height": 15.07,
        "depth": 24.2
      },
      "warrantyInformation": "1 month warranty",
      "shippingInformation": "Ships in 2 weeks",
      "availabilityStatus": "In Stock",
      "reviews": [
        {
          "rating": 5,
          "comment": "Very pleased!",
          "date": "2025-04-30T09:41:02.053Z",
          "reviewerName": "Elijah Cruz",
          "reviewerEmail": "elijah.cruz@x.dummyjson.com"
        },
        {
          "rating": 4,
          "comment": "Excellent quality!",
          "date": "2025-04-30T09:41:02.053Z",
          "reviewerName": "Jace Smith",
          "reviewerEmail": "jace.smith@x.dummyjson.com"
        },
        {
          "rating": 5,
          "comment": "Highly impressed!",
          "date": "2025-04-30T09:41:02.053Z",
          "reviewerName": "Sadie Morales",
          "reviewerEmail": "sadie.morales@x.dummyjson.com"
        }
      ],
      "returnPolicy": "No return policy",
      "minimumOrderQuantity": 42,
      "meta": {
        "createdAt": "2025-04-30T09:41:02.053Z",
        "updatedAt": "2025-04-30T09:41:02.053Z",
        "barcode": "0788954559076",
        "qrCode": "https://cdn.dummyjson.com/public/qr-code.png"
      },
      "images": [
        "https://cdn.dummyjson.com/product-images/groceries/ice-cream/1.webp",
        "https://cdn.dummyjson.com/product-images/groceries/ice-cream/2.webp",
        "https://cdn.dummyjson.com/product-images/groceries/ice-cream/3.webp",
        "https://cdn.dummyjson.com/product-images/groceries/ice-cream/4.webp"
      ],
      "thumbnail": "https://cdn.dummyjson.com/product-images/groceries/ice-cream/thumbnail.webp"
    },
    {
      "id": 29,
      "title": "Juice",
      "description": "Refreshing fruit juice, packed with vitamins and great for staying hydrated.",
      "category": "groceries",
      "price": 3.99,
      "discountPercentage": 12.06,
      "rating": 3.94,
      "stock": 50,
      "tags": [
        "beverages"
      ],
      "sku": "GRO-BRD-JUI-029",
      "weight": 1,
      "dimensions": {
        "width": 18.56,
        "height": 21.46,
        "depth": 28.02
      },
      "warrantyInformation": "6 months warranty",
      "shippingInformation": "Ships in 1 week",
      "availabilityStatus": "In Stock",
      "reviews": [
        {
          "rating": 5,
          "comment": "Excellent quality!",
          "date": "2025-04-30T09:41:02.053Z",
          "reviewerName": "Nolan Gonzalez",
          "reviewerEmail": "nolan.gonzalez@x.dummyjson.com"
        },
        {
          "rating": 4,
          "comment": "Would buy again!",
          "date": "2025-04-30T09:41:02.053Z",
          "reviewerName": "Bella Grant",
          "reviewerEmail": "bella.grant@x.dummyjson.com"
        },
        {
          "rating": 5,
          "comment": "Awesome product!",
          "date": "2025-04-30T09:41:02.053Z",
          "reviewerName": "Aria Flores",
          "reviewerEmail": "aria.flores@x.dummyjson.com"
        }
      ],
      "returnPolicy": "No return policy",
      "minimumOrderQuantity": 25,
      "meta": {
        "createdAt": "2025-04-30T09:41:02.053Z",
        "updatedAt": "2025-04-30T09:41:02.053Z",
        "barcode": "6936112580956",
        "qrCode": "https://cdn.dummyjson.com/public/qr-code.png"
      },
      "images": [
        "https://cdn.dummyjson.com/product-images/groceries/juice/1.webp"
      ],
      "thumbnail": "https://cdn.dummyjson.com/product-images/groceries/juice/thumbnail.webp"
    },
    {
      "id": 30,
      "title": "Kiwi",
      "description": "Nutrient-rich kiwi, perfect for snacking or adding a tropical twist to your dishes.",
      "category": "groceries",
      "price": 2.49,
      "discountPercentage": 15.22,
      "rating": 4.93,
      "stock": 99,
      "tags": [
        "fruits"
      ],
      "sku": "GRO-BRD-KIW-030",
      "weight": 5,
      "dimensions": {
        "width": 19.4,
        "height": 18.67,
        "depth": 17.13
      },
      "warrantyInformation": "6 months warranty",
      "shippingInformation": "Ships overnight",
      "availabilityStatus": "In Stock",
      "reviews": [
        {
          "rating": 4,
          "comment": "Highly recommended!",
          "date": "2025-04-30T09:41:02.053Z",
          "reviewerName": "Emily Brown",
          "reviewerEmail": "emily.brown@x.dummyjson.com"
        },
        {
          "rating": 2,
          "comment": "Would not buy again!",
          "date": "2025-04-30T09:41:02.053Z",
          "reviewerName": "Jackson Morales",
          "reviewerEmail": "jackson.morales@x.dummyjson.com"
        },
        {
          "rating": 4,
          "comment": "Fast shipping!",
          "date": "2025-04-30T09:41:02.053Z",
          "reviewerName": "Nora Russell",
          "reviewerEmail": "nora.russell@x.dummyjson.com"
        }
      ],
      "returnPolicy": "7 days return policy",
      "minimumOrderQuantity": 30,
      "meta": {
        "createdAt": "2025-04-30T09:41:02.053Z",
        "updatedAt": "2025-04-30T09:41:02.053Z",
        "barcode": "2530169917252",
        "qrCode": "https://cdn.dummyjson.com/public/qr-code.png"
      },
      "images": [
        "https://cdn.dummyjson.com/product-images/groceries/kiwi/1.webp"
      ],
      "thumbnail": "https://cdn.dummyjson.com/product-images/groceries/kiwi/thumbnail.webp"
    }
  ]

  let data = JSON.stringify(Json);
  localStorage.setItem("items", data);

}