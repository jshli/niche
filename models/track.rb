class Track < ActiveRecord::Base
    has_many :lessons
    has_many :sub_lessons
    has_many :enrollments
    belongs_to :track_category
end