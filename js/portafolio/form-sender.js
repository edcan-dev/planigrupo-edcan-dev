
const FORM_POST_URL = "https://webto.salesforce.com/servlet/servlet.WebToLead?encoding=UTF-8";

document.querySelector('.portfolioContactForm')
  .addEventListener('submit', async (ev) => {
    ev.preventDefault();

    const form = ev.target;

    const formData = new FormData(form)


    try {

      const response = await fetch(FORM_POST_URL , {
        method: "POST",
        mode: "no-cors",
        // Set the FormData instance as the request body
        body: formData,
      });

      console.log(response.status);

      if(response.status > 400) {
        const alertContent = {
          title: 'Error!',
          text: 'Ocurrió un error al enviar el correo',
          icon: 'error',
        }      
        renderAlert(alertContent);

      } else {

        const alertContent = {
          title: 'Correo enviado!',
          text: 'El correo se ha enviado con éxito!',
          icon: 'success'
        }
        renderAlert(alertContent);
        clearForm();
      }

    } catch (e) {
      console.error(e);
    }


  });

function clearForm() {
  document.getElementById('first_name').value = ''
  document.getElementById('company').value = ''
  document.getElementById('last_name').value = ''
  document.getElementById('phone').value = ''
  document.getElementById('phone').value = ''
  document.getElementById('email').value = ''
  document.getElementById('00N5A00000HQFp4').value = ''
  document.getElementById('00Ni000000Dwzjf').value = ''
  document.getElementById('00Ni000000Ekl2M').value = ''
}
function renderAlert( {title, text, icon } ) {
  Swal.fire({
    title,
    text,
    icon,
    confirmButtonText: 'Continuar'
  })

}