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

    // Validate
    function validateForms(form) {
        $(form).validate({
            rules: {
                name: "required",
                phone: "required",
                email: {
                  required: true,
                  email: true
                }
              },
              messages: {
                name: "Пожалуйста, введите свое имя",
                phone: "Пожалуйста, введите свой номер телефона",
                email: {
                  required: "Пожалуйста, введите свою почту",
                  email: "Неправильно введен адрес почты"
                }
              }
        });
    };

    validateForms('#consultation-form');
    validateForms('#order .form');
    validateForms('#consultation .form');

    // Mask unput
    $('input[name=phone]').mask('+999(99) 999-99-99');

    // Post email
    $('form').submit(function(e) {
        e.preventDefault();
        $.ajax ({
            type: "POST",
            url: "mailer/smart.php",
            data: $(this).serialize()
        }).done(function() {
            $(this).find("imput").val("");
            $('#consultation, #order').fadeOut();
            $('.overlay, #thanks').fadeIn();

            $('form').trigger('reset');
        });
        return false;
    });

    // Smooth scroll and page up
    $(window).scroll(function() {
        if ($(this).scrollTop() > 1300) {
            $('.pageup').fadeIn();
        } else {
            $('.pageup').fadeOut();
        }
    });

    // $('a').on('click', function(e) {
    //     // Make sure this.hash has a value before overriding default behavior
    //     if (this.hash !== "") {
    //     // Prevent default anchor click behavior
    //     e.preventDefault();
    //     // Store hash
    //     let hash = this.hash;
    //     // Using jQuery's animate() method to add smooth page scroll
    //     // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
    //     $('html, body').animate({
    //         scrollTop: $(hash).offset().top
    //     }, 800, function(){
    //         // Add hash (#) to URL when done scrolling (default click behavior)
    //         window.location.hash = hash;
    //     });
    //     } // End if
    // });

    new WOW().init();
});

