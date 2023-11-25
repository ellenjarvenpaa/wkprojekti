import { Menu } from "../src/interface/Menu";

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

  const filteredCategories = menuItems.filter((category) => category.category_name === 'Kylmät juomat');

  filteredCategories.forEach((item: Menu) => {
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
