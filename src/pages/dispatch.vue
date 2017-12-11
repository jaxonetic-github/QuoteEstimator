

<script>
export default {}
</script>


<template>
<v-app>
  <f7-page>
    <f7-navbar title="About" back-link="Back" sliding></f7-navbar>
    <f7-block inner>

  <div class="hello">
    
    <section>

    <aside id="map-canvas" >
  <figure id="map" ref="map" >
  </figure>
</aside>

{{errorMsg}}

<article>                      

      <p id="rate-explanations">
      The day of the week affects your rate. In some areas, moving on a weekday can be up to $20 dollars cheaper than a Saturday rate which is always the highest rate. Monday through Thursday is always the cheapest rate unless it falls on the first
      or last day of the month. Friday and Sunday rates tend to be the midrange rates.The first and the last days of the month are always the highest rate. In some areas, there is no change in price. That's the way the starving game is played.
      <!--     <button v-on:click="addQuote()" class="btn btn-primary btn-sm">Add Quote</button>
 <button v-on:click="resetForm()" class="btn btn-primary btn-sm">Reset</button>-->
    </p>

   
 <!--   <p><input id="send-email" type="text" v-model="email" placeholder="E-mail for Confirmation" />
      <button id="send-confirmation" class="btn btn-primary btn-sm">Send Confirmation</button>.
    -->
    <img id="footer-logo" alt="Embedded Image" src="http://www.ssmovers.com/templates/template01/images/logo.gif" />
  </article>
</section>


  </div>
      </f7-block>
  </f7-page>
</v-app>
</template>


<script>
import Vue from 'vue'

import Vuetify from 'vuetify'

Vue.use(Vuetify)
import EventBus from './bus';

//component to display changes in calculations
import QuoteEstimator from './QuoteEstimator.vue'
import ShortHaulEstimator from './ShortHaulEstimator.vue'
import IntraStateEstimator from './IntraEstimator.vue'

// Import Helper
import AppConst from '../appConst.js'

