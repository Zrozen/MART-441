$(document).ready(function() {
    let occupiedAreas = []; // Stores occupied positions

    function checkOverlap(x, y, width, height) {
        let buffer = 10; // Extra spacing to prevent close placement
        for (let area of occupiedAreas) {
            let ax = area.x, ay = area.y, aw = area.width, ah = area.height;
            if (x < ax + aw + buffer && x + width + buffer > ax &&
                y < ay + ah + buffer && y + height + buffer > ay) {
                return true; // Overlap detected
            }
        }
        return false; // No overlap
    }

    function getSafePosition(element) {
        let width = element.outerWidth(true);
        let height = element.outerHeight(true);
        let maxAttempts = 50; // Increased attempts for better accuracy
        let attempts = 0;
        let x, y;

        do {
            x = Math.random() * ($(window).width() - width);
            y = Math.random() * ($(window).height() - height);
            attempts++;

            if (attempts >= maxAttempts) {
                occupiedAreas = []; // Reset occupied areas if no space is found
            }
        } while (checkOverlap(x, y, width, height) && attempts < maxAttempts);

        // Store new occupied area
        occupiedAreas.push({ x, y, width, height });

        return { x, y };
    }

    function animateImages() {
        let images = $(".image");
        let index = 0;

        function showNextImage() {
            if (images.length === 0) return;

            let image = images.eq(index);
            images.hide();

            let position = getSafePosition(image); // Ensure non-overlapping placement

            image.css({ top: position.y, left: position.x, position: "absolute" })
                 .fadeIn(1000)
                 .delay(2000)
                 .fadeOut(1000, function() {
                     index = (index + 1) % images.length;
                     showNextImage();
                 });
        }

        showNextImage();
    }

    function animateText() {
        let texts = $(".text");
        let index = 0;

        function showNextText() {
            if (texts.length === 0) return;

            let text = texts.eq(index);
            texts.hide();

            let position = getSafePosition(text); // Ensure non-overlapping placement

            text.css({ top: position.y, left: position.x, position: "absolute" })
                .fadeIn(1000)
                .delay(2000)
                .fadeOut(1000, function() {
                    index = (index + 1) % texts.length;
                    showNextText();
                });
        }

        showNextText();
    }

    function animateShapes() {
        let shapes = $(".shape");
        let index = 0;

        function showNextShape() {
            if (shapes.length === 0) return;

            let shape = shapes.eq(index);
            let finalPosition = getSafePosition(shape);

            shapes.hide();

            shape.css({
                top: finalPosition.y + "px",
                left: finalPosition.x + "px",
                position: "absolute",
                display: "block"
            });

            // Start moving the shape around randomly
            let moveInterval = setInterval(function() {
                let movePos = getSafePosition(shape);
                shape.animate({ top: movePos.y + "px", left: movePos.x + "px" }, 1500);
            }, 2000);

            // Stop movement after 6 seconds and fade out
            setTimeout(function() {
                clearInterval(moveInterval);
                shape.fadeOut(1000, function() {
                    index = (index + 1) % shapes.length;
                    showNextShape();
                });
            }, 6000);
        }

        setTimeout(showNextShape, 500);
    }

    // Start animations
    animateImages();
    animateText();
    animateShapes();
});
