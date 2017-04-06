var cookieId = $.cookie('current-id');

ajaxRequest('GET', 'php/request.php/polls/' + cookieId, loadPollResults);
refreshResults = setInterval(ajaxRequest, 10000, 'GET','php/request.php/polls/*', loadPollResults);

function loadPollResults(ajaxResponse) {
  var response = JSON.parse(ajaxResponse);

  var title = document.getElementById('title');
  title.innerHTML = '';

  var participants = document.getElementById('participants');
  participants.innerHTML = 'Le nombre de participants est : ';

  var option1 = document.getElementById('option1');
  option1.innerHTML = '';

  var option2 = document.getElementById('option2');
  option1.innerHTML = '';

  var option3 = document.getElementById('option3');
  option1.innerHTML = '';

  for (var i = 0; i < response.length; i++) {
    title.innerHTML = response[i].title;
    participants.innerHTML += response[i].participants;

    var textOption1;
    textOption1 = '1ère année';
    textOption1 += '<div class="progress"><div class="progress-bar" role="progressbar" aria-valuenow="';
    textOption1 += response[i].option1score;
    textOption1 += '" aria-valuemin="0" aria-valuemax="100" style="width:';
    textOption1 += response[i].option1score;
    textOption1 += '%">';
    textOption1 += response[i].option1score;
    textOption1 += '%';
    textOption1 += '</div></div>';

    option1.innerHTML = textOption1;

    var textOption2;
    textOption2 = '2ème année';
    textOption2 += '<div class="progress"><div class="progress-bar" role="progressbar" aria-valuenow="';
    textOption2 += response[i].option2score;
    textOption2 += '" aria-valuemin="0" aria-valuemax="100" style="width:';
    textOption2 += response[i].option2score;
    textOption2 += '%">';
    textOption2 += response[i].option2score;
    textOption2 += '%';
    textOption2 += '</div></div>';

    option2.innerHTML = textOption2;

    var textOption3;
    textOption3 = '3ème année';
    textOption3 += '<div class="progress"><div class="progress-bar" role="progressbar" aria-valuenow="';
    textOption3 += response[i].option3score;
    textOption3 += '" aria-valuemin="0" aria-valuemax="100" style="width:';
    textOption3 += response[i].option3score;
    textOption3 += '%">';
    textOption3 += response[i].option3score;
    textOption3 += '%';
    textOption3 += '</div></div>';

    option3.innerHTML = textOption3;
  }

  console.log(response);
}
