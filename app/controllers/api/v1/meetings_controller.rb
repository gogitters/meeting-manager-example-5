class Api::V1::MeetingsController < ApplicationController
  def index
    @meetings = Meeting.all
    # render :index
    render "index.json.jbuilder"
  end
end
