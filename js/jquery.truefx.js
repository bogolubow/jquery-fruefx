(function( $ ) {

    function getData(url, callback) {
        var $ajax = $.ajax({
            url: url
        });

        $ajax.done(function(resp){


            callback(null, resp);
        });

        $ajax.fail(function(err){
            callback(err);
        });
    }

    $.fn.TrueFx = function( options ) {
        var opts = $.extend( {}, $.fn.TrueFx.defaults, options );

        var trueFx = {
            id: null,
            start: function() {
                console.log('starting', opts);

                if(this.id === null) {
                    this.id = setInterval(function(){
                        getData(opts.url+'?c='+opts.pair+'&f=csv', opts.callback);
                    }, opts.interval);
                }
            },

            stop: function() {
                console.log('stoping');
            }
        }

        return trueFx;
    }
})( jQuery );

$.fn.TrueFx.defaults = {
    interval: 1000,
    pair: "EUR/USD",
    url: "http://webrates.truefx.com/rates/connect.html"
};


var trueFx = $.fn.TrueFx({
    callback: function(err, resp) {
        console.log(err, resp);
    }
});
console.log(trueFx);
trueFx.start();
