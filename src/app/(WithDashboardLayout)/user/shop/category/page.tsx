import CreateCategoryPage from '@/components/modules/auth/shop/createcategory';
import { getAllcategory } from '@/services/category';


const ShopCategoryPage =async () => {
    const {data,meta} = await getAllcategory()

    console.log(meta);
    
    return (
        <div>
            <CreateCategoryPage categories={data}></CreateCategoryPage>
        </div>
    );
};

export default ShopCategoryPage;