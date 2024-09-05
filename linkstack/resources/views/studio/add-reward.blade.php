@extends('layouts.sidebar')

@section('content')

<div class="conatiner-fluid content-inner mt-n5 py-0">
    <div class="row">
        <div class="col-lg-12">
            <div class="card   rounded">
                <div class="card-body">
                    <div class="row">
                        <div class="col-sm-12">

                          @push('sidebar-stylesheets')
                          <script src="{{ asset('assets/js/jquery.min.js') }}"></script>
                          @endpush

                          <section class='text-gray-400'>
                              <div class='class="holds-the-iframe'>
                                  <iframe id="iframe-npayme-reward" loading="lazy" class="holds-the-iframe" style="width: 100%;height: 800px;" src="{{env('REWARD_URL')}}"></iframe>
                                  <!--embed id="iframe-npayme-reward" class="holds-the-iframe" style="width: 100%;height: 800px;" src="{{env('REWARD_URL')}}"></embed-->
                              </div>
                              <script type="text/javascript">
                                const reward = document.getElementById("iframe-npayme-reward");
                                const t = setInterval(() => reward.contentWindow.postMessage({
                                    type: 'ping',
                                }, '*'), 1000);
                                window.addEventListener('message', message => {
                                    console.log('message data.........:',message.data);
                                    // console.log('php.... origin:','{{env('REWARD_ORIGIN')}}');
                                    if (message.origin === '{{env('REWARD_ORIGIN')}}') {
                                        switch (message.data.type) {
                                            case 'pong':
                                                clearTimeout(t);
                                                break;
                                            default:
                                        }
                                    }
                                });
                              </script>
                          </section>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

@endsection
