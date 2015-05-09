$(document).ready(function () {

    $.getJSON('', function(data) {
        handleResponse(data);
    });
    
    function handleResponse(response) {

    var arrayOfImageUrls = response.map(function(item) {
        return item.ImgURL;
    }),
        $buddiesContainer = $('.buddies-container');

    arrayOfImageUrls.forEach(function(url) {
        var newBuddy = $('<div>', {
            class: 'buddy'
        });

        $('<div>', {
            class: 'avatar',
            css: {
                'background-image': 'url(' + url + ')'
            }
        }).appendTo(newBuddy);

        $buddiesContainer.append(newBuddy);
    });

    $buddiesContainer.find('.buddy:first').show();

    $buddiesContainer.on("swiperight", '.buddy', function () {
        $(this).addClass('rotate-left').delay(700).fadeOut(1);
       
        $('.buddy').find('.status').remove();
       
        $(this).append('<div class="status like">Like!</div>');
       
        if ($(this).is(':last-child')) {
            $('.buddy:nth-child(1)').removeClass('rotate-left rotate-right').fadeIn(300);
        } else {
            $(this).next().removeClass('rotate-left rotate-right').fadeIn(400);
        }
    });

    $buddiesContainer.on("swipeleft", '.buddy', function () {
        $(this).addClass('rotate-right').delay(700).fadeOut(1);
       
        $('.buddy').find('.status').remove();
       
        $(this).append('<div class="status dislike">Dislike!</div>');

        if ($(this).is(':last-child')) {
            $('.buddy:nth-child(1)').removeClass('rotate-left rotate-right').fadeIn(300);
            alert('Na-na!');
        } else {
            $(this).next().removeClass('rotate-left rotate-right').fadeIn(400);
        }
    });
    }
});