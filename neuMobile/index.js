var max_value = 240;
$('.neumorphic-slider__thumb, .neumorphic-slider__back, .neumorphic-slider__line').on('mousedown', function(e){
  var self = $(this);
  give_new_value(e.clientX, self);
  self.closest('.neumorphic-slider').addClass('neumorphic-slider_moving');
  $(document).on('mousemove.mm', function(e){
    give_new_value(e.clientX, self);
  });
  $(document).on('mouseup.mu', function(){
    $(document).off('mousemove.mm');
    self.closest('.neumorphic-slider').find('.neumorphic-slider__thumb').off('mouseup.mu');
    self.closest('.neumorphic-slider').removeClass('neumorphic-slider_moving');
  });
});

function give_new_value_input(input, value) {
  $(input).find('.neumorphic-slider__popover').text(value).css('left', value);
  $(input).find('.neumorphic-slider__line').width(value);
  $(input).find('.neumorphic-slider__thumb').css('left', value);
}

function give_new_value(x, self) {
  var new_value = 0;
  var timed_value = 0;
  if (x - 6 < self.closest('.neumorphic-slider').offset().left) {
    new_value = '0%';
    timed_value = 0;
  } else if (x - 6 > self.closest('.neumorphic-slider').offset().left + $('.neumorphic-slider').width() - 10) {
    new_value = '100%';
    timed_value = max_value;
  } else {
    new_value = ((x - 6 - self.closest('.neumorphic-slider').offset().left) / ($('.neumorphic-slider').width() - 10) * 100) + '%';
    timed_value = ((x - 6 - self.closest('.neumorphic-slider').offset().left) / ($('.neumorphic-slider').width() - 10) * max_value).toFixed(0);
  }
  give_new_value_input($(self).closest('.neumorphic-slider'), new_value);
  document.documentElement.style.setProperty('--value', new_value);
  var minutes = (timed_value - timed_value % 60) / 60;
  var seconds = (timed_value % 60).toFixed(0);
  seconds = ('0' + seconds).slice(-2);
  timed_value = minutes + ':' + seconds;
  self.closest('.neumorphic-slider').find('.neumorphic-slider__text_left').text(timed_value);  
}

$('.neumorphic-slider__thumb, .neumorphic-slider__back, .neumorphic-slider__line').on('touchstart', function(e){
  var self = $(this);
  give_new_value(e.originalEvent.touches[0].pageX, self);
  $(self).closest('.neumorphic-slider').addClass('neumorphic-slider_moving');
  $(document).on('touchmove.tm', function(e){
    give_new_value(e.originalEvent.touches[0].pageX, self);
  });
  $(document).on('touchend.te', function(){
    $(document).off('touchmove.tm');
    $('.neumorphic-slider__thumb').off('touchend.te');
    $(self).closest('.neumorphic-slider').removeClass('neumorphic-slider_moving');
  });
});