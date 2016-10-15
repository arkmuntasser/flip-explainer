$(document).ready(function() {
  var root = $('[data-list]');

  root.find('[data-list-item]').on('click', function() {
    if($(this).hasClass('open')) {
      root.find('[data-list-item]').removeClass('open');
    } else {
      root.find('[data-list-item]').removeClass('open');
      $(this).toggleClass('open');
    }
  });
});
