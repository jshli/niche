     
require 'sinatra'
require 'sinatra/reloader'
require 'pry'
require 'active_record'
require 'pg'
require 'stripe'
require_relative 'db_config'
require_relative 'models/user'
require_relative 'models/track'
require_relative 'models/track_category'
require_relative 'models/enrollment'
require_relative 'models/lesson'
require_relative 'models/sub_lesson'

enable :sessions

set :publishable_key, ENV['PUBLISHABLE_KEY']
set :secret_key, ENV['SECRET_KEY']

Stripe.api_key = settings.secret_key

helpers do 
  def current_user
    User.find_by(id: session[:user_id])
  end

  def logged_in?
    if current_user
      true
    else
      false
    end
  end

  def time_conversion(minutes)
    hours = minutes / 60
    rest = minutes % 60
    "#{hours}h #{rest}mins" 
  end

  def currently_enrolled?(track_id, user_id)
    if (Enrollment.where(track_id: track_id).where(user_id: user_id)).length == 0
      false
    else
      true
    end
  end
end

get '/' do
  @tracks = Track.all
  erb :index, :layout => false
end

get '/create-account' do
  erb :create_account
end

post '/create-account' do
    @user = User.new
    @user.first_name = params[:first_name]
    @user.last_name = params[:last_name]
    @user.email = params[:email]
    @user.password = params[:password]
    @user.avatar = "#{@user.first_name[0].upcase}#{@user.last_name[0].upcase}"
    @user.valid_subscription = false
    @user.save
end

get '/login' do
  erb :login
end

post '/session' do
  user = User.find_by(email: params[:email])
  if user && user.authenticate(params[:password])
    session[:user_id] = user.id
    redirect'/dashboard'
  else
    @errors = "Wrong password or email. Try again?"
    erb :login
  end
end

get '/dashboard' do
  if logged_in?
    @user = User.find(current_user.id)
    @tracks = Track.all
    @enrollments = Enrollment.where(user_id: @user.id)
    @track_category = Track_Category.joins(:tracks)
    erb :dashboard
  else
    redirect '/login'
  end
  
end

get '/all_tracks' do
  if logged_in?
    @user = User.find(current_user.id)
  end
    @tracks = Track.all
    @lessons = Lesson.all
    erb :all_tracks
end

post '/:id/enroll' do
  enrollment = Enrollment.new
  enrollment.user_id = params[:user].to_i
  enrollment.track_id = params[:track].to_i
  enrollment.save
  redirect '/dashboard'
end

delete '/session' do
  session[:user_id] = nil
  redirect '/login'
end

get '/charge' do
  erb :charge
end

post '/charge' do
  # Amount in cents
  @amount = 144
  @user = User.find_by(email: params[:stripeEmail])
  
  @user.save
  customer = Stripe::Customer.create({
    email: params[:stripeEmail],
    source: params[:stripeToken],
  })
  subscription = Stripe::Subscription.create({
    customer: customer.id,
    items: [{plan: 'plan_Ed5XMeLHVJFkfa'}],
    trial_end: 1556632800,
    
})
  charge = Stripe::Charge.create({
    amount: @amount,
    description: 'Sinatra Charge',
    currency: 'aud',
    customer: customer.id,
  })
  @user.valid_subscription = true
  erb :thank_you
end

get '/api/users' do
  users = User.all
  content_type "application/json"
  users.to_json
end