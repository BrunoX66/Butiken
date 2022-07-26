/* 
  The program is written with JavaScript, including jQuery.
  A jQuery plugin (JavaScript library) called jCanvas is also used for HTML5 canvas. 
  This program handles the functionality of Butiken's website.
  The code below adds functionality and handles different HTML events 
  for the several webpages that covers the website, which are triggered by the website user
  or by the HTML elements.
*/

// Global scope variables
let timer;
let isNavbarOpen = false;

// The jQuery(function() { }) is equal to $(document).ready(function() { }).
// The ready() function runs when the HTML document/DOM has finished loading and ready for manipulation.
$(function () {
  // ---Navbar---

  // Using the shorthand method hover(), it attaches a mouseenter and a mouseleave events listener
  // on the A elements within Li elements, that are within Ul elements, that are a part of the main
  // navigation bar, id #main-nav-bar. Two functions are executed. The first navbarAniInHandler()
  // is called on mouseenter. The second navbarAniOutHandler() is called on mouseleave.
  $("#main-nav-bar > ul > li > a").hover(
    navbarAniInHandler,
    navbarAniOutHandler
  );

  // Attaches a click event listener on the element of id #hamburger-menu-btn
  // and calls the navbarMenuToggle() method.
  $("#hamburger-menu-btn").on("click", navbarMenuToggle);

  // Attaches a click event listener on the element of id #popular-link
  // and calls the navToUnavailablePage() method, including data about the page name.
  $("#popular-link").on(
    "click",
    { pageName: "Most Popular" },
    navToUnavailablePage
  );

  // Attaches a click event listener on the element of id #deals-link
  // and calls the navToUnavailablePage() method, including data about the page name.
  $("#deals-link").on("click", { pageName: "Deals" }, navToUnavailablePage);

  // Attaches a click event listener on the elements of id #sign-in-link and #sign-in-mobile-link,
  // and calls the navToUnavailablePage() method, including data about the page name.
  $("#sign-in-mobile-link, #sign-in-link").on(
    "click",
    { pageName: "Sign in" },
    navToUnavailablePage
  );

  // ---Home page---

  // Calls the method sellerNameGreeting()
  sellerNameGreeting();

  // Attaches a click event listener on the element of id #todays-product-link
  // and calls the navToUnavailablePage() method, including data about the page name.
  $("#todays-product-link").on(
    "click",
    { pageName: "Product of the Day" },
    navToUnavailablePage
  );

  // Attaches a click event listener on the element of id #most-viewed-link
  // and calls the navToUnavailablePage() method, including data about the page name.
  $("#most-viewed-link").on(
    "click",
    { pageName: "Most Viewed" },
    navToUnavailablePage
  );

  // Attaches a click event listener on the element of id #discover-link
  // and calls the navToUnavailablePage() method, including data about the page name.
  $("#discover-link").on(
    "click",
    { pageName: "Discover" },
    navToUnavailablePage
  );

  // ---Sell form---

  // Attaches a submit event listener on the element of id #sell-form
  // and calls the formSubmitHandler() method.
  $("#sell-form").on("submit", formSubmitHandler);

  // Attaches a click event listener on the element of id #close-success-message
  // and calls the closeMessageHandler() method.
  $("#close-success-message").on("click", closeMessageHandler);

  // Attaches a beforeunload event listener on the Window object
  // and calls the ifFormNotEmpty() method.
  $(window).on("beforeunload", ifFormNotEmpty);

  // Calls the method addGoToTopBtn()
  addGoToTopBtn();

  // Attaches a click event listener on the element of id #go-to-top-btn
  // and calls the goToTopPage() method.
  $("#go-to-top-btn").on("click", goToTopPage);

  // ---Image upload---

  // Attaches a change event listener on the element of id #img-input
  // and calls the imageInputHandler() method.
  $("#img-input").on("change", imageInputHandler);

  // Saving the reference to the element of id #image-drop-area in a jQuery object.
  let $dropArea = $("#image-drop-area");

  // Attaching dragenter and dragover event listeners to
  // the element of id #image-drop-area and setting them to return false
  // to stop event propagation and default action from occurring.
  $dropArea.on("dragenter", false);
  $dropArea.on("dragover", false);

  // Attaches drop event listener to the element of id #image-drop-area
  // and calls imageDropHandler() method.
  $dropArea.on("drop", imageDropHandler);

  // ---Page footer---

  // Attaches a click event listener on the element of id #contact-link
  // and calls the navToUnavailablePage() method, including data about the page name.
  $("#contact-link").on(
    "click",
    { pageName: "Contact Us" },
    navToUnavailablePage
  );

  // Attaches a click event listener on the element of id #about-link
  // and calls the navToUnavailablePage() method, including data about the page name.
  $("#about-link").on("click", { pageName: "About" }, navToUnavailablePage);

  // Attaches a click event listener on the element of id #privacy-link
  // and calls the navToUnavailablePage() method, including data about the page name.
  $("#privacy-link").on(
    "click",
    { pageName: "Privacy Notice" },
    navToUnavailablePage
  );

  // Attaches a click event listener on the element of id #cou-link
  // and calls the navToUnavailablePage() method, including data about the page name.
  $("#cou-link").on(
    "click",
    { pageName: "Conditions of Use" },
    navToUnavailablePage
  );
});

