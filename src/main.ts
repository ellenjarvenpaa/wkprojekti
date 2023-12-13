import { errorModal, menuListHtml, menuListHtmlForOffers, successModal } from "./components";
import { fetchData1 } from "./function";
import { Menu } from "./interface/Menu";
import { Offer } from "./interface/Offer";

const mockData: Menu[] = [
	{
	  category_name: "Jäätelöt",
	  dishes: [
		{
		  dish_id: 1,
		  dish_name: "Coca-cola",
		  dish_price: "3.50",
		  description: "Coca-cola",
		},
		{
		  dish_id: 2,
		  dish_name: "Fanta",
		  dish_price: "3.50",
		  description: "Fanta",
		},
		{
		  dish_id: 6,
		  dish_name: "Fanta2",
		  dish_price: "3.50",
		  description: "Fanta2",
		},
	  ],
	},
	{
	  category_name: "Leivonnaiset",
	  dishes: [
		{
		  dish_id: 3,
		  dish_name: "Kinuskikakku",
		  dish_price: "4.50",
		  description: "Kinuski",
		},
		{
		  dish_id: 4,
		  dish_name: "Punainen sametti",
		  dish_price: "4.00",
		  description: "Punainen sametti kakku",
		},
	  ],
	},
	{
		category_name: "Kakut",
	  dishes: [
		{
		  dish_id: 3,
		  dish_name: "Kinuskikakku",
		  dish_price: "4.50",
		  description: "Kinuski",
		},
		{
		  dish_id: 4,
		  dish_name: "Punainen sametti",
		  dish_price: "4.00",
		  description: "Punainen sametti kakku",
		},
	  ],

	},
	{
		category_name: "Kylmät juomat",
	  dishes: [
		{
		  dish_id: 3,
		  dish_name: "Kinuskikakku",
		  dish_price: "4.50",
		  description: "Kinuski",
		},
		{
		  dish_id: 4,
		  dish_name: "Punainen sametti",
		  dish_price: "4.00",
		  description: "Punainen sametti kakku",
		},
	  ],
	},
	{
		category_name: "Kuumat juomat",
	  dishes: [
		{
		  dish_id: 3,
		  dish_name: "Kinuskikakku",
		  dish_price: "4.50",
		  description: "Kinuski",
		},
		{
		  dish_id: 4,
		  dish_name: "Punainen sametti",
		  dish_price: "4.00",
		  description: "Punainen sametti kakku",
		},
	  ],
	}
  ];

async function fetchData<T>(url: string, mockData?: T): Promise<T> {
	if (mockData) {
	  return mockData;
	} else {
	  const response = await fetch(url);
	  const data = await response.json();
	  return data as T;
	}
  }

  const apiUrl = 'http://localhost:3000/';
  const menuItems = await fetchData<Menu[]>(apiUrl, mockData);

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
			<div class="menu-item-info">
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


// select dialog element from DOM
const dialog = document.querySelector('dialog');
const menuItemDialog = document.querySelector('#product-info-dialog') as HTMLDialogElement | null;
const loginDialog = document.querySelector('#login-dialog') as HTMLDialogElement | null;
const shoppingCartDialog = document.querySelector('#shopping-cart-dialog') as HTMLDialogElement | null;
const infoDialog = document.querySelector('#info') as HTMLDialogElement | null;

// select menu item elements from DOM
const menuItemEls = document.querySelectorAll('.menu-item');
console.log(menuItemEls);
menuItemEls.forEach((item) => {
	item.addEventListener('click', () => {
		menuItemDialog?.showModal();
	})
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
	loginDialog?.close();
});



const closeDialogBtnCart = document.querySelector('#back-btn-cart') as HTMLButtonElement;
closeDialogBtnCart.addEventListener('click', () => {
	dialog?.close();
});
// select info modal from the DOM
// select login form from the DOM
const loginForm = document.querySelector('#login-form') as HTMLFormElement | null;
// select login inputs from the DOM
const profileIconE = document.querySelector('#profile-icon') as HTMLElement | null;

const loginBtn = document.querySelector('#login') as HTMLButtonElement |null;
// const memberNumberInput = document.querySelector(
//   '#member-number'
// ) as HTMLInputElement | null;
// const passwordInput = document.querySelector(
//   '#login-password'
// ) as HTMLInputElement | null;

if (!loginBtn) {
	throw new Error('Login button not found');
}

