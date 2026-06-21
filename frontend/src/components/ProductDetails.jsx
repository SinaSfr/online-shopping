import { useParams } from "react-router-dom";
import { useContext, useState } from "react";
import { ProductContext } from "../context/ProductContext";
import Header from "./Header";

function ProductDetails() {

  const { slug } = useParams();
  const products = useContext(ProductContext);

  const product = products.find((item) => item.slug === slug);

  const [tab, setTab] = useState("desc");

  if (!product) return <p>Loading...</p>;

  return (
    <>
      <Header />

      <div className="max-w-6xl mx-auto p-6">

        {/* TOP SECTION */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* IMAGE */}
          <div className="bg-white p-4 rounded-xl border">
            <img
              src={product.thumbnail}
              alt={product.title}
              className="w-full object-contain h-[350px]"
            />
          </div>

          {/* INFO */}
          <div className="flex flex-col gap-4">

            <h1 className="text-2xl font-bold">
              {product.title}
            </h1>

            <p className="text-gray-500">
              {product.category}
            </p>

            <div className="text-xl font-bold">
              ${product.price}
            </div>

            {product.discountPercentage && (
              <div className="text-sm text-red-500">
                {product.discountPercentage}% OFF
              </div>
            )}

            <button className="bg-black text-white py-2 px-4 rounded-lg">
              افزودن به سبد خرید
            </button>
          </div>
        </div>

        {/* TABS */}
        <div className="mt-10">

          <div className="flex gap-4 border-b pb-2">
            <button onClick={() => setTab("desc")}>
              توضیحات
            </button>
            <button onClick={() => setTab("specs")}>
              مشخصات
            </button>
            <button onClick={() => setTab("reviews")}>
              نظرات
            </button>
          </div>

          <div className="mt-4">

            {tab === "desc" && (
              <p>{product.description}</p>
            )}

            {tab === "specs" && (
              <ul className="space-y-1 text-sm">
                <li>Brand: {product.brand}</li>
                <li>Stock: {product.stock}</li>
                <li>Rating: {product.rating}</li>
                <li>SKU: {product.sku}</li>
              </ul>
            )}

            {tab === "reviews" && (
              <div className="space-y-3">
                {product.reviews.map((r, i) => (
                  <div key={i} className="border p-3 rounded-lg">
                    <p className="font-semibold">{r.reviewerName}</p>
                    <p className="text-sm text-gray-600">{r.comment}</p>
                    <span className="text-yellow-500">
                      ⭐ {r.rating}
                    </span>
                  </div>
                ))}
              </div>
            )}

          </div>
        </div>

        {/* RELATED PRODUCTS */}
        <div className="mt-12">

          <h2 className="text-lg font-bold mb-4">
            محصولات مشابه
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {products
              .filter(p => p.category === product.category && p.id !== product.id)
              .slice(0, 4)
              .map(p => (
                <div key={p.id} className="border p-2 rounded-lg">
                  <img src={p.thumbnail} className="h-24 object-contain" />
                  <p className="text-sm">{p.title}</p>
                  <p className="text-xs text-gray-500">${p.price}</p>
                </div>
              ))}
          </div>

        </div>

      </div>
    </>
  );
}

export default ProductDetails;