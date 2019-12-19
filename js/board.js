let width, height;
let board = []
let startY;
let startX;
let endY;
let endX;

function renderArea() {
	let headerHeight = document.getElementById("header").clientHeight,
		body = document.body,
		html = document.documentElement;

	height = Math.floor(
		(Math.max(
			body.scrollHeight,
			body.offsetHeight,
			html.clientHeight,
			html.scrollHeight,
			html.offsetHeight
		) -
			headerHeight) /
		26
	);

	width = Math.floor(document.body.clientWidth / 25);

	// GENERATE GRID IN 2D ARRAY

	for (let i = 0; i < width; i++) {
		board[i] = []
		for (let b = 0; b < height; b++) {
			board[i].push(1)
		}
	}


	for (let i = 0; i < height; i++) {
		let row = document.createElement("div");
		row.className = `row-${i} row`;
		for (let b = 0; b < width; b++) {
			let block = document.createElement("div");
			row.appendChild(block);
			block.className = `block`;
			block.className += ` block-${b}`;
			block.onclick = function () {
				let row = $(this).parent()[0].classList.value.split("-")[1].split(" ")[0]
				let col = this.classList.value.split("-")[1].split(" ")[0]
				if (
					!this.classList.contains("ending") &&
					!this.classList.contains("starting")
				) {
					if (this.classList.contains("wall")) {
						this.classList.remove("wall");

						board[col][row] = 1
					}
					else {
						this.classList.add("wall");
						board[col][row] = 0
					}
				}
			};
		}
		document.getElementById("area").appendChild(row);
	}
}

