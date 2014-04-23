simplegmaps v0.2.0
===========

simplegmaps - Add google maps to your web without knowing squat about JavaScript

##Background
I found that other scripts was too complicated to deal with and needed much scripting just to set a marker on a map. I want to separate HTML markup from JavaScript as much as possible and I want the user of the script to be able to add markers to a map without writing a single line JavaScript.

Meet simplegmaps!

##Features
* Display one or multiple markers on your map
* Add info windows to markers with custom html markup
* Display routes on your map
* No scripting necessary

##Browser Support
* Google Chrome
* Internet Explorer 8+
* Firefox
* Safari 6

##Installation
```html
<!-- You'll need jquery -->
<script src="dependencies/jquery/dist/jquery.min.js"></script>
<!-- You'll also need access to google maps api -->
<script src="https://maps.googleapis.com/maps/api/js?sensor=false" type="text/javascript"></script>
<!-- and you'll need to include simplemaps of course! -->
<script src="../src/jquery.simplegmaps.js"></script>
```

##Usage
```javascript
$('#id_of_your_div').simplegmaps();
```

##Settings and Defaults
```javascript
defaults = {
	MapOptions: {
		draggable: false,
		scrollwheel: false,
		streetViewControl: false,
		panControl: true,
		zoomControl: true,
		zoomControlOptions: {
			style: 'DEFAULT'
		}
	},
	getRouteButton: '#simplegmaps-getroute',
	getTravelMode: '#simplegmaps-travelmode',
	getFromAddress: '#simplegmaps-fromaddress'
};

```
* `MapOptions`: [Google Maps MapOptions](https://developers.google.com/maps/documentation/javascript/reference?csw=1#MapOptions)
* `getRouteButton`: ID of the button used to submit the route to the map
* `getRouteButton`: ID of the select element to hold the travelmode data
* `getFromAddress`: ID of the input element to hold the address to set the route start point


##Adding markers to a map
You can use an address or latitude and longitude to position a marker on a map using the `data` attribute.
```html
<div id="simplemap">
	<div class="map-marker" data-title="Lorem ipsum" data-latlng="55.5897407,13.012268899999981"></div>
	<div class="map-marker" data-title="Remi" data-address="Remi 145 W 53rd St, New York, NY, United States"></div>
</div>
```

##Adding a info window to a maker
You can add any html markup you wish to an info window but you need to add the class `map-infowindow` to the outer element.
```html
<div class="map-marker" data-title="Remi" data-address="Remi 145 W 53rd St, New York, NY, United States">
	<div class="map-infowindow">
	  <h2>Remi</h2>
	  <p>Remi 145 W 53rd St, New York, NY, United States</p>
	</div>
</div>
```

##Adding a map with route funtionality
```html
<div id="simplemap">
	<div class="map-marker" data-title="Applejack Diner" data-address="Applejack Diner 1725 Broadway New York, NY 10019"></div>
</div>

<div>
	<div>
  	<label>From address</label>
   	<input type="text" id="simplegmaps-fromaddress">
  </div>
  <div>
     <label>Travel Mode</label>
     <select class="form-control" id="simplegmaps-travelmode">
      <option value="DRIVING">Driving</option>
      <option value="WALKING">Walking</option>
      <option value="BICYCLING">Bicycling</option>
    </select>
  </div>
  <div>
    <button type="submit" id="simplegmaps-getroute">Get route</button>
  </div>
</div>
```

If you change any default element ID's you'll need to set some options when you initiate the map
```javascript
$('#simplemap').simplegmaps({
  getRouteButton: '#simplegmaps-getroute',
  getTravelMode: '#simplegmaps-travelmode',
  getFromAddress: '#simplegmaps-fromaddress'
});
```


###changelog
####0.2.0
First public release.
