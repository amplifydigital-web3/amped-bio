<!DOCTYPE html>
@include('layouts.lang')
<head>
   @include('linkstack.modules.meta')
   @include('linkstack.modules.theme')
   @stack('linkstack-head')
   @include('linkstack.modules.assets')
   @foreach($information as $info)
   @stack('linkstack-head-end')

   @if (strlen($userinfo->reward_business_id) > 0)
      <script src="{{env('REWARD_BUTTON_URL')}}?onelink={{ $userinfo->reward_business_id }}"></script>
   @endif
   <script>
      window.fwSettings={'widget_id':154000003485};
	   !function(){if("function"!=typeof window.FreshworksWidget){var n=function(){n.q.push(arguments)};n.q=[],window.FreshworksWidget=n}}()
   </script>
   <script type='text/javascript' src='https://widget.freshworks.com/widgets/154000003485.js' async defer></script>
</head>

<body>
   @stack('linkstack-body-start')
   @include('linkstack.modules.admin-bar')
   @include('linkstack.modules.share-button')
   @include('linkstack.modules.report-icon')
   <div class="container">
      <!--div id="connect-react" style="width: 500px;height: 50px"></div-->
      <div class="row">
         <div class="column" style="margin-top: 5%">
            @include('linkstack.elements.avatar')
            @include('linkstack.elements.heading')
            @include('linkstack.elements.bio')
            @include('linkstack.elements.icons')
            @endforeach
            @include('linkstack.elements.buttons')
            @include('linkstack.modules.footer')
         </div>
      </div>
   </div>
   @stack('linkstack-body-end')
</body>
</html>