function renderPoints() {
	const positions = {
		start: { x: Math.floor(width / 5), y: Math.floor(height / 2) },
		end: { x: Math.floor(width / 1.3), y: Math.floor(height / 2) }
	};

	// start point

	document.querySelector(
		`.row-${positions.start.y} .block-${positions.start.x}`
	).innerHTML = `<svg enable-background="new 0 0 512 512" version="1.1" viewBox="0 0 512 512" xml:space="preserve" xmlns="http://www.w3.org/2000/svg">
		<path d="m206.45 115.4c-16.027-0.663-32.252-1.664-48.223-2.972-4.186-0.34-7.856 2.772-8.199 6.958-0.343 4.185 2.772 7.856 6.958 8.199 5.73 0.469 11.496 0.885 17.27 1.274v58.632c1e-3 4.199 3.406 7.604 7.605 7.604s7.604-3.405 7.604-7.604v-57.699c5.463 0.3 10.922 0.578 16.358 0.803 0.106 4e-3 0.213 6e-3 0.319 6e-3 4.054 0 7.422-3.201 7.592-7.29 0.173-4.194-3.088-7.737-7.284-7.911z"/>
		<path d="m425.33 112.1c-0.564-4.162-4.397-7.082-8.556-6.515-15.905 2.154-32.073 4.013-48.055 5.522-4.18 0.395-7.249 4.105-6.855 8.285 0.372 3.938 3.684 6.889 7.561 6.889 0.239 0 0.482-0.011 0.725-0.034 5.279-0.499 10.579-1.048 15.881-1.621v57.261c-1e-3 4.2 3.403 7.605 7.603 7.605s7.604-3.405 7.604-7.604v-59c5.877-0.709 11.747-1.444 17.576-2.234 4.162-0.563 7.079-4.393 6.516-8.554z"/>
		<path d="m344.33 140.4v-2.251c0-6.557-2.568-12.603-7.231-17.026-4.711-4.469-10.956-6.747-17.626-6.383-6.317 0.335-12.708 0.622-18.992 0.857-4.087 0.151-7.322 3.509-7.322 7.599v65.744c0 4.199 3.404 7.604 7.604 7.604s7.604-3.405 7.604-7.604v-22.499c5.57 0.049 10.703 2.073 14.558 5.771 3.995 3.831 6.196 9.107 6.196 14.853 0 4.199 3.404 7.604 7.604 7.604s7.604-3.405 7.604-7.604c0-9.929-3.864-19.102-10.878-25.829-0.011-0.011-0.024-0.021-0.036-0.032 6.566-4.669 10.915-12.349 10.915-20.804zm-15.208 1e-3c0 5.279-4.417 9.972-9.648 10.248h-1e-3c-3.676 0.195-7.39 0.375-11.106 0.537v-20.687c3.969-0.171 7.955-0.363 11.911-0.573 2.43-0.134 4.702 0.662 6.356 2.232 1.604 1.522 2.488 3.65 2.488 5.992v2.251z"/>
		<path d="m249.4 116.41c-6.787-8e-3 -13.105 2.548-17.856 7.273-4.699 4.674-7.287 10.911-7.287 17.563v48.287c0 4.199 3.405 7.604 7.604 7.604s7.604-3.405 7.604-7.604v-22.704c5.519 0.075 11.051 0.127 16.576 0.127 1.075 0 2.141-0.011 3.215-0.014v22.786c0 4.199 3.404 7.604 7.604 7.604s7.604-3.405 7.604-7.604v-48.287c-1e-3 -13.724-11.243-24.952-25.064-25.031zm9.856 35.331c-6.587 0.017-13.201-0.019-19.791-0.11v-10.384c0-2.575 0.996-4.983 2.804-6.782 1.86-1.85 4.347-2.823 7.047-2.847 5.48 0.031 9.939 4.437 9.939 9.822v10.301z"/>
		<path d="m113.53 140.79-2.024-0.243c-5.161-0.627-9.688-5.763-9.688-10.992-1e-3 -2.169 0.744-3.974 2.154-5.223 1.442-1.277 3.466-1.833 5.699-1.561 6.141 0.746 12.381 1.456 18.551 2.11 4.179 0.441 7.92-2.584 8.362-6.761 0.442-4.176-2.585-7.92-6.761-8.362-6.091-0.645-12.254-1.345-18.318-2.083-6.619-0.804-12.873 1.072-17.618 5.276-4.693 4.159-7.277 10.055-7.277 16.605 0 13.061 10.132 24.52 23.065 26.089l2.043 0.246c5.259 0.632 9.702 5.549 9.702 10.737 0 2.206-0.808 4.139-2.276 5.44-1.453 1.289-3.446 1.856-5.614 1.595-6.073-0.728-12.229-1.514-18.295-2.335-4.165-0.563-7.992 2.354-8.555 6.515-0.564 4.162 2.353 7.992 6.515 8.555 6.143 0.831 12.376 1.627 18.524 2.364 0.971 0.117 1.934 0.174 2.887 0.174 5.471 0 10.584-1.902 14.631-5.492 4.697-4.167 7.392-10.297 7.392-16.817 0-12.932-10.146-24.281-23.099-25.837z"/>
		<path d="m509.38 52.256c-1.665-1.445-3.875-2.098-6.055-1.785-140.41 19.983-283.15 22.868-424.26 8.571-4.176-0.427-7.908 2.621-8.332 6.799s2.621 7.908 6.799 8.332c139.43 14.127 280.42 11.624 419.26-7.433v146.23c-159.82 22.136-321.76 22.136-481.58 0v-146.23c11.705 1.606 23.504 3.105 35.186 4.472 4.181 0.494 7.949-2.498 8.435-6.669 0.488-4.171-2.498-7.948-6.669-8.435-14.449-1.689-29.08-3.585-43.485-5.636-2.186-0.311-4.391 0.341-6.055 1.785-1.664 1.443-2.62 3.539-2.62 5.742v161.58c0 3.786 2.785 6.995 6.532 7.528 5.587 0.795 11.177 1.558 16.769 2.299v224.59c0 4.199 3.405 7.604 7.604 7.604h30.436c4.199 0 7.604-3.405 7.604-7.604v-219.14c62.188 6.609 124.62 9.915 187.05 9.915s124.86-3.305 187.05-9.915v67.591c0 4.199 3.404 7.604 7.604 7.604s7.604-3.405 7.604-7.604v-69.275c5.078-0.584 10.154-1.191 15.229-1.82v215.04h-15.229v-118.59c0-4.199-3.404-7.604-7.604-7.604s-7.604 3.405-7.604 7.604v126.2c0 4.199 3.404 7.604 7.604 7.604h30.437c4.2 0 7.604-3.405 7.604-7.604v-224.59c5.593-0.741 11.184-1.505 16.772-2.3 3.747-0.533 6.532-3.742 6.532-7.528v-161.58c2e-3 -2.203-0.954-4.299-2.619-5.743zm-455.64 394.14h-15.228v-215.04c5.074 0.629 10.15 1.236 15.228 1.82v213.22z"/>
		</svg>
		`;

	document.querySelector(
		`.row-${positions.start.y} .block-${positions.start.x}`
	).classList += " starting";

	document.querySelector(
		`.row-${positions.start.y} .block-${positions.start.x}`
	).id += " starting";

	startY = positions.start.y
	startX = positions.start.x

	//end point

	document.querySelector(
		`.row-${positions.end.y} .block-${positions.end.x}`
	).innerHTML = `<svg enable-background="new 0 0 357 357" version="1.1" viewBox="0 0 357 357" xml:space="preserve" xmlns="http://www.w3.org/2000/svg">
		<polygon points="357 35.7 321.3 0 178.5 142.8 35.7 0 0 35.7 142.8 178.5 0 321.3 35.7 357 178.5 214.2 321.3 357 357 321.3 214.2 178.5"/>
		</svg>
		`;

	document.querySelector(
		`.row-${positions.end.y} .block-${positions.end.x}`
	).classList += " ending";

	endY = positions.end.y
	endX = positions.end.x

}

renderArea();
renderPoints();

//build walls on hold mouse button

mousedown = false;
document.body.onmousedown = function () {
	mousedown = true;
};
document.body.onmouseup = function () {
	mousedown = false;
};

$(".block").on("mousedown mouseup", function mouseState(e) {
	if (e.type == "mousedown") {
		$(document).on("mouseover", ".block", function (e) {
			let row = $(this).parent()[0].classList.value.split("-")[1].split(" ")[0]
			let col = this.classList.value.split("-")[1].split(" ")[0]
			if (
				mousedown && !this.classList.contains("ending") &&
				!this.classList.contains("starting")
			) {
				if (this.classList.contains("wall")) {
					this.classList.remove("wall");
					board[col][row] = 1
				}
				else {
					board[col][row] = 0
					this.classList.add("wall");
				}
			}
		});
	} else {
		$(document).off("mousedown mouseup");
	}
});
