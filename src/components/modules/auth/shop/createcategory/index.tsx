"use client";
import React, { useState } from 'react';
import CreateCategory from './CreateCategory';
import { Icategory } from '@/types';
import { ColumnDef } from "@tanstack/react-table"
import { Trash } from 'lucide-react';
import Image from 'next/image';
import { NMTable } from '@/components/ui/core/NHTable';
import DeleteConfirmationModal from '@/components/ui/core/NMModal/DeleteConfirmationModal ';
import { toast } from 'sonner';
import { deleteCategory } from '@/services/category';
type TCategoryes={
    categories:Icategory[];

}

const CreateCategoryPage = ({categories}:TCategoryes) => {
    const [isModalOpen, setModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const handleDelete = (data: Icategory) => {
  
    setSelectedId(data?._id);
    setSelectedItem(data?.name);
    setModalOpen(true);
  };



const handleDeleteConfirm = async () => {
    try {
      if (selectedId) {
        const res = await deleteCategory(selectedId);
       
        if (res.success) {
          toast.success(res.message);
          setModalOpen(false);
        } else {
          toast.error(res.message);
        }
      }
    } catch (err: any) {
      console.error(err?.message);
    }
  };


  const columns: ColumnDef<Icategory>[] = [
    {
      accessorKey: "name",
      header: () => <div>Category Name</div>,
      cell: ({ row }) => (
        <div className="flex items-center space-x-3">
          <Image
            src={row.original.icon}
            alt={row.original.name}
            width={40}
            height={40}
            className="w-8 h-8 rounded-full"
          />
          <span className="truncate">{row.original.name}</span>
        </div>
      ),
    },
    {
      accessorKey: "isActive",
      header: () => <div>isActive</div>,
      cell: ({ row }) => (
        <div>
          {row.original.isActive ? (
            <p className="text-green-500 border bg-green-100 w-14 text-center px-1 rounded">
              True
            </p>
          ) : (
            <p className="text-red-500 border bg-red-100 w-14 text-center px-1 rounded">
              False
            </p>
          )}
        </div>
      ),
    },
    {
      accessorKey:"createdBy",
      header:()=><div>createdBy</div>,
      cell:({ row })=>{
 <span className="truncate">{row.original.createdBy}</span>
      }
    }
    ,
    {
      accessorKey: "action",
      header: () => <div>Action</div>,
      cell: ({ row }) => (
        <button
          className="text-red-500"
          title="Delete"
          onClick={() => handleDelete(row.original)}
        >
          <Trash className="w-5 h-5" />
        </button>
      ),
    },
    
  ];





    return (
        <div>
            <div className='flex items-center justify-between'>
                <h1 className='text-xl font-bold'>
                    Manage Categories
                </h1>
               <CreateCategory  ></CreateCategory>
            </div>
            <NMTable data={categories} columns={columns} ></NMTable>
         <DeleteConfirmationModal
        name={selectedItem}
        isOpen={isModalOpen}
        onOpenChange={setModalOpen}
        onConfirm={handleDeleteConfirm}
      />
        </div>
    );
};

export default CreateCategoryPage;