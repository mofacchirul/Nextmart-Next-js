// import ProductBanner from "@/components/modules/products/banner";

import ProductPage from "@/components/modules/products/banner";
import ProductDetails from "@/components/modules/products/ProductDetails";
import { getSingleProduct } from "@/services/Product";

const ProductDetailsPage = async ({
  params,
}: {
  params: Promise<{ productId: string }>;
}) => {
  const { productId } = await params;

  const { data: product } = await getSingleProduct(productId);

  return (

    <div className="container mx-auto">
          <ProductPage
        title="Product Details"
        path="Home - Products - Product Details"
      />
      <ProductDetails product={product} />

    </div>
  );
};

export default ProductDetailsPage;