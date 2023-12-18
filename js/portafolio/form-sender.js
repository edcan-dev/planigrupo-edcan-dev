
const FORM_POST_URL = "https://webto.salesforce.com/servlet/servlet.WebToLead?encoding=UTF-8";

document.querySelector('.portfolioContactForm')
  .addEventListener('submit', async (ev) => {
    ev.preventDefault();

    const form = ev.target;

    const formData = new FormData(form)

    console.log(Object.fromEntries(formData));

    try {

      const response = await fetch(FORM_POST_URL , {
        method: "POST",
        // Set the FormData instance as the request body
        body: formData,
      });

      console.log(await response.json());

      const alertContent = {
        title: 'Correo enviado!',
        text: 'El correo se ha enviado con éxito!',
        icon: 'success'
      }

      renderAlert(alertContent);


    } catch (e) {

      const alertContent = {
        title: 'Error!',
        text: 'Ocurrió un error al enviar el correo',
        icon: 'error',
      }

      renderAlert(alertContent);

      console.error(e);
    }


  });

function renderAlert( {title, text, icon } ) {
  Swal.fire({
    title,
    text,
    icon,
    confirmButtonText: 'Continuar'
  })
  
}