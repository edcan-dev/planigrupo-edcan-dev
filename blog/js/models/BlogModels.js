export class BlogPost {

    id = 0;
    title = ''
    date = new Date();
    author = '';
    contents = [
        // {
        //     type: '',
        //     content: ''
        // }
    ];
    active = '';
    url = '';
}

export class BlogImage {
    title = ''
    url = ''
}
export class BlogVideo {
    title = ''
    iFrame = ''
}
export class BlogJournal {
    title = ''
    description = ''
    link = ''
    buttonText = ''
}

export const datesDictionary = {
    1: 'Enero',
    2: 'Febrero',
    3: 'Marzo',
    4: 'Abril',
    5: 'Mayo',
    6: 'Junio',
    7: 'Julio',
    8: 'Agosto',
    9: 'Septiembre',
    10: 'Octubre',
    11: 'Noviembre',
    12: 'Diciembre',
}