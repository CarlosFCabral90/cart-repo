require 'sinatra'
require 'json'
require 'sinatra/cross_origin'

require_relative './controllers/products_controller'
require_relative './controllers/cart_controller'

configure do
  enable :cross_origin
end

before do 
  response.headers['Access-Control-Allow-Origin'] = '*'
end

options "*" do
  response.headers["Allow"] = "GET, POST, OPTIONS"
  response.headers["Access-Control-Allow-Headers"] = "Content-Type"
  200
end

set :port, 4567

get '/products' do
  content_type :json
  ProductsController.index
end

get '/cart' do
  content_type :json
  CartController.index
end

post '/cart/:id' do
  content_type :json
  CartController.add(params[:id])
end

delete '/cart/:id' do
  content_type :json
  CartController.add(params[:id])
end