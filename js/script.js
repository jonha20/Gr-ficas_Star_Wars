//EJERCICIO STAR WARS

  function paintGraph(dataset){
  
      // 2 - Tratamiento de datos
  
      // Forma 1. Ineficiente con 2 iteraciones
      // const listFilms = dataset.map((films) => `prod${films.id}`);
      // const listDate = dataset.map((films) => films.price);
  
  
      // Forma 2. Eficiente con 1 iteración
      const listFilms = [];
      const listDate = [];
      dataset.forEach((films) => {
          listFilms.push(films.title);
          let año = films.release_date.split("-")
          listDate.push(año[0]);
      });
  
      // 3 - Representación de datos en una gráfica
      var data = {
          labels: listFilms,
            series: [
              listDate
          ]
        };
        
        var options = {
          seriesBarDistance: 15,
          width: "600px",
          height: "500px",
          axisY:{
            onlyInteger:true
          }
        };
        
        var responsiveOptions = [
          ['screen and (min-width: 641px) and (max-width: 1024px)', {
            seriesBarDistance: 10,
            axisX: {
              labelInterpolationFnc: function (value) {
                return value;
              }
            }
          }],
          ['screen and (max-width: 640px)', {
            seriesBarDistance: 5,
            axisX: {
              labelInterpolationFnc: function (value) {
                return value[0];
              }
            }
          }]
        ];
        
        new Chartist.Line('.peliculas', data, options, responsiveOptions);
  
  }
  
  async function getData() {
    try {
      // 1 - Obtención de datos
      const response = await fetch("/films.json");
  
      // Verificar si la respuesta es exitosa
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error("Recurso no encontrado (404)");
        } else if (response.status === 500) {
          throw new Error("Error en el servidor (500)");
        } else {
          throw new Error(`Error HTTP: ${response.status}`);
        }
      }
  
      const data = await response.json();
      console.log(data.results);
  
      // Tratamiento + representar gráficamente los datos. Pasos 2-3
      paintGraph(data.results);
  
    } catch (error) {
      // Manejar el error de manera personalizada
      if (error.message.includes("404")) {
        console.error("Error: No se encontró el recurso solicitado.");
      } else if (error.message.includes("500")) {
        console.error("Error: Problemas con el servidor.");
      } else {
        console.error("Hubo un problema:", error.message);
      }
    }
  }
  
  getData();


//ESJERCICIO STAR WARS PERSONAJES

function paintGraph1(dataset){
  
    // 2 - Tratamiento de datos

    // Forma 1. Ineficiente con 2 iteraciones
    // const listFilms = dataset.map((films) => `prod${films.id}`);
    // const listDate = dataset.map((films) => films.price);


    // Forma 2. Eficiente con 1 iteración
    const listCharacters = [];
    const listFilms = [];
    dataset.forEach((films) => {
        listCharacters.push(films.name);
        listFilms.push(films.films.length);
    });

    // 3 - Representación de datos en una gráfica
    var data = {
        labels: listCharacters,
          series: [
            listFilms
        ]
      };
      
      var options = {
        seriesBarDistance: 15,
        width: "600px",
        height: "500px",
        axisY:{
          onlyInteger:true
        }
      };
      
      var responsiveOptions = [
        ['screen and (min-width: 641px) and (max-width: 1024px)', {
          seriesBarDistance: 10,
          axisX: {
            labelInterpolationFnc: function (value) {
              return value;
            }
          }
        }],
        ['screen and (max-width: 640px)', {
          seriesBarDistance: 5,
          axisX: {
            labelInterpolationFnc: function (value) {
              return value[0];
            }
          }
        }]
      ];
      
      new Chartist.Bar('.personajes', data, options, responsiveOptions);

}

async function getData1() {
  try {
    // 1 - Obtención de datos
    const response = await fetch("/characters.json");

    // Verificar si la respuesta es exitosa
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("Recurso no encontrado (404)");
      } else if (response.status === 500) {
        throw new Error("Error en el servidor (500)");
      } else {
        throw new Error(`Error HTTP: ${response.status}`);
      }
    }

    const data = await response.json();
    console.log(data.results);

    // Tratamiento + representar gráficamente los datos. Pasos 2-3
    paintGraph1(data.results);

  } catch (error) {
    // Manejar el error de manera personalizada
    if (error.message.includes("404")) {
      console.error("Error: No se encontró el recurso solicitado.");
    } else if (error.message.includes("500")) {
      console.error("Error: Problemas con el servidor.");
    } else {
      console.error("Hubo un problema:", error.message);
    }
  }
}

getData1();