// ---Home page---

// This method handles the welcome greeting with the seller's name on the home page
// of the web site.
// It starts by retrieving the saved JSON object string, 'sellFormDataObj', from the browser's
// sessionStorage which is then parsed to a JavaScript object to be readable.
// The JS object is then checked in an if statement to validate if the object is truthy (not null).
// The check is done to see if any data even exists yet with the key name 'sellFormDataObj'
// in sessionStorage.
// If the check returns true, a string containing the the value of the 'fname' property
// in the object, the first name of the seller, is appended in the element of id #fname-greeting
// - in other words, after the text "Welcome to Butiken".
function sellerNameGreeting() {
  const sellerObj = JSON.parse(sessionStorage.getItem("sellFormDataObj"));
  if (sellerObj) {
    $("#fname-greeting").text(", " + sellerObj.fname + "!");
  }
}

// ---Navbar---

// This method handles the animation when the mouseenter event is triggered.
// In other words, when the mouse pointer goes over the element.
// This animation increases the letterspacing property and fontSize property of the
// A element that fired the mouseenter event. Duration of the animation is set to
// 'fast' and easing function to linear.
function navbarAniInHandler() {
  $(this).animate(
    {
      letterSpacing: "0.15rem",
      fontSize: "1.4rem",
    },
    "fast",
    "linear"
  );
}

// This method handles the animation when the mouseleave event is triggered.
// In other words, when the mouse pointer leaves the element.
// This animation resets the letterspacing property and fontSize property of the
// A element that fired the mouseleave event to their original values.
// Duration of the animation is set to 'fast' and easing function to swing.
function navbarAniOutHandler() {
  $(this).animate(
    {
      letterSpacing: "0rem",
      fontSize: "1.3rem",
    },
    "fast",
    "swing"
  );
}

// This method handles the toggling of the page navigation bar, between visible and hidden.
// This is only used when the screen size is small or on mobile devices.
// It utilizes a boolean variable that checks if the nav bar is open or not.
// If it is open, the method rotateHamburgerIcon() is called to restore the hamburger
// button icon to restore its rotation.
// Then jQuery method hide() is called to execute an animation that hides the nav bar
// and is set to run for 500 ms and lastly calling an anonymous function that runs when
// the animation has finished.
// This anonymous function is needed to properly mark the element as hidden by adding
// the "hide" class and remove the style attribute of the element, added by the hide()
// method, to handle the visibility in the CSS file instead. This function prevents
// any bugs och inconsistencies from happening in case the user resizes the window
// to a larger size. The boolean variable is set to false to mark the menu as hidden.
// However, if the nav bar is closed, the method rotateHamburgerIcon() is called to
// rotate the hamburger icon 90 degrees. Then jQuery method hide() is called to execute
// an animation that makes the nav bar visible  and is set to run for 500 ms.
// The boolean variable is set to true to mark the menu as open.
// Lastly in either case, open or not, the class "display-flex" is added or removed
// to the nav bar element depending on if the menu is shown or hidden. This is
// necessary to for the navbar to be presented with the correct CSS Display property.
function navbarMenuToggle() {
  let $navbar = $("#nav-menu");
  if (isNavbarOpen) {
    rotateHamburgerIcon(0);
    $navbar.hide(500, function () {
      $(this).addClass("hide");
      $(this).removeAttr("style");
    });
    isNavbarOpen = false;
  } else {
    rotateHamburgerIcon(90);
    $navbar.show(500);
    isNavbarOpen = true;
  }
  $navbar.toggleClass("display-flex");
}

