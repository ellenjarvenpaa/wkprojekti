import {Menu} from "../src/interface/Menu";

// GET

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

allMenuItems.forEach((item: Menu) => {
const menuText = () => {
	let html = `
		<h2 id="${item.category_name}">${item.category_name}</h2>
		<ul class="menu-list">
	`;

	item.dishes.forEach((dish) => {
		const { dish_name, dish_price, dish_photo, dish_id } = dish;
		html += `
			<li class="menu-item" data-dish-id=${dish_id}>
			<img class="menu-img" src="${apiUrl + `media/` + dish_photo}" alt="drink">
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

		if (document.querySelector('.menu-container')?.classList.contains('offer-admin')) {
			html += `<div class="menu-item-btns"><button id="offer-activate" class="button">Aktivoi</button>
			<button id="offer-delete" class="button">Poista</button></div>`;
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


// PUT

const modifyItem = async (dish_id: number, data: string) => {
	try {
		const response = await fetchData<any>(apiUrl + `api/dish/${dish_id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		});
		return response;
	} catch (error) {
		console.error('Error modifying item:', error);
		throw error;
	}
};

const menuItems = document.querySelectorAll('.menu-item');

let selectedDishId;

menuItems.forEach((menuItem) => {
  menuItem.addEventListener('click', (event) => {
    selectedDishId = (event.currentTarget as HTMLElement).dataset.dishId;
    console.log(selectedDishId);
  });
});

document.getElementById('item-modify-form')?.addEventListener('submit', async (event) => {
  event.preventDefault();

  if (selectedDishId) {
    const itemId: number = parseInt(selectedDishId);
    console.log(itemId);
		const nameInput: HTMLInputElement | null = document.querySelector('input[name="dish_name"]');
		const priceInput: HTMLInputElement | null = document.querySelector('input[name="dish_price"]');
		const descriptionInput: HTMLTextAreaElement | null = document.querySelector('textarea[name="description"]');
		const categorySelect: HTMLSelectElement | null = document.querySelector('select[name="category_id"]');
		const fileInput: HTMLInputElement | null = document.querySelector('input[name="dish_photo"]');

		const formData: any = {
			dish_name: nameInput?.value,
			dish_price: priceInput?.value,
			description: descriptionInput?.value,
			category_id: categorySelect?.value,
			dish_photo: fileInput?.files?.[0],
		};

		try {
			const result = await modifyItem(itemId, formData);
			console.log(result);
		} catch (error) {
			console.error('Error modifying item:', error);
			throw error;
		}

		modifyDialog?.close();
		location.reload();
	}
});

// DELETE

const deleteItem = async (dish_id: number) => {
	try {
		const response = await fetchData<any>(apiUrl + `api/dish/${dish_id}`, {
			method: 'DELETE',
		});
		return response;
	} catch (error) {
		console.error('Error deleting item:', error);
	}
};

document.getElementById('delete-item-dialog')?.addEventListener('submit', async (event) => {
	event.preventDefault();

	if (selectedDishId) {
		const itemId: number = parseInt(selectedDishId);
		console.log(itemId);

		try {
			const result = await deleteItem(itemId);
			console.log(result);
		} catch (error) {
			console.error('Error deleting item:', error);
			throw error;
		}

		deleteDialog?.close();
		location.reload();
	}
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

