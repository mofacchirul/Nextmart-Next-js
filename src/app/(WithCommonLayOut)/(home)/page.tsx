import BrandPage from "@/components/modules/home/Brand";
import CategoryHOme from "@/components/modules/home/Category";
import HeroSection from "@/components/modules/home/HeroSection";
import ProductPage from "@/components/modules/home/Product";

const HomePage =  () => {
  
  return (
    <div className="px-3 lg:px-0">
      <HeroSection></HeroSection> 
      <CategoryHOme></CategoryHOme>
      <ProductPage></ProductPage>
      <BrandPage></BrandPage>
    </div>
  );
};

export default HomePage;