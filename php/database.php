<?php
include 'constants.php';

function dbConnect() {
  try {
    $pdo = new PDO("mysql:host=".DB_SERVER.";port=3306;dbname=".DB_NAME.";", DB_USER, DB_PASSWORD);
  } catch (PDOException $e) {
    echo 'Connexion échouée : '.$e->getMessage();
    return false;
  }
  return $pdo;
}

function dbRequestPolls($db, $id = -1, $login = '') {
  $request = "SELECT * FROM polls ";

  if ($id != -1) $request .= "WHERE id = :id ";
  if ($login != '') $request .= "AND login = :login";

  $query = $db->prepare($request);

  if ($id != -1) $query->bindParam(":id", $id);
  if ($login != '') $query->bindParam(":login", $login);

  $query->execute();
  $row = $query->fetchAll(PDO::FETCH_ASSOC);
  var_dump($row);
}

$db = dbconnect();
dbRequestPolls($db, -1, '');
