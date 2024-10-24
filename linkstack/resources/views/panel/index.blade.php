@extends('layouts.sidebar')


@section('content')
<div class="conatiner-fluid content-inner mt-n5 py-0">
    <div class="row">
        <div id="dashboard-topLinks-react">
            Top Links
        </div>

        @if(auth()->user()->role == 'admin' && !config('linkstack.single_user_mode'))
        <div id="dashboard-adminStats-react">
            Dashboard Statistics
        </div>
        @endif

    </div>
</div>
@endsection
