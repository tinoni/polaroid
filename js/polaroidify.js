/**
 * User: mfernandes
 * Date: 27/12/13
 * Time: 14:19
 * minify with http://jscompress.com/
 */




$(function() {

  if (!Modernizr.draganddrop) {
    console.error("update your browser. no draganddrop");
    $.pnotify({
      title: 'HTML5 Drag & Drop not Supported',
      text: 'Your browser does not support HTML5 drag & drop. Please <a href="http://www.google.com/chrome" target="_blank">upgrade your browser</a>.',
      hide: false
    });
    $('#button_dd').addClass("disabled");
    return;
  }
  else if (!Modernizr.canvas) {
    console.error("update your browser. no canvas");
    $.pnotify({
      title: 'HTML5 Canvas not Supported',
      text: 'Your browser does not support HTML5 canvas. Please <a href="http://www.google.com/chrome" target="_blank">upgrade your browser</a>.',
      hide: false
    });
    $('#button_dd').addClass("disabled");
    return;
  }
  else if (!Modernizr.filereader) {
    console.error("update your browser. no filereader");
    $.pnotify({
      title: 'HTML5 File API not Supported',
      text: 'Your browser does not support HTML5 file API. Please <a href="http://www.google.com/chrome" target="_blank">upgrade your browser</a>.',
      hide: false
    });
    $('#button_dd').addClass("disabled");
    return;
  }




  var obj = $('#file_dd');
  obj.on('dragenter', function (e) {
    $(this).addClass('dd_hilite');
    e.stopPropagation();
    e.preventDefault();
  });
  obj.on('dragover', function (e) {
    e.stopPropagation();
    e.preventDefault();
  });
  obj.on('drop', function (e) {
    $(this).removeClass('dd_hilite');
    e.preventDefault();
    var file = e.originalEvent.dataTransfer.files[0];
    do_magic(file);
  });
  $('#button_dd').on('click', function(e) {
    $('#fileInput').trigger('click', e);
  });


  $(document).on('dragenter', function (e) {
    e.stopPropagation();
    e.preventDefault();
  });
  $(document).on('dragover', function (e) {
    e.stopPropagation();
    e.preventDefault();
    obj.removeClass('dd_hilite');
  });
  $(document).on('drop', function (e) {
    e.stopPropagation();
    e.preventDefault();
  });


  $('#fileInput').on('change', function (e) {
    var file = this.files[0];
    do_magic(file);
  });


  var $my_img = $('#my_img');
  var do_magic = function(file) {
    if (!file.type.match(/image.*/)) {
      console.log("File not supported!");
      $.pnotify({
        title: 'Invalid Image Type',
        text: 'Could not process this image type. Please try again with one of these image types: jpeg, png or gif.'
      });
      return;
    }

    var reader = new FileReader();
    reader.onload = function(e) {
      var done_loading = false;
      $my_img.removeAttr("width");
      $my_img.removeAttr("height");
      var l_img = new Image();
      l_img.onload = function() {
        if (done_loading) return;  //load just once
        done_loading = true;
        magic_polaroid.main(l_img, undefined, true, 15, function() {
          $("#download_img").removeClass("hidden");
          $("#download_img").attr("href", l_img.src); //download link
          $my_img.attr("src", l_img.src);
        });
      };
      l_img.src = reader.result;

    } //end reader.onload

    reader.readAsDataURL(file);


  };



});