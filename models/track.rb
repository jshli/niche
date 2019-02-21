class Track < ActiveRecord::Base
    has_many :lessons
    has_many :sub_lessons
end