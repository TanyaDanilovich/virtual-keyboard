let output;

const createElement = (el, ...classes) => {
	const element = document.createElement(el);
	element.classList.add(classes)
	return element;
}

const wrapperInit = () => {
	const WRAPPER = createElement('div', 'keyboard__wrapper');
	document.body.prepend(WRAPPER);
	const H1 = createElement('h1', 'h1');
	WRAPPER.append(H1);
	H1.innerText = 'Virtual keyboard';
	const TEXTAREA = createElement('textarea', 'output');
	TEXTAREA.rows = '10';
	TEXTAREA.cols = '50';
	TEXTAREA.placeholder = "Start to write here...";
	TEXTAREA.id = "output";
	WRAPPER.append(TEXTAREA);
	output = document.querySelector('#output');
	output.focus();
}



const Keyboard = {
	elements: {
		keysContainer: null,
		keys: []
	},

	properties: {
		value: "",
		capsLock: false
	},

	init() {
		const WRAPPER = document.querySelector('.keyboard__wrapper')
		this.elements.keysContainer = createElement("div", "keyboard");
		WRAPPER.append(this.elements.keysContainer);

		this.elements.keysContainer.append(this.createKeys());

		this.elements.keys = this.elements.keysContainer.querySelectorAll(".key");
	},

	createKeys() {

		keyLayout.forEach(key => {
			const keyElement = createElement("button", 'key');
			const insertLineBreak = ["backspace", "del", "enter", "↑"].indexOf(key) !== -1;

			keyElement.setAttribute("type", "button");

			switch (key) {
				case "backspace":
					keyElement.classList.add("key-wide");
					keyElement.innerHTML = "Backspace";
					keyElement.addEventListener("click", () => {
						this.removeSymbol();
					});
					break;

				case "caps":
					keyElement.classList.add("key-wide", "key-activable");
					keyElement.innerHTML = "Caps lock";
					keyElement.addEventListener("click", () => {
						this.toggleCapsLock();
						keyElement.classList.toggle("key-active", this.properties.capsLock);
					});

					break;

				case "enter":
					keyElement.classList.add("key-wide");
					keyElement.innerHTML = 'Enter';
					keyElement.addEventListener("click", () => {
						this.properties.value += "\n";
						this.addEnter();
					});

					break;

				case "space":
					keyElement.classList.add("key-extra-wide");
					keyElement.innerHTML = ' '
					keyElement.addEventListener("click", () => {
						this.addSpace();
					});
					break;

				default:
					keyElement.textContent = key.toLowerCase();
					keyElement.addEventListener("click", () => {
						this.properties.value += this.properties.capsLock ? key.toUpperCase() : key.toLowerCase();
						//console.log(key);
						this.addSymbol(key, this.properties.capsLock);
					});
					break;
			}

			this.elements.keysContainer.append(keyElement);
			if (insertLineBreak) {
				this.elements.keysContainer.append(document.createElement("br"));
			}
		});
	},
	removeSymbol() {
		output.value = output.value.substring(0, output.value.length - 1);
		output.textContent = output.value
		output.focus();
	},
	addEnter() {
		output.value += "\n";
		output.textContent = output.value
		output.focus();
	},
	addSpace() {
		output.value += " ";
		output.textContent = output.value
		output.focus();
	},
	addSymbol(symbol, caps) {
		if (caps) {
			symbol = symbol.toUpperCase();
		} else {
			symbol = symbol.toLowerCase();
		}
		console.log(caps);
		output.value += symbol;
		output.textContent = output.value
		output.focus();
	},

	toggleCapsLock() {
		this.properties.capsLock = !this.properties.capsLock;

		for (const key of this.elements.keys) {
			//console.log(key);
			if (key.childElementCount === 0 && key.textContent !== 'Caps lock' && key.textContent !== 'Backspace' && key.textContent !== 'Enter') {
				key.textContent = this.properties.capsLock ? key.textContent.toUpperCase() : key.textContent.toLowerCase();
			}

		}
	}
};



window.addEventListener("DOMContentLoaded", function () {
	wrapperInit();
	Keyboard.init();
});

function keyDown(symbol) {
	dd
	Keyboard.elements.keys.forEach((key) => {
		if (key.textContent.toLowerCase() === symbol.toLowerCase()) {
			key.classList.add('key-pressed');
		}
	})
}

function keyUp(symbol) {
	Keyboard.elements.keys.forEach((key) => {
		if (key.textContent.toLowerCase() === symbol.toLowerCase()) {
			key.classList.remove('key-pressed');
		}
	})
}

document.onkeydown = (event) => {
	keyDown(event.key);
	console.log(event.code)
}
document.onkeyup = (event) => { keyUp(event.key) }