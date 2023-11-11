// select dialog element from DOM
const menuItemDialog = document.querySelector('dialog') as HTMLDialogElement | null;

// select menu item elements from DOM
const menuItemEls = document.querySelector('.menu-item') as HTMLElement | null;

menuItemEls?.addEventListener('click', () => {
	menuItemDialog?.showModal();
});
