const response = await fetch('https://edcan-dev.github.io/planigrupo-edcan-dev/data/index.plan-info.slider.json');
//const response = await fetch('../../data/index.plan-info.slider.json');
const slides = response.json();

class InfoSlider {
	#data;
	#interval

	currentText = 1;
	
	constructor({ data, interval }) {
		this.#data = data;
		this.#interval = interval;
	}

	configure() {



		setInterval(() => {

			if (this.currentText == 4) this.currentText = 0;

			this.#changeSliderContent(this.currentText)

			this.currentText++;

		}, this.#interval)

		return this;
	}

	addSelectors() {
		document.querySelectorAll('.slider__info')
			.forEach(selector => {


				selector.addEventListener('click', (ev)=> {

					const id = ev.target.id;

					let newCurrentText = id == 'slider__info_prev'
					? this.currentText--
					: this.currentText++;

					if(newCurrentText > 2) this.currentText = 0

/* 					console.log(newCurrentText);
 */
					this.#changeSliderContent(newCurrentText)
				})
			})

	}

	#changeSliderContent(currentText) {

		switch (currentText) {
			case 0:
				document.querySelectorAll('.main__plani__info__text').forEach(text => {
					text.style.opacity = '0'
					if (text.classList.contains('main__plani__info__text--1')) {
						text.style.opacity = '100%'
					}
				})
				break;
			case 1:
				document.querySelectorAll('.main__plani__info__text').forEach(text => {
					text.style.opacity = '0'
					if (text.classList.contains('main__plani__info__text--2')) {
						text.style.opacity = '100%'
					}
				})
				break;
			case 2:
				document.querySelectorAll('.main__plani__info__text').forEach(text => {
					text.style.opacity = '0'
					if (text.classList.contains('main__plani__info__text--3')) {
						text.style.opacity = '100%'
					}
				})
				break;
			case 3:
				document.querySelectorAll('.main__plani__info__text').forEach(text => {
					text.style.opacity = '0'
					if (text.classList.contains('main__plani__info__text--4')) {
						text.style.opacity = '100%'
					}
				})
				break;
		}

	}

}





const infoSlider = new InfoSlider(
	{
		data: slides.slides,
		interval: 10000
	}
);

infoSlider.configure().addSelectors()