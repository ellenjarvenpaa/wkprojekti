import { Menu, Dishes } from "../src/interface/Menu";

  const fetchData = async <T>(url: string, options: RequestInit = {}): Promise<T> => {
	const response = await fetch(url, options);
	if (!response.ok) {
	  throw new Error(`Error ${response.status} occured`);
	}
	const json = response.json();
	return json;
  };


  const apiUrl = 'http://127.0.0.1:3000/';
  const allMenuItems = await fetchData<Menu[]>(apiUrl + 'api/dish');

  const filteredCategories = allMenuItems.filter((category) => category.category_name === 'Leivonnaiset');

  filteredCategories.forEach((item: Menu) => {
	const menuText = () => {
	  let html = `
		<h2>${item.category_name}</h2>
		<ul class="menu-list">
	  `;

	  item.dishes.forEach((dish) => {
		const { dish_name, dish_price, dish_photo } = dish;
		html += `
		  <li class="menu-item">
		  <img class="menu-img" src="${apiUrl + `media/` + dish_photo}" alt="drink">
			<div>
			  <p class="menu-item-name">${dish_name}</p>
			  <p class="menu-item-price">${dish_price}</p>
			</div>
		  </li>
		`;
	  });

	  html += `
		</ul>
	  `;

	  return html;
	};

	const menuTextHtml = menuText();
	document.querySelector('.menu-items')?.insertAdjacentHTML('beforeend', menuTextHtml);

  });

  // GET ID

const fetchDishDetails = async (dishId: number): Promise<Dishes | null> => {
	try {
	  const dishDetails = await fetchData<Dishes>(apiUrl + `api/dish/${dishId}`);
	  return dishDetails;
	} catch (error) {
	  console.error(`Error fetching dish details for dish_id ${dishId}:`, error);
	  return null;
	}
  };

  // Add event listener to each menu item
  const menuItems = document.querySelectorAll('.menu-item');
  menuItems.forEach((menuItem) => {
	menuItem.addEventListener('click', (event) => {
	  const dishId = (event.currentTarget as HTMLElement).dataset.dishId;
	  console.log(dishId);
	  if (dishId) {
		displayDishDetails(Number(dishId));
	  }
	});
  });

  const displayDishDetails = async (dishId: number) => {
	const dishDetails = await fetchDishDetails(dishId);

	if (dishDetails) {
	  // Display the details in a modal, for example
	  console.log('Dish Details:', dishDetails);

	  const { dish_photo, dish_name, dish_price, dish_id, description } = dishDetails;

	  // Use the fetched details in your HTML
	  const html = `
		<div class="menu-item" data-dish-id="${dish_id}">
		  <img class="menu-img" src="${apiUrl + `media/` + dish_photo}" alt="drink">
		  <div>
			<p class="menu-item-name">${dish_name}</p>
			<p>${description}</p>
			<p class="menu-item-price">${dish_price}</p>
		  </div>
		</div>
	  `;

	  const infoItemContainer = document.querySelector('.info-item');

	  // Check if infoItemContainer is not null before manipulating it
	  if (infoItemContainer) {
		// Clear existing content before inserting the new HTML
		infoItemContainer.innerHTML = '';

		infoItemContainer.insertAdjacentHTML('beforeend', html);
	  } else {
		console.error('infoItemContainer is null');
	  }
	} else {
	  console.log('Unable to fetch dish details');
	}
  };

  // select dialog element from DOM
const dialog = document.querySelector('dialog');
const menuItemDialog = document.querySelector('#product-info-dialog') as HTMLDialogElement | null;
const loginDialog = document.querySelector('#login-dialog') as HTMLDialogElement | null;
const shoppingCartDialog = document.querySelector('#shopping-cart-dialog') as HTMLDialogElement | null;

// select menu item elements from DOM
const menuItemEls = document.querySelectorAll('.menu-item');
menuItemEls.forEach((item) => {
	item.addEventListener('click', () => {
		menuItemDialog?.showModal();
	})
	document.body.style.overflow = "auto";
});

const profileIconE = document.querySelector('#profile-icon') as HTMLElement | null;
profileIconE?.addEventListener('click', () => {
	loginDialog?.showModal();
	document.body.style.overflow = "auto";
});

const shoppingCartIcon = document.querySelector('#shopping-cart-icon') as HTMLElement | null;
shoppingCartIcon?.addEventListener('click', () => {
	shoppingCartDialog?.showModal();
	document.body.style.overflow = "auto";
});

const closeDialogBtnInfo = document.querySelector('#back-btn-info') as HTMLDialogElement;
closeDialogBtnInfo.addEventListener('click', () => {
	dialog?.close();
});

const closeDialogBtnLogin = document.querySelector('#back-btn-login') as HTMLButtonElement;
closeDialogBtnLogin.addEventListener('click', () => {
	dialog?.close();
});

const closeDialogBtnCart = document.querySelector('#back-btn-cart') as HTMLButtonElement;
closeDialogBtnCart.addEventListener('click', () => {
	dialog?.close();
});

const plusBtn = document.querySelector('#quantity-plus') as HTMLButtonElement;
plusBtn.addEventListener('click', () => {
    const quantityElement = document.querySelector('.quantity-number') as HTMLInputElement;
    let quantity = parseInt(quantityElement.value)
    quantity++;
    quantityElement.value = quantity.toString();
});

const minusBtn = document.querySelector('#quantity-minus') as HTMLButtonElement;
minusBtn.addEventListener('click', () => {
    const quantityElement = document.querySelector('.quantity-number') as HTMLInputElement;
    let quantity = parseInt(quantityElement.value);
    quantity--;
    quantityElement.value = quantity.toString();
});
