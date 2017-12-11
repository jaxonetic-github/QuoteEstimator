
<template>

      <v-card>
        <v-card-title class="headline">IntraState Estimator</v-card-title>

          <section id="floating-panel">
            <p class="errorMsg">{{errorMsg}}</p>

   <aside  id="map-variables"> 
   <ul id="route-details">        
    <li><b>Pickup :</b>{{pickupLocation}}
    <b>Unload: </b>{{finalLocation}}</li>
    <li>Est Drive Time:{{duration}}</li>
    <li>Distance::{{distance}}</li>
    <li>Minimum lbs::{{minPoundage}}</li>
   </ul>
</aside>
     <div id="calculations" >
      <div id="extra-man"> 
      

      </div>
      <div id="rate-calculation">
          <ul id="estimate-results">
        <li class="basic-left">
          <div class="left-calc text-sm-left">{{minPoundage}}lb Estimate</div>
          <div class="right-calc text-sm-right" id="min-houred-job-laborcost">$ {{minWeightCost}} </div>
        </li>
        <li class="basic-left">
          <div class="left-calc text-sm-left"><input type="text" v-model="estimateWeight" placeholder="Estimated Weight" size="5" />lb Estimate</div>
          <div class="right-calc text-sm-right" >${{ratePerWeightPlusFuelWorkComp}} </div>
        </li>
      </ul>
      </div>
    
  </div>
  </section>
       <!--  :pickupLocation="pickupLocation" :finalLocation="finalLocation" :submitDate="submitDate" :quotename="customerName" :driveTime="driveTime"  :hourlyRate="laborPlusDrivetime"/-->
      </v-card>
</template>


<script>

import EmailEstimate from './EmailEstimate.vue'


export default {
  name: 'IntraEstimator',
 components: {
    EmailEstimate
  },
  props:['minPoundage', //2100lb
  
  'minHours', 
  'customerName', 'submitDate', 'errorMsg',
   'duration',
  'pickupLocation', 'finalLocation', 'distance'],
  data () {
    return{ minWeightCost:0.0, fuelWorkCompCA:.15, rateQt1:36.72 , 
      rateQt2:36.72, estimateWeight:5000, laborCost:0.0, email:'', 
          hrs:this.minHours,hourEstimator: [{}], inputStartLocationSize:35, inputFinalLocationSize:35,moverCount:0,hourlyRate:this.zhourlyRate         
        };
        },computed:{ laborPlusDrivetime: function(){ 
          //  let calc = (parseFloat(this.hourlyRate)  * parseFloat(this.hrs)) + parseFloat(this.driveTime);
              let calc = parseFloat(this.laborPerHour()) + parseFloat(this.driveTime);
            return calc.toFixed(2); } ,
                  //laborPerHour: function(){ console.log(this.dayRate,"----", this.hrs); return this.dayRate * this.hrs; } ,
                //  estimatedRangeApproximate: function(){  return this.dayRate * this.hourlyMinimum + this.driveTime; }
 //called when mover count has changed and updatehourly Rate
          createMoveHourOptions:function(){
               //create the options for the hour esitmator based on the hourlyMinumum up to 8 hourse  
            let hourEstimator = [];
            for (let idx = this.minHours; idx<8; idx++ )
            {
                hourEstimator.push({ text: idx, value:idx });
            }    
            return hourEstimator;
          },
           ratePerWeightPlusFuelWorkComp:function(tst){
            //update hourly rate
              const ratePerMinWeight = this.rateQt1 * this.minPoundage/100 ;
              const rateRerMinWeightPlusFuelWorkComp = (ratePerMinWeight + ratePerMinWeight*  this.fuelWorkCompCA).toFixed(2);


              const ratePerWeight = this.rateQt2 * this.estimateWeight/100;
              const ratePerWeightPlusFuelWorkComp = (ratePerWeight + ratePerWeight*  this.fuelWorkCompCA).toFixed(2);

              this.minWeightCost = rateRerMinWeightPlusFuelWorkComp;
             console.log(ratePerWeightPlusFuelWorkComp);
             return ratePerWeightPlusFuelWorkComp;
          }
        },
         methods: { 
         
            //Calculate the labor cost based on the baseDayRate, the hour estimate, and the # of movers
            laborPerHour: function(){ 
            

              return labor.toFixed(2); 
            } ,
        
      
 
   
},//methods
/*
 * mounted:  set up the mover options
*/
 mounted: function () {
 // this.createMoverOptions();
 }
}
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
li{}
#name-field{width:60%; display:inline-flex}
div#greeting(display: inline-flex;width: 70%;)
article{margin:auto; max-width:400px;font-size: 22}
button {
    background-color: rgba(160, 158, 146, 1);
    border-radius: 4px;
    padding: 4px;
    border-style: ridge;
    }
      .left-calc{ position: relative; left:1px;   display: inline-block;
  
    }
  .right-calc{  position: relative; left:50%;   display: inline-block; color:darkgreen;
  
   }
   .basic-left{text-align: left}
.input-goup{width:50%; display:inline-flex}
#floating-panel {
  z-index: 5;
  background-color: #fff;
  padding: 5px;
  border: 1px solid #999;
  text-align: center;
  font-family: 'Roboto', 'sans-serif';
  line-height: 25px;
}
#hourly{color: darkgreen;}
#min-hours{color:darkgreen;}
.calc-description-text{color:maroon;};
#route-details{text-align: left; width:100%; margin: auto;width: fit-content;
    text-align: center;}
#map-variables{}
#variables{}
#footer-logo{    margin-top: 40px;}
#rate-explanations{text-align: left;margin-bottom: 20px;margin-top: 50px;margin-left: 100px;margin-right: 70px; color:cadetblue;}
.location-name{text-align: left; margin:15px; text-align: left;    font-weight: 500;}
.errorMsg{color:red; font-size:16px }
 section{height:400px}
 #map{height:100%; background-color:black }
 #map-canvas{height:100%;background-color:pink; margin:10px;}
 #calculations{width: 80%;  margin: auto; padding-top: 15px}
  #estimate-results{text-align: right

    }

  #rate-calculation{ text-align: center; color:maroon; }

  .card__text {
    padding: 0px;
}
#estimate-results{width: fit-content; text-align: center;}


 input{border:1px groove black; border-radius: 10px}
 select{border: 2px groove darkseagreen; background-color: darkseagreen;-webkit-appearance: menulist;  
  /*webkit browsers */
  -moz-appearance: menulist;
  /*Firefox */
  appearance: menulist;}

.card{    background-color: lavender;}

</style>
