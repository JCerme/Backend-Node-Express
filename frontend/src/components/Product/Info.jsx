import { AddToCartBtn } from "./AddToCartBtn"

export const Info = ({product}) => {
    return (
        <>
        <h1 className="text-blue-600 text-4xl font-bold">
            {product?.title}
        </h1>
        <p className="my-4 whitespace-pre-line">
            {product?.description}
        </p>
        <span className="px-4 py-2 border border-solid border-blue-600 bg-white text-blue-600 rounded-full text-sm">
            {product?.category}
        </span>
        <p className="text-3xl text-blue-600 mt-8">
            ${product?.price}
        </p>
        <div className="flex gap-2 mt-4 mb-2">
            {/* <button className="flex-1 py-2 px-4 rounded-lg bg-gray-100 border-2 text-gray-400 font-bold opacity-50">
                Buy Now
            </button> */}
            <AddToCartBtn pid={product?._id} />
        </div>
        <p className="text-right text-red-600">
            [ ! ] Just {product?.stock} left in stock
        </p>
        </>
    )
}
