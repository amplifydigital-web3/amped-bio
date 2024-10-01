<!DOCTYPE html>
@include('layouts.lang')
<head>
   <!-- If it's not a user page, insert npayme Labs campaign. If it's a user and the business ID is set, use it. -->

   {{ Str::startsWith(Request::path(), "@") }}
   @if (Str::startsWith(Request::path(), "@") === false)
      <script src="https://reward.npayme.io/panel.js?onelink=dd1400dd-c412-4633-b076-1ea09877b806"></script>
   @elseif (strlen($userinfo->reward_business_id) > 0)
      <script src="https://reward.npayme.io/panel.js?onelink={{ $userinfo->reward_business_id }}"></script>
   @endif

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
</body>
</html>