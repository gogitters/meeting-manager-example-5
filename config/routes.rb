Rails.application.routes.draw do
  get '/' => 'meetings#index'

  # get '/meetings' => 'meetings#index'
  # get '/meetings/:id' => 'meetings#show'
  resources :meetings
end
