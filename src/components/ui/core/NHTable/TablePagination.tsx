import React from 'react';
import { Button } from '../../button';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const TablePagination = () => {
    return (
        <div>
            <Button>
                 <ArrowLeft></ArrowLeft>
            </Button>
            <Button>1</Button>
            <Button>
              <ArrowRight></ArrowRight>
            </Button>
        </div>
    );
};

export default TablePagination;