export default {
  name: 'Dispatch',
   components: {},
   props:[],
  data () {
    return AppConst.dflt_data();
        },computed:{
                  //laborPerHour: function(){ console.log(this.dayRate,"----", this.hrs); return this.dayRate * this.hrs; } ,
                //  estimatedRangeApproximate: function(){  return this.dayRate * this.hourlyMinimum + this.driveTime; }

        },
         methods: { 
           selectMovers:function(tst){
            //update hourly rate
         //   console.log("SELECTMOVERS----", tst);
          },
           laborPlusDrivetime: function(){ 
          //  let calc = (parseFloat(this.hourlyRate)  * parseFloat(this.hrs)) + parseFloat(this.driveTime);
              let calc = parseFloat(this.laborPerHour()) + parseFloat(this.driveTime);
            return calc.toFixed(2); } ,

            laborPerHour: function(){ 
               let labor =  parseFloat((parseFloat(this.baseDayRate)  * this.hrs).toFixed(2));

              if(this.moverCount == 0){
                this.hourlyRate = parseFloat(this.baseDayRate) ;
               } 
               if(this.moverCount == 1){
                labor = labor + (40*this.hrs);
                this.hourlyRate = parseFloat(this.baseDayRate) +40;
               }else
               if(this.moverCount == 2){
                labor = labor *2;
               }
              return labor.toFixed(2); 
            } ,
         //calculatedMinLaborCost: function(){ console.log("minlabcst--",(this.dayRate * this.hourlyMinimum));  return 4;},//this.dayRate * this.hourlyMinimum; } ,
            rateMatrix: AppConst.rateMatrix, /*     
            hourOptions: function(minHours)            {
              console.log("ho:: ", this.hourEstimator);
            for (let idx = minHours; minHours<8; idx++ )
            {
              this.hourEstimator.push({ text: idx });
            }          
            },
            */
            /*handle google api login*/
           initClient:function(){
              //  this.google = google;
               var  clientId = this.clientId;
               var     dDocs = this.discoveryDocs;
               var    apiKey = this.apiKey;
               var   scopes  = this.scopes;
               var  hourlyRate = this.hourlyRate;
               var  driveTime  = this.driveTime;
               //var  gapi2  = this.gapi
               let self = this;
          if(!this.signedIn) {

              gapi.client.init({
                discoveryDocs:dDocs,  
                apiKey  : apiKey,
                clientId: clientId,
                scope   : scopes
              }).then(function(){
                  
                        // Listen for sign-in state changes.
                        gapi.auth2.getAuthInstance().isSignedIn.listen(self.updateSigninStatus);

                        // Handle the initial sign-in state.
                        self.updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
                        
                        //login
                        gapi.auth2.getAuthInstance().signIn();

              });
            }else{console.log("already Signed In")}
            },//initClient

        getLastDayOfMonth : function(month, year){
              let d = new Date (year, month+1, 0);
          return d.getDate();
        },
    
      /**
       *  Called when the signed in status changes, to update the UI
       *  appropriately. After a sign-in, the API is called.
       */
       updateSigninStatus : function(isSignedIn) {
        if (isSignedIn) {
          console.log("Is SignedIn");
          this.signedIn = true;

        } else {
          console.log("Is not Signed In");
        }
      },
   
/*
 *  Call the directionService Routing service to get move details and numbers for the move
 */
 onCalculateQuote : function() {
                    console.log("**onCalculateQuote**",this.driveTime);

    var _directionsDisplay = this.directionsDisplay;
    var _rates  = this.rates;
    var _driveTime = this.driveTime;
    var _laborRate =this.hourlyRate;

    //clear errorMsgs
    this.errorMsg='';
 let self = this;
    gapi.load('client:auth2', this.initClient());

    this.directionsService.route({
    origin: this.pickupLocation,
    destination: this.finalLocation,
    travelMode: 'DRIVING',
    drivingOptions: {
      departureTime: new Date(Date.now()), // for the time N milliseconds from now.
      trafficModel: 'optimistic'
    },
    unitSystem: google.maps.UnitSystem.METRIC,
    avoidHighways: false,
    avoidTolls: false
  }, function(response, status) {
if (status === 'OK') {


      self.directionsDisplay.setDirections(response);

      var coords = response.routes[0].legs[0].start_location;

      var distance = response.routes[0].legs[0].distance.value * .6213 ;//converted to miles
distance = distance.toFixed(2);
      console.log("dist--",response.routes[0].legs[0].distance.value * .6213 );

      var duration = response.routes[0].legs[0].duration;

      //Grab the state and city/region from the start address
      var startAddress = response.routes[0].legs[0].start_address.split(",");
      var stateFromAddr = startAddress[(startAddress.length - 2)].substring(0, 3).trim();
      var cityFromAddr = startAddress[(startAddress.length - 3)];

      //filter the appropriate region/city for the state specified by the address 


      var hourly = null;

      var shortestDistance = 100;
//console.log("loop through regions",this.rates[stateFromAddr].regions.length);
for (let idx=0; idx<self.rates[stateFromAddr].regions.length; idx++) {

  let item = self.rates[stateFromAddr].regions[idx];
 // console.log(item.region,"---",shortestDistance);
   //      console.log(coords.lat(),"------",coords.lng());
   //     console.log( item.coords.lat,"<-lat,long->", item.coords.longitude );
  let R = 6371;
  //convert degree to radians
  let deg2rad = (n) => { return Math.tan(n * (Math.PI/180)) };

  let dLat = deg2rad(coords.lat() - item.coords.lat );
  let dLon = deg2rad( coords.lng() -item.coords.longitude );

  let a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(deg2rad(item.coords.lat)) * Math.cos(deg2rad(coords.lat())) * Math.sin(dLon/2) * Math.sin(dLon/2);
  let c = 2 * Math.asin(Math.sqrt(a));
  let d = R * c;
  if (d< shortestDistance)
  { shortestDistance = d;
    hourly = item ;
   }

}
if(!hourly){
//if hourly is not set then handle error
self.errorMsg="Your pickup location is a special case, Please call 1-800-441-6683 for details";
}else
{
      var selectedDate = document.getElementById('move-date').value;
     //get selected Date from widget
      var day = new Date(selectedDate).getDay() + 1;
      var year = new Date(selectedDate).getFullYear();
      var month = new Date(selectedDate).getMonth();
      var dayInMonth = new Date(selectedDate).getDate()+1;

 
     //if the date hasn't bee selected then set an error message
     if(!day)self.errorMsg+="  Please Select Date";
    console.log(day, "--------",hourly);
    //get the rate for the specified day of the move
    var dayRate = hourly.rateByDay[day];

    //if the selected date falls on the 1st or last day of the month, give it the assigned end of month rate
    if((dayInMonth ==self.getLastDayOfMonth(month, year)) || (dayInMonth==32))
    {
      dayRate = hourly.firstAndLastDayRate;
    }

      var hourlyMinimum = hourly.hourlyMin;
      //var calculatedMinLaborCost = dayRate * hourlyMinimum;

      //calculate drive times
      var doubleDriveTime = dayRate/3600 * ((parseInt(duration.value) * 2) ).toFixed(2);
      var oneHourDrive = dayRate * hourlyMinimum + dayRate; //dayrate * hourlymin
      var portalBack = dayRate - (dayRate * .70); //dayrate * hourlymin

      console.log(dayRate, "<--rate, duration-->",(parseInt(duration.value)/60),"---ddt=",doubleDriveTime);
      var driveTime = 0;
      
      if (hourly.driveTimeType == "DDT") {
        driveTime = doubleDriveTime;
      } else
      if (hourly.driveTimeType == "1Hr") {
        driveTime = oneHourDrive;
      } else
      if (hourly.driveTimeType == "PB") {
        driveTime = oneHourDrive-30;
      }

       console.log("drivetime::",driveTime);

      //create the options for the hour esitmator based on the hourlyMinumum up to 8 hourse  
      self.hourEstimator = [];
      for (let idx = hourlyMinimum; idx<8; idx++ )
      {
          self.hourEstimator.push({ text: idx, value:idx });
      }    


      //setting data variables
      self.baseDayRate = dayRate;  //constant
      self.hourlyRate = dayRate;   //changes bases on variables like movers
      self.minHours   = hourlyMinimum;
      self.driveTime  = driveTime.toFixed(2);
      self.submitDate = document.getElementById('move-date').value;
      self.calculatedMinLaborCost = (dayRate * hourlyMinimum).toFixed(2);

      self.estimatedRangeApproximate = (dayRate * hourlyMinimum )+ parseFloat(self.driveTime); 
      self.distance = distance /1000;
      self.local = self.distance<100;
      self.shortHaul = ((self.distance >100 )&& (self.distance<250));
      self.intraState = (self.distance>250) ;
      self.duration = duration.text ;

      //show 
      document.getElementById('floating-panel').style.display = "block";
              
}

} else {//status not ok
      console.log(status,'::Directions request failed due to ::' , response);
      self.errorMsg = "Directions request failed, please check pickup and destination locations.";
    }
  });

self.dialog = true; //show dialog
  },
   
    /* Center and do initial map load*/
    initMap: function () {
   
      //where to center the map at startup , currently hardcoded for LA
      var latlng = new google.maps.LatLng(34.0522, -118.2437);
      var map = new google.maps.Map(this.$refs.map, {
        zoom: 7,
        center: latlng
      });
     this.directionsDisplay.setMap(map);



       // Try HTML5 geolocation.
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
       var infoWindow = new google.maps.InfoWindow;

            infoWindow.setPosition(pos);
            infoWindow.setContent('Location found.');
            infoWindow.open(map);
            map.setCenter(pos);
          }, function() {
            //handleLocationError(true, infoWindow, map.getCenter());
            console.log("some strange error");
          });
        } else {
          // Browser doesn't support Geolocation
          //handleLocationError(false, infoWindow, map.getCenter());
          console.log("Browser doesn't support geolocation");
        }

   }//initmap

},//methods
/*
 * mounted:  sets up the google maps Directions Service and Renderer and
 *           sets up the map
*/
 mounted: function () {
    this.directionsService = new google.maps.DirectionsService;
    this.directionsDisplay = new google.maps.DirectionsRenderer;

    this.initMap();
  },
   created: function () {
 // this.createMoverOptions();
    EventBus.$on('email_sent',  (id) =>{  this.dialog = false; });
//console.log("sadfsafsafdsafdsafsfadsfdsavfsafdsafdafdsfvdsfvdsfvds----",id)});

}}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


