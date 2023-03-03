var iW = window.innerWidth;
var main_zoom = iW > 800 ? 11 : 11;

var map_center = [31.40081,51.51740]

mapboxgl.accessToken = 'pk.eyJ1IjoiZXZnZXNoYWRyb3pkb3ZhIiwiYSI6ImNqOWRhbnk3MDI4MGIycW9ya2hibG9pNm8ifQ.8VxS8cKEypk08xfgUgbsHw';
const map = new mapboxgl.Map({
    container: 'map',
   style: 'data/positron.json',
    //style: 'mapbox://styles/mapbox/satellite-v9',
    center: map_center,
    zoom: main_zoom,
    //pitch: 55,
    pitch: 0,
    bearing: 0,
    antialias: true
});


map.scrollZoom.disable();
map.addControl(new mapboxgl.NavigationControl(),  'top-left');

map.on("click", function(e){
    console.log(map.getCenter())
})

// map.on('style.load', () => {
//     map.addSource('mapbox-dem', {
//     'type': 'raster-dem',
//     'url': 'mapbox://mapbox.mapbox-terrain-dem-v1',
//     'tileSize': 512,
//     'maxzoom': 14
//     });
//     // add the DEM source as a terrain layer with exaggerated height
//     map.setTerrain({ 'source': 'mapbox-dem', 'exaggeration': 1.5 });
//     });

