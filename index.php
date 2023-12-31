<?php

require_once "SxGeo.php";
//ip

function getIp(){
    $keys = [
        "HTTP_CLIENT_IP",
        "HTTP_X_FORWARDED_FOR",
        "REMOTE_ADDR"
    ];
    foreach($keys as $key) {
        if(!empty($_SERVER[$key])) {
            $ip=trim(end(explode(",",$_SERVER[$key])));
            if(filter_var($ip, FILTER_VALIDATE_IP)){
                return $ip;
            }
        }
    }
}

$ip = getIp();
var_dump($ip);
echo ("IP: ".$ip. "<br>");
