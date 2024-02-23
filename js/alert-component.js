document.querySelector('.alert-button_container > button').addEventListener('click', (ev) => {

  document.querySelector('.alert').classList.add('alert-clicked');
  setTimeout(()=> {
    document.querySelector('.alert').style.display = 'none';
  }, 300);
})