html,
body {
  height: 100%;
  margin: 0;
  padding: 0;
}
p{font-size: 20px}
ul{ list-style-type: none; }

#name-field{width:60%; display:inline-flex}
div#greeting(display: inline-flex;width: 70%;)
article{margin:auto; max-width:400px;font-size: 22}
button {
    background-color: rgba(160, 158, 146, 1);
    border-radius: 4px;
    padding: 4px;
    border-style: ridge;
    }

.input-goup{width:50%; display:inline-flex}
#floating-panel {
  z-index: 5;
  background-color: #fff;
  padding: 5px;
  border: 1px solid #999;
  text-align: center;
  font-family: 'Roboto', 'sans-serif';
  line-height: 30px;
}

#footer-logo{    margin-top: 40px;}
#rate-explanations{text-align: left;margin-bottom: 20px;margin-top: 50px;margin-left: 20px;margin-right:10px; color:cadetblue;}
.location-name{text-align: left; margin:15px; text-align: left;    font-weight: 500;}
.errorMsg{color:red; font-size:16px }
 section{height:400px}
 #map{height:100%; background-color:black }
 #map-canvas{height:100%;background-color:pink; margin:10px;}
 #calculations{width: 80%;  margin: auto; }
  #rate-calculation{    background-color: cadetblue; }
  #estimate-results{    background-color: burlywood;}
  .card__text {
    padding: 0px;
}
 input{border:1px groove black; border-radius: 10px}
 select{border: 2px groove darkseagreen;}

.card{    background-color: lavender;}

</style>
