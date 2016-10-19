function fbShare(){
	window.plugins.socialsharing.shareViaFacebook('Message via Facebook', 
                                                 null /* img */, 
                                                 null /* url */, 
                                                 null, 
                                                 function(errormsg){alert("Error: Cannot Share")}
                                                 );
};

function whatsappShare(){
	window.plugins.socialsharing.shareViaWhatsApp('Message via WhatsApp',
                                                 null /* img */,
                                                 "http://pointdeveloper.com/" /* url */, 
                                                 null, 
                                                 function(errormsg){alert("Error: Cannot Share")}
                                                 );
};

function twitterShare(){
	 window.plugins.socialsharing.shareViaTwitter('Message via Twitter',
                                                 null /* img */, 
                                                 'http://twitter.com/', 
                                                 null, 
                                                 function(errormsg){alert("Error: Cannot Share")}
                                                 );
  };

 function otherShare(){
	 window.plugins.socialsharing.share('General share Message', null, null, null);
  };

function onDeviceReady() {
}


function domLoaded(){
  document.addEventListener("deviceready", onDeviceReady, false);

}