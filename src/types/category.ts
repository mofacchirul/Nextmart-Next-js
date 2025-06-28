export interface Icategory{
    _id:string,
    name:string,
    icon:string,
    discription:string,
    parent:string |null,
    isActive:boolean,
    createdBy:string,
    slug:string,
    createdAt:string,
    updatedAt:string,
    children:Icategory[],
}