document.querySelectorAll('.property__arrow')
    .forEach(arrow => {
        arrow.addEventListener('click',() => {

            const card = document.querySelector('.carousell__card')


            const scrollValue = 
            window.innerWidth > 600 ? 
            window.innerWidth * .65 :
            window.innerWidth * .75 ;

            if (arrow.classList.contains('property__arrow--previous')) {

                scrollCarousell(
                        (scrollValue) * -1
                    );
                } else {
                    scrollCarousell(
                        scrollValue
                    );
            }
        });
    });

const scrollCarousell = ( value ) => {
    document.querySelector('.carousell__container').scrollBy({
        left: value,
        behavior: "smooth",
        top: 0
    })
}