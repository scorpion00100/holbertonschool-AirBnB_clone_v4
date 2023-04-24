$(document).ready(function () {
  const amenitiesChecked = {};
  $(document).on('change', "input[type='checkbox']", function () {
    if (this.checked) {
      amenitiesChecked[$(this).data('id')] = $(this).data('name');
    } else {
      delete amenitiesChecked[$(this).data('id')];
    }
    const objs = Object.values(amenitiesChecked);
    console.log(Object.values(amenitiesChecked));
    if (objs) {
      $('.amenities > h4').text(Object.values(amenitiesChecked).join(', '));
    } else {
      $('.amenities > h4').html('&nbsp;');
    }
  });
});