map.on('load', function () {

    map.addSource("polygons", {
        "type": "geojson",
        'data': "data/chernihiv_poly.geojson"
    });

    map.addSource("lines", {
        "type": "geojson",
        'data': "data/chernihiv_line.geojson"
    });

    map.addSource("dots", {
        "type": "geojson",
        'data': "data/chernihiv_dot.geojson"
    });
          
  
    //polygon stroke
    map.addLayer({
        "id": "polygons-layer",
        'type': 'line',
        "source": "polygons",
        'paint': {
            'line-color': '#CAA7A6',
            'line-width': 2
        }
    });

    map.addLayer({
        "id": "points-layer",
        'type': 'circle',
        "source": "dots",
        'paint': {
            'circle-radius': 4,
            'circle-color': '#F26344',
            "circle-stroke-width": 1,
            "circle-stroke-color": "white"
        }
    });

    //points
    map.addLayer({
        "id": "lines-layer",
        'type': 'line',
        "source": "lines",
        'paint': {
            'line-color': '#F26344',
            'line-width': 2
        }
    });


    map.addLayer({
        "id": "lines-text",
        "minzoom": 8,
        "maxzoom": 19,
        'type': 'symbol',
        "source": "lines",
        'layout': {
            'text-field': [
                "concat",
                "",
                ['get', 'Name']
            ],
            'text-anchor': "left",
            'text-radial-offset': 1,
            'text-justify': 'auto',
            'text-size': 10,
            },
        'paint': {
            'text-color': 'black', 
            "text-halo-color": "#CAA7A6",
            "text-halo-width": 1,            
        }
    });

    map.addLayer({
        "id": "points-text",
        "minzoom": 8,
        "maxzoom": 19,
        'type': 'symbol',
        "source": "dots",
        'layout': {
            'text-field': [
                "concat",
                "",
                ['get', 'Name']
            ],
            'text-anchor': "right",
            'text-radial-offset': 1,
            'text-justify': 'auto',
            'text-size': 10,
            },
        'paint': {
            'text-color': 'black', 
            "text-halo-color": "#CAA7A6",
            "text-halo-width": 1,            
        }
    });

    map.addLayer({
        "id": "poly-text",
        "minzoom": 8,
        "maxzoom": 19,
        'type': 'symbol',
        "source": "polygons",
        'layout': {
            'text-field': [
                "concat",
                "",
                ['get', 'Name']
            ],
            'text-anchor': "right",
            'text-radial-offset': 1,
            'text-justify': 'auto',
            'text-size': 10,
            },
        'paint': {
            'text-color': 'black', 
            "text-halo-color": "#CAA7A6",
            "text-halo-width": 1,            
        }
    });

    map.setFilter(  'polygons-layer', ["match", ["get", "id"], ["p1", "p4"], true, false])
    map.setFilter(  'points-layer', ["match", ["get", "id"], [""], true, false])
    map.setFilter(  'lines-layer', ["match", ["get", "id"], [""], true, false])

    map.setFilter(  'lines-text', ["match", ["get", "id"], [""], true, false])
    map.setFilter(  'points-text', ["match", ["get", "id"], [""], true, false])
    map.setFilter(  'poly-text', ["match", ["get", "id"], [""], true, false])





   
const index_locations = {
    0: {"coords":[31.40081,51.51740], "zoom": 11 }, 
    1: {"coords":[31.40081,51.51740], "zoom": 11 }, 
    2: {"coords":[31.136229859564764,51.41986949596006], "zoom": 9 },
    3: {"coords":[ 31.40545753973214, 51.5376156536291], "zoom": 13 },
    // 4: {"coords":[31.40081,51.51740], "zoom": 13 },
    4: {"coords":[31.47402,51.57969], "zoom": 10 },
    5: {"coords":[31.47402,51.57969], "zoom": 8.0 },
    6: {"coords":[31.47402,51.57969], "zoom": 8.0 },
    7: {"coords":[31.6663,52.0188], "zoom": 8.0 },
    8: {"coords":[31.59689,51.86609], "zoom": 11 },
    9: {"coords":[31.59689,51.86609], "zoom": 11 },
    10: {"coords":[31.389266635764415, 51.54890743022696], "zoom": 11 },
    11: {"coords":[31.404640,51.539589], "zoom": 13 },
    12: {"coords":[31.404640,51.539589], "zoom": 13 },
    13: {"coords":[31.371199,51.525428], "zoom": 13 },
    14: {"coords":[31.3961916016313, 51.53667191457848], "zoom": 13 },
    15: {"coords":[31.3961916016313, 51.53667191457848], "zoom": 13 },
    16: {"coords":[31.3961916016313, 51.53667191457848], "zoom": 13 },
    17: {"coords":[31.3961916016313, 51.53667191457848], "zoom": 13 },
    18: {"coords":[31.38199,51.53224], "zoom": 13 },
    19: {"coords":[31.38199,51.53224], "zoom": 13 },
    20: {"coords":[31.38199,51.53224], "zoom": 13 },
    21: {"coords":[31.38199,51.53224], "zoom": 13 },
    22: {"coords":[31.40545753973214, 51.5376156536291], "zoom": 13 },
    23: {"coords":[31.428531567849546, 51.538975042478796], "zoom": 13 },
    24: {"coords":[31.397735424896837, 51.53333943713733], "zoom": 13 },
    25: {"coords":[31.364517,51.530727], "zoom": 13.5 },
    26: {"coords":[31.364517,51.530727], "zoom": 13.5 },
    27: {"coords":[31.364517,51.530727], "zoom": 13.5 },
    28: {"coords":[31.40363,51.51755], "zoom": main_zoom },
    29: {"coords":[31.40363,51.51755], "zoom": main_zoom },
    30: {"coords":[31.40363,51.51755], "zoom": main_zoom },
    31: {"coords":[31.40363,51.51755], "zoom": main_zoom },
    32: {"coords":[31.40363,51.51755], "zoom": main_zoom },
    33: {"coords":[31.40363,51.51755], "zoom": main_zoom },
    34: {"coords":[31.40363,51.51755], "zoom": main_zoom }
   
   
}


var hint_text = iW > 800 ? "Наведіть мишею на полігон або виділений блок в тексті, щоб побачити підказку" : "Клікніть на полігон або виділений блок в тексті, щоб побачити підказку" 

// popup з підказкою
var init_popup = new mapboxgl.Popup({
    closeOnClick: true,
    closeButton: true,
    offset: [0, 0]
})
.setLngLat([34.58859050273895, 47.51503194775597])
.setHTML(hint_text)

// text hover popup
var f_popup = new mapboxgl.Popup({
    closeOnClick: true,
    closeButton: false,
    offset: [0, 0]
  })


// var container = document.querySelector('#scroll');
// var graphic = document.querySelector('#scroll > .scroll__graphic'); //container.select('.scroll__graphic');
// var text = document.querySelector('#scroll > .scroll__text'); //container.select('.scroll__text');
// var step = document.querySelector('#scroll > .scroll__text > .step'); // text.selectAll('.step');
var scroller = scrollama();




 
function handleStepEnter(r) {
    // console.log(r.index)  
    $(".mapboxgl-popup").remove();
    let myarr_p = $(r.element).data("polygons");
    let myarr_l = $(r.element).data("lines");
    let myarr_d = $(r.element).data("points");
    let img_src = $(r.element).data("picture");
    console.log(img_src)

    // filter layers
    map.setFilter('polygons-layer', ["match", ["get", "id"], myarr_p, true, false]);
    map.setFilter('lines-layer', ["match", ["get", "id"], myarr_l, true, false]);
    map.setFilter('points-layer', ["match", ["get", "id"], myarr_d, true, false]);

    map.setFilter('lines-text', ["match", ["get", "id"], myarr_l, true, false]);
    map.setFilter('points-text', ["match", ["get", "id"], myarr_d, true, false]);
    map.setFilter('poly-text', ["match", ["get", "id"], myarr_p, true, false]);


    const fadeDuration = 1000;

    if(img_src){
        $("#cover-picture").attr("src", img_src[0])
        $("#cover-video").fadeOut(fadeDuration)
        $("#map").fadeOut(fadeDuration)
        $("#cover-picture").fadeIn(fadeDuration)
       
    } else {
         $("#map").fadeIn(fadeDuration)
         $("#cover-picture").fadeOut(fadeDuration)
         $("#cover-video").fadeOut(fadeDuration)
    }

    // if(r.index === 0 ){
       
    //     $("#cover-picture").attr("src", "img/misto_z_pagorba.JPG")
    //     $("#cover-video").fadeOut(fadeDuration)
    //     $("#map").fadeOut(fadeDuration)
    //     $("#cover-picture").fadeIn(fadeDuration)
    //     map.flyTo({
    //         center:index_locations[r.index].coords,
    //         zoom: index_locations[r.index].zoom,
    //         duration: 3000, 
    //         essential: true
    //     })
    //  }

    // if(r.index === 1 ){
    //    $("#map").fadeIn(fadeDuration)
    //    $("#cover-picture").fadeOut(fadeDuration)
    //    map.flyTo({
    //     center:index_locations[r.index].coords,
    //     zoom: index_locations[r.index].zoom,
    //     duration: 3000, 
    //     essential: true,
    //     pitch: 0,
    //         bearing: 0
    // })
    // }

    // if(r.index === 2){


    //     map.flyTo({
    //         center:index_locations[r.index].coords,
    //         zoom: index_locations[r.index].zoom,
    //         duration: 3000, 
    //         essential: true,
    //         pitch: 50,
    //         bearing: 0
    //     })
      
        
    // }
    // if(r.index === 11){
    //     $("#cover-picture").attr("src", "img/trymaty_vysoty.JPG")
    //     $("#map").fadeOut(fadeDuration)
    //     $("#cover-picture").fadeIn(fadeDuration)
    //     map.flyTo({
    //         center:index_locations[r.index].coords,
    //         zoom: index_locations[r.index].zoom,
    //         duration: 3000, 
    //         essential: true,
    //         pitch: 0,
    //         bearing: 0
    //     })
    // }  
    // if(r.index === 12 | r.index === 10){
    //     $("#map").fadeIn(fadeDuration)
    //     $("#cover-picture").fadeOut(fadeDuration)
    // }

    if(r.index === 30){
        $("#map").fadeOut(fadeDuration)
        $("#cover-picture").fadeOut(fadeDuration)
        $("#cover-video").fadeIn(0)
    }

    if(r.index === 29 || r.index === 31){
        $("#map").fadeIn(fadeDuration)
        $("#cover-picture").fadeOut(fadeDuration)
        $("#cover-video").fadeOut(fadeDuration)
    }

    map.flyTo({
        center:index_locations[r.index].coords,
        zoom: index_locations[r.index].zoom,
        duration: 3000, 
        essential: true
    })


    d3.selectAll(".show-popup").on("mouseover", function(d){
        let popup_element = $(this).data("click");

        let filtered_feature = map.querySourceFeatures('polygon', {
            sourceLayer: 'boundary-layer',
            filter: ["==", "id", popup_element]
        });

        var f_polygon = turf.polygon(filtered_feature[0].geometry.coordinates);
        var centroid = turf.centroid(f_polygon);
        let description = filtered_feature[0].properties.Name;

        

       f_popup
          .setLngLat(centroid.geometry.coordinates)
          .setHTML(description)
          .addTo(map);
    });

    d3.selectAll(".show-popup").on("mouseout", function(d){
        f_popup.remove()
    })

    d3.selectAll(".show-point-popup").on("mouseover", function(d){
        let popup_element = $(this).data("click");

        let filtered_feature = map.querySourceFeatures('points', {
            sourceLayer: 'points-layer',
            filter: ["==", "id", popup_element]
        });

        let description = filtered_feature[0].properties.name;

        f_popup
          .setLngLat([filtered_feature[0].geometry.coordinates[0],filtered_feature[0].geometry.coordinates[1]])
          .setHTML(description)
          .addTo(map);
    });

    d3.selectAll(".show-point-popup").on("mouseout", function(d){
        f_popup.remove()
    })

    
}
      
function init() {   
    scroller.setup({
        container: '#scroll',
        graphic: '.scroll__graphic',
        text: '.scroll__text',
        step: '.scroll__text .step',
        offset: iW > 800 ? 0.5 : 0.6,
        debug: false
    })
        .onStepEnter(handleStepEnter);

}
init();
});



