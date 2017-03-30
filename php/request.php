<?php
	require_once('database.php');
	// We check the request type.
	$request = substr($_SERVER['PATH_INFO'], 1);

	// We check if the request is a module.
	if (is_dir('../'.$request))
	{
		// We extract the module name.
		$moduleName = substr($request, strrpos($request, '/') + 1);
		sendHtmlAndJsData('polls', $request, $moduleName);
	}
	else
  {
		$db = dbConnect();

		if ($db != false) {
			$request_explode = explode('/', $request);
			$requestType = $_SERVER['REQUEST_METHOD'];
			if(array_shift($request_explode) == 'polls')
			{
				$data = NULL;
				console.log("connexion a la bdd");

				if ($requestType == 'GET') {
					if (isset($_GET['login']))
						$data = dbRequestPolls($db, -1, $_GET['login']);
					else
						$data = dbRequestPolls($db);
					var_dump($data);
				}
				if ($data != NULL)
					sendJsonData();
			}
		} else {
			header('HTTP/1.1 503 Service Unavailable');
			exit;
		}

		header('HTTP/1.1 400 Bad request');
		exit;
	}


	//----------------------------------------------------------------------------
	//--- sendHtmlAndJsData ------------------------------------------------------
	//----------------------------------------------------------------------------
	function sendHtmlAndJsData($divId, $modulePath, $moduleName)
	{
	  // We create the data (Html and Js).
	  $data = array ('html' => $modulePath.'/'.$moduleName.'.html',
			'divId' => $divId, 'js' => $modulePath.'/'.$moduleName.'.js');
		sendJsonData($data);
	}

	//----------------------------------------------------------------------------
	//--- sendJsonData -----------------------------------------------------------
	//----------------------------------------------------------------------------
	function sendJsonData($data, $code = 200)
	{
	  // We send the data to the client.
	  header('Content-Type: text/plain; charset=utf-8');
	  header('Cache-control: no-store, no-cache, must-revalidate');
	  header('Pragma: no-cache');
		header('HTTP/1.1 200 OK');
	  echo json_encode($data);
		exit;
	}
?>
