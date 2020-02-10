// initialize the map on the "map" div with a given center and zoom
var map = new L.Map('map', {
  zoom: 7,
  minZoom: 3,
});

// create a new tile layer
//var tileUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
var tileUrl = 'https://api.maptiler.com/maps/darkmatter/{z}/{x}/{y}.png?key=dbH2NdG4qy5QY6IZysjF',
layer = new L.TileLayer(tileUrl,
{
    attribution: '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>',
    maxZoom: 18
});

var objectIcon = L.icon({
    iconUrl: 'object2.png',
    iconSize:     [11.2, 11.1], // size of the icon
    iconAnchor:   [5.6, 5.55], // point of the icon which will correspond to marker's location
});


// add the layer to the map
map.addLayer(layer);

var startTime = {};
var travelCot = {};
var travelLog = {};
var marker = {};

var currentTime = {};
var agentCount = {};
var averageTravel = {};

var totalTrial = 12720;



/** ======================================================================================================== **/




var TainanBounds = [[22.9820192,120.2370332],[23.0133173,120.2377441],[23.0076322,120.2120882],[22.9822537,120.2097457]];
map.fitBounds(TainanBounds);




var barData = {
	labels: ['', '', '', '','', '', '', ''],
	datasets: [{
		fillColor: '#696969',
		strokeColor: 'black',
		data: [0,0,0,0,0,0,0,0]
	}]
}
var ctx = document.getElementById('canvas').getContext('2d');
var barDemo = new Chart(ctx).Bar(barData, {
	responsive: true
});


var lineData = {
	labels: ['', '', '', '','', '', '', ''],
	datasets: [{
		type: 'line',
		label: 'Filled',
		fillColor: '#696969',
		strokeColor: 'black',
		data: [0,0,0,0,0,0,0,0]
	}]
}
var ctx2 = document.getElementById('canvas2').getContext('2d');
var lineDemo = new Chart(ctx2).Line(lineData, {
	responsive: true
});




var globalTime=241;
var appear_agent=0;
var process = setInterval(
	function(){
		document.getElementById("time").innerHTML=currentTime[globalTime];
		document.getElementById("count").innerHTML=agentCount[globalTime];
		var i;
		for(i=0; i<totalTrial; i++){
			if(globalTime!=0 && startTime[i]==globalTime){
				var timeLeap = [];
				var j;
				for(j=0; j<travelCot[i]-1; j++){
					timeLeap.push(1);
				}
				marker[i] = L.Marker.movingMarker(travelLog[i],timeLeap,{autostart: true, loop: false, icon: objectIcon}).addTo(map);
				appear_agent++;
			}
			if(startTime[i]+travelCot[i]+1==globalTime && marker[i]!=null){
				marker[i].onRemove(map);
			}
		}
		if(globalTime%540==0){
			barDemo.removeData();
			barDemo.addData([appear_agent], '');
			lineDemo.removeData();
			lineDemo.addData([appear_agent], '');
			appear_agent=0;
		}
		
		globalTime++;
	}, 1
);



/*
var globalTime=0;
for(globalTime=0; globalTime<=1000; globalTime++){
	//setTimeout(stopTimer,20);
	var i;
	for(i=0; i<totalTrial; i++){
		if(startTime[i]==globalTime){
			var timeLeap = [];
			var j;
			for(j=0; j<travelCot[i]-1; j++){
				timeLeap.push(20);
			}
			marker[i] = L.Marker.movingMarker(travelLog[i],timeLeap,{autostart: true, loop: false}).addTo(map);
		}
	}
}
*/



/*
var i;
for(i=0; i<7; i++){
	var timeLeap = [];
	var j;
	for(j=0; j<travelCot[i]-1; j++){
		timeLeap.push(20);
	}
	marker[i] = L.Marker.movingMarker(travelLog[i],timeLeap,{autostart: true, loop: false}).addTo(map);
	// L.polyline(travelLog[i],{color: 'green'}).addTo(map);
}
*/


//var TainanBounds = [[22.9820192,120.2370332],[23.0133173,120.2377441],[23.0076322,120.2120882],[22.9822537,120.2097457]];
//map.fitBounds(TainanBounds);




	