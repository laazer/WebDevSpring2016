(function()
{
	angular
		.module("JBSite")
		.factory("DeviceDetector", deviceDetector);


 function deviceDetector($window) {

  	  var model = {
        isMobile: isMobile,
        isDesktop: isDesktop,
        isTablet: isTablet,
        isSmallDevice: isSmallDevice,
        getSize: getSize
  		};
      return model;

      function getSize() {
        var w = $window.innerWidth;
        if(w >= 1200) return "lg";
        if(w >= 992) return "md";
        if(w >= 768) return "sm";
        else return "xs";
      }

      function isMobile() {
        return getSize() == "xs";
      }

      function isTablet() {
        return getSize() == "sm";
      }

      function isSmallDevice() {
        return isMobile() || isTablet();
      }

      function isDesktop() {
        return !isSmallDevice();
      }
  }

})();
