//https://developers.google.com/gmail/api/quickstart/js
//Fuente: https://www.sitepoint.com/sending-emails-gmail-javascript-api/
var clientId = "759411052161-9ljnhtachts38s1ive8nodvlbp936b7e.apps.googleusercontent.com";
var apiKey = "AIzaSyCLMG-re7FbGQ_0u7DSxCpqBPJQqDJfYGE";

var scopes =
  'https://www.googleapis.com/auth/gmail.readonly '+
  'https://www.googleapis.com/auth/gmail.send';

function handleClientLoad() {
  gapi.client.setApiKey(apiKey);
  window.setTimeout(checkAuth, 1);
}

function checkAuth() {
  gapi.auth.authorize({
    client_id: clientId,
    scope: scopes,
    immediate: true
  }, handleAuthResult);
}

function handleAuthClick() {
  gapi.auth.authorize({
    client_id: clientId,
    scope: scopes,
    immediate: false
  }, handleAuthResult);
  return false;
}

function handleAuthResult(authResult) {
  if(authResult && !authResult.error) {
    console.log("ok");
    loadGmailApi();
  } else {
    handleAuthClick();
  }
}

function loadGmailApi() {
  gapi.client.load('gmail', 'v1');
}

//Funcion para enviar mensaje
function sendMessage(headers_obj, message, callback)
{
  var email = '';
  console.log(headers_obj);
  for(var header in headers_obj)
    console.log(header);
    email += header += ": "+headers_obj[header]+"\r\n";

  email += "\r\n" + message;
  var sendRequest = gapi.client.gmail.users.messages.send({
    'userId': 'me',
    'resource': {
      'raw': window.btoa(email).replace(/\+/g, '-').replace(/\//g, '_')
    }
  });
  return sendRequest.execute(callback);
}

//Funcion para abrir modal cuando se envie el mensaje
function gracias(){
  document.getElementById("contacto").reset(); //Limpia los campos del contacto
  $('#modal1').openModal();
}

function enviado(){
  console.log("enviado");
}
//Funcion para cerrar modal cuando se seleccione eo bonton ok
$(".modal-close").click(function(event) {
  /* Act on the event */
  $('#modal1').closeModal();
});

//Funcion que toma los datos para enviar

$("form").submit(function(event) {
  var subject1 = {},
    subject2 = {},
    mensaje1 = "",
    mensaje2 = "";
  /* Act on the event */
  var form = $(this).serializeArray();
  form.forEach(function(item){
    if (item.name === "nombre") {
          subject1.Subject = "Cartagonova Contacto";
          subject1.To = "mariobarrpach@gmail.com";
          mensaje1 = "Hola " + item.value + "Hemos recibido tu mensaje, pronto nos pondremos en contacto contigo.";
    }else if (item.name === "asunto") {
        subject2.Subject = item.value;
    }else if (item.name === "email") {
        subject2.to = item.value;
    }else if (item.name === "mensaje"){
        mensaje2 = item.value;
    }
  });
  sendMessage(subject1, mensaje1, enviado);
  sendMessage(subject2, mensaje2, gracias);
  //event.preventDefault();
  return false;
});
