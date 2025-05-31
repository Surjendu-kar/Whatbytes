function Sidebar() {
  const categories = ['All', 'Electronics', 'Clothing', 'Home']
  const brands = ['Apple', 'Samsung', 'Nike', 'Adidas', 'IKEA']

  return (
    <div className="w-64 flex flex-col gap-6">
      {/* Filters */}
     <div className='flex flex-col bg-primary p-4 text-white rounded-xl gap-4'>
      <h2 className="text-xl font-bold">Filters</h2>
      
      {/* Category Filter */}
      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-semibold">Category</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <label key={category} className="flex items-center space-x-3 cursor-pointer">
              <input
                type="radio"
                name="category"
                value={category}
                className="w-4 h-4 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm">{category}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Filter */}
      <div className="flex flex-col">
        <h3 className="text-lg font-semibold">Price</h3>
        <div>
          <input
            type="range"
            min="0"
            max="1000"
        
            className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer slider"
          />
          <div className="flex justify-between text-sm text-blue-100">
            <span>$0</span>
            <span>$1000</span>
          </div>

        </div>
      </div>
     </div>

    {/* Additional */}
     <div className='bg-white flex flex-col rounded-xl gap-4 p-4'>
      {/*  Brand Filter */}
      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-semibold">Brand</h3>
        <div className="space-y-3">
          {brands.map((brand) => (
            <label key={brand} className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                name="brand"
                value={brand}
                className="w-4 h-4 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm">{brand}</span>
            </label>
          ))}
        </div>
      </div>
      {/* Price Input */}
      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-semibold">Price</h3>
        <input
          type="number"
          placeholder="5000"
          className="w-full px-3 py-2 bg-transparent border  rounded text-white focus:outline-none focus:ring-2"
        />
      </div>
      </div>
    </div>
  )
}

export default Sidebar