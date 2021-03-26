$(document).ready(function() {
  // --- our code goes here ---
  $('#tweet-text').on("keyup", onKeyUp);
});


const onKeyUp = function(event) {
  let $this = $(this);
  let $form = $this.closest('form');
  let $counter = $form.find('.counter');
  let remaining = 140 - $this.val().length;
  $counter.html(remaining);
  if (remaining < 0) {
    $counter.addClass('red');
  } else {
    $counter.removeClass('red');
  }
};