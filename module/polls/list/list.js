console.log('Hello World !');

var login = $.cookie('login');

ajaxRequest('GET', 'php/request.php/polls/', loadGlobalPolls);
ajaxRequest('GET', 'php/request.php/polls/', loadOwnPolls, 'login=' + login);

function loadGlobalPolls(ajaxResponse) {
  var list = document.getElementById('global-polls');
  list.innerHTML = '';
  //for (var i = 0; i < ajaxResponse["id"]; i++) {
    var a = document.createElement('a');
    a.className = 'list-group-item';
    a.setAttribute("href", "#");
    a.id = 'gpoll-' + ajaxResponse["id"];
    a.innerHTML = ajaxResponse["title"];
    list.appendChild(a);
  //}

  //console.log(ajaxResponse);
  console.log("loadGlobalPolls" + ajaxResponse);
}

function loadOwnPolls(ajaxResponse) {
  console.log(ajaxResponse);
}
