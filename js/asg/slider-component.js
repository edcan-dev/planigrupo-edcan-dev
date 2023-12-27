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
        return this;
    }

    configureArows() {
        document.querySelectorAll('.hero__text__arrows--arrow')
            .forEach(arrow => {
                arrow.addEventListener('click', (ev) => {

                    const list = document.querySelectorAll(this.selector)

                list.item(1).classList.toggle('invisible')
                list.item(0).classList.toggle('invisible')

                    console.log(ev.target.id);

                })
            })
    }

}

const asu = new SliderComponent('.hero__text__content__p', 5000).initialize().configureArows();