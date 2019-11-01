<?php
require_once 'functions.php';
$current = get_current();
$error = '';
if(empty($current)){
    $success = false;
    $error = 404;
}else{
    $id = $_POST['id'];
    $sql = "DELETE FROM cart WHERE id = '{$id}';";
    $row = xiu_execute($sql);
    if($row <= 0){
        $error = 204;
    }else{
        $success =true;
    }
}
header('Content-Type: application/json');
$json = json_encode(array('success'=> $success,'error'=> $error));
echo $json;
