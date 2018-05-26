


$(function() {
    //console.log(jQuery)
    var cool = '<%=cool%>';
    $('#cool').val(cool);

    var jqxhr = $.get( "/cool", function(data) {
        //alert( "success" );
    })
    // .done(function(data) {
    //     //alert( "second success" );
    // })
    // .fail(function(data) {
    //     //alert( "error" );
    // })
    // .always(function(data) {
    //     //alert( "finished" );
    // });

    jqxhr.done(function(data) {
        //alert(data);
        var cools = data.data;
        setInterval(function(){ 
            var ii = parseInt(Math.random() * cools.length);
            $('#cool').html(cools[ii])
            testAnim('fadeInDownBig');
        }, 3000);

    });

})

function testAnim(x) {
    $('#cool').removeClass().addClass('slideInUp' + ' animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
        $(this).removeClass();
    });
}