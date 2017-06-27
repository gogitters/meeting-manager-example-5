Rails.application.routes.draw do
  get '/' => 'meetings#index'
  resources :meetings, except: :destroy

  namespace :api do
    namespace :v1 do
      resources :meetings, except: :destroy
    end
  end
end
