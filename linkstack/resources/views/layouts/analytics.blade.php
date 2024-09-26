<?php
$analyticsHTML = config('advanced-config.analytics');
$analyticsHTML = preg_replace("~<!--(.*?)-->~s", "", $analyticsHTML);
$analyticsHTML = trim($analyticsHTML);
?>

@if(preg_replace( "/\r|\n/", "", $analyticsHTML ) != '')
<!-- Analytics -->

{!! $analyticsHTML !!}

<!-- /Analytics -->
@endif

<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-RJJX8Q9P3R"></script>
<script> window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'G-RJJX8Q9P3R'); </script>
<!-- End of Google tag (gtag.js) --> 

<!-- Plausible analytics -->
<script defer data-domain="onelink.npayme.io" src="https://plausible.io/js/script.js"></script>
<!-- End of Plausible analytics -->