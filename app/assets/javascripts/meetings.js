/* global Vue */
/* global $ */
document.addEventListener("DOMContentLoaded", function(event) { 
  var app = new Vue({
    el: '#app',
    data: {
      meetings: [],
      nameFilter: '',
      orderAttribute: 'name',
      orderAscending: true,
      tags: [],
      tagFilterId: null,
      newMeetingName: '',
      newMeetingAddress: '',
      newMeetingStartTime: '',
      newMeetingEndTime: '',
      newMeetingNotes: '',
      newMeetingTagIds: [],
    },
    mounted: function() {
      $.get('/api/v1/meetings.json', function(data) {
        this.meetings = data;
      }.bind(this));
      $.get('/api/v1/tags.json', function(data) {
        this.tags = data;
      }.bind(this));
    },
    computed: {
      filteredMeetings: function() {
        var filtered = this.meetings.filter(function(meeting) {
          var validName = meeting.name.toLowerCase().indexOf(this.nameFilter.toLowerCase()) !== -1;
          if (this.tagFilterId) {
            var validTag = false;
            for (var i = 0; i < meeting.tags.length; i++) {
              if (meeting.tags[i].id === this.tagFilterId) {
                validTag = true;
              }
            }
          } else {
            validTag = true;
          }
          return validName && validTag;
        }.bind(this));
        return filtered.sort(function(meeting1, meeting2) {
          if (this.orderAscending) {
            return meeting1[this.orderAttribute].localeCompare(meeting2[this.orderAttribute]);
          } else {
            return meeting2[this.orderAttribute].localeCompare(meeting1[this.orderAttribute]);

          }
        }.bind(this));
      }
    },
    methods: {
      changeOrderAttribute: function(inputAttribute) {
        if (inputAttribute !== this.orderAttribute) {
          this.orderAscending = true;
        } else {
          this.orderAscending = !this.orderAscending;
        }
        this.orderAttribute = inputAttribute;
      },
      filterByTag: function(inputTag) {
        this.tagFilterId = inputTag.id;
      },
      resetFilterByTag: function() {
        this.tagFilterId = null;
      },
      createMeeting: function() {
        var params = {
          name: this.newMeetingName,
          address: this.newMeetingAddress,
          start_time: this.newMeetingStartTime,
          end_time: this.newMeetingEndTime,
          notes: this.newMeetingNotes,
          tag_ids: this.newMeetingTagIds
        };
        $.post('/api/v1/meetings.json', params, function(data) {
          this.meetings.push(data);
        }.bind(this));
      }
    }

  });
});
