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
                                  <!--iframe loading="lazy" style="width: 100%;height: 600px;" src="{{env('REWARD_URL')}}"></iframe-->
                                  <embed class="holds-the-iframe" style="width: 100%;height: 800px;" src="{{env('REWARD_URL')}}"></embed>
                              </div>
                          </section>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

@endsection
