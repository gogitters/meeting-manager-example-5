Rails.application.routes.draw do
  get '/' => 'meetings#index'
  resources :meetings, except: :destroy

  namespace :api do
    namespace :v1 do
      resources :meetings, except: :destroy
      resources :tags, only: :index
    end
  end
end
