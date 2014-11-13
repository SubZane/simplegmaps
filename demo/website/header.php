<!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js ie6" lang="en"> <![endif]-->
<!--[if IE 7]>    <html class="no-js ie7" lang="en"> <![endif]-->
<!--[if IE 8]>    <html class="no-js ie8" lang="en"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en"> <!--<![endif]-->
  <head>
    <meta charset="utf-8">
    <link href='http://fonts.googleapis.com/css?family=Open+Sans:400,300,800,700,600' rel='stylesheet' type='text/css'>
    <link rel="stylesheet" href="//netdna.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css">
    <link rel="stylesheet" href="prism/prism.css">
    <link rel="stylesheet" href="styles/style.css">
    <script src="//cdnjs.cloudflare.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
    <title>Demo implementation of simplegmaps</title>
  </head>
  <body>

    <div class="container">
      <h1>simple<span>g</span>maps</h1>
      <div class="row">
        <div class="col-xs-12">
          <ul class="nav navbar-nav">
            <li><a href="index.php">simplegmaps</a></li>
            <li class="dropdown">
              <a href="#" class="dropdown-toggle" data-toggle="dropdown">Markers <span class="caret"></span></a>
              <ul class="dropdown-menu" role="menu">
                <li><a href="marker-address.php">Single marker by address</a></li>
                <li><a href="marker-ll.php">Single marker by long/lat</a></li>
                <li><a href="marker-multipleaddress.php">Multiple markers</a></li>
                <li><a href="marker-custom.php">Single marker with custom icon</a></li>
              </ul>
            </li>
            <li class="dropdown">
              <a href="#" class="dropdown-toggle" data-toggle="dropdown">Geolocation <span class="caret"></span></a>
              <ul class="dropdown-menu" role="menu">
                <li><a href="auto-geolocation.php">Automatic Geolocation</a></li>
                <li><a href="manual-geolocation.php">manual Geolocation</a></li>
              </ul>
            </li>
            <li><a href="routing.php">routing</a></li>
            <li class="dropdown">
              <a href="#" class="dropdown-toggle" data-toggle="dropdown">Info windows <span class="caret"></span></a>
              <ul class="dropdown-menu" role="menu">
                <li><a href="infowindows.php">Standard Info window</a></li>
                <li><a href="custom-infowindows.php">Custom Info window</a></li>
              </ul>
            </li>
            <li class="dropdown">
              <a href="#" class="dropdown-toggle" data-toggle="dropdown">layers <span class="caret"></span></a>
              <ul class="dropdown-menu" role="menu">
                <li><a href="layer-traffic.php">Traffic Layer</a></li>
                <li><a href="layer-weather.php">Weather layer</a></li>
                <li><a href="layer-bicycle.php">Bicycle layer</a></li>
              </ul>
            </li>
            <li><a href="snazzy.php">snazzy colors</a></li>

          </ul>
        </div>
      </div>
