class Meeting < ApplicationRecord
  has_many :meeting_tags
  has_many :tags, through: :meeting_tags

  validates :name, :address, presence: true

  def start_time_formatted
    (start_time || DateTime.now).strftime("%Y-%m-%dT%H:%M")
  end

  def end_time_formatted
    (end_time || DateTime.now).strftime("%Y-%m-%dT%H:%M")
  end
end
