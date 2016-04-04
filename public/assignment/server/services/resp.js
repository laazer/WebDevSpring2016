module.exports = function() {

    var api = {
      notFound: notFound,
      success: success,
      defaultCallBack: defaultCallBack,
      defaultJsonCallBack: defaultJsonCallBack
    };
    return api;

    function notFound(res) {
        return function(err) { notFound(res, err); };
    }

    function notFound(res, err) {
        res.status(200).send(err);
    }

    function success(res) {
        res.status(200).send("success");
    }

    function defaultJsonCallBack(res) {
      return function(nObj) { defaultJsonResponse(nObj, res); };
    }

    function defaultCallBack(res) {
      return function(nObj) { defaultResponse(nObj, res); };
    }

    function defaultJsonResponse(njson, res) {
        console.log(njson);
        if(njson) res.json(njson);
        else notFound(res, "error");
    }

    function defaultResponse(nobj, res) {
        if(nobj) success(res);
        else notFound(res, "error");
    }
}
