document.querySelectorAll('.property__arrow')
    .forEach(arrow => {
        arrow.addEventListener('click',() => {

            if (arrow.classList.contains('property__arrow--previous')) {

                scrollCarousell(
                    window.innerWidth < 750 ?
                    -450 :
                    -410
                );
            } else {
                scrollCarousell(
                    window.innerWidth < 750 ?
                    450 :
                    410
                );
            }
        });
    });

const scrollCarousell = ( value ) => {
    document.querySelector('.main__property-card').scrollBy({
        top: value,
        behavior: "smooth",
        left: 0
    })
}