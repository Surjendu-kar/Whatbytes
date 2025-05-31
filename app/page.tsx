import ProductGrid from '@/components/ProductGrid'
import Sidebar from '@/components/Sidebar'

function Page() {
  return (
    <div className="flex bg-gray-50 gap-10">
      <Sidebar/>    
      <ProductGrid />  
    </div>
  )
}

export default Page