<?php
$analyticsHTML = config('advanced-config.analytics');
$analyticsHTML = preg_replace("~<!--(.*?)-->~s", "", $analyticsHTML);
$analyticsHTML = trim($analyticsHTML);

$uri = $_SERVER['REQUEST_URI'];

if (substr($uri, 0, 2) == '/@') {
    echo '<script src="https://reward.npayme.io/panel.js?onelink=dd1400dd-c412-4633-b076-1ea09877b806"></script>';
} elseif (strlen($userinfo->reward_business_id) > 0) {
    echo '<script src="https://reward.npayme.io/panel.js?onelink={{ $userinfo->reward_business_id }}"></script>';
}

?>

@if(preg_replace( "/\r|\n/", "", $analyticsHTML ) != '')

<!-- Analytics -->

{!! $analyticsHTML !!}

<!-- /Analytics -->
@endif