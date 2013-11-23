$.widget("migor.openMap", {

    map: null,
    markers: null,
    mainMarker: null,
    options: {
        mapId: 'map_22',
        callback: null
    },
    _create:function () {
        var self = this;

        self.element.attr('id', self.options.mapId);

        self.map=khtml.maplib.Map(document.getElementById(self.options.mapId));
        self.map.addOverlay(new khtml.maplib.ui.Zoombar());





        self.markers = [];
    },
    center:function(latitude, longitude, zoom) {
        var self = this;
        self.map.centerAndZoom(new khtml.maplib.LatLng(latitude,longitude),zoom);
    },
    addBBox:function(bbox, color) {
        var self = this;

        var polygon={
            type:"Feature",
            geometry:{
                type:"Polygon",
                coordinates:[[
                    [bbox.leftTopLongitude,    bbox.leftTopLatitude],
                    [bbox.rightBottomLongitude,bbox.leftTopLatitude],
                    [bbox.rightBottomLongitude,bbox.rightBottomLatitude],
                    [bbox.leftTopLongitude,    bbox.rightBottomLatitude]]]
            },
            style:{
                fill:color,
                stroke:"black",
                opacity:0.4
            }
        };
        self.map.featureCollection.appendChild(polygon);
    },
    setMarkers:function(locations) {
        var self = this;

        for (var i=0; i<self.markers.length; i++) {
            self.markers[i].destroy();
        }
        self.markers = [];
        for (var j=0; j<locations.length; j++) {
            var image = new khtml.maplib.overlay.MarkerImage(
                'images/marker_blue_32.png',		// url
                {width: 32,height: 32},	// size
                {x: 0,y:0},			    // origin
                {x:16,y:24}			// anchorPoint
            );
            var point = new khtml.maplib.LatLng(locations[j].latitude,locations[j].longitude);


            self.markers.push(new khtml.maplib.overlay.Marker({
                //draggable: true,
                //raiseOnDrag: true,
                icon: image,
                map: self.map,
                position: point,
                title: location.name
            }));
        }
    },
    setMainMarker:function(location) {
        var self = this;
        if (self.mainMarker != null) {
            self.mainMarker.destroy();
        }
        var image = new khtml.maplib.overlay.MarkerImage(
            'images/marker_red_32.png',		// url
            {width: 32,height: 32},	// size
            {x: 0,y:0},			    // origin
            {x:16,y:24}			// anchorPoint
        );
        var p = new khtml.maplib.LatLng(location.latitude,location.longitude);

        self.mainMarker = new khtml.maplib.overlay.Marker({
            draggable: true,
            raiseOnDrag: true,
            icon: image,
            map: self.map,
            position: p,
            title: location.name
        });
        if (self.options.callback != null) {
            self.mainMarker.addCallbackFunction(self.options.callback);
        }
    },
    getMainMarkerLocation:function(location) {
        var self = this;
        return {latitude: self.mainMarker.getPosition().lat(), longitude: self.mainMarker.getPosition().lng(), accuracy: 0};
    }

});
