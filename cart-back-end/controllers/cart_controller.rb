require_relative '../data/storage'

class CartController
  def self.index
    {
        success: true,
        cart: DataStorage.cart
    }.to_json
  end


  def self.add(id)
    product = DataStorage.products.find { |p| p[:id] == id.to_i }

    if product
      DataStorage.cart << product
      {
        success: true,
        message: "Producto agregado al carrito",
        cart: DataStorage.cart
      }.to_json
    else
      {
        success: false,
        error: "Producto no encontrado"
      }.to_json
    end
  end

  def self.remove(id)
    product = DataStorage.cart.find { |p| p[:id] == id.to_i }

    if product
      DataStorage.cart.delete(product)
      {
        success: true,
        message: "Producto eliminado del carrito",
        cart: DataStorage.cart
      }.to_json
    else
      {
        success: false,
        error: "Producto no encontrado en el carrito"
      }.to_json
    end
  end
end
