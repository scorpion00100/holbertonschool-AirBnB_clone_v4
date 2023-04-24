$(function () {
  const amenitiesChecked = {};
  $(document).on('change', "input[type='checkbox']", function () {
    if (this.checked) {
      amenitiesChecked[$(this).data('id')] = $(this).data('name');
    } else {
      delete amenitiesChecked[$(this).data('id')];
    }
    const objs = Object.values(amenitiesChecked);
    if (objs) {
      $('.amenities > h4').text(Object.values(amenitiesChecked).join(', '));
    } else {
      $('.amenities > h4').html('&nbsp;');
    }
  });

  $.getJSON('http://localhost:5001/api/v1/status/', (data) => {
    if (data.status === 'OK') {
      $('#api_status').addClass('available');
    } else {
      $('#api_status').removeClass('available');
    }
  });

  const users = {};
  $.getJSON('http://localhost:5001/api/v1/users', (data) => {
    for (const usr of data) {
      users[usr.id] = usr.first_name + ' ' + usr.last_name;
      console.log(users);
    }
  });

  $.ajax({
    type: 'POST',
    data: JSON.stringify({}),
    url: 'http://localhost:5001/api/v1/places_search',
    contentType: 'application/json',
    success: function (data) {
      for (const place of data) {
        const template = `<article>
        <div class="title_box">
          <h2>${place.name}</h2>
          <div class="price_by_night">
      $${place.price_by_night}
            </div>
          </div>
          <div class="information">
            <div class="max_guest">
            <div class="image_guest"></div>
      <br>
      ${place.max_guest} Guests
          </div>
            <div class="number_rooms">
            <div class="img_room"></div>
      <i class="fa fa-bed fa-3x" aria-hidden="true"></i>
      <br>
      ${place.number_rooms} Bedrooms
          </div>
          <div class="number_bathrooms">
          <div class="img_bathrooms"></div>
      <br>
      ${place.number_bathrooms} Bathroom
          </div>
        </div>
        <div class="description">
          ${place.description}
        </div>
      </article> <!-- End 1 PLACE Article -->`;
        $('.places').append(template);
      }
    }
  });

  $("button").click(function () {
    $.ajax({
        type: 'POST',
        data: JSON.stringify({amenities: Object.keys(amenitiesChecked)}),
        url: 'http://localhost:5001/api/v1/places_search',
        contentType: 'application/json',
        success: function (data) {
          $('article').remove();
          for (const place of Object.values(data)) {
            const template = `<article>
            <div class="title_box">
              <h2>${place.name}</h2>
              <div class="price_by_night">
              $${place.price_by_night}
              </div>
            </div>
            <div class="information">
              <div class="max_guest">
              <div class="image_guest"></div>
      <br>
      ${place.max_guest} Guests
          </div>
            <div class="number_rooms">
            <div class="img_room"></div>
      <i class="fa fa-bed fa-3x" aria-hidden="true"></i>
      <br>
      ${place.number_rooms} Bedrooms
          </div>
          <div class="number_bathrooms">
          <div class="img_bathrooms"></div>
      <br>
      ${place.number_bathrooms} Bathroom
          </div>
        </div>
        <div class="description">
          ${place.description}
        </div>
      </article> <!-- End 1 PLACE Article -->`;
        $('section.places').append(template);
          }
        }
  });
});

});
