import React, { Component } from 'react';
import L from 'leaflet';
(function(window, document, undefined) {
    L.MyMarkers = {};
    L.MyMarkers.version = "1.0.1";
    L.MyMarkers.Icon = L.Icon.extend({
        options: {
            iconSize: [ 35, 45 ],
            iconAnchor: [ 17, 42 ],
            popupAnchor: [ 1, -32 ],
            shadowAnchor: [ 10, 12 ],
            shadowSize: [ 36, 16 ],
            className: "my-marker",
            prefix: "",
            extraClasses: "",
            shape: "circle",
            icon: "",
            innerHTML: "",
            color: "red",
            number: "",
            isAnchor:false,
            animation : null
        },
        initialize: function(options) {
            options = L.Util.setOptions(this, options);
        },
        createIcon: function() {
            var div = document.createElement("div"), options = this.options;
            //TODO Set speed by element.setAttribute(speed, "1")

            if (options.icon) {
                div.innerHTML = this._createInner();
            }
            if (options.innerHTML) {
                div.innerHTML = options.innerHTML;
            }
            this._setIconStyles(div);
            return div;
        },
        _createInner: function() {
            var iconColorStyle = "", iconNumber = "", options = this.options;
            if (options.color) {
                iconColorStyle = "style='color: " + options.color + ";' ";
            }
            if (options.number) {
                iconNumber = "number='" + options.number + "' ";
                iconColorStyle = "style='color: " + options.color + ";font-size:12px;'";
            }
            if (options.isAnchor) {
              return "<div class =\"marker-wrapper icon-marker\"></div><i " + iconNumber + iconColorStyle +"class='" + options.extraClasses + " " + options.prefix + " " + options.icon + "'></i>";
            }else {
              //return "<i " + iconNumber + iconColorStyle +"class='" + options.extraClasses + " " + options.prefix + " " + options.icon + "'></i>";
              return `<i ${iconNumber} ${iconColorStyle} class="${options.extraClasses} ${options.prefix} ${options.icon}"></i>`
            }



        },
        _setIconStyles: function(img) {
            var options = this.options, size = L.point(options["iconSize"]), anchor, leafletName;
            anchor = L.point(options.iconAnchor);
            leafletName = "icon";
            if (!anchor && size) {
                anchor = size.divideBy(2, true);
            }
            if (!options.isAnchor) img.style.pointerEvents = "auto";
            img.className = "leaflet-marker-" + leafletName  + " " + options.className;
            if(options.animation) img.setAttribute("speed", options.animation);
            if (anchor) {
                img.style.marginLeft = -anchor.x + "px";
                img.style.marginTop = -anchor.y + "px";
            }
            if (options.color){
              img.style.color = options.color;
            }
        }
    });
    L.MyMarkers.icon = function(options) {
        return new L.MyMarkers.Icon(options);
    };
})(window, document);
const config = {
  params: {
    center: [48.836703,2.334345],
    zoomControl: false,
    zoom: 10,
    maxZoom: 18,
    minZoom: 1,
    scrollwheel: false,
    legends: true,
    infoControl: false,
    attributionControl: true
  },
  tileLayer : {
    uri: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    params: {
      minZoom: 1,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
      id: '',
      accessToken: ''
    }
  }
}
export default class Map extends Component{
  constructor(props) {
    super(props);
    this.state = {
      map : null,
      geoData : {type:"FeatureCollection",features:[]},
      geojsonLayer : null
    }
    this.init = this.init.bind(this);
    this.updateScooterDataInterval;
    this.addGeoJSONLayer = this.addGeoJSONLayer.bind(this);
    this.pointToLayer = this.pointToLayer.bind(this);
    this.onEachFeature = this.onEachFeature.bind(this);
    this.zoomToFeature = this.zoomToFeature.bind(this);
  }
  componentDidMount() {
    this.init(this._mapNode);
    this.updateScooterDataFromServer();
    this.updateScooterDataInterval = setInterval(()=>{
      this.updateScooterDataFromServer();
    },20000);
  }
  componentDidUpdate(prevProps, prevState) {
    this.addGeoJSONLayer(this.state.geoData);
  }
  componentWillUnmount() {
    clearInterval(this.updateScooterDataInterval);
    this.state.map.remove();
  }
  addGeoJSONLayer(geojson) {
    let cur = this;
    let geojsonLayer;
    geojsonLayer = L.geoJson(geojson, {
      onEachFeature: this.onEachFeature,
      pointToLayer: this.pointToLayer,
      filter: this.filterFeatures
    });
    if (!this.state.geojsonLayer) {
      geojsonLayer.addTo(this.state.map);
      geojson["features"].length>0?cur.zoomToFeature(geojsonLayer):null;
      this.setState({
        geojsonLayer:geojsonLayer
      })
    }else {
      this.state.geojsonLayer.clearLayers();
      this.state.geojsonLayer.addData(geojson);
      geojson["features"].length>0?cur.zoomToFeature(geojsonLayer):null;
    }
  }
  pointToLayer(feature, latlng) {
    var cur = this;
    if(feature.geometry.type ==="Point"){
      var markers = this.markerAndIcons(feature.properties.markerAndIcons?feature.properties.markerAndIcons:null);
      var testMarker = L.marker(latlng,{icon: L.divIcon({className: 'markers', html:markers, iconSize:[35,35],iconAnchor : [17,42]}),riseOnHover:true})
                        .on('click',(e)=>{
                          setTimeout(()=>{
                            this.state.map.invalidateSize();
                            this.state.map.panTo(e.target.getLatLng());
                          },501);

                        },);
      return testMarker;
    }else{
      return null;
    }
  }
  onEachFeature(feature, marker) {
    var cur = this;
    if (feature.geometry.type ==="Point"&&feature.properties) {
      var isChanged = false;
      marker.on('mouseover', function (e) {
        if(!isChanged) {
          cur.showIcons(marker);
          isChanged = true;
        }
      });
      marker.on('mouseout', function (e) {
        cur.hideIcons(marker);
        isChanged=false;
      });
    }
  }
  filterFeatures(feature, layer) {
    if(!feature.geometry.coordinates[0]||!feature.geometry.coordinates[1]) return false;
    return true;
  }
  zoomToFeature(target) {
    var fitBoundsParams = {
      paddingTopLeft: [20,20],
      paddingBottomRight: [20,20],
      maxZoom : 18
    };
    this.state.map.fitBounds(target.getBounds(), fitBoundsParams);
  }
  updateScooterDataFromServer(){
    let urls = ["http://vps92599.ovh.net:8082/api/devices","http://vps92599.ovh.net:8082/api/groups","http://vps92599.ovh.net:8082/api/positions"];
    var promises = urls.map(url =>fetch(url,{credentials: 'include',headers: {'Accept': 'application/json'}}).then(y => y.json()));
    Promise.all(promises)
    .then(results => {this.formatScooterDataAll(results);})
    .catch(err=>{console.log(err);});
  }
  findPositonIndex(id,data){
    for (var i = 0; i < data.length; i++) {
      if(data[i]["deviceId"]===id){
        return i;
      }
    }
    return -1;
  }
  findGroupIndex(id,data){
    for (var i = 0; i < data.length; i++) {
      if(data[i]["id"]===id){

        return i;
      }
    }
    return -1;
  }
  formatScooterDataAll(data){
    let scooterData = {
      type:"FeatureCollection",
      features :[]
    }
    let scooterList = []
    let scooterTableList = [];
    //[Devices, Groups, Positions]
    data[0].map((value,index)=>{
      if(value){
        let positionIndex = this.findPositonIndex(value["id"],data[2]);
        let groupIndex = this.findGroupIndex(value["groupId"],data[1]);
        let scooterDetails={
          "mobile":value["uniqueId"]?"imei:"+value["uniqueId"]:"To be getted",
          "mileage" : positionIndex>=0?(data[2][positionIndex]["attributes"]["totalDistance"]/1000).toFixed(2)+"Km":"To be getted",
          "date":positionIndex>=0?data[2][positionIndex]["deviceTime"]:"To be getted",
          "lat":positionIndex>=0?data[2][positionIndex]["latitude"]:null,
          "long":positionIndex>=0?data[2][positionIndex]["longitude"]:null,
          "speed":positionIndex>=0?data[2][positionIndex]["speed"]+"Km/h": "To be getted",
          "address":positionIndex>=0?data[2][positionIndex]["address"]:"To be getted",
          "attributes":value["attributes"]?value["attributes"]:"To be getted",
          "category":value["category"]?value["category"]:"To be getted",
          "contact":value["contact"]?value["contact"]:"To be getted",
          "geofenceIds":value["geofenceIds"]?value["geofenceIds"]:"To be getted",
          "groupId":value["groupId"]?value["groupId"]:"To be getted",
          "group":groupIndex>=0?data[1][groupIndex]["name"]:"Unknown Group",
          "id":value["id"]?value["id"]:"To be getted",
          "lastUpdate":value["lastUpdate"]?value["lastUpdate"]:"To be getted",
          "model":value["model"]?value["model"]:"To be getted",
          "name":value["name"]?value["name"].replace( /\D+/g, ''):"To be getted",
          "phone":value["phone"]?value["phone"]:"To be getted",
          "positionId":value["positionId"]?value["positionId"]:"To be getted",
          "status" : value["status"]?value["status"]:"To be getted"
        }
        let template ={
          "type": "Feature",
          "geometry": {
            "type": "Point",
            "coordinates": [scooterDetails["long"],scooterDetails["lat"]]
          },
          "properties": {
            "markerAndIcons" :[{"icon":"motorcycle","color":"CADETBLUE","number":null},{"icon":"number","color":"BLUE","number":scooterDetails['name']}]
          }
        }
        let scooter = {
          "@id":value["name"].replace( /\D+/g, ''),
          "broader" : "ScooterList"
        }
        let timeString = null;
        if(positionIndex>=0){
          let deviceTime = data[2][positionIndex]["deviceTime"];
          let updateTime = new Date(deviceTime);
          let clientTime = new Date();
          let timeDifs = ((clientTime.getTime()-updateTime.getTime())/60/1000).toFixed(1);
          timeString = timeDifs?(timeDifs>=60?(timeDifs>=1440?(timeDifs/1440).toFixed(1)+' Days ago':(timeDifs/60).toFixed(1)+' Hours ago'):(timeDifs)+' Minutes ago'):null;
        }
        let scooterListTableData = {
          "name":value["name"].replace( /\D+/g, ''),
          "updateTime":timeString?timeString:"Unknown",
          "status":value["status"]?value["status"]:"Not Getted"
        }
        scooterData["features"].push(template);
        scooterList.push(scooter);
      }
    });
    this.setState({
      geoData : scooterData
    });
  }
  markerAndIcons(info){
    ////console.log("info",info);
    var markerAndIconsString = "";
    var iconNum = info?info.length:0;
    if(info){
      for(var i=0;i<iconNum;i++){
        markerAndIconsString = markerAndIconsString.concat(this.generateIcon(
          iconNum-1,
          i,
          info[i]['icon'],
          info[i]['color'],
          i===0?null:'surround',
          info[i]['icon']==="number"?info[i]['number']:null));
        //markerAndIconsString = markerAndIconsString.concat(cur.generateIcon(iconNum-1,i,info[i][0],'CADETBLUE','surround',info[i][0]==="number"?info[i][1]:null));
      }
    }else{
      markerAndIconsString = this.generateIcon();
    }
    return markerAndIconsString;
  }
  generateIcon(count,iconIndex,iconStyle,color,className,number){
    var template = {
      icon: 'fa-bars',
      color: 'lightcoral',
      shape: 'star',
      prefix: 'fa',
      iconAnchor : [0,0],
      className : 'my-marker',
      iconSize :[35,35],
      number : "",
      animation : null
    }
    var offset = Math.PI*(1-2*(count-1)/count)/2;
    iconStyle?template['icon']='fa-'.concat(iconStyle):null;
    color?template['color']=color:null;
    iconIndex>0?template['iconAnchor'] = [-35*Math.cos(2*Math.PI*(iconIndex-1) /count+offset),35*Math.sin(2*Math.PI*(iconIndex-1) /count+offset)]:null;
    iconIndex>0?template['animation'] = iconIndex:null;
    className?template['className'] = template['className'].concat(" ",className):null;
    number?template['number'] = number :null;
    if(!iconIndex||iconIndex === 0) {
      template['isAnchor'] = true;
    }
    var iconHTMLElement =  L.MyMarkers.icon(template).createIcon();
    var outerHTMLElement = iconHTMLElement.outerHTML;
    return outerHTMLElement;
  }
  showIcons(marker){
    var count = 1;
    for (var obj in marker._icon.children) {
      if(obj>0){
        marker._icon.children[obj].className = marker._icon.children[obj].className.concat(' show');
      }
    }
  }
  hideIcons(marker){
    for (var obj in marker._icon.children) {
      if(obj>0){
        marker._icon.children[obj].className =this.replaceString(' show','',marker._icon.children[obj].className);
      }
    }
  }
  replaceString(oldS, newS, fullS) {
    for (var i = 0; i < fullS.length; ++i) {
      if (fullS.substring(i, i + oldS.length) == oldS) {
        fullS = fullS.substring(0, i) + newS + fullS.substring(i + oldS.length, fullS.length);
      }
    }
    return fullS;
  }
  init(id) {
    if (this.state.map) return;
    let map = L.map(id, config.params);
    L.control.zoom({ position: "bottomleft"}).addTo(map);
    L.control.scale({ position: "bottomleft"}).addTo(map);
    const tileLayer = L.tileLayer(config.tileLayer.uri, config.tileLayer.params).addTo(map);
    this.setState({ map:map});
  }
  render(){
    return (
      <div className="row">
        <h1 className="text-info text-center col-12">Map</h1>
        <div className="col-sm-6 col-lg-6 offset-md-3">
          <div className="card">
            <div className="card-block">
              <div id="mapUI">
                <div ref={(node) => { this._mapNode = node}} id="map" />
              </div>
            </div>
          </div>
        </div>

      </div>
    );
  }
}
