import { Button } from '@/components/ui/button';
import React from 'react';

const CreateCategoryPage = () => {
    return (
        <div>
            <div className='flex items-center justify-between'>
                <h1 className='text-xl font-bold'>
                    Manage Categories
                </h1>
                <Button>
                 Create Category
                </Button>
            </div>
        </div>
    );
};

export default CreateCategoryPage;