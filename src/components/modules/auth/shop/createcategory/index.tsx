
import React from 'react';
import CreateCategory from './CreateCategory';

const CreateCategoryPage = () => {
    return (
        <div>
            <div className='flex items-center justify-between'>
                <h1 className='text-xl font-bold'>
                    Manage Categories
                </h1>
               <CreateCategory></CreateCategory>
            </div>
        </div>
    );
};

export default CreateCategoryPage;