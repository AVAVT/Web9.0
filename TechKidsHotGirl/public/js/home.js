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
            // $element.html() =>> replace content
            $("#girl_list").append(template({images: data}));

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

$(window).on('scroll', checkEndlessScrolling);
loadNextPage();