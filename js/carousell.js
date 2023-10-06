document.querySelectorAll('.property-card__container')
    .forEach(card => {
        if(! card.classList.contains('active')) {
            card.classList.add(['inactive'])
        }
    });