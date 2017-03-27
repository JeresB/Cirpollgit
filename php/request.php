<?php

$request = explode("/", $_SERVER['PATH_INFO']);

switch ($request[1]) {
  case 'polls':
      sendHtmlAndJsData('polls', $request[1]);
    exit;
  default:
      header('HTTP/1.1 400 Bad request');
    break;
}

function sendHtmlAndJsData($divId, $modulename) {
  $data = array(
    'html' => 'tools/'.$modulename.'/'.$modulename.'.html',
    'divId' => $divId,
    'js' => 'tools/'.$modulename.'/'.$modulename.'.js'
  );

  sendJsonData($data);
}

function sendJsonData($data) {
  header('Content-Type: text/plain;charset=utf-8');
  header('Cache-control: no-store, no-cache, must-revalidate');
  header('Pragma: no-cache');

  echo json_encode($data);
}
