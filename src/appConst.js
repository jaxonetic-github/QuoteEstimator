export default  {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.receivedEvent('deviceready');
    },
    dflt_data : function(){
        return { errorMsg:'',signedIn:false, message: 'Starving Quotes',email:'ajackson@ssmovers.com', quotename:'',distance:0,base64Image:'http://www.ssmovers.com/templates/template01/images/logo.gif',  duration:0, hourlyRate:0.0, minHours:2, laborCost:0.0, driveTime:0.0, calculatedMinLaborCost:0,
          estimatedRangeApproximate:0,hrs:2,hourEstimator: [{}], pickupLocation:'',finalLocation:'90025', submitDate:'', moverCount: 0,dialog: false, inputNameSize:20, inputStartLocationSize:35, inputFinalLocationSize:35,
           rates:this.rateMatrix(), directionsService:{}, directionsDisplay:{},
           local:false, shortHaul:false, intraState:false,
clientId :'720692337911-m0r3q58p3odla5rjevp1auef6pk94htd.apps.googleusercontent.com',
apiKey : 'AIzaSyD3vn_ob6UU6RbxqG80HnjiuFvz7XrDFrs',
// Array of API discovery doc URLs for APIs used by the quickstart
discoveryDocs : ["https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest"],
scopes :'https://mail.google.com '+ 'https://www.googleapis.com/auth/gmail.modify ' +
  'https://www.googleapis.com/auth/gmail.compose '+
  'https://www.googleapis.com/auth/gmail.send',
        moverOptions: [
          { text: '(2 movers)', value:0 },
          { text: '(3 movers) $49/h' , value:1},
          { text: '(4 movers/2 trucks)', value:2  }
        ],
        truckCount: "(1 26'truck)",
        truckOptions: [
          { text: '(1 truck/2 or 3 movers)',value:0 },
          { text: '+1 (2 trucks/4 movers)',value:1 },
          { text: '+2 (3 trucks/6 movers)', value:2  },
          { text: '+3 (5 movers)', value:3},
          { text: '+4 (6 movers)',value:4}
        ],
        
        
        
        
        };
    },
     rateMatrix: function(){ 

                var drivetimeTypes = { DOUBLEDRIVETIME:"Double", PORTALBACK:"Portal Back", ONEHOUR:"1 HOUR" } ;
              //Cali regions
                var ratesMartinez = { region: "Martinez",firstAndLastDayRate: 135.30, himin:4, hourlyMin:2, radius:35, coords:{lat:32.0194, longitude:-122.1341}, rateByDay: [128.82, 122.69, 122.69, 122.69, 122.69, 128.82, 135.30],driveTimeType: "DDT"};

                var ratesSanBern = { region: "San Bernadino",firstAndLastDayRate: 135.30, himin:4, hourlyMin:3, radius:35, coords:{lat:34.1083449, longitude:-117.2898652}, rateByDay: [116.55, 110.42, 110.42, 110.42, 110.42, 116.55, 135.30],driveTimeType: "DDT"};//92408, lat:‎34.115784--34.1083449, longitude:-117.2898}

                var ratesStockton = { region: "Stockton",firstAndLastDayRate: 135.30, himin:4, hourlyMin:2, radius:35, coords:{lat:37.961632, longitude:-121.275604}, rateByDay: [128.82, 122.69, 122.69, 122.69, 122.69, 128.82, 135.30],driveTimeType: "DDT"};//95201


                var ratesNSac = { region: "North Sacramento",firstAndLastDayRate: 135.30, himin:4, hourlyMin:2, radius:35, coords:{lat:38.5816, longitude:-121.4944}, rateByDay: [128.82, 122.69, 122.69, 122.69, 122.69, 128.82, 135.30],driveTimeType: "DDT"};//95828


                var ratesEBAY = { region: "Ebay",firstAndLastDayRate: 135.30, himin:4, hourlyMin:2, radius:35, coords:{lat:37.8044, longitude:-122.2711}, rateByDay: [128.82, 122.69, 122.69, 122.69, 122.69, 128.82, 135.30],driveTimeType: "DDT"};

                var ratesRiverside = { region: "Riverside",firstAndLastDayRate: 135.30, himin:3, hourlyMin:3, radius:35, coords:{lat:33.948056, longitude:-117.396111}, rateByDay: [116.55, 110.42, 110.42, 110.42, 110.42, 116.55, 135.30],driveTimeType: "DDT"};
                var ratesOC = { region: "Orange County",firstAndLastDayRate: 135.30, himin:3, hourlyMin:3, radius:35, coords:{lat:33.803056, longitude:-117.8325}, rateByDay: [116.55, 110.42, 110.42, 110.42, 110.42, 116.55, 135.30],driveTimeType: "DDT"};

                var ratesSD = { region: "San Diego",firstAndLastDayRate: 135.30, himin:4, hourlyMin:2, radius:35, coords:{lat:32.715738, longitude:-117.1610838}, rateByDay: [116.55, 110.42, 110.42, 110.42, 110.42, 116.55, 135.30],driveTimeType: "DDT"};


                var ratesSBAY = { region: "Los Angeles",firstAndLastDayRate: 135.30, himin:4, hourlyMin:2, radius:35, coords:{lat:34.0522, longitude:-118.2437}, rateByDay: [116.55, 110.42, 110.42, 110.42, 110.42, 116.55, 135.30],driveTimeType: "DDT"};
              
                //East Coast
                var ratesBalt = { region: "Baltimore",firstAndLastDayRate: 114.99, hourlyMin:2, radius:35, coords:{lat:39.2904, lng:-76.6122}, rateByDay: [109.24, 103.49, 103.49, 103.49, 103.49, 103.49, 114.99], driveTimeType: drivetimeTypes.ONEHOUR }; //21222,25

                //NV
                var ratesLV = {rates: "Las Vegas",coords:{lat:36.1699, longitude:-115.1398}, hourlyMin:2, radius:35, firstAndLastDayRate: 129.00,rateByDay: [129.00, 129.00, 129.00, 129.00, 129.00, 129.00, 129.00], driveTimeType: drivetimeTypes.ONEHOUR };

                //AZ
                var ratesPhoenix = { region: "Phoenix", coords:{lat:33.4484, longitude:-112.0740}, hourlyMin:2, radius:35, firstAndLastDayRate: 107.09, rateByDay: [95.19, 95.19, 95.19, 95.19, 95.19, 95.19, 107.09],driveTimeType: "1Hr"}; //85011

                var ratesTus = {region: "Tucson", coords:{lat:32.2217, longitude:-110.9265}, hourlyMin:2, radius:35, firstAndLastDayRate: 118.99, rateByDay: [113.04, 95.19, 95.19, 95.19, 95.19, 95.19, 118.99],driveTimeType: "1Hr"}; //85709


                var ratesSeattle = {region: "Seattle", coords:{lat:47.6062, longitude:-122.3321}, hourlyMin:2, radius:35, firstAndLastDayRate: 114.99, rateByDay: [109.99, 104.99, 104.99, 104.99, 104.00, 109.99, 114.99],driveTimeType: "PB"}; //85709
                var ratesTakoma = {region: "Takoma.TAC", coords:{lat:47.2529, longitude:-122.4443}, hourlyMin:2, radius:35, firstAndLastDayRate: 114.99, rateByDay: [109.99, 104.99, 104.99, 104.99, 104.00, 109.99, 114.99],driveTimeType: "PB"}; //85709

                var stateRatesWA = {state: "WA", regions: [ratesSeattle, ratesTakoma]};
                var stateRatesAZ = {state: "AZ", regions: [ratesPhoenix, ratesTus]};
                var stateRatesCA = { state: "CA",regions: [ratesSBAY,ratesMartinez, ratesSD, ratesEBAY, ratesOC, ratesRiverside,ratesSanBern,ratesStockton, ratesNSac]};
                var stateRatesMD = { state: "MD", regions: [ratesBalt]};
                var stateRatesNV = { state: "NV",regions: [ratesLV]};



                return /*this.rates =*/ {AZ: stateRatesAZ,CA: stateRatesCA, MD: stateRatesMD,NV: stateRatesNV, WA:stateRatesWA};

            }
};
 