
$(function () {
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

$.get('http://0.0.0.0:5001/api/v1/status/', function(data, status) {
  if (status === "OK") {
    $('div#api_status').addClass("active");
  } else {
    $('div#api_status').removeClass("active");
  }
})
