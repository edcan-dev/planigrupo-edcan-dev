const language = document.head.querySelector("[property~=language][content]").content;
console.log(language);

document.querySelectorAll('.historia__timeline__selector')
  .forEach((selector, index, list) => {
    selector
      .addEventListener('click', () => {

        list.forEach(sel => {

          sel.classList.remove('historia__timeline__selector--selected');

          if (sel.classList.contains(selector.classList[1])) {
            sel.classList.add('historia__timeline__selector--selected')
            setActiveTab(selector.classList[1])
          }
        })



      })
  })

function setActiveTab(selected) {
  document.querySelectorAll('.historia__card')
    .forEach(tab => {

      tab.classList.add('inactive');

      console.log(selected);

      switch (selected) {

        case 'historia__timeline__selector--1':
          activateTab('.historia__card--tab1')
          break;
        case 'historia__timeline__selector--2':
          activateTab('.historia__card--tab2')
          break;
        case 'historia__timeline__selector--3':
          activateTab('.historia__card--tab3')
          break;

        case 'historia__timeline__selector--4':
          activateTab('.historia__card--tab4')
          break;

        case 'historia__timeline__selector--5':
          activateTab('.historia__card--tab5')
          break;

        case 'historia__timeline__selector--6':
          activateTab('.historia__card--tab6')
          break;
      }

    })
}

function activateTab(tab) {
  console.log(tab);
  document.querySelector(tab).classList.add('active')
  document.querySelector(tab).classList.remove('inactive')
}