// This method handles the rotation of the hamburger icon when the navbar is
// opened or closed. Its parameter is the degree it should rotate to.
// To enable a rotation animation, the CSS transform property is used with
// its rotate() method to achieve the specified rotation value.
// The animation runs for 500 ms.
function rotateHamburgerIcon(deg) {
  $("#hamburger-menu-btn").animate(
    { deg: deg },
    {
      duration: 500,
      step: function (now) {
        $(this).css({ transform: "rotate(" + now + "deg)" });
      },
    }
  );
}

// ---Sell form---

// This method handles what happens after the user has clicked on the 'Submit'
// button in the sell form. It starts by calling storeInputDataInStorage() to save
// all the input data of the sell form. Then a method to clear all the inputs of the form
// is called. After that, it calls the method to display a success message.
// The browser window is scrolled to the top by calling method goToTopPage().
// Lastly it stops default action from occurring.
function formSubmitHandler(event) {
  storeInputDataInStorage();
  clearAllFormInputs();
  showMessageHandler();
  goToTopPage();
  event.preventDefault();
}

// This method handles storing of the input data of the sell form.
// It creates a temporary JavaScript object with a defined name property
// for each input value to be saved. The value of the inputs is retrieved by the
// val() method, except for the 'newsletter' property which gives a boolean value
// by the method is() that represents if the checkbox is checked or not.
// The returned value the input of id #phone-number-input is first run through
// split() and then join() which is used to trim away the whitespace characters
// between the numbers if the user has separated the numbers with space.
// Lastly, the JS object is saved in the sessionStorage with key name 'sellFormDataObj'.
// However, the JS object is first converted to a JSON string before it's stored.
function storeInputDataInStorage() {
  const obj = {
    fname: $("#fname-input").val(),
    lname: $("#lname-input").val(),
    city: $("#city-input").val(),
    postalCode: $("#postal-code-input").val(),
    country: $("#country-input").val(),
    email: $("#seller-email-input").val(),
    newsletter: $("#newsletter-checkbox").is(":checked"),
    countryCode: $("#country-code-select option:checked").val(),
    phoneNumber: $("#phone-number-input").val().split(" ").join(""),
    title: $("#title-input").val(),
    price: $("#price-input").val(),
    description: $("#description-input").val(),
  };

  sessionStorage.setItem("sellFormDataObj", JSON.stringify(obj));
}

// This method handles the displaying of a message box that displays above the form
// when a sell form has been successfully submitted.
// It saves the reference to the element of id #submit-success in a jQuery object.
// The message element is then called to be shown on the page.
// A timer is set for 10 seconds, that represents how long the message is displayed.
// After the 10 seconds have passed, a fade out animation occurs for 3 seconds on the message element
// until it's hidden. Linear is chosen as easing function.
function showMessageHandler() {
  let $successMessage = $("#submit-success");
  $successMessage.show();
  timer = setTimeout(function () {
    $successMessage.fadeOut(3000, "linear");
  }, 10000);
}

// This method handles when the user clicks on the cross (X) in the success message box.
// It hides the message element. The previous display timer is not needed anymore and is cleared.
function closeMessageHandler() {
  $("#submit-success").hide();
  clearTimeout(timer);
}

// This method clears all inputs of the form, including the uploaded image file.
// It triggers a reset of the form to clear all inputs. The Img element's 'src' attribution
// is changed to an empty one. The figure element where the image lies within is hidden.
function clearAllFormInputs() {
  $("#sell-form").trigger("reset");
  $("#preview-img").attr("src", "data:,");
  $("#preview-fig").hide();
}

