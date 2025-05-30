interface Props {
  params: {
    id: string
  }
}

export default async function ProductPage({ params }: Props) {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-1">Product Details</h1>
      <p>Product ID: {params.id}</p>
    </div>
  )
}