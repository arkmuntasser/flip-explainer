$(document).ready(function() {
  var root = $('[data-list]');

  root.find('[data-list-item]').on('click', function() {
    if($(this).hasClass('open')) {
      unflip(root.find('[data-list-item].open'));
    } else {
      unflip(root.find('[data-list-item].open'));

      flip($(this));
    }
  });

  var flip = function(node) {
    // First
    var first = node[0].getBoundingClientRect();

    // Last
    node.addClass('open');
    var last = node[0].getBoundingClientRect();

    // Invert
    var invertWidth = first.width / last.width;
    var invertHeight = first.height / last.height;

    node[0].style.transform = 'scale(' + invertWidth + ',' + invertHeight + ')';

    requestAnimationFrame(function() {
      // Play
      node.addClass('animatable');
      node[0].style.transform = '';
    });
  }

  var unflip = function(node) {
    if(node.length !== 0) {
      // First
      var first = node[0].getBoundingClientRect();

      // Last
      node.removeClass('open animatable').addClass('closing');
      var last = node[0].getBoundingClientRect();

      // Invert
      var invertWidth =  first.width / last.width;
      var invertHeight = first.height / last.height;

      node[0].style.transform = 'scale(' + invertWidth + ',' + invertHeight + ')';

      requestAnimationFrame(function() {
        // Play
        node.addClass('closing-animatable');
        node[0].style.transform = '';
      });
    }
  }

  // Cleanup when the transitions from unflip() are over.
  // Limit to 1 listener on the parent triggered by event coming from child
  root.on('transitionend', '[data-list-item]', function() {
    if($(this).hasClass('closing')) {
      $(this).removeClass('closing closing-animatable');
    }
  });
});
