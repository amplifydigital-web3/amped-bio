<!DOCTYPE html>
@include('layouts.lang')
<head>
   @include('linkstack.modules.meta')
   @include('linkstack.modules.theme')
   @stack('linkstack-head')
   @include('linkstack.modules.assets')
   @foreach($information as $info)
   @stack('linkstack-head-end')
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
   <!--script src="https://reward-dev.npayme.io/panel.js?onelink={{ $userinfo->reward_business_id }}"></script-->
   <script defer type="text/javascript" src="{{ asset('public/js/app.js') }}"></script>
</body>
</html>