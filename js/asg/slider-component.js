/**
 * author: edcan-dev
 */
class SliderComponent {

    constructor(selector, interval) {
        this.selector = selector;
        this.interval = interval;
    }

    initialize() {
        const list = document.querySelectorAll(this.selector)

        setInterval(() => {
            list.item(1).classList.toggle('invisible')
            list.item(0).classList.toggle('invisible')
        },this.interval)
    }

}

const asu = new SliderComponent('.hero__text__content__p', 3000).initialize();