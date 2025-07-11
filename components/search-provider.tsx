"use client";

import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { Product } from "@/lib/types";
import { getAllProducts } from "@/lib/shopify";

interface SearchContextType {
  products: Product[];
  search: (query: string) => Product[];
  loading: boolean;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export function SearchProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const allProducts = await getAllProducts();
        setProducts(allProducts);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const search = (query: string) => {
    if (!query) return [];
    console.log("Searching for:", query);
    const lowerCaseQuery = query.toLowerCase();
    const results = products.filter((product) =>
      (product.title && product.title.toLowerCase().includes(lowerCaseQuery)) ||
      (product.description && product.description.toLowerCase().includes(lowerCaseQuery))
    );
    console.log("Search results:", results);
    return results;
  };

  return (
    <SearchContext.Provider value={{ products, search, loading }}>
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error("useSearch must be used within a SearchProvider");
  }
  return context;
}
