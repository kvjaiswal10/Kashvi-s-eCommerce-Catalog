import { useState } from "react";
import Product from "../components/Product";
import { initMongoose } from "../lib/mongoose";
import { findAllProducts } from "./api/products";
import Layout from "../components/Layout";
import { ShoppingCart } from "lucide-react"; // optional: or use emoji

export default function Home({ products }) {
  const [phrase, setPhrase] = useState("");

  const categoriesNames = [...new Set(products.map((p) => p.category))];

  let filteredProducts = products;
  if (phrase) {
    filteredProducts = products.filter((p) =>
      p.name.toLowerCase().includes(phrase.toLowerCase())
    );
  }

  return (
    <Layout>
      {/* Top Navigation Bar */}
      <nav className="sticky top-0 z-50 bg-white border-b border-[#ddb7ab] py-4 px-6 flex justify-between items-center shadow-sm">
        <h1 className="text-2xl font-bold text-[#B76E79] tracking-wide">
          e-Commerce
        </h1>
        <button
          className="bg-[#B76E79] hover:bg-[#a25a64] text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors"
          onClick={() => alert("Login functionality coming soon!")}
        >
          Login
        </button>
      </nav>

      {/* Right Vertical Cart Bar */}
      <div className="fixed top-1/2 right-0 transform -translate-y-1/2 pr-2 z-40">
        <button
          onClick={() => alert("Cart will open here")}
          className="bg-[#B76E79] hover:bg-[#a25a64] text-white p-3 rounded-l-xl shadow-md flex flex-col items-center"
        >
          <ShoppingCart size={24} />
          <span className="text-xs mt-1">Cart</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="my-6 px-4">
        <input
          value={phrase}
          onChange={(e) => setPhrase(e.target.value)}
          type="text"
          placeholder="Search for products..."
          className="bg-[#fff0f5] text-[#333] w-full py-2 px-4 rounded-xl border border-[#B76E79] placeholder-gray-500"
        />
      </div>

      {/* Product Categories */}
      <div className="px-4">
        {categoriesNames.map((categoryName) => (
          <div key={categoryName}>
            {filteredProducts.find((p) => p.category === categoryName) && (
              <div>
                <h2 className="text-2xl py-5 capitalize text-[#333] font-semibold">
                  {categoryName}
                </h2>
                <div className="flex -mx-5 overflow-x-scroll snap-x scrollbar-hide">
                  {filteredProducts
                    .filter((p) => p.category === categoryName)
                    .map((productInfo) => (
                      <div key={productInfo._id} className="px-5 snap-start">
                        <Product {...productInfo} />
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  await initMongoose();
  const products = await findAllProducts();
  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
    },
  };
}