if (!infoDialog) {
	throw new Error('Dialog not found');
}
// function to login
const login = async (user: {
	membernumber: string,
	password: string
  }): Promise<LoginUser> => {
	const options: RequestInit = {
	  method: 'POST',
	  headers: {
		'Content-Type': 'application/json'
	  },
	  body: JSON.stringify(user),
	}
	return await fetchData1<LoginUser>(apiUrl + 'api/auth/login', options);
};

// function to check if token exists and dipsplay offers
const checkToken = async () => {
	const token = localStorage.getItem('token');
	// console.log(token);
	if (!token) {
		return;
	}
	const offerData = await getOffers(token);
	// select menu element from DOM
	const target = document.querySelector('.menu-items') as HTMLUListElement | null;
	// empty old menu
	if (target) {
		target.innerHTML = '';
	}
	// add offers to DOM
	const addOffersToDOM = (offerData: Offer) => {
		const target = document.querySelector('.menu-items') as HTMLUListElement | null;
		// render offer
		const html = menuListHtmlForOffers(offerData.offer_dishes);
		console.log(offerData);
		target?.insertAdjacentHTML('afterbegin', html);

		// display offer icon on nav bar
		const navBarDiscount = document.querySelector('.nav-item.discount');
		navBarDiscount?.classList.remove('hidden');
	}
	addOffersToDOM(offerData);

	const menuItemsWithOffers = await getDishesWithOffers(token);
	console.log(menuItemsWithOffers);
	// add menu with offers to DOM
	const addMenuToDOM = (menuItemsWithOffers: Menu[]) => {
		const target = document.querySelector('.menu-items') as HTMLUListElement | null;
		const html = menuListHtml(menuItemsWithOffers);
		target?.insertAdjacentHTML('beforeend', html);
	}
	addMenuToDOM(menuItemsWithOffers);
	// select menu item elements from DOM
	const menuItemEls = document.querySelectorAll('.menu-item');
	console.log(menuItemEls);
	menuItemEls.forEach((item) => {
		item.addEventListener('click', () => {
			menuItemDialog?.showModal();
		})
		document.body.style.overflow = "auto";
	});


}

// function to get user offers
const getOffers = async (token: string):Promise<Offer> => {
	const options: RequestInit = {
		method: 'GET',
		headers: {
			 Authorization: 'Bearer ' + token,
			'Content-Type': 'application/json'
		}
	};
	return await fetchData1<Offer>(apiUrl + 'api/dish/offers', options);
}

// function to get menu when user is logged on
const getDishesWithOffers = async (token: string):Promise<Menu[]> => {
	const options: RequestInit = {
		method: 'GET',
		headers: {
			 Authorization: 'Bearer ' + token,
			'Content-Type': 'application/json'
		}
	};
	return await fetchData1<Menu[]>(apiUrl + 'api/dish/logged', options);
}

checkToken();

profileIconE?.addEventListener('click', () => {
	const userToken = localStorage.getItem('token') as string | null;
	// if user is not logged in yet, show login modal
	if (userToken === null) {
		loginDialog?.showModal();
		document.body.style.overflow = "auto";

		loginForm?.addEventListener('submit', async (event) => {
			try {
				event.preventDefault();
				const user = {
					membernumber: loginForm.membernumber.value,
					password: loginForm.loginpassword.value
				};
				const loginData = await login(user);
				console.log('loginData', loginData);
				// save token to local storage
				localStorage.setItem('token', loginData.token);
				loginDialog?.close();

				// update DOM using token
				// updateDom(loginData.token);
				checkToken();

			} catch (err) {
				console.log(err);
				const infoHTML = (err as Error).message + `. Kirjautuminen epäonnistui. Yritä uudelleen`;
				infoDialog.innerHTML = errorModal(infoHTML);
				infoDialog.showModal();
				loginDialog?.close();
				const closeDialogBtnError = document.querySelector('#back-btn-error') as HTMLButtonElement;
				closeDialogBtnError?.addEventListener('click', () => {
					infoDialog?.close();
				});
				console.log('close button', closeDialogBtnError);
				console.log(infoDialog);
			}

		});
	} else {
		// user is already logged in
		const infoHTML = `Olet nyt kirjautunut sisään. Nauti tarjouksistasi!`;
		infoDialog.innerHTML = successModal(infoHTML);
		infoDialog.showModal();
		// close info dialog
		const closeDialogBtnSuccess = document.querySelector('#back-btn-success') as HTMLButtonElement | null;
		closeDialogBtnSuccess?.addEventListener('click', () => {
			infoDialog?.close();
		});
	}

});