var accordion = new ej.navigations.Accordion({
  expandMode: 'Single',
  items: [
    {
      header: '2020 ',
      expanded: false,
      content: `
      <div class="historia__card historia__card--tab6 historia__card--resp ">
      
      <div class="historia__card__item historia__card--resp__item">
        <div class="historia__card__item__img historia__card--resp__item__img historia__card__item__img--27">
        </div>
        <div class="historia__card__item__text historia__card--resp__item__text">
          <span>2022</span>
          <p>
          ${
            language == 'english'
            ? 'Grupo Mexico, through Grupo Inmobiliario UPAS, S.A. de C.V., acquires 95.47% of the shares of Planigrupo.'
            : '  Grupo México a través de Grupo Inmobiliario UPAS, S.A. de C.V. Adquiere el 95.47% de las Acciones de Planigrupo.'
          }
          </p>
        </div>
      </div>
        <div class="historia__card__item historia__card--resp__item">
          <div class="historia__card__item__img historia__card--resp__item__img historia__card__item__img--24">
          </div>  
          <div class="historia__card__item__text historia__card--resp__item__text">
            <span>2022</span>
            <p>
              ${
                language == 'english'
                ? 'PLANICK 12 -CKD assets divested and 100% of 11 properties acquired'
                : 'Se realiza la desinversión de activos PLANICK 12 -CKD y la adquisición del 100% de 11 propiedades.'
              }
            </p>
          </div>
        </div>


        <div class="historia__card__item historia__card--resp__item">
          <div class="historia__card__item__img historia__card--resp__item__img historia__card__item__img--25">
          </div>  
          <div class="historia__card__item__text historia__card--resp__item__text">
            <span>2023</span>
            <p>
              GMInmobiliaria.
            </p>
          </div>
        </div>

      </div>
    ` },
    {
      header: '2010 ',
      expanded: false,
      content: `
      <div class="historia__card historia__card--tab5 historia__card--resp">
        <div class="historia__card__item historia__card--resp__item">
          <div class="historia__card__item__img historia__card--resp__item__img historia__card__item__img--17">
          </div>
          <div class="historia__card__item__text historia__card--resp__item__text">
            <span>2011</span>
            <p>
            ${
              language == 'english'
              ? 'Plaza Bella Los Almendros, Macroplaza Stadium and Plaza Bella Frontera are built.'
              : 'Se construyen Plaza Bella Los Almendros, Macroplaza Estadio y Plaza Bella Frontera.'
            }
            </p>
          </div>
        </div>

        <div class="historia__card__item historia__card--resp__item">
          <div class="historia__card__item__img historia__card--resp__item__img historia__card__item__img--18">
          </div>
          <div class="historia__card__item__text historia__card--resp__item__text">
            <span>2012</span>
            <p>
              ${
                language == 'english'
                ? 'Placement of a certificate of development program (CKD). Paseo Santa Catarina is acquired and Mall Plaza Lincoln begins to be managed.'
                : 'Colocación de un programa de certificados de desarrollo (CKD). Se adquiere Paseo Santa Catarina y se comienza a administrar Mall Plaza Lincoln.'
              } 
            </p>
          </div>
        </div>

        <div class="historia__card__item historia__card--resp__item">
          <div class="historia__card__item__img historia__card--resp__item__img historia__card__item__img--19">
          </div>
          <div class="historia__card__item__text historia__card--resp__item__text">
            <span>2013</span>
            <p>
            ${
              language == 'english'
              ? 'Paseo Puebla Suburbia Santa Catarina and Macroplaza Oaxaca are built. Two portfolios are acquired: one of 9 shopping centers and one of 4 shopping centers.'
              : 'Se construye Paseo Puebla, Suburbia Santa Catarina y Macroplaza Oaxaca. Se adquieren dos portafolios: uno de 9 centros comerciales y uno de 4 centros comerciales.'
            }
            </p>
          </div>
        </div>

        <div class="historia__card__item historia__card--resp__item">
          <div class="historia__card__item__img historia__card--resp__item__img historia__card__item__img--20">
          </div>
          <div class="historia__card__item__text historia__card--resp__item__text">
            <span>2014</span>
            <p>
            ${
              language == 'english'
              ? 'Macroplaza San Luis and Paseo Alcalde are built. The properties of Ensenada and Los Cabos and a portfolio of 9 shopping centers are acquired.'
              : 'Se construyen Macroplaza San Luis y Paseo Alcalde. Se adquieren las propiedades de Ensenada y Los Cabos y un portafolio de 9 centros comerciales.'
            }
            </p>
          </div>
        </div>

        <div class="historia__card__item historia__card--resp__item">
          <div class="historia__card__item__img historia__card--resp__item__img historia__card__item__img--21">
          </div>
          <div class="historia__card__item__text historia__card--resp__item__text">
            <span>2015</span>
            <p>
              ${
                language == 'english'
                ? 'Paso Hipódromo and Paseo Solidaridad are built.'
                : 'Se construyen Paso Hipódromo y Paseo Solidaridad.'
              }
            </p>
          </div>
        </div>

        <div class="historia__card__item historia__card--resp__item">
          <div class="historia__card__item__img historia__card--resp__item__img historia__card__item__img--22">
          </div>
          <div class="historia__card__item__text historia__card--resp__item__text">
            <span>2016</span>
            <p>
            ${
              language == 'english'
              ? 'Urban Village Garza Sada is built.'
              : 'Se construye Urban Village Garza Sada.'
            }  
            </p>
          </div>
        </div>

        <div class="historia__card__item historia__card--resp__item">
          <div class="historia__card__item__img historia__card--resp__item__img historia__card__item__img--23">
          </div>
          <div class="historia__card__item__text historia__card--resp__item__text">
            <span>2017</span>
            <p>
            ${
              language == 'english'
              ? 'The properties of Punto San Isidro and Punto Oriente are acquired.'
              : 'Se adquieren las propiedades de Punto San Isidro y Punto Oriente.'
            }
            </p>
          </div>
        </div>
      </div>
    ` },
    {
      header: '2000 ',
      expanded: false,
      content: `
      <div class="historia__card historia__card--tab4 historia__card--resp">

        <div class="historia__card__item historia__card--resp__item">
          <div class="historia__card__item__img historia__card--resp__item__img historia__card__item__img--9">
          </div>
          <div class="historia__card__item__text historia__card--resp__item__text">
            <span>2000</span>
            <p>
            ${
              language == 'english'
              ? '5 more HEBs are built.'
              : 'Se construyen 5 HEBs más.'
            }
            </p>
          </div>
        </div>

        <div class="historia__card__item historia__card--resp__item">
          <div class="historia__card__item__img historia__card--resp__item__img historia__card__item__img--10">
          </div>
          <div class="historia__card__item__text historia__card--resp__item__text">
            <span>2001</span>
            <p>
            ${
              language == 'english'
              ? '4 more HEBs are built.'
              : 'Se construyen 4 HEBs más.'
            }
            </p>
          </div>
        </div>

        <div class="historia__card__item historia__card--resp__item">
          <div class="historia__card__item__img historia__card--resp__item__img historia__card__item__img--11">
          </div>
          <div class="historia__card__item__text historia__card--resp__item__text">
            <span>2002</span>
            <p>
            ${
              language == 'english'
              ? 'Plaza Real Monterrey and Plaza Bella Anahuac are built.'
              : 'Se construye Plaza Real Monterrey y Plaza Bella Anáhuac.'
            }
            </p>
          </div>
        </div>

        <div class="historia__card__item historia__card--resp__item">
          <div class="historia__card__item__img historia__card--resp__item__img historia__card__item__img--12">
          </div>
          <div class="historia__card__item__text historia__card--resp__item__text">
            <span>2005</span>
            <p>
            ${
              language == 'english'
              ? 'Plaza Real Reynosa, Plaza Universidad and Super Plaza Las Haciendas are built.'
              : 'Se construyen Plaza Real Reynosa, Plaza Universidad y Super Plaza Las Haciendas.'
            }
            </p>
          </div>
        </div>

        <div class="historia__card__item historia__card--resp__item">
          <div class="historia__card__item__img historia__card--resp__item__img historia__card__item__img--13">
          </div>
          <div class="historia__card__item__text historia__card--resp__item__text">
            <span>2006</span>
            <p>
            ${
              language == 'english'
              ? 'Plaza Real San Luis, La Nogalera, Macroplaza Insurgentes and Plaza Bella Mexiquense are built.'
              : 'Se construyen Plaza Real San Luis, La Nogalera, Macroplaza Insurgentes y Plaza Bella Mexiquense.'
            }
            </p>
          </div>
        </div>

        <div class="historia__card__item historia__card--resp__item">
          <div class="historia__card__item__img historia__card--resp__item__img historia__card__item__img--14">
          </div>
          <div class="historia__card__item__text historia__card--resp__item__text">
            <span>2007</span>
            <p>
            ${
              language == 'english'
              ? 'Pabellon Reforma Querétaro, Mérida and Plaza Monumental are built.'
              : 'Se construyen Pabellón Reforma Querétaro, Mérida y Plaza Monumental'
            }
            </p>
          </div>
        </div>

        <div class="historia__card__item historia__card--resp__item">
          <div class="historia__card__item__img historia__card--resp__item__img historia__card__item__img--15">
          </div>
          <div class="historia__card__item__text historia__card--resp__item__text">
            <span>2008</span>
            <p>
            ${
              language == 'english'
              ? 'Plaza Bella Valladolid, Rio Bravo, Plaza Bella Ramos Arizpe are built. They begin to administer Gran Plaza Cancun and Plaza Palmira.'
              : 'Se construyen Plaza Bella Valladolid, Rio Bravo, Plaza Bella Ramos Arizpe. Se comienzan a administrar Gran Plaza Cancún y Plaza Palmira.'
            }
            </p>
          </div>
        </div>

        <div class="historia__card__item historia__card--resp__item">
          <div class="historia__card__item__img historia__card--resp__item__img historia__card__item__img--16">
          </div>
          <div class="historia__card__item__text historia__card--resp__item__text">
            <span>2009</span>
            <p class="historia__card__item__text--overflow">
            ${
              language == 'english'
              ? 'Plaza Bella Valladolid, Rio Bravo, Plaza Bella Ramos Arizpe are built. They begin to administer Gran Plaza Cancun and Plaza Palmira.'
              : 'Se construyen Plaza Bella Oaxaca, Plaza Bella San Gaspar, Plaza Bella Huinalá, Plaza Bella Acuña, Plaza Bella La Palma, Macroplaza Los Héroes y Macroplaza Puerto Vallarta.'
            }
            </p>
          </div>
        </div>
      </div>
    ` },
    {
      header: '1990 ',
      expanded: false,
      content: `
      <div class="historia__card historia__card--tab3 historia__card--resp">
        <div class="historia__card__item historia__card--resp__item">
          <div class="historia__card__item__img historia__card--resp__item__img historia__card__item__img--6">
          </div>
          <div class="historia__card__item__text historia__card--resp__item__text">
            <span>1992</span>
            <p>
            ${
              language == 'english'
              ? 'Plaza Bella Pachuca is built.              '
              : 'Se construye Plaza Bella Pachuca.'
            }
            </p>
          </div>
        </div>

        <div class="historia__card__item historia__card--resp__item">
          <div class="historia__card__item__img historia__card--resp__item__img historia__card__item__img--7"></div>
          <div class="historia__card__item__text historia__card--resp__item__text">  
            <span>1998</span>
          <p>
          ${
            language == 'english'
            ? 'Offices are opened in the City of Monterrey.'
            : 'Se abren las oficinas en la ciudad de Monterrey.'
          }
          </p>
        </div>
      </div>


      <div class="historia__card__item historia__card--resp__item">
        <div class="historia__card__item__img historia__card--resp__item__img historia__card__item__img--8">
        </div>
        <div class="historia__card__item__text historia__card--resp__item__text">
          <span>1999</span>
          <p>
          ${
            language == 'english'
            ? '5 HEBs Plaza Real Saltillo are built.'
            : 'Se construyen 5 HEBs Plaza Real Saltillo.'
          }
          </p>
        </div>
      </div>

    </div>
    ` },
    {
      header: '1980',
      expanded: false,
      content: `
        <div class="historia__card historia__card--tab2 historia__card--resp">

        <div class="historia__card__item historia__card--resp__item">
          <div class="historia__card__item__img historia__card--resp__item__img historia__card__item__img--3">
          </div>
          <div class="historia__card__item__text historia__card--resp__item__text">
            <span>1982</span>
            <p>
            ${
              language == 'english'
              ? 'Plaza Bella Pachuca is built.'
              : 'Se construye la primera plaza de Planigrupo Fiesta Arboledas.'
            }
            </p>
          </div>
        </div>


        <div class="historia__card__item historia__card--resp__item">
          <div class="historia__card__item__img historia__card--resp__item__img historia__card__item__img--4">
          </div>
          <div class="historia__card__item__text historia__card--resp__item__text">
            <span>1988</span>
            <p>
            ${
              language == 'english'
              ? 'The Camelinas Fiesta square is built.'
              : 'Se construye la plaza Fiesta Camelinas.'
            }
            </p>
          </div>
        </div>


        <div class="historia__card__item historia__card--resp__item">
          <div class="historia__card__item__img historia__card--resp__item__img historia__card__item__img--5">
          </div>
          <div class="historia__card__item__text historia__card--resp__item__text">
            <span>1989</span>
            <p>
            ${
              language == 'english'
              ? 'Offices are opened in Mexico City.'
              : 'Se abren las oficinas en la Ciudad de México.'
            }
            </p>
          </div>
        </div>

      </div>
    ` },

    {
      header: 'Inicios',
      expanded: false,
      content: `
            <div class="historia__card historia__card--tab1 historia__card--resp">
              <div class="historia__card__item historia__card--resp__item">          
                <div class="historia__card__item__img historia__card--resp__item__img historia__card__item__img--1">                 
                </div>
                <div class="historia__card__item__text historia__card--resp__item__text">
                  <span>1975</span>
                  <p>
                  ${
                    language == 'english'
                    ? 'Planigrupo was founded by Eduardo Bross Tatz'
                    : 'Planigrupo fue fundada por Eduardo Bross Tatz.'
                  }
                  </p>
                </div>
              </div>

              <div class="historia__card__item historia__card--resp__item">          
                <div class="historia__card__item__img historia__card--resp__item__img historia__card__item__img--2">                 
                </div>
                <div class="historia__card__item__text historia__card--resp__item__text">
                  <span>1978</span>
                  <p>
                  ${
                    language == 'english'
                    ? 'The first plaza for the Municipality of Zapopan is built.'
                    : 'Se construye la primera plaza para el municipio de Zapopan.'
                  }
                  </p>
                </div>
              </div>
            </div>
    ` }

  ]
});

//Render initialized Accordion component
accordion.appendTo('#element');