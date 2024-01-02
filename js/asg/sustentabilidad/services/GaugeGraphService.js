    // Datos de ejemplo (reemplázalos con tus datos)
    var datos = {
        directores: 8,
        inquilinos: 8,
        inversionistas: 7,
        proveedores: 7,
        bancos: 24,
        colaboradores: 13,
        consejo: 26,
        otros: 7,
        interno: 40,
        externo: 60
    };
   console.log(datos);

    // Configuración común para las gráficas
    var configuracionComun = {
        type: 'doughnut',
        cutoutPercentage: 85,
        rotation: -Math.PI,
        circumference: Math.PI,
        legend: {
            display: false
        },
        tooltips: {
            enabled: false
        },
        animation: {
            onComplete: function(animation) {
                // Muestra el porcentaje en el centro de la gráfica
                var ctx = this.chart.ctx;
                ctx.font = '12px Arial';
                ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                var centerX = (this.chart.width - this.chart.scales['y-axis-0'].left) / 2;
                var centerY = (this.chart.height + this.chart.scales['y-axis-0'].top) / 2;
                ctx.fillText(this.config.data.porcentaje + '%', centerX, centerY);

                // Actualiza la leyenda con el porcentaje
                document.getElementById('leyenda' + this.config.data.id).innerText = this.config.data.id + ': ' + this.config.data.porcentaje + '%';
            }
        }
    };

    // Función para crear una gráfica específica
    function crearGrafica(idCanvas, porcentaje, leyenda) {
        var ctx = document.getElementById(idCanvas).getContext('2d');

        var config = {
            ...configuracionComun,
            data: {
                id: leyenda,
                porcentaje: porcentaje,
                datasets: [{
                    data: [porcentaje, 100 - porcentaje],
                    backgroundColor: [
                        '#0096a9',
                        'rgba(169, 169, 169, 0.7)'
                    ],
                    borderWidth: 0,
                }]
            }
        };

        // Crear la gráfica
        var chart = new Chart(ctx, config);

        // Agregar leyenda
        var leyendaElement = document.getElementById('leyenda' + leyenda);
        leyendaElement.innerText = leyenda + ': ' + porcentaje + '%';

        return chart;
    }

    // Crear gráficas con los datos proporcionados
    crearGrafica('graficaDirectores', datos.directores, 'Directores');
    crearGrafica('graficaInquilinos', datos.inquilinos, 'Inquilinos');
    crearGrafica('graficaInversionistas', datos.inversionistas, 'Inversionistas');
    crearGrafica('graficaProveedores', datos.proveedores, 'Proveedores');
    crearGrafica('graficaBancos', datos.bancos, 'Bancos');
    crearGrafica('graficaColaboradores', datos.colaboradores, 'Colaboradores');
    crearGrafica('graficaConsejo', datos.consejo, 'Consejo');
    crearGrafica('graficaOtros', datos.otros, 'Otros');
    crearGrafica('graficaInterno', datos.interno, 'Interno');
    crearGrafica('graficaExterno', datos.externo, 'Externo');
