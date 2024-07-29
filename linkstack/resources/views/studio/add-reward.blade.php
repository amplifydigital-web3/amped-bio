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
                              <div class='card-body'>
                                  <!--iframe style="width: 810px;height: 600px;" src="https://reward.npayme.io"></iframe-->
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