// map events
var popup = new mapboxgl.Popup({
    closeOnClick: true,
    closeButton: false,
    offset: [0, -15]
  })


map.on('mouseenter', 'boundary-layer', (e) => {
    
    // Copy coordinates array.
    const coordinates = e.features[0].geometry.coordinates[0].slice();
    const description = e.features[0].properties.title;

    let filtered_feature = map.querySourceFeatures('polygon', {
        sourceLayer: 'boundary-layer',
        filter: ["==", "id",  e.features[0].properties.id]
    });

    var f_polygon = turf.polygon(filtered_feature[0].geometry.coordinates);
    var centroid = turf.centroid(f_polygon);    

    console.log(centroid.geometry.coordinates)

   popup
      .setLngLat(centroid.geometry.coordinates)
      .setHTML(description)
      .addTo(map);

});

map.on('touchstart', 'boundary-layer', (e) => {
    
    // Copy coordinates array.
    const coordinates = e.features[0].geometry.coordinates[0].slice();
    const description = e.features[0].properties.title;

    let filtered_feature = map.querySourceFeatures('polygon', {
        sourceLayer: 'boundary-layer',
        filter: ["==", "id",  e.features[0].properties.id]
    });

    var f_polygon = turf.polygon(filtered_feature[0].geometry.coordinates);
    var centroid = turf.centroid(f_polygon);
    

   popup
      .setLngLat(centroid.geometry.coordinates)
      .setHTML(description)
      .addTo(map);

});

map.on('mouseover', 'points-layer', (e) => {
    
    // Copy coordinates array.
    const coordinates = e.features[0].geometry.coordinates.slice();
    const description = e.features[0].properties.name;
    
    while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
    }
    
    popup
    .setLngLat([e.features[0].geometry.coordinates[0], e.features[0].geometry.coordinates[1]])
    .setHTML(description)
    .addTo(map);
});

map.on('mouseleave', 'boundary-layer', () => {
    popup.remove();
});

map.on('mouseleave', 'points-layer', () => {
    popup.remove();
});







