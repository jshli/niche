class Lesson < ActiveRecord::Base
    belongs_to :track
    has_many :sub_lessons
end