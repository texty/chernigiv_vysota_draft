var main_zoom = 13
var redColor= "rgb(250,70,0)";
var map_center = [31.39732070281275, 51.53429993623848]

mapboxgl.accessToken = 'pk.eyJ1IjoiZXZnZXNoYWRyb3pkb3ZhIiwiYSI6ImNqOWRhbnk3MDI4MGIycW9ya2hibG9pNm8ifQ.8VxS8cKEypk08xfgUgbsHw';
const map = new mapboxgl.Map({
    container: 'map',
    style: 'data/positron2.json',
    center: map_center,
    zoom: main_zoom,
    pitch: 0,
    bearing: 0,
    antialias: true
});


map.scrollZoom.disable();
map.addControl(new mapboxgl.NavigationControl(),  'top-left');

map.on("click", function(e){
    console.log(map.getCenter())
})

map.on('load', function () {

    map.addSource("polygons", {
        "type": "geojson",
        'data': "data/chernihiv_poly.geojson"
    });

    map.addSource("lines", {
        "type": "geojson",
        'data': "data/chernihiv_line2.geojson"
    });

    map.addSource("icons", {
        "type": "geojson",
        'data': "data/true_arrows.geojson"
    });

    map.addSource("arrows", {
        "type": "geojson",
        'data': "data/chernihiv_arrow.geojson"
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
            'line-color': redColor,
            'line-width': 2
        }
    });


  map.addLayer({
        "id": "projects-pulse",
        'type': 'circle',
        "source": "dots",
        'paint': {
            'circle-radius': 4,
            'circle-color': redColor,
        }
    });


    map.addLayer({
        "id": "points-layer",
        'type': 'circle',
        "source": "dots",
        'paint': {
            'circle-radius': 4,
            'circle-color': redColor,
            "circle-stroke-width": 1,
            "circle-stroke-color": "white"
        }
    });

    var red_url = 'img/red-triangle.png';
    map.loadImage(red_url, function (err, red) {
        if (err) {
            console.error('err image', err);
            return;
        }
        map.addImage('red_arrow', red);
    });




    map.addLayer({
        id: 'arrow-icons',
        source: 'icons',
        type: 'symbol',
        layout: {
          visibility: 'visible',
          'symbol-placement': "line-center",
          'symbol-spacing': 1,
          'icon-size': 0.65,
          'icon-image': 'red_arrow',
          'icon-rotate': ['get', 'bearing'],
          'icon-rotation-alignment': 'map',
          'icon-allow-overlap': true,
          'icon-ignore-placement': true
        },
      })

  

    //points
    map.addLayer({
        "id": "lines-layer",
        'type': 'line',
        "source": "lines",
        'paint': {
            'line-color': redColor,
            'line-width': 3
        }
    });

    map.addLayer({
        "id": "arrows-layer",
        'type': 'line',
        "source": "arrows",
        "filter": ['all', ['==', 'type', 'arrow']],
        'paint': {
            'line-color': redColor,
            'line-width': 4
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
            'text-radial-offset': 0,
            'text-justify': 'auto',
            'text-size': 12,
            "text-font": ["Noto Sans Italic"]
            },
        'paint': {
            'text-color': 'white'        
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
            'text-size': 12,
            "text-font": ["Noto Sans Italic"],
            },
        'paint': {
            'text-color': 'white',     
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
            'text-anchor': "center",
            'text-radial-offset': 1,
            'text-justify': 'auto',
            'text-size': 12,
            "text-font": ["Noto Sans Italic"],
            "text-offset": [1, 0.2]
            },
        'paint': {
            'text-color': 'white',         
        }
    });

    map.setFilter(  'polygons-layer', ["match", ["get", "id"], ["p1"], true, false])
    map.setFilter(  'points-layer', ["match", ["get", "id"], [""], true, false])
    map.setFilter(  'lines-layer', ["match", ["get", "id"], [""], true, false])
    map.setFilter(  'arrows-layer', ["match", ["get", "id"], [""], true, false])
    map.setFilter(  'arrow-icons', ["match", ["get", "id"], [""], true, false])


    map.setFilter(  'lines-text', ["match", ["get", "id"], [""], true, false])
    map.setFilter(  'points-text', ["match", ["get", "id"], [""], true, false])
    map.setFilter(  'poly-text', ["match", ["get", "id"], ["p1"], true, false])

    map.setFilter(  'projects-pulse', ["match", ["get", "id"], [""], true, false])


    var framesPerSecond = 2;
    var multiplier = 0.1;
    var opacity = .1;
    var circleRadius = 2;
  
    function pulseMarker(timestamp){
      setTimeout(function() {
        requestAnimationFrame(pulseMarker)
        multiplier += .1;
        opacity -= ( .3 / framesPerSecond );
        circleRadius += ( 10 / framesPerSecond );
  
        map.setPaintProperty('projects-pulse', 'circle-opacity', opacity)
        map.setPaintProperty('projects-pulse', 'circle-radius', circleRadius)
  
        if (opacity <= 0.1) {
          opacity = 1;
          circleRadius = 2;
        }
  
      }, 1000 / framesPerSecond );
    }
  
//    
  
//   })


   
const index_locations = {
    0: {"coords":[31.40081,51.51740], "zoom": 11 }, 
    1: {"coords":[31.40081,51.51740], "zoom": 11 }, 
    2: {"coords":[31.40081,51.51740], "zoom": 11 }, 
    3: {"coords":[31.00869094407608, 51.35248879457697], "zoom": 9 },
    4: {"coords":[ 31.40545753973214, 51.5376156536291], "zoom": 13 },
    5: {"coords":[31.47402,51.57969], "zoom": 10 },
    6: {"coords":[31.159547535544675, 51.75494733370542], "zoom": 8.0 },
    7: {"coords":[31.47402,51.57969], "zoom": 8.0 },
    8: {"coords":[31.6663,52.0188], "zoom": 8.0 },
    9: {"coords":[31.59689,51.86609], "zoom": 11 },
    10: {"coords":[31.59689,51.86609], "zoom": 11 },
    11: {"coords":[31.390991655703715, 51.571568216556415], "zoom": 11 },
    12: {"coords":[31.404640,51.539589], "zoom": 13 },
    13: {"coords":[31.404640,51.539589], "zoom": 13 },
    14: {"coords":[31.371199,51.525428], "zoom": 13 },
    15: {"coords":[31.3961916016313, 51.53667191457848], "zoom": 13 },
    16: {"coords":[31.3961916016313, 51.53667191457848], "zoom": 13 },
    17: {"coords":[31.3961916016313, 51.53667191457848], "zoom": 13 },
    18: {"coords":[31.3961916016313, 51.53667191457848], "zoom": 13 },
    19: {"coords":[31.38199,51.53224], "zoom": 13 },
    20: {"coords":[31.38199,51.53224], "zoom": 13 },
    21: {"coords":[31.38199,51.53224], "zoom": 13 },
    22: {"coords":[31.38199,51.53224], "zoom": 13 },
    23: {"coords":[31.40545753973214, 51.5376156536291], "zoom": 13 },
    24: {"coords":[31.428531567849546, 51.538975042478796], "zoom": 13 },
    25: {"coords":[31.397735424896837, 51.53333943713733], "zoom": 13 },
    26: {"coords":[31.364517,51.530727], "zoom": 13.5 },
    27: {"coords":[31.364517,51.530727], "zoom": 13.5 },
    28: {"coords":[31.364517,51.530727], "zoom": 13.5 },
    29: {"coords":[31.40363,51.51755], "zoom": main_zoom },
    30: {"coords":[31.40363,51.51755], "zoom": main_zoom },
    31: {"coords":[31.40363,51.51755], "zoom": main_zoom },
    32: {"coords":[31.40363,51.51755], "zoom": main_zoom },
    33: {"coords":[31.40363,51.51755], "zoom": main_zoom },
    34: {"coords":[31.40363,51.51755], "zoom": main_zoom },
    35: {"coords":[31.40363,51.51755], "zoom": main_zoom },
    36: {"coords":[31.40363,51.51755], "zoom": main_zoom },
    37: {"coords":[31.40363,51.51755], "zoom": main_zoom }
   
   
}


var scroller = scrollama();

 
function handleStepEnter(r) {

    // полігони, лінії і точки
    let myarr_p = $(r.element).data("polygons");
    let myarr_l = $(r.element).data("lines");
    let myarr_d = $(r.element).data("points");

    // анімовані точки
    let myarr_pulse = $(r.element).data("pulse");

    // фото і відео
    let img_src = $(r.element).data("picture");
    let video_src = $(r.element).data("video");

     // широта і довгота
    let step_latlng = $(r.element).data("coords");
    let step_zoom = $(r.element).data("zoom");

    // console.log(step_latlng)

    // filter layers
    map.setFilter('lines-text', ["match", ["get", "id"], myarr_l, true, false]);
    map.setFilter('points-text', ["match", ["get", "id"], myarr_d, true, false]);
    map.setFilter('poly-text', ["match", ["get", "id"], myarr_p, true, false]);

    map.setFilter('polygons-layer', ["match", ["get", "id"], myarr_p, true, false]);
    map.setFilter('lines-layer', ["match", ["get", "id"], myarr_l, true, false]);
    map.setFilter('arrows-layer', ["match", ["get", "id"], myarr_l, true, false])
    map.setFilter('arrow-icons', ["match", ["get", "id"], myarr_l, true, false])

    map.setFilter('points-layer', ["match", ["get", "id"], myarr_d, true, false]);
    map.setFilter('projects-pulse', ["match", ["get", "id"], myarr_pulse, true, false]);


    

    pulseMarker(0);


    if(img_src){
        $("#cover-picture").css("background-image", 'url(' + img_src[0]+ ')')
        $("#cover-picture").css("display", "block")
        $("#cover-video").css("display", "none")
        $("#map").css("display", "none")
       
       
    } else if(video_src){
        var video = document.getElementById('cover-video');
        video.src = video_src;
        video.play();
        $("#cover-video").css("display", "block")
        
        $("#map").css("display", "none")
        $("#cover-picture").css("display", "none")
    }
    else {
        $("#map").css("display", "block")
         $("#cover-picture").css("display", "none")
         $("#cover-video").css("display", "none")
    }

    if(r.index === 0){
        $(".scroll__text").css("display", "block")
    }



    map.flyTo({
        center: step_latlng,
        zoom: step_zoom,
        duration: 3000, 
       // essential: true
    })
    
}
      
function init() {   
    scroller.setup({
        container: '#scroll',
        graphic: '.scroll__graphic',
        text: '.scroll__text',
        step: '.scroll__text .step',
        offset: 0.9,
        debug: false
    })
        .onStepEnter(handleStepEnter);

}
init();
});
