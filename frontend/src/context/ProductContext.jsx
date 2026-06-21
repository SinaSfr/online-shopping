import { createContext, useEffect, useState } from "react";

export const ProductContext = createContext();

export function ProductProvider({ children }) {

  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then(res => res.json())
      .then(data => {
        const updated = data.products.map((product) => ({
          ...product,
          slug: product.title.toLowerCase().replaceAll(" ", "-"),
        }));

        setProducts(updated);
      });
  }, []);

  return (
    <ProductContext.Provider value={ products }>
      {children}
    </ProductContext.Provider>
  );
}