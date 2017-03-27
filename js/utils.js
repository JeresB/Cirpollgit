'use strict';

function ajaxRequest(type, request, callback, data = null) {
  var xhr;

  if (type == 'GET') {
    request += '?' + data;
  }

  xhr = new XMLHttpRequest();
  xhr.open(type, request, true);

  xhr.onreadystatechange = function(){
    if (xhr.readyState != 4) {
      return;
    }

    switch (xhr.status) {
      case 200:
        callback(xhr.responseText);
        break;
      default:
        httpErrors(xhr.status);
    }
  };

  xhr.send(data);
}

function callback(response) {
  var divPolls = document.getElementById('polls');

  var text = '<div class = "alert alert-success" role="alert">';
  text += '<strong>' + response + '</strong></div>';
  divPolls.innerHTML = text;
}


function httpErrors(errorNumber) {
  var divErrors = document.getElementById('errors');

  var text = '<div id = "errors" class = "alert alert-danger" role = "alert">';
  text += '<span class = "glyphicon glyphicon-exclamation-sign"></span>';

  switch (errorNumber) {
    case 400:
      text += '<strong> Requête incorrecte</strong>';
      break;
    case 401:
      text += '<strong> Authentifiez vous</strong>';
      break;
    case 403:
      text += '<strong> Accès refusé</strong>';
      break;
    case 404:
      text += '<strong> Page non trouvé</strong>';
      break;
    case 500:
      text += '<strong> Erreur interne du serveur</strong>';
      break;
    case 503:
      text += '<strong> Service indisponible</strong>';
      break;
    default:
      text += '<strong> HTTP erreur : ' + errorNumber + '</strong>';
      break;
  }

  text += '</div>';
  divErrors.innerHTML = text;
}

function loadHtmlAndJs(ajaxResponse) {
  var response = JSON.parse(ajaxResponse);

  $('#'+response.divId).load(response.html);
  $.getScript(response.js);
}