// This method checks if the user has entered anything in any of the fields in the sell form,
// when the user tries to leave or update the webpage.
// The check is done by iterating through all inputs and textareas within fieldsets.
// For each iteration the value of the field is checked if it's of truthy value.
// If it finds one, the boolean emptyForm is set to false to indicate that the form is not empty
// and the iteration is stopped.
// If the boolean emptyForm is false, the last if statement triggers the browsers built-in
// warning popup telling the user they're about to leave the page and any unsaved data will
// be lost, asking the user to confirm the action.
function ifFormNotEmpty(event) {
  let emptyForm = true;
  let $inputValue = $(
    "#sell-form > fieldset > input, #sell-form > fieldset > textarea"
  );

  $inputValue.each(function () {
    if ($(this).val()) {
      emptyForm = false;
      return false;
    }
  });

  if (!emptyForm) {
    event.preventDefault();
    event.returnValue = "";
  }
}

// This method handles the drawing of the canvas on the sell page.
// It is only executed if the location object contains a path name of the
// sell page, as the canvas should only be shown on that page.
// The canvas' purpose is to represent a button which the user can click to
// immediately scroll to the top of the page.
// It starts by storing a jQuery object of the canvas element.
// The width and height attributes of the canvas element is set to be equal
// to the width and height values defined in the CSS stylesheet, to ensure that
// the canvas is rendered correctly as the attributes sets the coordinates for the drawing.
// The method drawArc() draws a circle on the middle of the canvas.
// The method drawLine() draws a line with an arrow at its start position -
// this becomes an arrow poiting upwards.
function addGoToTopBtn() {
  if (location.pathname.includes("sell.html")) {
    var $canvas = $("#go-to-top-btn");
    $canvas[0].width = $canvas.width();
    $canvas[0].height = $canvas.height();

    $canvas.drawArc({
      fillStyle: "#07fade",
      strokeStyle: "#06bda7",
      strokeWidth: 2,
      x: 37.5,
      y: 37.5,
      radius: 35,
    });

    $canvas.drawLine({
      strokeStyle: "#07ccb5",
      strokeWidth: 8,
      startArrow: true,
      arrowRadius: 20,
      arrowAngle: 90,
      x1: 37.5,
      y1: 25,
      x2: 37.5,
      y2: 60,
    });
  }
}

// ---Image upload---

// This method handles the retrieving of the image file selected through the input element.
// The File object is stored to a constant. Lastly the image is used as an argument when
// calling the method imagePreviewHandler().
function imageInputHandler(event) {
  const image = this.files[0];
  imagePreviewHandler(image);
}

// This method handles the retrieving of the image file that was added through drag and drop by the user.
// First it prevents event propagation and default action from occurring.
// The File object is stored to a constant. Lastly the image is used as an argument when
// calling the method imagePreviewHandler().
function imageDropHandler(event) {
  event.stopPropagation();
  event.preventDefault();

  const image = event.originalEvent.dataTransfer.files[0];
  imagePreviewHandler(image);
}

// This method handles the image reading and loading onto the webpage.
// To do this it utilizes the FileReader object.
// An if statement is first used to check that the file type is an image.
// It declares a FileReader object and gets a load event listener attached
// that triggers when the image has been completely read.
// The FileReader calls a method that reads the content of the image object.
// When it's done it triggers the load event and the
// FileReader property 'result' contains the file's content
// formatted as a data URL string.
// When the load event is triggered a funtion runs and the src attribute of
// the Img element is changed to the data URL string included in the FileReader result property.
// To make the preview image appear on the page, the Figure element that surrounds the Img element is
// called to be visible.
function imagePreviewHandler(image) {
  if (image.type.startsWith("image/")) {
    const reader = new FileReader();

    $(reader).on("load", function (event) {
      $("#preview-img").attr("src", event.target.result);
      // The hidden attribute of the Img element is changed to false
      // to make the image visible on the screen.
      $("#preview-fig").show();
    });

    reader.readAsDataURL(image);
  }
}

// ---General methods---

// This method handles when the user clicks on a link and tries
// to navigate to a page that does not exist yet.
// It alerts the user with a popup message and contains the name
// of the page (in the event.data property) they tried to visit.
// At the end it returns false to stop event propagation and default action from occurring.
function navToUnavailablePage(event) {
  alert(
    "We apologize, the " +
      event.data.pageName +
      " page is currently unavailable."
  );

  return false;
}

// This method scrolls the user's browser window to the top.
// On this website it's used for when the user clicks on the 'Go to top'
// canvas button and when the form has been submitted.
function goToTopPage() {
  window.scrollTo(0, 0);
}
