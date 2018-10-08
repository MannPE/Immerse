$('#reload').click( function(e) {
	e.preventDefault();
  chrome.runtime.sendMessage({greeting: "hello"}, function(response) {
    console.log("SENT GREETING");
    console.log(response);
  });
 } );