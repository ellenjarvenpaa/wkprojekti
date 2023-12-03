import {Menu} from "../src/interface/Menu";

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
			<img class="menu-img" src="../img/cocacola.png" alt=" drink">
			<div class="menu-item-info">
				<p class="menu-item-name">${dish_name}</p>
				<p class="menu-item-price">${dish_price}</p>
			</div>

		`;
		// add muokkaus buttoni jos on menu admin sivulla
		if (document.querySelector('.menu-container')?.classList.contains('menu-admin')) {
			html += `<div class="menu-item-btns"><button class="menu-modify-btn button">Muokkaa</button>
			<button class="menu-delete-btn button">Poista</button></div>`;
		}
		html += `	</li>`;
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
const modifyDialog = document.querySelector('#modify-item-dialog') as HTMLDialogElement | null;
const deleteDialog = document.querySelector('#delete-item-dialog') as HTMLDialogElement | null;
// select buttons form DOM
const modifyBtn = document.querySelectorAll('.menu-modify-btn');
const deleteBtn = document.querySelectorAll('.menu-delete-btn');
// select menu item elements from DOM
const menuItemEls = document.querySelectorAll('.menu-item');
modifyBtn?.forEach((btn) => {
	btn.addEventListener('click', () => {
		modifyDialog?.showModal();
	})
});

deleteBtn?.forEach((btn) => {
	btn.addEventListener('click', () => {
		deleteDialog?.showModal();
	});
});

const closeDialogBtnModify = document.querySelector('#modify-back-btn') as HTMLButtonElement;
closeDialogBtnModify.addEventListener('click', () => {
	modifyDialog?.close();
});

const closeDialogBtnDelete = document.querySelector('#delete-back-btn') as HTMLButtonElement;
closeDialogBtnDelete.addEventListener('click', () => {
	deleteDialog?.close();
});

