const source   = document.getElementById("girl-image-template").innerHTML;
const template = Handlebars.compile(source);

var pageToLoad = 0;
var isLoading = false;

function loadNextPage() {
    // throtting
    isLoading = true;

    $.ajax({
        url: '/api/images/page/'+pageToLoad
    }).then(
        (data) => {
            isLoading = false;
            pageToLoad += 1;
            
            var itemHtml = $(template({images: data}));
            
            // append html to the list and notify masonry of content changes
            $("#girl_list").append(itemHtml).masonry('appended', itemHtml);
            $('#girl_list').imagesLoaded().progress( function() {
              $('#girl_list').masonry('layout');
            });

            if($('body').height() < $(window).height()) loadNextPage();
        },
        (err) => {
            isLoading = false;
            console.error(err);
        }
    );
}

function checkEndlessScrolling(){
    if(!isLoading && $(window).height() + $(window).scrollTop() > $('body').height() - $(window).height()/2) loadNextPage();
}

// Initialize masonry layout
$('#girl_list').masonry({
    itemSelector: '.girl_item',
    columnWidth: '.girl_item',
    percentPosition: true
});

// Rearrange items after all <img> finished loading and all height are known
$('#girl_list').imagesLoaded().progress( function() {
    $('#girl_list').masonry('layout');
});

$(window).on('scroll', checkEndlessScrolling);
loadNextPage();