import { useContext } from "react";
import { ProductsContext } from "./ProductsContext";

export default function Product({ _id, name, price, description, picture }) {
  const { setSelectedProducts } = useContext(ProductsContext);

  function addProduct() {
    setSelectedProducts((prev) => [...prev, _id]);
  }

  return (
    <div className="bg-white border border-[#ddb7ab] rounded-2xl p-4 shadow-md hover:shadow-lg transition-transform transform hover:scale-105 w-64 flex flex-col justify-between">
      <div className="bg-[#fff5f7] rounded-xl h-48 flex items-center justify-center overflow-hidden mb-4">
        <img
          src={picture}
          alt={name}
          className="max-h-full max-w-full object-contain"
        />
      </div>
      <h3 className="text-lg font-semibold text-[#B76E79]">{name}</h3>
      <p className="text-sm text-gray-600 mt-2">{description}</p>
      <div className="flex items-center justify-between mt-4">
        <span className="text-xl font-bold text-[#333]">₹{price}</span>
        <button
          onClick={addProduct}
          className="bg-[#B76E79] hover:bg-[#a25a64] text-white px-4 py-1 rounded-xl text-lg font-bold transition-colors"
        >
          +
        </button>
      </div>
    </div>
  );
}
