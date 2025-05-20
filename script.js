$(document).ready(function() {
    // Initialize the flipbook
    $("#flipbook").turn({
        width: $('#flipbook').width(),
        height: $('#flipbook').height(),
        autoCenter: true,
        display: 'double',
        acceleration: true,
        gradients: !$.isTouch,
        elevation: 50,
        when: {
            turned: function(e, page) {
                console.log('Current page: ' + page);
            }
        }
    });

    // Responsive adjustments
    $(window).resize(function() {
        if ($(window).width() <= 500) {
            $("#flipbook").turn("display", "single");
        } else {
            $("#flipbook").turn("display", "double");
        }
        
        // Resize the flipbook based on window size
        resizeViewport();
    }).resize();

    // Navigation buttons
    $("#prev").click(function() {
        $("#flipbook").turn("previous");
    });

    $("#next").click(function() {
        $("#flipbook").turn("next");
    });

    // Keyboard navigation
    $(document).keydown(function(e) {
        if (e.keyCode == 37) {
            $("#flipbook").turn("previous");
        } else if (e.keyCode == 39) {
            $("#flipbook").turn("next");
        }
    });

    // Resize function
    function resizeViewport() {
        let width = $('#flipbook').parent().width();
        let height = $('#flipbook').parent().height();
        let options = $('#flipbook').turn('options');

        if (width < 800) {
            if (width < 500) {
                $('#flipbook').css({
                    width: 300,
                    height: 240
                });
            } else if (width < 700) {
                $('#flipbook').css({
                    width: 400,
                    height: 300
                });
            } else {
                $('#flipbook').css({
                    width: 600,
                    height: 420
                });
            }
        } else {
            $('#flipbook').css({
                width: 800,
                height: 540
            });
        }

        $('#flipbook').turn('size', $('#flipbook').width(), $('#flipbook').height());
    }

    // Add page turning effect
    $("#flipbook").bind("turning", function(event, page, view) {
        // Optional: Add sound effect
        let pageTurnSound = new Audio();
        pageTurnSound.volume = 0.3;
        try {
            pageTurnSound.play();
        } catch(e) {
            console.log("Audio playback failed:", e);
        }
        
        // Add visual effect when turning pages
        if (page == 1) {
            // First page - special case
            event.preventDefault();
            setTimeout(function() {
                $("#flipbook").turn("page", page);
            }, 500);
        }
    });

    // Preload overlay effect for page turning
    $("<div class='overlay'></div>").css({
        position: "absolute",
        width: "100%",
        height: "100%",
        top: 0,
        left: 0,
        zIndex: 999,
        background: "rgba(0,0,0,0.1)",
        opacity: 0,
        pointerEvents: "none"
    }).appendTo(".flip-book-container");

    // Show page number information
    $("#flipbook").bind("turned", function(event, page, view) {
        updatePageInfo(page, $("#flipbook").turn("pages"));
    });

    function updatePageInfo(currentPage, totalPages) {
        // You can add page numbering here if needed
        console.log(`Page ${currentPage} of ${totalPages}`);
    }

    // Add touch swipe support
    $("#flipbook").swipe({
        swipeLeft: function() {
            $(this).turn("next");
        },
        swipeRight: function() {
            $(this).turn("previous");
        },
        threshold: 30
    });

    // Handle zoom feature (optional)
    let zoomLevel = 1;
    $(".container").on("dblclick", function() {
        zoomLevel = zoomLevel == 1 ? 1.5 : 1;
        $("#flipbook").css({
            transform: `scale(${zoomLevel})`,
            transformOrigin: "center center"
        });
    });

    // Prevent dragging images (for better user experience)
    $("img").on("dragstart", function(event) { 
        event.preventDefault(); 
    });

    // Auto play feature (optional, disabled by default)
    let autoPlay = false;
    let autoPlayTimer;
    
    function startAutoPlay() {
        if (autoPlay) {
            autoPlayTimer = setInterval(function() {
                if ($("#flipbook").turn("page") < $("#flipbook").turn("pages")) {
                    $("#flipbook").turn("next");
                } else {
                    stopAutoPlay();
                }
            }, 3000);
        }
    }
    
    function stopAutoPlay() {
        clearInterval(autoPlayTimer);
    }

    // Initialize on page load
    resizeViewport();
    updatePageInfo($("#flipbook").turn("page"), $("#flipbook").turn("pages"));
});
