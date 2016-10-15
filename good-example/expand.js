$(document).ready(function() {
  var root = $('[data-list]');

  root.find('[data-list-item]').on('click', function() {
    if($(this).hasClass('open')) {
      root.find('[data-list-item]').removeClass('open animatable');
    } else {
      root.find('[data-list-item]').removeClass('open animatable');

      flip($(this));
    }
  });

  var flip = function(node) {
    // First
    var first = node[0].getBoundingClientRect();

    // Last
    node.addClass('open');

    // Invert
    var last = node[0].getBoundingClientRect();
    var invertWidth = first.width / last.width;
    var invertHeight = first.height / last.height;

    node[0].style.transform = 'scale(' + invertWidth + ',' + invertHeight + ')';

    requestAnimationFrame(function() {
      // Play
      node.addClass('animatable');
      node[0].style.transform = '';
    });
  }
});
