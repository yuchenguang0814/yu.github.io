<?php
require_once 'config.php';
function xiu_get_connect(){
    $connect = mysqli_connect(DB_HOST,DB_UESR,DB_PASS,DB_NAME);
    if(empty($connect)){
        exit('数据库连接失败');
    }
    return $connect;
}
function xiu_get_query($connect,$sql){
    mysqli_query($connect,"SET NAMES utf8;");
    $query = mysqli_query($connect,$sql);
    if(empty($query)){
        return fasle;
    }
    return $query;
}
function xiu_fetch_all($sql){
    $connect = xiu_get_connect();
    $query = xiu_get_query($connect,$sql);
    while($row = mysqli_fetch_assoc($query)){
        $result [] = $row;
    }
    mysqli_free_result($query);
    mysqli_close($connect);
    if(empty($result)){
        return null;
    }else{
    return $result;
    }
}
function xiu_fetch_one($sql){
    $res = xiu_fetch_all($sql);
    return isset($res[0])?$res[0]:null;
}

function xiu_execute($sql){
    $connect = xiu_get_connect();
    $query = xiu_get_query($connect,$sql);
    $affected_rows = mysqli_affected_rows($connect);
    mysqli_close($connect);
    return $affected_rows;
}
session_start();
function get_current(){
    if(empty($_SESSION['current_login_user'])){
        return false;
    }
    return $_SESSION['current_login_user'];
}




