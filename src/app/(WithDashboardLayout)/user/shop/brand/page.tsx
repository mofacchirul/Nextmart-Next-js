import CreateBrandPage from '@/components/modules/auth/shop/createbrand';
import { getAllbrands } from '@/services/Brand';


const ShopBrandPage =async () => {
    const {data}= await getAllbrands()
    return (
        <div>
            <CreateBrandPage brands={data}></CreateBrandPage>
        </div>
    );
};

export default ShopBrandPage;