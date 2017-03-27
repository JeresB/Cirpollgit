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
  $query = $db->prepare("SELECT * FROM polls WHERE id = :id AND login = :login");
  $query->execute(array(':id' => $id, ':login' => $login));
  $row = $query->fetchAll(PDO::FETCH_ASSOC);
  var_dump($row);
}

$db = dbconnect();
dbRequestPolls($db, 1, 'cir2');
