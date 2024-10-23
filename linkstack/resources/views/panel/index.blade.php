@extends('layouts.sidebar')


@section('content')
<div class="conatiner-fluid content-inner mt-n5 py-0">
    <div class="row">
        <div class="col-lg-12">
            <div class="card   rounded">
                <div class="card-body">
                    <div class="row">
                        <div class="col-sm-12">
                            <h3 class="mb-4"><i class="bi bi-menu-up"></i> {{__('messages.Dashboard')}}</h3>
                            <section class="mb-3 text-center p-4 w-full">
                                <div class=" d-flex">
                                    <div class='p-2 h6'><i class="bi bi-link"></i> {{__('messages.Total Links:')}} <span class='text-primary'>{{ $links }} </span></div>
                                    <div class='p-2 h6'><i class="bi bi-eye"></i> {{__('messages.Link Clicks:')}} <span class='text-primary'>{{ $clicks }}</span></div>
                                </div>
                                <div class='text-center w-100'>
                                    <a href="{{ url('/studio/links') }}">{{__('messages.View/Edit Links')}}</a>
                                </div>
                                <div class='w-100 text-left'>
                                    <h6><i class="bi bi-sort-up"></i> {{__('messages.Top Links:')}}</h6>
                                    @php $i = 0; @endphp
                                    <div class="bd-example" >
                                        <ol class="list-group list-group-numbered" style="text-align: left;">
                                            @if($topLinks == "[]")
                                                <div class="container">
                                                    <div class="row justify-content-center mt-3">
                                                        <div class="col-6 text-center">
                                                            <p class="p-2">{{__('messages.You haven’t added any links yet')}}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            @else
                                                @foreach($topLinks as $link)
                                                    @php $linkName = str_replace('default ','',$link->name) @endphp
                                                    @php  $i++; @endphp
                                                    @php  echo $linkName; @endphp

                                                    @if($link->name !== "phone" && $link->name !== 'heading' && $link->button_id !== 96)
                                                        <li class="list-group-item d-flex justify-content-between align-items-start">
                                                            <div class="ms-2 me-auto text-truncate">
                                                                <div class="fw-bold text-truncate">{{ $link->title }}</div>
                                                                {{ $link->link }} - {{ $link->name }}
                                                            </div>
                                                            <span class="badge bg-primary rounded-pill p-2">{{ $link->click_number }} - {{__('messages.clicks')}}</span>
                                                            @if(env('ENABLE_SPOTIFY') == true && $link->title == "Spotify")
                                                                <div id="spotify-react" class="ms-2 me-auto "></div>
                                                            @endif
                                                        </li>
                                                    @endif
                                                @endforeach
                                            @endif
                                        </ol>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        @if(auth()->user()->role == 'admin' && !config('linkstack.single_user_mode'))
        <div
            id="dashboard-react"
            {{-- data-link-count={{ $links }}
            data-click-count={{ $clicks }}
            data-link-map={{ $topLinks }} --}}
            data-site-links={{ $siteLinks }}
            data-site-clicks={{ $siteClicks }}
            data-user-number={{ $userNumber }}
            data-last-month-count={{ $lastMonthCount }}
            data-last-week-count={{ $lastWeekCount }}
            data-last24-hrs-count={{ $last24HrsCount }}
            data-updated-last30-days-count={{ $updatedLast30DaysCount }}
            data-updated-last7-days-count={{ $updatedLast7DaysCount }}
            data-updated-last24-hrs-count={{ $updatedLast24HrsCount }}
        >
            Dashboard Statistics
        </div>
        @endif

    </div>
</div>
@endsection
