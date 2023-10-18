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
		data: [
			['PLANIGRUPO: CREANDO VALOR', 'SOMOS UNA EMPRESA MEXICANA LÍDER EN EL DESARROLLO, DISEÑO, CONSTRUCCIÓN, COMERCIALIZACIÓN Y ADMINISTRACIÓN DE CENTROS COMERCIALES A NIVEL NACIONAL.'],
			['ENFOQUE', 'Nuestro enfoque principal es crear valor para nuestros inversionistas, socios, clientes y usuarios mediante una cartera de propiedades que les ofrezca una oferta invaluable con los más altos estándares de calidad.'],
			['EXPERIENCIA', 'Contamos con más de 47 años de experiencia cambiando la manera de ver, diseñar y desarrollar centros comerciales.'],
			['Planigrupo En Números', 'Con más de 1,200 inquilinos distribuidos en aproximadamente 814,000 m2 de área rentable (GLA) en sus centros comerciales administrados, Planigrupo en el 2021 recibió más de 99.1 millones de visitantes.']
		],
		interval: 5000
	}
);

infoSlider.configure()