var login = $.cookie('login');

ajaxRequest('GET', 'php/request.php/polls/', loadGlobalPolls);
ajaxRequest('GET', 'php/request.php/polls/', loadOwnPolls, 'login=' + login);

refreshGlobal = setInterval(ajaxRequest, 10000, 'GET','php/request.php/polls/', loadGlobalPolls);
refreshOwn = setInterval(ajaxRequest, 10000, 'GET','php/request.php/polls/', loadOwnPolls, 'login=' + login);

function loadGlobalPolls(ajaxResponse) {
  var response = JSON.parse(ajaxResponse);

  var list = document.getElementById('global-polls');
  list.innerHTML = '';

  for (var i = 0; i < response.length; i++) {
    var element;
    var text;

    text = response[i].title;
    text += '<span class = "badge">' + response[i].participants + '</span>';
    element = document.createElement('a');
    element.className = 'list-group-item';
    element.setAttribute("href", "#");
    element.setAttribute('id', 'gpoll-' + response[i].id);
    element.innerHTML = text;
    list.appendChild(element);

    $('#gpoll-' + response[i].id).unbind('click').click(
      function (event) {
        event.preventDefault();

        clearInterval(refreshGlobal);
        clearInterval(refreshOwn);

        openGlobalPoll(event.target.id);
      });
  }

  console.log(response);
}

function loadOwnPolls(ajaxResponse) {
  var response = JSON.parse(ajaxResponse);

  var list = document.getElementById('own-polls');
  list.innerHTML = '';

  for (var i = 0; i < response.length; i++) {
    var element;
    var text;

    text = response[i].title;
    text += '<span class="pull-right">&nbsp;&nbsp;&nbsp;&nbsp;<a id="remove-poll-';
    text += response[i].id +'"><span class="glyphicon glyphicon-remove"';
    text += 'aria-hidden="true" id=rpoll-' + response[i].id +'></span></a></span>';
    text += '<span class = "badge">' + response[i].participants + '</span> ';

    element = document.createElement('a');
    element.className = 'list-group-item';
    element.setAttribute("href", "#");
    element.setAttribute('id', 'opoll-' + response[i].id);
    element.innerHTML = text;
    list.appendChild(element);

    $('#opoll-' + response[i].id).unbind('click').click(
      function (event) {
        event.preventDefault();

        clearInterval(refreshGlobal);
        clearInterval(refreshOwn);

        openOwnPoll(event.target.id);
      });
  }

  console.log(ajaxResponse);
}

function openGlobalPoll(pollId) {
  var id = pollId.substr(6);
  $.cookie('current-id', id);

  var cookieId = $.cookie('current-id');

  if (typeof cookieId == 'undefined') {
    ajaxRequest('GET', 'php/request.php/module/polls/reply', loadHtmlAndJs);
  } else {
    ajaxRequest('GET', 'php/request.php/module/polls/results', loadHtmlAndJs);
  }

}

function openOwnPoll(pollId) {
  var id = pollId.substr(6);
  $.cookie('current-id', id);

  var cookieId = $.cookie('current-id');

  if (typeof cookieId == 'undefined') {
    ajaxRequest('GET', 'php/request.php/module/polls/reply', loadHtmlAndJs);
  } else {
    ajaxRequest('GET', 'php/request.php/module/polls/results', loadHtmlAndJs);
  }
}
