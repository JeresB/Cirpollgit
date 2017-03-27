console.log('Hello World !');

var login = $.cookie('login');

ajaxRequest('GET', 'php/request.php/module/polls/list', loadGlobalPolls);

function loadGlobalPolls(ajaxResponse) {
  console.log(ajaxResponse);
}
