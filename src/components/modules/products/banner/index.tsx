import style from "./Banner.module.css"

const ProductPage = ({title,path}:{title:string,path:string}) => {
    return (
        <div className={`${style.bannar} container mx-auto border-2 border-white rounded-3xl mt-10 flex justify-center items-center`}>
            <div className="text-center">
                <h1 className="font-bold text-2xl leading-10">{title}</h1>
                <p>{path}</p>
            </div>
        </div>
    );
};

export default ProductPage;