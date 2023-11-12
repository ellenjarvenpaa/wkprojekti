// select dialog element from DOM
const menuItemDialog = document.querySelector('#product-info-dialog') as HTMLDialogElement | null;
const loginDialog = document.querySelector('#login-dialog') as HTMLDialogElement | null;

// select menu item elements from DOM
const menuItemEls = document.querySelectorAll('.menu-item');

menuItemEls.forEach((item) => {
	item.addEventListener('click', () => {
		menuItemDialog?.showModal();
	})
});

const profileIconE = document.querySelector('#profile-icon') as HTMLElement | null;
profileIconE?.addEventListener('click', () => {
	loginDialog?.showModal();
});
