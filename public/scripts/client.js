/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(() => {

  //click to show/hide the tweet form
  const showTweetForm = () => {
    const $tweetForm = $('#tweet-form');
    const $clickShow = $("#click-show");
    $clickShow.click(() => {
      $tweetForm.toggle();
    });
  };
  showTweetForm();

  //sticky back-to-top button
  const backTop = () => {
    $(window).scroll(function() {
      $("#sticky-button").css("display", "inline");
    });
    $("#sticky-button").click((event) => {
      event.preventDefault();
      $("html, body").animate({ scrollTop: 0 }, "slow");
    });
  };

  backTop();
  

  const escape = function(str) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  const createTweetElement = (tweetData) => {
    let $tweet = $("<section>").addClass("tweet");
    let html = `<header class="tweet-header">
  <p><img id='poo' src="${tweetData.user.avatars}">${tweetData.user.name}</p>
          <div id="hover-text">${tweetData.user.handle}</div>
        </header> 
        <!-- tweet content -->
        <div class="article">
          <p>${escape(tweetData.content.text)}</p>
        </div>
        <!-- time and likes in the footer -->
        <footer>
          <div class="tweet-footer">
            <p>${tweetData.created_at}</p>
            <div id="footer-icon">
              <i class="fas fa-flag"></i>
              <i class="fas fa-share-square"></i>
              <i class="fas fa-heart"></i>
            </div>
          </div>
        </footer>`;

    let tweetElement = $tweet.append(html);
    return tweetElement;
  };

  const renderTweets = (tweets) => {
    // loops through tweets
    // calls createTweetElement for each tweet
    // takes return value and appends it to the tweets container

    let tweetContainer = $('.tweet-content');
    tweetContainer.empty();

    tweets.forEach((tweet) => {
      let tweetElement = createTweetElement(tweet);
      tweetContainer.prepend(tweetElement);
    });
  };


  const loadTweets = function(tweets) {
    //get all the tweets
    $.ajax({
      url: '/tweets',
      method: 'GET',
      success: (tweets) => {
        renderTweets(tweets);
      },
      error: (error) => {
        console.error(error);
      }
    });
  };
  loadTweets();

  $tweetForm.on('submit', function(event) {
    event.preventDefault();
    let $this = $(this);
    let $form = $this.closest('form');
    let $textarea = $form.find('#tweet-text');
    let $counter = $form.find('.counter');
    if ($counter.val() < 0) {
      $(".error-container").text('Your tweet is too long!').slideDown('slow').show();
    } else if ($counter.val() >= 140) {
      $(".error-container").text('Say something!').slideDown('slow').show();
    } else {
      const serializedData = $(this).serialize();
      $.post('/tweets/', serializedData)
        .then((response) => {
          console.log(response);
          loadTweets();
          $textarea.val('');
          $counter.val(140);
        });
    }
  });
  $tweetForm.on('click', () => {
    $(".error-container").hide();
  });
});


