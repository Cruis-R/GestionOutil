import React, { Component } from 'react';
import urls from '../../GestionsComponents/configs/serverConfigurations'
import { Chart, Bar, Line } from 'react-chartjs-2';
import { Dropdown, DropdownMenu, DropdownItem, Progress } from 'reactstrap';
const month_days = {
  1 : 31,
  2 : 28,
  3 : 31,
  4 : 30,
  5 : 31,
  6 : 30,
  7 : 31,
  8 : 31,
  9 : 30,
  10 : 31,
  11 : 30,
  12 : 31,
  13 : 29
}
const brandPrimary =  '#20a8d8';
const brandSuccess =  '#4dbd74';
const brandInfo =     '#63c2de';
const brandDanger =   '#f86c6b';
// Main Chart

// convert Hex to RGBA
function convertHex(hex,opacity) {
  hex = hex.replace('#','');
  var r = parseInt(hex.substring(0,2), 16);
  var g = parseInt(hex.substring(2,4), 16);
  var b = parseInt(hex.substring(4,6), 16);

  var result = 'rgba('+r+','+g+','+b+','+opacity/100+')';
  return result;
}


const plugin = {
  afterDatasetsDraw: function(chart, easing) {
  // To only draw at the end of animation, check for easing === 1
    var ctx = chart.chart.ctx;

    chart.data.datasets.forEach(function (dataset, i) {
      var meta = chart.getDatasetMeta(i);
      if (!meta.hidden) {
        meta.data.forEach(function(element, index) {
        // Draw the text in black, with the specified font
          ctx.fillStyle = 'rgb(0, 0, 0)';

          var fontSize = 12;
          var fontStyle = 'normal';
          var fontFamily = 'Helvetica Neue';
          ctx.font = Chart.helpers.fontString(fontSize, fontStyle, fontFamily);

          // Just naively convert to string for now
          var dataString = dataset.data[index].toString();

          // Make sure alignment settings are correct
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';

          var padding = 5;
          var position = element.tooltipPosition();
          ctx.fillText(dataString, position.x, position.y - (fontSize / 2) - padding);
        });
      }
    });
  }
}
const mainChartOpts = {
  maintainAspectRatio: false,
  tooltips: {
            mode: 'nearest',
            intersect : false
        }
}
export default class Report extends Component {
  constructor(props) {
    super(props);
    this.state = {
      distancePerDay :[],
      timeUsagePerDay :[],
      stopTimePerDay :[],
      tripsNumPerDay :[],
      avgDistance :0,
      avgTimeUsage :0,
      timeUsageTotal :0,
      totalDistance :0,
      dataReady : false,
      dateFrom : null,
      dateTo : null,
      charts : []
    };
  }
  componentDidMount(){
    this.getScooterReport();
  }
  getScooterReport(){
    const queryMethod = 'GET';
    let search = this.props.location.search.replace(/\?/g,'').split('&');
    let id = search[0].split('=')[1];
    let dateOrigin = new Date('2017-04');
    let dateFromOrigin = dateOrigin.toISOString();
    let dateFrom = new Date(search[1].split('=')[1]);
    let dateTo =new Date(search[2].split('=')[1]);
    let urlTrips = 'http://vps92599.ovh.net:8082/api/reports/trips'+this.props.location.search;
    let urlStops = 'http://vps92599.ovh.net:8082/api/reports/stops'+this.props.location.search;
    let urlSummary = 'http://vps92599.ovh.net:8082/api/reports/summary?deviceId='+id+'&from='+dateFromOrigin+'&to='+dateTo.toISOString();
    let urls = [urlSummary,urlTrips,urlStops];
    var promises = urls.map(url =>
      fetch(url,{
        credentials: 'include'
      }).then(y => y.json()));
    Promise.all(promises).then(results => {
      let result_period = this.analyseTripsAndStops(results[1],results[2],dateFrom);
      let career_info = (results[0][0]['distance']/1000).toFixed(1);
      let charts = this.generateChart([result_period[0],result_period[1],result_period[2],result_period[3]],result_period[7])
      this.setState({
        distancePerDay :result_period[0],
        timeUsagePerDay :result_period[1],
        stopTimePerDay :result_period[2],
        tripsNumPerDay :result_period[3],
        avgDistance :result_period[4],
        avgTimeUsage :result_period[5],
        timeUsageTotal :result_period[6],
        totalDistance :career_info,
        dataReady : true,
        dateFrom : dateFrom,
        dateTo : dateTo,
        charts : charts
      })
    }).catch(err=>{
      console.log(err);
      this.setState({
        dataReady : false
      });
    });
  }
  analyseTripsAndStops(trips,stops,date){
    //data from trips
    let year = date.getFullYear();
    let month = year%4!==0?date.getMonth()+1:13;
    let monthString = date.toUTCString().split(' ')[2];
    let dayNum = month_days[month];
    let dayStartInPeriod = date.getDate();
    let daysInPeriod = dayNum-dayStartInPeriod+1;
    let dayList = [];
    let distancePerDay = [];//from trips /km
    let timeUsagePerDay = [];//from tripTimePerDay + stopTimePerDay /seconds
    let stopTimePerDay = [];//from stops /seconds
    let tripsNumPerDay = [];//from trips /int
    let tripTimePerDay = [];//from trips /seconds

    for (var i = 0; i < daysInPeriod; i++) {
      dayList[i] = dayStartInPeriod+i+'-'+monthString;
      distancePerDay[i] = 0;
      timeUsagePerDay[i] = 0;
      tripsNumPerDay[i] = 0;
      tripTimePerDay[i] = 0;
      stopTimePerDay[i] = 0;
    }
    trips.map((instance,index)=>{
      let date1 = new Date(instance['startTime']);
      let date2 = new Date(instance['endTime']);
      let dayIndex = date1.getDate()-dayStartInPeriod;
      let dayEndIndex = date2.getDate()-dayStartInPeriod;
      if (dayIndex===dayEndIndex) {
        distancePerDay[dayIndex] = distancePerDay[dayIndex]+(instance['distance']/1000);
        tripsNumPerDay[dayIndex] = tripsNumPerDay[dayIndex] + 1;
        tripTimePerDay[dayIndex] = tripTimePerDay[dayIndex]+(instance['duration']/1000);
      }
      //total km per day from trips
    })
    stops.map((instance,index)=>{
      let date1 = new Date(instance['startTime']);
      let date2 = new Date(instance['endTime']);
      let dayIndex = date1.getDate()-dayStartInPeriod;
      let dayEndIndex = date2.getDate()-dayStartInPeriod;
      if (dayIndex===dayEndIndex) {
      //total km per day from trips
        stopTimePerDay[dayIndex] = stopTimePerDay[dayIndex]+(instance['duration']/1000);
      }
    })
    //calculate total
    timeUsagePerDay.map((instance,index)=>{
      timeUsagePerDay[index] = stopTimePerDay[index] + tripTimePerDay[index] // /hours
    })
    let timeUsageTotal = (timeUsagePerDay.reduce((a,b) => (a+b))/60);
    let totalDistance = distancePerDay.reduce((a,b) => (a+b));

    //format to hours and kms with 2 point
    timeUsagePerDay.map((instance,index)=>{
      timeUsagePerDay[index] = (timeUsagePerDay[index]/60).toFixed(1); // /hours
    })
    tripTimePerDay.map((instance,index)=>{
      tripTimePerDay[index] = (tripTimePerDay[index]/60).toFixed(1); // /hours
    })
    distancePerDay.map((instance,index)=>{
      distancePerDay[index] = distancePerDay[index].toFixed(1); // /kms
    })
    stopTimePerDay.map((instance,index)=>{
      stopTimePerDay[index] = (stopTimePerDay[index]/60).toFixed(1); // /hours
    })
    let avgDistance = (totalDistance/daysInPeriod).toFixed(1);
    let avgTimeUsage = (timeUsageTotal/daysInPeriod).toFixed(1);
    return [distancePerDay,timeUsagePerDay,stopTimePerDay,tripsNumPerDay,avgDistance,avgTimeUsage,timeUsageTotal.toFixed(1),dayList]
  }
  generateChart(reportData,label){
    let distancePerDay = {
      labels: label,
      datasets: [
        {
          label: 'Distance journalière',
          backgroundColor: convertHex(brandPrimary,10),
          borderColor: brandPrimary,
          pointHoverBackgroundColor: '#fff',
          borderWidth: 2,
          data: reportData[0]
        }
      ]
    }
    let timeUsagePerDay= {
      labels: label,
      datasets: [
        {
          label: 'Temps de déplacement',
          backgroundColor: convertHex(brandInfo,10),
          borderColor: brandInfo,
          pointHoverBackgroundColor: '#fff',
          borderWidth: 2,
          data: reportData[1]
        }
      ]
    }
    let stopTimePerDay= {
      labels: label,
      datasets: [
        {
          label: 'Temps d’arrêt chez le client ',
          backgroundColor: convertHex(brandDanger,10),
          borderColor: brandDanger,
          pointHoverBackgroundColor: '#fff',
          borderWidth: 2,
          data: reportData[2]
        }
      ]
    }
    let tripsNumPerDay= {
      labels: label,
      datasets: [
        {
          label: 'Nombre de départ journalier',
          backgroundColor: convertHex(brandSuccess,10),
          borderColor: brandSuccess,
          pointHoverBackgroundColor: '#fff',
          borderWidth: 2,
          data: reportData[3]
        }
      ]
    }
    return [distancePerDay,timeUsagePerDay,stopTimePerDay,tripsNumPerDay]
  }
  formatterDate(date){
    return new Date(date).toISOString().split('T')[0];
  }
  render(){

    let dateStart = this.state.dataReady?this.state.dateFrom.toLocaleDateString():''
    let dateEnd = this.state.dataReady?this.state.dateTo.toLocaleDateString():''
    let header = "Rapport d’activité de «     » sur la période du " + dateStart + " Au " +dateEnd+" pour le scooter" ;
    return (
      <div className="animated fadeIn m-4">
        <div className="row">
          <h1 className="text-info text-center col-12">{header}</h1>
          <div className="col-sm-4 col-lg-3 offset-md-3">
            <div className="card card-inverse card-primary">
              <div className="card-block pb-0">
                <h4 className="mb-0">{this.state.dataReady?this.state.totalDistance+' KM':null}</h4>
                <p>Distance totale Parcourue</p>
              </div>
            </div>
          </div>

          <div className="col-sm-4 col-lg-3">
            <div className="card card-inverse card-info">
              <div className="card-block pb-0">
                <h4 className="mb-0">{this.state.dataReady?this.state.avgDistance+' KM':null}</h4>
                <p>Distance moyenne sur la période</p>
              </div>
            </div>
          </div>

          <div className="col-sm-4 col-lg-3 offset-md-3">
            <div className="card card-inverse card-warning">
              <div className="card-block pb-0">
                <h4 className="mb-0">{this.state.dataReady?this.state.timeUsageTotal+' Min':null}</h4>
                <p>Temps de parcours total</p>
              </div>
            </div>
          </div>
          <div className="col-sm-4 col-lg-3">
            <div className="card card-inverse card-danger">
              <div className="card-block pb-0">
                <h4 className="mb-0">{this.state.dataReady?this.state.avgTimeUsage+' Min':null}</h4>
                <p>Temps moyen sur la période</p>
              </div>
            </div>
          </div>
          <h4 className="text-info text-center col-12">CRUIS RENT vous donne le détail de votre activité de livraison par service lors de la semaine d’évaluation</h4>

          <div className="col-sm-4 col-lg-5  offset-md-1">
            <div className="card">
              <div className="card-block">
                <div className="row">
                  <div className="col">
                    <h4 className="card-title mb-0">Distance journalière (km)</h4>
                    <span className="small text-muted">{this.state.dataReady?this.state.dateFrom.toLocaleDateString():null}</span>
                    <span className="small text-muted">{this.state.dataReady?'-':null}</span>
                    <span className="small text-muted">{this.state.dataReady?this.state.dateTo.toLocaleDateString():null}</span>
                  </div>
                </div>
                <div className="chart-wrapper" style={{height: 200 + 'px', marginTop : 20 + 'px'}}>
                  {this.state.dataReady?<Bar data={this.state.charts[0]} options={mainChartOpts} plugins={[plugin]} height={300}/>:null}
                </div>
              </div>
              <div className="card-footer ">
                <div className="row">
                  <div className="col-lg-12 col-sm-12">
                    <div className="card-title mb-0 text-center text-muted">Ce graphique fait la synthèse de distance parcouru par jour du scooter</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-4 col-lg-5">
            <div className="card">
              <div className="card-block">
                <div className="row">
                  <div className="col">
                    <h4 className="card-title mb-0">Temps de déplacement (en min)</h4>
                    <span className="small text-muted">{this.state.dataReady?this.state.dateFrom.toLocaleDateString():null}</span>
                    <span className="small text-muted">{this.state.dataReady?'-':null}</span>
                    <span className="small text-muted">{this.state.dataReady?this.state.dateTo.toLocaleDateString():null}</span>
                  </div>
                </div>
                <div className="chart-wrapper" style={{height: 200 + 'px', marginTop : 20 + 'px'}}>
                  {this.state.dataReady?<Bar data={this.state.charts[1]} options={mainChartOpts} plugins={[plugin]} height={300}/>:null}
                </div>
              </div>
              <div className="card-footer ">
                <div className="row">
                  <div className="col-lg-12 col-sm-12">
                    <div className="card-title mb-0 text-center text-muted">Ce graphique fait la synthèse des temps d’utilisation du scooter par jour </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-6 col-lg-5  offset-md-1">
            <div className="card">
              <div className="card-block">
                <div className="row">
                  <div className="col">
                    <h4 className="card-title mb-0">Temps d’arrêt chez le client (en min)</h4>
                    <span className="small text-muted">{this.state.dataReady?this.state.dateFrom.toLocaleDateString():null}</span>
                    <span className="small text-muted">{this.state.dataReady?'-':null}</span>
                    <span className="small text-muted">{this.state.dataReady?this.state.dateTo.toLocaleDateString():null}</span>
                  </div>
                </div>
                <div className="chart-wrapper" style={{height: 200 + 'px', marginTop : 20 + 'px'}}>
                  {this.state.dataReady?<Bar data={this.state.charts[2]} options={mainChartOpts} plugins={[plugin]} height={300}/>:null}
                </div>
              </div>
              <div className="card-footer ">
                <div className="row">
                  <div className="col-lg-12 col-sm-12">
                    <div className="card-title mb-0 text-center text-muted">Ce graphique fait la somme des temps d’arrêt lorsque le scooter est hors restaurant</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-6 col-lg-5">
            <div className="card">
              <div className="card-block">
                <div className="row">
                  <div className="col">
                    <h4 className="card-title mb-0">Nombre de départ journalier</h4>
                    <span className="small text-muted">{this.state.dataReady?this.state.dateFrom.toLocaleDateString():null}</span>
                    <span className="small text-muted">{this.state.dataReady?'-':null}</span>
                    <span className="small text-muted">{this.state.dataReady?this.state.dateTo.toLocaleDateString():null}</span>
                  </div>
                </div>
                <div className="chart-wrapper" style={{height: 200 + 'px', marginTop : 20 + 'px'}}>
                  {this.state.dataReady?<Line data={this.state.charts[3]} options={mainChartOpts} plugins={[plugin]} height={300}/>:null}
                </div>
              </div>
              <div className="card-footer ">
                <div className="row">
                  <div className="col-lg-12 col-sm-12">
                    <div className="card-title mb-0 text-center text-muted">Ce graphique fait la somme des départs en livraison</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

    )
  }
}
