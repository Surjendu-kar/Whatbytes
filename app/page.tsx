import Link from 'next/link'

function Page() {
  // Sample products data
  const products = [
    { id: 1, name: 'Product 1' },
    { id: 2, name: 'Product 2' },
    { id: 3, name: 'Product 3' },
  ]

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      <div className="grid gap-4">
        {products.map((product) => (
          <Link 
            key={product.id}
            href={`/product/${product.id}`}
            className="p-4 border rounded hover:bg-gray-100"
          >
            {product.name}
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Page