AKQA Test Release Notes
=========

Testing Matrix
----

* Chrome (Win/OSX)
* Firefox (Win/OSX)
* Safari (OSX)
* IE11 (Win 8.1)
* IE10 (Win 7)
* IE9 (Win 7)
* IE8 (XP)
* IE7 (Vista)
* Safari (iOS 7.1 - iPhone 4 / iPad Mini Retina)
* Safari (iOS 8.0 - iPad Mini Retina)
* Safari (iOS Simulator 7.1 - iPhone 4 / 4s / 5 - iPad 2 / Retina / Air)
* Safari (iOS Simulator 8.0 - iPhone 4s / 5 / 5s / 6 Plus / 6 - iPad 2 / Retina / Air)
* Chrome (Android 4.3 / 4.4 - Nexus 4 / Nexus 7)
* Silk (Android Fire OS 13.2 - Kindle Fire HD)
* Blackberry Browser (Blackberry OS 10 - Blackberry Q10)

Development Notes
---

###Creative

There are grid inconsistencies in the artwork, with product and cost columns over-running the gutter of neighbouring columns. These have been ignored.

###Creative Overlay

An image overlay has been added to allow for easy checking of visual alignment. Overlay image has gutter borders added.

Main development browser was Chrome, where near pixel perfect visual alignment was achieved. Other browser above IE8 are highly conformant.

###Responsive design

A 7-column grid with one column padding is utilised. While this uses awkward percentages, it saves on uneccessary markup for empty columns, or extra rows to target first-child with one column padding.

A single breakpoint is utilised below 640px. Widths are almost all percentage based to allow resizing.

The design fails to take into account hit areas for touch devices. Below 640px width the input spinbuttons are incresed in size, and alignment is changed to make allowance.

Development Notes
---

###Code conventions
All files are tab indented with 2-space tabs, to enable viewing as much code on screen as possible in development. 4-space tabs will make minor changes to code layout, only really affecting variable declaration blocks. Resetting to 4-space tabs is trivial if desired.

Style aims for maximum readability, with mid-line alignment of colons and equals symbols, generous whitespace, new lines for opening and closing braces. Semi-colons are always explicit to enable uglification / compression.

###JS / Frameworks / Plugins

test.js is not very heavily commented. The code is so simple it mostly seemed redundant. Script uses 'use strict'; directive.

jQuery and Modernizr have been used.

jQuery is not perticularly essential for the required features, and adds to bloat, but is more efficient for development.

Modernizr detection features were not required (the only useful one being not fit for purpose - see Know Issues - Tablets), so a custom building containing only the HTML 5 Shiv shim has been used, and included for IE8/7 conditionally to enable suport for HTML semantic tags.

###Optimisation

For production, JS files should be concatenated, and both JS and CSS should be uglified / compressed.

Images have been included base 64 encoded inline in CSS to save HTTP request overheads, with linked fallbacks.

IE7 has additional rules as it does not handle fallback rules properly.

No high-res images have been provided for HDPI (retina) devices.

Best practive would be to use encoded SVG with PNG fallback as all images are highly suitable for efficient SVG compression.

Images have been compressed with ImageAlpha (PNG-8 format with alpha channel) and ImageOptim, resulting in massive savings for both file and base 64 encoded versions.

Known Issues
---

###Tablets / Mobile

Larger spinbuttons do not show on most tablets/orientations due to larger reported display size.

Touch devices can not be reliably detected by modernizr, which only detects presence of touch API in the browser. Many desktop browsers have touch API and report as touch enabled, even when the device, including desktop/laptop, does not have a touch capable display, therefore this has not been targetted to enlarge buttons.

The buttons are still usable, if you are deft, but user zooming is left enabled for the benefit of users afflicted with stubbyitis.

On small mobiles, clear item buttons may be very close to the screen edge, or off screen. Scrolling is possible to access the buttons.

###IE7
Spinbuttons mysteriously disappear when used. They do function when visible. The UI is still usable and manual numeric entry is possible. All other features function as intended.

###Blackberry
Enlarged spinbuttons are misaligned. Interface is still usable but visually somewhat broken. As this is not part of target support matrix, no fix was attempted.