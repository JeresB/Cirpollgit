<?php
require_once('constants.php');

function dbConnect() {
  try {
    $pdo = new PDO("mysql:host=".DB_SERVER.";port=3306;dbname=".DB_NAME.";charset=utf8", DB_USER, DB_PASSWORD);
  } catch (PDOException $e) {
    error_log('Connexion échouée : '.$e->getMessage());
    return false;
  }
  return $pdo;
}


function dbRequestPolls($db, $id = -1, $login = '') {
  try {
    $request = "SELECT * FROM polls ";

    if ($id != -1) $request .= "WHERE id = :id ";
    if ($login != '') $request .= "WHERE login = :login";

    $query = $db->prepare($request);

    if ($id != -1) $query->bindParam(":id", $id, PDO::PARAM_INT);
    if ($login != '') $query->bindParam(":login", $login, PDO::PARAM_STR, 20);

    $query->execute();
    $row = $query->fetchAll(PDO::FETCH_ASSOC);

  } catch (PDOException $e) {
    error_log('Requête échouée : '.$e->getMessage());
    return false;
  }

  return $row;
}

//$db = dbConnect();
//var_dump(dbRequestPolls($db));
