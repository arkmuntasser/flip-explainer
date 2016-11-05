$(document).ready(function() {
  var root = $('[data-list]');

  root.find('[data-list-item]').on('click', function() {
    $(this).toggleClass('open');
  });
});
