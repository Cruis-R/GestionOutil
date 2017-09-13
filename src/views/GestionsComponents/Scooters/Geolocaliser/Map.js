import React, { Component } from 'react';
import L from 'leaflet';
import classnames from 'classnames';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import 'react-datetime/css/react-datetime.css'
import DateTime from 'react-datetime';
import { TabContent, TabPane, Nav, NavItem, NavLink, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
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
const colorList = ["#9c27b0","#303f9f","#ad1457","#8b4aa5","#7f3573","#cbddb8","#f2cc8c","#c984b0","#8b4aa5","#7f3573"];
export default class Map extends Component{
  constructor(props) {
    super(props);
    this.state = {
      activeTab : null,
      map : null,
      isModifierGeofenceModal : false,
      isAddGeofenceModal : false,
      isDeleteGeofenceModal : false,
      geoData : {type:"FeatureCollection",features:[]},
      arretsGeojson :  {type:"FeatureCollection",features:[]},
      routesGeojson : {type:"FeatureCollection",features:[]},
      geojsonLayer : null,
      geofenceLayer : [],
      arretsLayer : null,
      routesLayer : null,
      scooterNumClicked : null,
      isSymbol : true,
      scooterSelected : [],
      scooterList : [],
      geofenceData : [],
      geofenceDataRow : [],
      scooterEnterInfoData : []
    }
    this.toggle = this.toggle.bind(this);
    this.toggleModifierGeofenceModal = this.toggleModifierGeofenceModal.bind(this);
    this.toggleAddGeofenceModal = this.toggleAddGeofenceModal.bind(this);
    this.toggleDeleteGeofenceModal = this.toggleDeleteGeofenceModal.bind(this);
    this.selectGeofence = this.selectGeofence.bind(this);
    this.init = this.init.bind(this);
    this.updateScooterDataInterval;
    this.updateScooterEnterInfoInterval;
    this.afficherArrets = this.afficherArrets.bind(this);
    this.afficherRoutes = this.afficherRoutes.bind(this);
    this.addGeoJSONLayer = this.addGeoJSONLayer.bind(this);
    this.clearArretsLayer = this.clearArretsLayer.bind(this);
    this.addArretsLayer = this.addArretsLayer.bind(this);
    this.addRoutesLayer = this.addRoutesLayer.bind(this);
    this.addGeofenceLayer = this.addGeofenceLayer.bind(this);
    this.clearRoutesLayer = this.clearRoutesLayer.bind(this);
    this.pointToLayer = this.pointToLayer.bind(this);
    this.pointToLayerArret = this.pointToLayerArret.bind(this);
    this.onEachFeature = this.onEachFeature.bind(this);
    this.onEachFeatureArret = this.onEachFeatureArret.bind(this);
    this.filterFeatures = this.filterFeatures.bind(this);
    this.formatArretsPositions = this.formatArretsPositions.bind(this);
    this.formatScooterRoutes = this.formatScooterRoutes.bind(this);
    this.formatGeofence = this.formatGeofence.bind(this);
    this.zoomToFeature = this.zoomToFeature.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.areaNameFormatter = this.areaNameFormatter.bind(this);
    this.deviceNameFormatter = this.deviceNameFormatter.bind(this);
    this.updateGeofence = this.updateGeofence.bind(this);
    this.addGeofence = this.addGeofence.bind(this);
    this.deleteGeofence = this.deleteGeofence.bind(this);
    this.getGeofencesForEnter = this.getGeofencesForEnter.bind(this);
    this.getLatestEnterInfo = this.getLatestEnterInfo.bind(this);
  }
  componentDidMount() {
    this.init(this._mapNode);
    this.updateScooterDataFromServer();
    this.updateScooterDataInterval = setInterval(()=>{
      this.updateScooterDataFromServer();
    },30000);
  }
  componentDidUpdate(prevProps, prevState) {
    this.addGeoJSONLayer(this.state.geoData);
    if(this.state.scooterSelected.length!==prevState.scooterSelected.length){
      this.zoomToFeature(this.state.geojsonLayer);
    }
  }
  componentWillUnmount() {
    clearInterval(this.updateScooterDataInterval);
    clearInterval(this.updateScooterEnterInfoInterval);
    this.state.map.remove();
  }
  toggle(tab) {
    if(tab!=='3'){
      this.state.geofenceLayer.map((instance)=>{
        instance.remove();
      })
      this.setState({
        geofenceLayer: []
      });
    }
    if(tab!=='4'){
      clearInterval(this.updateScooterEnterInfoInterval)
    }else {
      this.getLatestEnterInfo();
      this.getGeofencesForEnter();
      this.updateScooterDataInterval = setInterval(()=>{
        this.getLatestEnterInfo();
      },30000);
    }
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }
  toggleModifierGeofenceModal(){
    //console.log("toggleModifierGeofenceModal",this.state.isModifierGeofenceModal);
    this.setState({
      isModifierGeofenceModal: !this.state.isModifierGeofenceModal
    });
  }
  toggleAddGeofenceModal(){
    this.setState({
      isAddGeofenceModal: !this.state.isAddGeofenceModal
    });
  }
  toggleDeleteGeofenceModal(){
    this.setState({
      isDeleteGeofenceModal: !this.state.isDeleteGeofenceModal
    });
  }
  selectGeofence(e){
    this.refs.longitude.disabled = false;
    this.refs.latitude.disabled = false;
    this.refs.radius.disabled = false;
    this.refs.name.disabled = false;
    this.refs.longitude.value = this.state.geofenceData[e.target.value]["area"][0];
    this.refs.latitude.value = this.state.geofenceData[e.target.value]["area"][1];
    this.refs.radius.value = this.state.geofenceData[e.target.value]["area"][2];
    this.refs.name.value = this.state.geofenceData[e.target.value]["name"];
  }
  addGeofence(){
    const queryMethod = "POST";
    let urlGeofences = "http://vps92599.ovh.net:8082/api/geofences";
    let data = {
      "attributes":{},
      "name":this.refs.name.value,
      "description":"",
      "area":"CIRCLE ("+this.refs.longitude.value+" "+this.refs.latitude.value+", "+this.refs.radius.value+")",
      "calendarId":0
    };
    console.log("updateGeofence",data);
    fetch(urlGeofences,{
      method: queryMethod,
      body: JSON.stringify(data),
      headers: new Headers({
    		'Content-Type': 'application/json'
    	}),
      credentials : "include"
    })
    .then(
      (response)=>{
        if(response.status!==200){
          console.log("error");
          this.setState({
            isAddGeofenceSuccess : false
          })
        }else {
          this.state.geofenceLayer.map((instance)=>{
            instance.remove();
          })
          this.toggleAddGeofenceModal();
          this.afficherGeofences();
        }
      }
    )
    .catch((error) => {
      console.error(error);
    });
  }
  updateGeofence(){
    const queryMethod = "PUT";
    let urlGeofences = "http://vps92599.ovh.net:8082/api/geofences/"+this.state.geofenceData[this.refs.geofenceId.value]["id"];
    let data = {
      "id":this.state.geofenceData[this.refs.geofenceId.value]["id"],
      "attributes":this.state.geofenceData[this.refs.geofenceId.value]["attributes"],
      "name":this.refs.name.value,
      "description":this.state.geofenceData[this.refs.geofenceId.value]["description"],
      "area":"CIRCLE ("+this.refs.longitude.value+" "+this.refs.latitude.value+", "+this.refs.radius.value+")",
      "calendarId":this.state.geofenceData[this.refs.geofenceId.value]["calendarId"]
    };
    console.log("updateGeofence",data);
    fetch(urlGeofences,{
      method: queryMethod,
      body: JSON.stringify(data),
      headers: new Headers({
    		'Content-Type': 'application/json'
    	}),
      credentials : "include"
    })
    .then(
      (response)=>{
        if(response.status!==200){
          console.log("error");
          this.setState({
            isModifierGeofenceModalSuccess : false
          })
        }else {
          this.state.geofenceLayer.map((instance)=>{
            instance.remove();
          })
          this.toggleModifierGeofenceModal();
          this.afficherGeofences();
        }
      }
    )
    .catch((error) => {
      console.error(error);
    });
  }
  deleteGeofence(){
    const queryMethod = "DELETE";
    let urlGeofences = "http://vps92599.ovh.net:8082/api/geofences/"+this.state.geofenceData[this.refs.geofenceId.value]["id"];
    fetch(urlGeofences,{
      method: queryMethod,
      headers: new Headers({
    		'Content-Type': 'application/json'
    	}),
      credentials : "include"
    })
    .then(
      (response)=>{
        this.state.geofenceLayer.map((instance)=>{
          instance.remove();
        })
        this.toggleDeleteGeofenceModal();
        this.afficherGeofences();
      }
    )
    .catch((error) => {
      console.error(error);
    });
  }
  getLatestEnterInfo(){
    const queryMethod = "GET";
    let timeNow = new Date();
    let timeTenMintesAgo = new Date();
    timeTenMintesAgo.setMinutes(timeTenMintesAgo.getMinutes()-10);
    let urlEnterInfo = "http://vps92599.ovh.net:8082/api/reports/events?groupId=1&type=geofenceEnter&from=2017-09-01T13%3A42%3A57.000Z&to="+timeNow.toISOString();
    //let urlEnterInfo = "http://vps92599.ovh.net:8082/api/reports/events?groupId=1&type=geofenceEnter&from="+timeTenMintesAgo.toISOString()+"&to="+timeNow.toISOString();
    fetch(urlEnterInfo,{
      method: queryMethod,
      headers: new Headers({
    		'Content-Type': 'application/json'
    	}),
      credentials : "include"
    }).then((response) => response.json())
    .then((responseJson)=>{
      this.setState({
        scooterEnterInfoData : responseJson
      })
    })
    .catch((error) => {
      console.error(error);
    });
  }
  addRoutesLayer(geojson){
    let cur = this;
    let routesLayer;
    console.log("addRoutesLayer",geojson);
    if (!this.state.routesLayer&&geojson["features"].length>0) {
      routesLayer = L.geoJson(geojson, {
        style: this.routeStyle
      });
      routesLayer.addTo(this.state.map);
      geojson["features"].length>0?cur.zoomToFeature(routesLayer):null;
      this.setState({
        routesLayer:routesLayer
      })
    }else if(this.state.routesLayer) {
      this.state.routesLayer.clearLayers();
      this.state.routesLayer.addData(geojson);
      //geojson["features"].length>0?cur.zoomToFeature(geojsonLayer):null;
    }
  }
  clearRoutesLayer(){
    this.state.routesLayer.clearLayers();
    this.setState({
      isSymbol : false
    })
  }
  routeStyle(feature) {
    return {color: feature.geometry.color};
  }
  addGeoJSONLayer(geojson) {
    let cur = this;
    let geojsonLayer;

    if (!this.state.geojsonLayer&&geojson["features"].length>0) {
      geojsonLayer = L.geoJson(geojson, {
        onEachFeature: this.onEachFeature,
        pointToLayer: this.pointToLayer,
        filter: this.filterFeatures
      });
      geojsonLayer.addTo(this.state.map);
      geojson["features"].length>0?cur.zoomToFeature(geojsonLayer):null;
      this.setState({
        geojsonLayer:geojsonLayer
      })
    }else if(this.state.geojsonLayer) {
      this.state.geojsonLayer.clearLayers();
      this.state.geojsonLayer.addData(geojson);
      //geojson["features"].length>0?cur.zoomToFeature(geojsonLayer):null;
    }
  }
  pointToLayer(feature, latlng) {
    var cur = this;
    if(feature.geometry.type ==="Point"){
      var markers = this.markerAndIcons(feature.properties.markerAndIcons?feature.properties.markerAndIcons:null);
      markers = markers + `<div class="scooterNameTag">${feature.properties.name}</div>`;
      var testMarker = L.marker(latlng,{icon: L.divIcon({className: 'markers', html:markers, iconSize:[35,35],iconAnchor : [17,42]}),riseOnHover:true})
                        .on('click',(e)=>{
                          cur.setState({
                            scooterNumClicked : feature.properties.scooterGeodataIndex
                          });
                          this.state.map.setView(e.target.getLatLng(),14);
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
    let result = true;
    if(!feature.geometry.coordinates[0]||!feature.geometry.coordinates[1]){
      result = false;
    }if (this.state.scooterSelected.length>0) {
      result = false;
      this.state.scooterSelected.map((instance)=>{
        if(instance["value"]===feature.properties.id){
          result = true;
        }
      });
    }
    return result;
  }
  clearArretsLayer(){
    this.state.arretsLayer.clearLayers();
  }
  addArretsLayer(geojson) {
    let cur = this;
    let arretsLayer;
    console.log("addArretsLayer",geojson);
    if (!this.state.arretsLayer&&geojson["features"].length>0) {
      arretsLayer = L.geoJson(geojson, {
        onEachFeature: this.onEachFeatureArret,
        pointToLayer: this.pointToLayerArret
      });
      arretsLayer.addTo(this.state.map);
      geojson["features"].length>0?cur.zoomToFeature(arretsLayer):null;
      this.setState({
        arretsLayer:arretsLayer
      })
    }else if(this.state.arretsLayer) {
      this.state.arretsLayer.clearLayers();
      this.state.arretsLayer.addData(geojson);
      geojson["features"].length>0?cur.zoomToFeature(this.state.arretsLayer):null;
    }
  }
  pointToLayerArret(feature, latlng) {
    var cur = this;
    let popupContent = `<div>Device: ${feature.properties.deviceName}</div>
                        <div>Duree: ${(feature.properties.duration/60000).toFixed(2)} Mins</div>
                        <div>Date: ${feature.properties.date}</div>
                        <div>Time: ${feature.properties.time}</div>
                        `;
    if(feature.geometry.type ==="Point"){
      var marker =new L.CircleMarker(latlng, {
                      radius: 5,
                      fillColor: feature.geometry.color,
                      color: "#000",
                      weight: 1,
                      opacity: 0.5,
                      fillOpacity: 1
                    }).bindPopup(popupContent);
      return marker;
    }else{
      return null;
    }
  }
  onEachFeatureArret(feature, marker) {
    var cur = this;
    if (feature.geometry.type ==="Point"&&feature.properties) {
      marker.on('mouseover', function (e) {
        marker.togglePopup();
      });
      marker.on('mouseout', function (e) {
        marker.closePopup();
      });
      marker.on('click',(e)=>{
        this.state.map.setView(e.target.getLatLng(),14);
      },);
    }
  }
  addGeofenceLayer(geofenceData){
    let geofenceLayer = [];
    geofenceData.map((instance)=>{
      let area = instance["area"]
      geofenceLayer.push(L.circle([area[0], area[1]], {radius: area[2]}).bindTooltip(instance["name"],{permanent: true, direction:"center", className : "geofenceName"}).openTooltip());
    });
    geofenceLayer.map((instance)=>{
      instance.addTo(this.state.map);
    })
    this.setState({
      geofenceLayer : geofenceLayer
    })
  }
  zoomToFeature(target) {
    var fitBoundsParams = {
      paddingTopLeft: [20,20],
      paddingBottomRight: [20,20],
      maxZoom : 18
    };
    Object.getOwnPropertyNames(target.getBounds()).length>0?
    this.state.map.fitBounds(target.getBounds(), fitBoundsParams):null;
  }
  afficherArrets(){
    let arretQueryString = '';
    this.state.scooterSelected.map((instance)=>{
      arretQueryString = arretQueryString.concat('deviceId=',instance["value"],'&');
    })
    let dateDebut = this.refs.arrets_date_debut.state.inputValue;
    let dateFin = this.refs.arrets_date_fin.state.inputValue;
    if(dateDebut&&dateFin){
      arretQueryString = arretQueryString + "from="+new Date(dateDebut).toISOString()+'&'+'to='+new Date(dateFin).toISOString();
    }
    let urlsArrets = "http://vps92599.ovh.net:8082/api/reports/stops?"+arretQueryString;
    let urls = [urlsArrets];
    console.log("urlsArrets",urlsArrets);
    var promises = urls.map(url =>fetch(url,{credentials: 'include',headers: {'Accept': 'application/json'}}).then(y => y.json()));
    Promise.all(promises)
    .then(results => {this.formatScooterArrets(results);})
    .catch(err=>{console.log(err);});
  }
  afficherGeofences(){
    let urlsGeofences = "http://vps92599.ovh.net:8082/api/geofences";
    let urls = [urlsGeofences];
    var promises = urls.map(url =>fetch(url,{credentials: 'include',headers: {'Accept': 'application/json'}}).then(y => y.json()));
    Promise.all(promises)
    .then(results => {
      this.setState({
        geofenceDataRow : results[0]
      });
      this.formatGeofence(results[0]);
    })
    .catch(err=>{console.log(err);});
  }
  getGeofencesForEnter(){
    let urlsGeofences = "http://vps92599.ovh.net:8082/api/geofences";
    fetch(urlsGeofences,{credentials: 'include',headers: {'Accept': 'application/json'}})
    .then(y => y.json())
    .then(results => {
      this.setState({
        geofenceDataRow : results
      });
    })
    .catch(err=>{console.log(err);});
  }
  formatGeofence(data){
    let res = data
    console.log(res);
    let nullIndex = [];
    res.map((instance,index)=>{
      if(instance){
        instance["area"] = instance["area"].replace(/\(+|\)+|\CIRCLE|\,/g,'').split(' ');
        instance["area"].splice(0,1);
      }else {
        nullIndex.unshift(index);
      }
    });
    nullIndex.map((instance)=>{
      res.splice(instance,1);
    });
    console.log("format geofence",res);
    this.setState({
      geofenceData : res
    });
    this.addGeofenceLayer(res);
  }
  formatScooterArrets(data){
    console.log(data);
    let urlPositions = "http://vps92599.ovh.net:8082/api/positions?";
    let positionTime = {};
    let deviceName = {};
    data[0].map((instance,index)=>{
      if (index !== 0) {
        urlPositions = urlPositions.concat('&');
      }
      urlPositions = urlPositions.concat('id=',instance["positionId"]);
      positionTime[instance["positionId"]] = instance["duration"];
      deviceName[instance["deviceId"]] = instance["deviceName"];
    })
    console.log(urlPositions);
    let urls = [urlPositions];
    var promises = urls.map(url =>fetch(url,{credentials: 'include',headers: {'Accept': 'application/json'}}).then(y => y.json()));
    Promise.all(promises)
    .then(results => {this.formatArretsPositions(results,positionTime,deviceName);})
    .catch(err=>{console.log(err);});
  }
  formatArretsPositions(data,positionTime,deviceName){
    let arretsGeojson = {
      type:"FeatureCollection",
      features :[]
    };
    let colorMap = {};
    this.state.scooterSelected.map((instance,index)=>{
      colorMap[instance["value"]] = colorList[index];
    });
    data[0].map((instance,index)=>{
      let date = new Date(instance["deviceTime"]);
      let template ={
        "type": "Feature",
        "geometry": {
          "type": "Point",
          "color" : colorMap[instance["deviceId"]],
          "coordinates": [instance["longitude"],instance["latitude"]]
        },
        "properties": {
          "duration" : positionTime[instance["id"]],
          "course" : instance["course"],
          "address" : instance["address"],
          "date" : date.toLocaleDateString(),
          "time" : date.toLocaleTimeString(),
          "deviceName" : deviceName[instance["deviceId"]],
          "positionId" : instance["id"],
          "scooterGeodataIndex" : index,
          "deviceId" : instance["deviceId"]
        }
      }
      arretsGeojson['features'].push(template);
    })
    this.setState({
      arretsGeojson : arretsGeojson
    })
    this.addArretsLayer(arretsGeojson);
  }
  afficherRoutes(){
    let arretQueryString = '';
    this.state.scooterSelected.map((instance)=>{
      arretQueryString = arretQueryString.concat('deviceId=',instance["value"],'&');
    })
    let dateDebut = this.refs.routes_date_debut.state.inputValue;
    let dateFin = this.refs.routes_date_fin.state.inputValue;
    if(dateDebut&&dateFin){
      arretQueryString = arretQueryString + "from="+new Date(dateDebut).toISOString()+'&'+'to='+new Date(dateFin).toISOString();
    }
    let urlsArrets = "http://vps92599.ovh.net:8082/api/reports/route?"+arretQueryString;
    let urls = [urlsArrets];
    console.log("urlsArrets",urlsArrets);
    var promises = urls.map(url =>fetch(url,{credentials: 'include',headers: {'Accept': 'application/json'}}).then(y => y.json()));
    Promise.all(promises)
    .then(results => {this.formatScooterRoutes(results);})
    .catch(err=>{console.log(err);});
  }
  formatScooterRoutes(data){
    let routesGeojson = {
      type:"FeatureCollection",
      features :[]
    };
    let colorMap = {};
    let lineIndex = [];
    this.state.scooterSelected.map((instance,index)=>{
      colorMap[instance["value"]] = colorList[index];
    });
    data[0].map((instance,index)=>{
      let date = new Date(instance["deviceTime"]);
      if(lineIndex.indexOf(instance["deviceId"])===-1){
        lineIndex.push(instance["deviceId"]);
        let template ={
          "type": "Feature",
          "geometry": {
            "type": "LineString",
            "color" : colorMap[instance["deviceId"]],
            "coordinates": [[instance["longitude"],instance["latitude"]]]
          },
          "properties": {
            "deviceId" : instance["deviceId"]
          }
        }
        routesGeojson['features'].push(template);
      }else {
        routesGeojson['features'][lineIndex.indexOf(instance["deviceId"])]["geometry"]["coordinates"].push([instance["longitude"],instance["latitude"]]);
      }
    })
    this.setState({
      routesGeojson : routesGeojson,
      isSymbol : true
    })
    console.log(routesGeojson);
    this.addRoutesLayer(routesGeojson);
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
          "mileage" : positionIndex>=0?(data[2][positionIndex]["attributes"]["totalDistance"]/1000).toFixed(2)+" KM":"To be getted",
          "date":positionIndex>=0?data[2][positionIndex]["deviceTime"]:"To be getted",
          "lat":positionIndex>=0?data[2][positionIndex]["latitude"]:null,
          "long":positionIndex>=0?data[2][positionIndex]["longitude"]:null,
          "speed":positionIndex>=0?data[2][positionIndex]["speed"]+"Km/h": "To be getted",
          "address":positionIndex>=0?(data[2][positionIndex]["address"]?data[2][positionIndex]["address"]:"To be getted"):"To be getted",
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
            "markerAndIcons" :[{"icon":"motorcycle","color":"CADETBLUE","number":null},{"icon":"number","color":"BLUE","number":scooterDetails['name']}],
            "mileage":scooterDetails["mileage"],
            "speed" : scooterDetails["speed"],
            "name" : scooterDetails["name"],
            "address" : scooterDetails["address"],
            "status" : scooterDetails["status"],
            "scooterGeodataIndex" : index,
            "id" : scooterDetails["id"]
          }
        }
        let timeString = null;
        if(positionIndex>=0){
          let deviceTime = data[2][positionIndex]["deviceTime"];
          let updateTime = new Date(deviceTime);
          let clientTime = new Date();
          let timeDifs = ((clientTime.getTime()-updateTime.getTime())/60/1000).toFixed(1);
          timeString = timeDifs?(timeDifs>=60?(timeDifs>=1440?(timeDifs/1440).toFixed(1)+' Days ago':(timeDifs/60).toFixed(1)+' Hours ago'):(timeDifs)+' Minutes ago'):null;
        }
        let scooterListData = {
          "value":scooterDetails["id"],
          "label":scooterDetails["name"],
          "updateTime":timeString?timeString:"Unknown",
          "status":scooterDetails["status"]?scooterDetails["status"]:"to be getted"
        }
        scooterData["features"].push(template);
        scooterList.push(scooterListData);
      }
    });
    this.setState({
      geoData : scooterData,
      scooterList : scooterList
    });
  }
  areaFormatter(cell,row){
    return (
      <div className="" style={{'fontSize' : 14 + "px","textOverflow": "ellipsis"}}>
        <span className="">{"LON: "+parseFloat(cell[0]).toFixed(2)+'\t'}</span>
        <span className="">{"LAT: "+parseFloat(cell[1]).toFixed(2)+'\t'}</span>
        <span className="">{"RD: "+(parseFloat(cell[2])/1000).toFixed(1)+ 'KM'}</span>
      </div>
    );
  }
  deviceNameFormatter(cell){
    let deveiceName;
    this.state.scooterList.map((instance)=>{
      if(instance["value"]===cell) deveiceName = instance["label"];
    });
    return 'Scooter '+deveiceName;
  }
  areaNameFormatter(cell){
    let areaName;
    this.state.geofenceDataRow.map((instance)=>{
      if(instance&&instance["id"]===cell) areaName = instance["name"];
    });
    return areaName;
  }
  updateTimeFormatter(cell){
    let t = new Date();
    let tt = new Date(cell);
    return ((t.getTime()-tt.getTime())/1000/60).toFixed(1) + ' Minites';
  }
  markerAndIcons(info){
    ////console.log("info",info);
    let markerAndIconsString = "";
    let iconNum = info?info.length:0;
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
  renderSizePerPageDropDown = props => {
    return (
      <div className='btn-group'>
        {
          [ 1, 2, 3 ].map((n, idx) => {
            const isActive = (n === props.currSizePerPage) ? 'active' : null;
            return (
              <button key={ idx } type='button' className={ `btn btn-info ${isActive}` } onClick={ () => props.changeSizePerPage(n) }>{ n }</button>
            );
          })
        }
      </div>
    );
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
  handleSelectChange (value) {
		console.log('You\'ve selected scooter:', value);
		this.setState({ scooterSelected : value });
	}
  render(){
    const optionsGeofence = {
      sizePerPage: 3,
      sizePerPageDropDown: this.renderSizePerPageDropDown,
    };
    const optionsEntre = {
      sizePerPage: 3,
      sizePerPageDropDown: this.renderSizePerPageDropDown,
      sortName: "serverTime",
      sortOrder: "desc",
    };
    const mileage = this.state.scooterNumClicked?this.state.geoData["features"][this.state.scooterNumClicked]["properties"]['mileage']:'...';
    const name = this.state.scooterNumClicked?this.state.geoData["features"][this.state.scooterNumClicked]["properties"]['name']:"...";
    const address = this.state.scooterNumClicked?this.state.geoData["features"][this.state.scooterNumClicked]["properties"]['address']:'...';
    const status = this.state.scooterNumClicked?this.state.geoData["features"][this.state.scooterNumClicked]["properties"]['status']:'...';
    return (
      <div className="row">
        <h1 className="text-info text-center col-12">Map(Refresh in <CountDown /> Seconds)</h1>
        <div className="col-sm-12 col-lg-12">
          <div className="card">
            <div className="card-block p-3 clearfix row">
              <div className="col-lg-1">
                <i className="fa fa-motorcycle bg-primary p-3 mt-1 font-xl float-left"></i>
              </div>
              <div className="mt-2 col-lg-1 ">
                <strong className="text-info">{name}</strong>
                <div className="text-muted text-uppercase font-weight-bold font-xs">Scooter</div>
              </div>
              <div className={classnames("mt-2",{"col-lg-1" : mileage.length<=7,"col-lg-2" : mileage.length>7})}>
                <strong className="text-info">{mileage}</strong>
                <div className="text-muted text-uppercase font-weight-bold font-xs">parcours</div>
              </div>
              <div className="mt-2 col-lg-1 ">
                <strong className={classnames({
                    "text-success" : status==="online",
                    "text-danger" : status==="offline",
                    "text-warning" : status==="unknown",
                    "text-info" : status ==="..."})}>{status}</strong>
                <div className="text-muted text-uppercase font-weight-bold font-xs">status</div>
              </div>
              <div className="mt-2 col-lg-6 ">
                <strong className="text-info">{address}</strong>
                <div className="text-muted text-uppercase font-weight-bold font-xs">address</div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-sm-4 col-lg-4">
          <div className="card">
            <div className="card-block">
              <label htmlFor="scooter_selection">Selectionner Scooters</label>
              <Select
                name="scooter_selection"
                id="scooter_selection"
                value={this.state.scooterSelected}
                options={this.state.scooterList}
                optionComponent={SelectOptions}
                multi={true}
                onChange = {this.handleSelectChange}
              />
            </div>
          </div>
          <div>
            <Nav tabs>
              <NavItem>
                <NavLink
                  className={classnames({ active: this.state.activeTab === '1' })}
                  onClick={() => { this.toggle('1'); }}
                >
                  Arrêts
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({ active: this.state.activeTab === '2' })}
                  onClick={() => { this.toggle('2'); }}
                >
                  Parcours
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({ active: this.state.activeTab === '3' })}
                  onClick={() => { this.toggle('3'); this.afficherGeofences()}}
                >
                  Geofence
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({ active: this.state.activeTab === '4' })}
                  onClick={() => { this.toggle('4');}}
                >
                  Entrée Info
                </NavLink>
              </NavItem>
            </Nav>
            <TabContent activeTab={this.state.activeTab}>
              <TabPane tabId="1">
                <div style={{height : "340px"}}>
                  <div className="row">
                    <div className="form-group col-sm-12">
                      <label htmlFor="rapport_mois">Selectionner la date debut</label>
                      <DateTime ref = "arrets_date_debut"/>
                    </div>
                    <div className="form-group col-sm-12">
                      <label htmlFor="rapport_mois">Selectionner la date fin</label>
                      <DateTime ref = "arrets_date_fin"/>
                    </div>
                    <div className="col">
                      <button type="button" className="btn btn-sm btn-primary" onClick={this.afficherArrets}>Afficher</button>
                      <button type="button" className="btn btn-sm btn-info" onClick={this.clearArretsLayer}>Clear</button>
                    </div>
                  </div>
                </div>
              </TabPane>
              <TabPane tabId="2">
                <div style={{height : "340px"}}>
                  <div className="row">
                    <div className="form-group col-sm-12">
                      <label htmlFor="rapport_mois">Selectionner la date debut</label>
                      <DateTime ref = "routes_date_debut"/>
                    </div>
                    <div className="form-group col-sm-12">
                      <label htmlFor="rapport_mois">Selectionner la date fin</label>
                      <DateTime ref = "routes_date_fin"/>
                    </div>
                    <div className="col">
                      <button type="button" className="btn btn-sm btn-primary" onClick={this.afficherRoutes}>Afficher</button>
                      <button type="button" className="btn btn-sm btn-info" onClick={this.clearRoutesLayer}>Clear</button>
                    </div>
                  </div>
                  {this.state.isSymbol?<RouteSymbol scooterSelected={this.state.scooterSelected}/>:null}
                </div>
              </TabPane>
              <TabPane tabId="3">
                <div style={{height : "340px"}}>
                  <div className="row">
                    <button type="button" className="btn col-sm-3 btn-primary" onClick={this.toggleAddGeofenceModal}>Ajouter</button>
                    <button type="button" className="btn col-sm-3 btn-info" onClick={this.toggleModifierGeofenceModal}>Modifier</button>
                    <button type="button" className="btn col-sm-3 btn-success">Assigner</button>
                    <button type="button" className="btn col-sm-3 btn-danger" onClick={this.toggleDeleteGeofenceModal}>Supprimer</button>
                    <BootstrapTable
                      options = {optionsGeofence}
                      data={ this.state.geofenceData }
                      headerStyle = { { "backgroundColor" : "#63c2de" } }
                      height = "250px"
                      pagination>
                      <TableHeaderColumn
                        dataField="name"
                        isKey
                        dataSort
                        tdStyle = {{"textOverflow": "ellipsis"}}
                        width = "30%">
                        Nom
                      </TableHeaderColumn>
                      <TableHeaderColumn
                        dataField="area"
                        dataSort
                        tdStyle = {{"textOverflow": "ellipsis"}}
                        dataFormat = {this.areaFormatter}>
                        Area
                      </TableHeaderColumn>
                    </BootstrapTable>
                    <Modal isOpen={this.state.isModifierGeofenceModal} toggle={this.toggleModifierGeofenceModal}>
                      <ModalHeader toggle={this.toggleModifierGeofenceModal}>Modifier un Geofence</ModalHeader>
                      <ModalBody>
                        <div>
                          <div className="row">
                            <div className="form-group col-sm-12">
                              <label htmlFor="id">Nom</label>
                              <select className="form-control" ref='geofenceId' id="name" placeholder="Nom" defaultValue='selectionner un geofence' onChange = {(e)=>this.selectGeofence(e)}>
                                <option disabled value='selectionner un geofence'> -- selectionner un geofence -- </option>
                                {
                                  this.state.geofenceData.map((instance,index)=>{
                                    return <option value={index}>{'Geofence: '+instance['name']}</option>
                                  })
                                }
                              </select>
                            </div>
                            <div className="form-group col-sm-12">
                              <label htmlFor="nom">Nom</label>
                              <input type="text" disabled ref='name' className="form-control" id="name" placeholder="Nom"/>
                            </div>
                            <div className="form-group col-sm-12">
                              <label htmlFor="nom">Longitude</label>
                              <input type="text" disabled ref='longitude' className="form-control" id="longitude" placeholder="Longitude"/>
                            </div>
                            <div className="form-group col-sm-12">
                              <label htmlFor="durée">Latitude</label>
                              <input type="text" disabled ref='latitude' className="form-control" id="latitude" placeholder="Latitude"/>
                            </div>
                            <div className="form-group col-sm-12">
                              <label htmlFor="tarifmensuel">Radius / Metre</label>
                              <input type="text" disabled ref='radius' className="form-control" id="radius" placeholder="Radius"/>
                            </div>
                          </div>
                        </div>
                      </ModalBody>
                      <ModalFooter>
                        <button type="button" className="btn btn-sm btn-success" onClick={this.updateGeofence}>Submit</button>
                        <button type="button" className="btn btn-sm btn-secondary" onClick={this.toggleModifierGeofenceModal}>Cancel</button>
                      </ModalFooter>
                    </Modal>
                    <Modal isOpen={this.state.isDeleteGeofenceModal} toggle={this.toggleDeleteGeofenceModal}>
                      <ModalHeader toggle={this.toggleDeleteGeofenceModal}>Supprimer un Geofence</ModalHeader>
                      <ModalBody>
                        <div>
                          <div className="row">
                            <div className="form-group col-sm-12">
                              <label htmlFor="id">Nom</label>
                              <select className="form-control" ref='geofenceId' id="name" placeholder="Nom" defaultValue='selectionner un geofence'>
                                <option disabled value='selectionner un geofence'> -- selectionner un geofence -- </option>
                                {
                                  this.state.geofenceData.map((instance,index)=>{
                                    return <option value={index}>{'Geofence: '+instance['name']}</option>
                                  })
                                }
                              </select>
                            </div>
                          </div>
                        </div>
                      </ModalBody>
                      <ModalFooter>
                        <button type="button" className="btn btn-sm btn-success" onClick={this.deleteGeofence}>Submit</button>
                        <button type="button" className="btn btn-sm btn-secondary" onClick={this.toggleDeleteGeofenceModal}>Cancel</button>
                      </ModalFooter>
                    </Modal>
                    <Modal isOpen={this.state.isAddGeofenceModal} toggle={this.toggleAddGeofenceModal}>
                      <ModalHeader toggle={this.toggleAddGeofenceModal}>Ajouter un Geofence</ModalHeader>
                      <ModalBody>
                        <div>
                          <div className="row">
                            <div className="form-group col-sm-12">
                              <label htmlFor="nom">Nom</label>
                              <input type="text" ref='name' className="form-control" id="name" placeholder="Nom"/>
                            </div>
                            <div className="form-group col-sm-12">
                              <label htmlFor="nom">Longitude</label>
                              <input type="text" ref='longitude' className="form-control" id="longitude" placeholder="Longitude"/>
                            </div>
                            <div className="form-group col-sm-12">
                              <label htmlFor="durée">Latitude</label>
                              <input type="text" ref='latitude' className="form-control" id="latitude" placeholder="Latitude"/>
                            </div>
                            <div className="form-group col-sm-12">
                              <label htmlFor="tarifmensuel">Radius / Metre</label>
                              <input type="text" ref='radius' className="form-control" id="radius" placeholder="Radius"/>
                            </div>
                          </div>
                        </div>
                      </ModalBody>
                      <ModalFooter>
                        <button type="button" className="btn btn-sm btn-success" onClick={this.addGeofence}>Submit</button>
                        <button type="button" className="btn btn-sm btn-secondary" onClick={this.toggleAddGeofenceModal}>Cancel</button>
                      </ModalFooter>
                    </Modal>
                  </div>
                </div>
              </TabPane>
              <TabPane tabId="4">
                <BootstrapTable
                  options = {optionsEntre}
                  data={ this.state.scooterEnterInfoData }
                  headerStyle = { { "backgroundColor" : "#63c2de" } }
                  height = "250px"
                  pagination>
                  <TableHeaderColumn
                    dataField="deviceId"
                    isKey
                    dataSort
                    width = "30%"
                    dataFormat = {this.deviceNameFormatter}>
                    Nom
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField="geofenceId"
                    dataSort
                    dataFormat = {this.areaNameFormatter}>
                    Area
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField="serverTime"
                    dataSort
                    dataFormat = {this.updateTimeFormatter}>
                    Update
                  </TableHeaderColumn>
                </BootstrapTable>
              </TabPane>
            </TabContent>
          </div>
        </div>
        <div className="col-sm-8 col-lg-8">
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
class SelectOptions extends Component{
  constructor(props){
    super(props);
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
  }
	handleMouseDown (event) {
		event.preventDefault();
		event.stopPropagation();
		this.props.onSelect(this.props.option, event);
	}
	handleMouseEnter (event) {
		this.props.onFocus(this.props.option, event);
	}
	handleMouseMove (event) {
		if (this.props.isFocused) return;
		this.props.onFocus(this.props.option, event);
	}
	render () {
		return (
			<div className={this.props.className}
				onMouseDown={this.handleMouseDown}
				onMouseEnter={this.handleMouseEnter}
				onMouseMove={this.handleMouseMove}
				title={this.props.option.title}>
        <div className="row">
          <div className="col-sm-2">
            {this.props.children}
          </div>
          <div className="col-sm-6">
            {this.props.option.updateTime}
          </div>
          <span className={classnames("badge mx-2",{
              "badge-info":this.props.option.status==="To be getted",
              "badge-warning":this.props.option.status==="unknown",
              "badge-success":this.props.option.status==="online",
              "badge-danger":this.props.option.status==="offline"})}>
              {this.props.option.status}
          </span>
        </div>
			</div>
		);
	}
}
class CountDown extends Component{
  constructor(props){
    super(props);
    this.state = {
      countDown : 30
    }
    this.refreshCountDownInterval;
    this.mapRefreshCountDown = this.mapRefreshCountDown.bind(this);
  }
  componentDidMount(){
    this.refreshCountDownInterval = setInterval(()=>{
      this.mapRefreshCountDown();
    },1000);
  }
  componentWillUnmount(){
    clearInterval(this.refreshCountDownInterval);
  }
  mapRefreshCountDown(){
    let current = this.state.countDown;
    let next = (current-1)<=0?30:(current-1);
    this.setState({
      countDown : next
    })
  }
  render () {
		return (
      <span>{this.state.countDown}</span>
		);
	}
}

class RouteSymbol extends Component{
  constructor(props){
    super(props);
  }
  render () {
		return (
      <div className="row">
        <div className="col">
          {
            this.props.scooterSelected.length>0?
            <div>
              Route Legends:
            </div>:null
          }
          {
            this.props.scooterSelected.map((value,index)=>{
              return <button type="button" className="btn btn-sm btn-info" style={{ backgroundColor :colorList[index]}}>{value['label']}</button>
            })
          }
        </div>
    </div>
		);
	}
}
