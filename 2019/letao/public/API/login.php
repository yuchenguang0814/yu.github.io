<?php
  require_once 'functions.php';
  $username = $_POST['username'];
  $password = $_POST['password'];
  $sql = "SELECT * FROM user where username = '{$username}' limit 1;";
  $users = xiu_fetch_one($sql);
  $success = true;
  $messeage = 'null';
  if(empty($users)){
    $success = false;
    $messeage = '用户名不存在';
  }else{
    if($password!==$users['password']){
    $success = false;
    $messeage = "用户名和密码不匹配";
    }
  }
  //响应
  $_SESSION['current_login_user']=$users;
  header('Content-Type: application/json');
  $json = json_encode(array('success'=> $success,'messeage'=> $messeage));
  echo $json;