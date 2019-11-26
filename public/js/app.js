const weatherForm = document.querySelector("form");
const searchTerm = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

weatherForm.addEventListener("submit", (e) => {
	e.preventDefault();

	const location = searchTerm.value;

	messageOne.textContent = "Laura vistike... :-)";
	messageTwo.textContent = "";

	fetch("/weather?address=" + encodeURIComponent(location)).then((response) => {
		response.json().then((data) => {
			if (data.error) {
				return (messageOne.textContent = data.error);
			}
			messageOne.textContent = data.location;
			messageTwo.textContent = data.forecast;
		});
	});
});
