<?php
$analyticsHTML = config('advanced-config.analytics');
$analyticsHTML = preg_replace("~<!--(.*?)-->~s", "", $analyticsHTML);
$analyticsHTML = trim($analyticsHTML);
$rewardButtonURL = env('REWARD_BUTTON_URL');

if (substr($_SERVER['REQUEST_URI'], 0, 2) !== '/@') {
    echo "<script src=\"{$rewardButtonURL}?onelink=dd1400dd-c412-4633-b076-1ea09877b806\"></script>";
    echo "<script>window.fwSettings={'widget_id':154000003485};";
	echo "!function(){if(\"function\"!=typeof window.FreshworksWidget){var n=function(){n.q.push(arguments)};n.q=[],window.FreshworksWidget=n}}()</script>";
    echo "<script type='text/javascript' src='https://widget.freshworks.com/widgets/154000003485.js' async defer></script>";
} 
?>

@if(preg_replace( "/\r|\n/", "", $analyticsHTML ) != '')
   
<!-- Analytics -->

{!! $analyticsHTML !!}

<!-- /Analytics -->
@endif