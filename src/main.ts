import { Dishes, Menu } from "./interface/Menu";

const fetchData = async <T>(url: string, options: RequestInit = {}): Promise<T> => {
	const response = await fetch(url, options);
		if (!response.ok) {
			throw new Error(`Error ${response.status} occured`);
		}
	const json = response.json();
	return json;
};

// GET
const apiUrl = 'http://127.0.0.1:3000/';
const allMenuItems = await fetchData<Menu[]>(apiUrl + 'api/dish');

allMenuItems.forEach((item: Menu) => {
	const menuText = () => {
		let html = `
		<h2>${item.category_name}</h2>
		<ul class="menu-list">
		`;

		item.dishes.forEach((dish) => {
			const { dish_photo, dish_name, dish_price, dish_id } = dish;
			html += `
			<li class="menu-item">
			<img class="menu-img" src="${apiUrl + `media/` + dish_photo}" alt="drink">
			<div>
			<p class="menu-item-name">${dish_name}</p>
			<p class="menu-item-price">${dish_price}</p>
			<p>${dish_id}<p/>
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

  const infoItems = await fetchData<Menu[]>(apiUrl + 'api/dish');

  const fetchDishDetails = async (dishId: number): Promise<Dishes | null> => {
	try {
	  const dishDetails = await fetchData<Dishes>(apiUrl + `api/dish/${dishId}`);
	  return dishDetails;
	} catch (error) {
	  console.error(`Error fetching dish details for dish_id ${dishId}:`, error);
	  return null;
	}
  };

  const infoText = async () => {
	let html = '';

	for (const item of infoItems) {
	  for (const dish of item.dishes) {
		const { dish_photo, dish_name, dish_price, dish_id, description } = dish;

		// Convert dish_id to number before passing to fetchDishDetails
		const dishDetails = await fetchDishDetails(Number(dish_id));

		// Use the fetched details in your HTML
		html += `
		  <div class="menu-item" data-dish-id="${dish_id}">
			<img class="menu-img" src="${apiUrl + `media/` + dish_photo}" alt="drink">
			<div>
			  <p class="menu-item-name">${dish_name}</p>
			  <p>${description}</p>
			  <p class="menu-item-price">${dish_price}</p>
			  <p>${dish_id}</p>
			  <!-- Display additional details fetched -->
			  ${dishDetails ? `<p>Additional Info: ${dishDetails}</p>` : ''}
			</div>
		  </div>
		`;
	  }
	}

	return html;
  };

  const infoTextHtml = await infoText();
  const infoItemContainer = document.querySelector('.info-item');
  infoItemContainer?.insertAdjacentHTML('beforeend', infoTextHtml);

  // Add event listener to each menu item
  const menuItems = document.querySelectorAll('.menu-item');
  menuItems.forEach((menuItem) => {
	menuItem.addEventListener('click', (event) => {
	  const dishId = (event.currentTarget as HTMLElement).getAttribute('data-dish-id');
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
	  // You can customize this part to show the details in your webpage
	} else {
	  console.log('Unable to fetch dish details');
	}
  };


/*const infoItems = await fetchData<Menu[]>(apiUrl + 'api/dish');
console.log(infoItems);

infoItems.forEach(async (dish: Menu) => {
    const infoText = () => {
		let html = `<ul>`;

			infoItems.forEach((dish) => {
				const { dish_name, description, dish_price, dish_photo, dish_id } = dish;
                html += `
				<li class="menu-item">
				<img class="menu-img" src="${apiUrl + `media/` + dish_photo}" alt="drink">
				<div>
				<p>${dish_id}</p>
				<p class="menu-item-name">${dish_name}</p>
				<p class="menu-item-desc">${description}</p>
				<p class="menu-item-price">${dish_price}</p>
				</div>
				</li>
                `;
            });


		html += `</ul>`;

        return html;
    };

    const infoTextHtml = infoText();
	document.querySelector('.info-item')?.insertAdjacentHTML('beforeend', infoTextHtml);
});*/



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
