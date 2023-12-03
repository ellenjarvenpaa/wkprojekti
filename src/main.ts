import { Dishes, Menu } from "./interface/Menu";

const fetchData = async <T>(url: string, options: RequestInit = {}): Promise<T> => {
	const response = await fetch(url, options);
		if (!response.ok) {
			throw new Error(`Error ${response.status} occured`);
		}
	const json = response.json();
	return json;
};


const apiUrl = 'http://127.0.0.1:3000/';
const menuItems = await fetchData<Menu[]>(apiUrl + 'api/dish');

menuItems.forEach((item: Menu) => {
	const menuText = () => {
		let html = `
		<h2>${item.category_name}</h2>
		<ul class="menu-list">
		`;

		item.dishes.forEach((dish) => {
			const { dish_name, dish_price } = dish;
			html += `
			<li class="menu-item">
			<img class="menu-img" src="img/cocacola.png" alt=" drink">
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

/*const infoItemId = document.querySelector('.menu-item');
infoItemId?.addEventListener('click', (event) => {
	const clickedElement = event.target as HTMLElement;
	const dishName = clickedElement.innerText;

	console.log('Dish Name:', dishName);
});*/

const infoItems = await fetchData<Dishes[]>(apiUrl + 'api/dish');

const infoItemsContainer = document.querySelector('.info-item');

infoItems.forEach(async (item: Dishes) => {

  const apiUrl = 'http://127.0.0.1:3000/';
  const dishDetails = await fetchData<Dishes[]>(apiUrl + `api/dish/${item.dish_id}`);

  const infoText = () => {
    let html = `
      <div class="info-item">
	 	<h2></h2>
    `;

    dishDetails.forEach((dish) => {
      const { dish_name, description, dish_price } = dish;
      html += `
        <div class="menu-item">
          <img class="menu-img" src="img/cocacola.png" alt="${dish_name} drink">
          <div>
            <p class="menu-item-name">${dish_name}</p>
            <p class="menu-item-desc">${description}</p>
            <p class="menu-item-price">${dish_price}</p>
          </div>
        </div>
      `;
    });

    html += `
      </div>
    `;

    return html;
  };

  const infoTextHtml = infoText();
  infoItemsContainer?.insertAdjacentHTML('beforeend', infoTextHtml);

});

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
