/**
 * author: edcan-dev
 */
class SliderComponent {

    constructor(selector, interval) {
        this.selector = selector;
        this.interval = interval;
    }

    initialize() {
        const cards = document.querySelectorAll(this.selector)
        const cardsNodeListLength = cards.length;
        let visibleIndex;

        cards.forEach((card, index) => {
            if( !card.classList.contains('invisible')) {
                visibleIndex = index
            }
        })


        setInterval(() => {
            cards.forEach(card => card.classList.add('invisible'))


            if(visibleIndex == cardsNodeListLength ) {
                visibleIndex = 0
            } else {
                visibleIndex++;
            }

            cards.item(visibleIndex).classList.remove('invisible')

        },this.interval)

        

        // setInterval(() => {
        //     list.item(1).classList.toggle('invisible')
        //     list.item(0).classList.toggle('invisible')
        // },this.interval)
    }

}

const card = new SliderComponent('.card__content', 3000).initialize();