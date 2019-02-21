class SubLesson < ActiveRecord::Base
    belongs_to :lesson
    belongs_to :track
end 