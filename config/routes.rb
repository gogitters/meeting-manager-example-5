Rails.application.routes.draw do
  get '/' => 'meetings#index'
  resources :meetings
end
