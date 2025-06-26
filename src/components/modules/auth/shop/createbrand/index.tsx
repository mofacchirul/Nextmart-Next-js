import CreateBrand from "./CreateBrand";


const  CreateBrandPage= () => {
    return (
        <div>
             <div className='flex items-center justify-between'>
                <h1 className='text-xl font-bold'>
                    Manage Brand
                </h1>
           <CreateBrand></CreateBrand>
        </div>
        </div>
    );
};

export default CreateBrandPage ;