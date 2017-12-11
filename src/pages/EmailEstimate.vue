
<template>
<v-card> 
       <v-card-text>Where should we email this quote?</v-card-text>
        <v-card-actions>
      <input type="text" v-model="email" placeholder="E-mail" />
      <button id="send-quote" class="btn btn-primary btn-sm" v-on:click="sendEmail">Send Quote</button>
        </v-card-actions>
      </v-card>
</template>


<script>
import bus from './bus';

export default {
  name: 'EmailEstimate',
 props:[
  'minHours', 
  'quotename', 
  'submitDate',
   'baseDayRate',
    'driveTime',
     'duration',
  'pickupLocation', 
  'finalLocation', 
  'distance',
   'hourlyRate'],
  data () {
    return{
apiKey : '', email:'',
// Array of API discovery doc URLs for APIs used by the quickstart
discoveryDocs : ["https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest"],
scopes :'https://mail.google.com '+ 'https://www.googleapis.com/auth/gmail.modify ' +
  'https://www.googleapis.com/auth/gmail.compose '+
  'https://www.googleapis.com/auth/gmail.send',
     
        };
        },computed:{
                  //laborPerHour: function(){ console.log(this.dayRate,"----", this.hrs); return this.dayRate * this.hrs; } ,
                //  estimatedRangeApproximate: function(){  return this.dayRate * this.hourlyMinimum + this.driveTime; }

        },
         methods: { 
     
        
      
      /*
       * Fill a quote string with calculated data and send a Quote via email
       */
  sendEmail: function(){
var quoteNumber = Math.floor(100000 + Math.random() * 900000);
var message = 'From: Starving Quoter <StarvingQuotes@gmail.com>\r\n' +
    'To: ' + this.email + '\r\n' +
    'Cc: jaxonetic@gmail.com\r\n' +
    'Subject: Starving Students Demo E Quote '+quoteNumber+'\r\n'+
    'Content-Type: text/html; charset=utf-8\r\n' +
    'Content-Transfer-Encoding: base64\r\n\r\n' + 
 //     'Content-Transfer-Encoding: quoted-printable\r\n\r\n' +

    '<html><head>'+
    '<style>.centered-header{text-align: center}'+
    '.inserted-text{color:#2b69ad;font-size:28}\r\n'+
    'td{padding:0px;margin:0px;color:#2b69ad;font-size:18}\r\n'+
'.email-tbl-hdr{color:black}'+
    '.quote-text{color:red;font-size:48px}\r\n'+
    '*{font-size: large;}'+
    '</style></head><body>'+
    '<div class="centered-header"><img alt="Embedded Image" src="http://www.ssmovers.com/templates/template01/images/logo.gif" />'+
     '<h3>800-441-6683 ext. 4100</h3>'+
     '<h1 class="quote-text">Quote Only</h1>'+
     '<h5>This is not a reservation for your move. This is a rate quote only and is subject to change at any time</h5>' + 
     '<h3>Time slots fill up quickly.  CALL NOW to reserve your move</h3></div>' +
      '<p>Hello <span class="inserted-text">'+ this.quotename +'</span></p>'+
      'Thank you for using Starving Students to assist with your next move. Combined with our 43 years of experience helping families '+
' and businesses relocate, our booking and referral services are second to none.  We are proud of the high level of customer care our' + 
'approved moving providers will deliver on your upcoming move and we look forward to working with you again soon. '+
      '<p> The following is what we currently have available for the date you requested: ' +
  '<table><tr><td><h3 class="email-tbl-hdr">Quote Number</h3></td><td class="inserted-text">' +quoteNumber+'</td></tr> '+
      '<tr><td class="email-tbl-hdr">Pickup Location</td> <td class="inserted-text">' +this.pickupLocation+'</td></tr>'+
      '<tr><td class="email-tbl-hdr">Destination Location</td><td class="inserted-text"> ' +this.finalLocation+'</td></tr>'+
      '<tr><td class="email-tbl-hdr">Move Date</td><td class="inserted-text">' +this.submitDate+'</td></tr>'+
      '<tr><td class="email-tbl-hdr">Arrival Windows</td><td>AM(8am -9am) or PM(1pm - 5pm)</td></tr>'+
      '<tr><td class="email-tbl-hdr">Drive Time Charge</td><td class="inserted-text">$' +this.driveTime+'</td></tr>'+
      '<tr><td class="email-tbl-hdr">Estimated Rate</td><td><h2 class="inserted-text">$' + this.hourlyRate + '</h2></td></tr>'+

      '</table>'+
    
    '<h1>Our services include:...</h1>' +
    '<ul>'+
'<li>Typically, 2 movers are required for each move. (Depending on the size of the move.)</li>'+
'<li>One or more moving truck(s). (Depending on the size of the move.)</li>'+
'<li>Moving equipment including furniture pads, blankets, straps and dollies will be provided by our outsourced moving provider.</li>'+
'<li>Loading, driving and unloading of your household goods & furniture.</li></ul>'+

'<h1>Services Not Included:</h1>'+
'<ul><li>We do not disconnect or reconnect any gas, water or appliances lines. </li>'+
 '   <li>We do not remove items from walls or ceilings.</li>'+
'</ul>'+

'<h4>Please note:</h4>'+

'<ol><li>Your credit card has been charged a 50.00 "Booking Reservation Fee". This deposit is refundable only within 48 hours of your '+

 'booking needs to be confirmed within 72 hours of the estimated '+

  'rescheduled date to check availability.</li>'+ 
'<li>The approved moving providers we have referred to you will contact you prior to your move date and confirm the details of the move. '+
'Upon arrival on the move date, the approved moving provider will assess the scope of work to match the confirmation details. '+
' (If the scope of work is more than was confirmed, total pricing is subject to change.)</li> '+
'<li>Before the approved moving provider starts work, they may request an additional "Moving Deposit" (this will be a percentage of '+ 
 ' the estimated move total) prior to starting the move.</li> '+
'<li>The total balance must be paid in full at the end of your move, less the "Booking Reservation Fee" and "Moving Deposit."</li></ol> '+

'<p>Payment by credit card is preferred. Cash, money orders and cashiers checks are accepted. Personal checks are NOT accepted.</p>'+
 
'<p>Please call or email me should you need any further assistance.</p>'+ 
 
'<h3>Thank You</h3>'+
    '<img alt="Embedded Image" src="http://www.ssmovers.com/templates/template01/images/logo.gif" />'+
    '</body></html>';
              console.log('send email', message);

  var sendRequest = gapi.client.gmail.users.messages.send({
    'userId': 'me',
    'resource': {
      'raw': window.btoa(message).replace(/\+/g, '-').replace(/\//g, '_')
    }
  });
   sendRequest.execute(function(resp){ console.log("sendRequest Response:", resp); bus.$emit('email_sent',true);return null;});

   
//this.dialog=false;
    }
    
   
},//methods
/*
 * mounted: 
*/
 mounted: function () {
 }
}
</script>
