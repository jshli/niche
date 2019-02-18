options = {
    adapter: 'postgresql',
    database: 'niche'
  }
  
ActiveRecord::Base.establish_connection( ENV['DATABASE_URL'] || options)