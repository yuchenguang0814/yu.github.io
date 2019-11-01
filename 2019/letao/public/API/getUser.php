<?php
require_once 'functions.php';
$current = get_current();
$error = '';
$data ='';
if(empty($current)){
    $success = false;
    $error = 404;
}else{
    $userId = $current['id'];
    $sql = "SELECT * FROM user where id = '{$userId}';";
    $data = xiu_fetch_one($sql);
    $success = true;
}
header('Content-Type: application/json');
$json = json_encode(array('success'=> $success,'data' => $data,'error'=> $error));
echo $json;