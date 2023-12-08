const errorModal = (message: string) => {
	const html = `
				<h3>Error</h3>
				<p>${message}</p>
				`;
	return html;
};


const successModal = (message: string) => {
	const html = `
				<h3>Success</h3>
				<p>${message}</p>
				`;
	return html;
}

export {errorModal, successModal};
