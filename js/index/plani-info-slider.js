import slides from '../../data/index.plan-info.slider.json' assert {type: 'json'};

class InfoSlider {
	#data;
	#interval

	constructor({ data, interval }) {
		this.#data = data;
		this.#interval = interval;
	}

	configure() {

		let currentText = 1;

		setInterval(() => {

			if (currentText == 4) currentText = 0;

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

			currentText++;

		}, this.#interval)
	}

}





const infoSlider = new InfoSlider(
	{
		data: slides.slides,
		interval: 5000
	}
);

infoSlider.configure()