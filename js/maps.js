
  function initMap() {    
    var map = new google.maps.Map(document.getElementById("map"), {
      center: { lat: 50.4255413, lng: 30.6480816 },
      scrollwheel: false,
      zoom: 14,
    });
  }
  window.initMap = initMap;
