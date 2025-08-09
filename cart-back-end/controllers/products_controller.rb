require_relative '../data/storage'

class ProductsController
    def self.index
        {
            success: true,
            products: DataStorage.products
        }.to_json
    end
end
