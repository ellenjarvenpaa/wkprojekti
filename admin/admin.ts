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
		const { dish_name, dish_price, dish_photo, dish_id } = dish;
		html += `
			<li class="menu-item">
			<img class="menu-img" src="${apiUrl + `media/` + dish_photo}" alt="drink">
			<div class="menu-item-info">
				<p class="menu-item-name">${dish_name}</p>
				<p class="menu-item-price">${dish_price}</p>
				<p id="dish_id">Dish id: ${dish_id}</p>
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

// Function to modify an item
const modifyItem = async (dish_id: number, data: string) => {
	try {
	  const response = await fetchData<any>(apiUrl + `api/dish/${dish_id}`, {
		method: 'PUT',
		headers: {
		  'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	  });

	  // The fetchData function already handles response.ok and throws an error if not OK
	  return response;
	} catch (error) {
	  console.error('Error modifying item:', error);
	  throw error;
	}
  };

  document.getElementById('item-modify-form')?.addEventListener('submit', async (event) => {
	event.preventDefault();

  // Example usage:
  // Assuming you have form data stored in a variable formData
  const itemId: number = (document.querySelector('#dish_id') as HTMLInputElement)?.value
  ? parseInt((document.querySelector('#dish_id') as HTMLInputElement)?.value, 16)
  : 1;
  const nameInput: HTMLInputElement | null = document.querySelector('input[name="name"]');
  const priceInput: HTMLInputElement | null = document.querySelector('input[name="price"]');
  const descriptionInput: HTMLTextAreaElement | null = document.querySelector('textarea[name="description"]');
  const categorySelect: HTMLSelectElement | null = document.querySelector('select[name="category"]');
  const fileInput: HTMLInputElement | null = document.querySelector('input[name="file"]');

  const formData: any = {
	name: nameInput?.value,
	price: priceInput?.value,
	description: descriptionInput?.value,
	category: categorySelect?.value,
	file: fileInput?.files?.[0],
  };

  try {
	const result = await modifyItem(itemId, formData);
	console.log(result); // Handle the result as needed
  } catch (error) {
	// Handle errors
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

