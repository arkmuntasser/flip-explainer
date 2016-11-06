$(document).ready(function() {
  var root = $('[data-list]');

  var togglePane = function(target) {
    // Get first state
    var first = target.find('[data-list-item-background]')[0].getBoundingClientRect();

    // Get last state
    target.toggleClass('open').addClass('locked');
    var last = target.find('[data-list-item-background]')[0].getBoundingClientRect();

    // Invert that bad boy
    var invertWidth = first.width / last.width;
    var invertHeight = first.height / last.height;
    var invertLeft = first.left - last.left;
    var invertDescriptionWidth = target.hasClass('open') ? last.width : first.width;

    target.find('[data-list-item-inner]').css({
      'transform' : 'translateX(' + invertLeft + 'px)',
      'will-change' : "transform"
    });

    target.find('[data-list-item-background]').css({
      'transform' : 'scale(' + invertWidth + ',' + invertHeight + ')',
      'will-change' : 'transform'
    });

    target.find('[data-list-item-description]').css({
      'min-width' : invertDescriptionWidth + 'px'
    });

    // Play that funky music
    requestAnimationFrame(function() {
      target.addClass('animate');

      target.find('[data-list-item-inner]').css({
        'transform' : ''
      });

      target.find('[data-list-item-background]').css({
        'transform' : ''
      });
    });
  };

  // Hndle the click event
  root.find('[data-list-item]').on('click', function() {
    var target = $(this);

    if(target.hasClass('locked')) {
      return;
    }

    togglePane(target);
  });

  // Clean up when after the animation completes
  root.find('[data-list-item-description]').on('transitionend', function() {
    var target = $(this).parent().parent();

    if(!target.hasClass('open')) {
      return;
    }

    target.removeClass('locked animate');

    target.find('[data-list-item-inner]').css({
      'will-change' : ''
    });

    target.find('[data-list-item-background]').css({
      'will-change' : ''
    });
  });

  root.find('[data-list-item-background]').on('transitionend', function() {
    var target = $(this).parent();

    if(target.hasClass('open')) {
      return;
    }

    target.removeClass('locked animate');

    target.find('[data-list-item-inner]').css({
      'will-change' : ''
    });

    target.find('[data-list-item-background]').css({
      'will-change' : ''
    });
  });
});
