"use client";
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useRouter } from "next/navigation";


const ManageProducts = () => {
    const router= useRouter()
    return (
        <div>
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">Manage Products</h1>
        <div className="flex items-center gap-2">
          <Button
            onClick={() => router.push("/user/shop/products/add-product")}
            size="sm"
          >
            Add Product <Plus />
          </Button>
        </div>
      </div>
      {/* <NMTable columns={columns} data={products || []} /> */}
    </div>
    );
};

export default ManageProducts;