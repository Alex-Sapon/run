// JS-функция определения поддержки WebP
function testWebP(callback) {
    var webP = new Image();
    webP.onload = webP.onerror = function () {
        callback(webP.height == 2);
    };
    webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}
testWebP(function (support) {
    if (support == true) {
        document.querySelector('body').classList.add('webp');
    } else {
        document.querySelector('body').classList.add('no-webp');
    }
});


$(document).ready(function(){
    // Click slider
    $('.slider__body').slick({
        infinity: true,
        dots: false,
        slidesToShow: 1,
        responsive: [
            {
              breakpoint: 991.98,
              settings: {
                slidesToShow: 1,
                dots: true,
                arrows: false
              }
            }
          ]
    });
    
    // Tabs
    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
        $(this)
          .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
          .closest('div._container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
    });

    function toggleSlide(item) {
        $(item).each(function(i) {
            $(this).on('click', function(e) {
                e.preventDefault();
                $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
                $('.catalog-item__desc').eq(i).toggleClass('catalog-item__desc_active');
            })
        });
    };

    toggleSlide('.catalog-item__link');
    toggleSlide('.catalog-item__back');

    // Modal
    $('[data-modal=consultation]').on('click', function() {
        $('.overlay, #consultation').fadeIn();
    })

    $('.modal__close').on('click', function() {
        $('.overlay, #consultation, #order, #thanks').fadeOut();
    })

    $('.catalog-item__btn').each(function(i) {
        $(this).on('click', function() {
            $('#order .modal__desc').text($('.catalog-item__title').eq(i).text());
            $('.overlay, #order').fadeIn();
        })
    })
});

