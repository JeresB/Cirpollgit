var cookieId = $.cookie('current-id');

ajaxRequest('GET', 'php/request.php/module/polls/' + cookieId, loadPollResults);
refreshResults = setInterval(ajaxRequest, 10000, 'GET','php/request.php/polls/*', loadPollResults);

function loadPollResults() {
  var response = JSON.parse(ajaxResponse);

  var title = document.getElementById('title');
  title.innerHTML = '';

  for (var i = 0; i < response.length; i++) {
    title.innerHTML = response[i].title;

    // var element;
    // var text;
    //
    // text = response[i].title;
    // text += '<span class = "badge">' + response[i].participants + '</span>';
    // element = document.createElement('a');
    // element.className = 'list-group-item';
    // element.setAttribute("href", "#");
    // element.setAttribute('id', 'gpoll-' + response[i].id);
    // element.innerHTML = text;
    // list.appendChild(element);
    //
    // $('#gpoll-' + response[i].id).unbind('click').click(
    //   function (event) {
    //     event.preventDefault();
    //
    //     clearInterval(refreshGlobal);
    //     clearInterval(refreshOwn);
    //
    //     openGlobalPoll(event.target.id);
    //   });
  }

  console.log(response);
}
