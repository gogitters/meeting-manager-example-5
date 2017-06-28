/* global Vue */
/* global $ */
document.addEventListener("DOMContentLoaded", function(event) { 
  var app = new Vue({
    el: '#app',
    data: {
      meetings: []
    },
    mounted: function() {
      $.get('/api/v1/meetings.json', function(data) {
        this.meetings = data;
      }.bind(this));
    }
  });
});
