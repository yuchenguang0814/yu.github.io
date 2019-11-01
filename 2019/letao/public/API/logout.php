<?php
  require_once 'functions.php';
  if(empty($_SESSION['current_login_user'])){
      $success = false;
  }else{
      unset($_SESSION['current_login_user']);
      $success = true;
  }
  header('Content-Type: application/json');
  $json = json_encode(array('success'=> $success));
  echo $json;