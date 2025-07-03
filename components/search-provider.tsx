"use client";

import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { Product } from "@/lib/types";

interface SearchContextType {
  products: Product[];
  search: (query: string) => Product[];
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export function SearchProvider({ children, allProducts }: { children: ReactNode, allProducts: any[] }) {
  const search = (query: string) => {
    if (!query) return [];
    console.log("Searching for:", query);
    const lowerCaseQuery = query.toLowerCase();
    const results = allProducts.filter(({ node: product }) =>
      (product.title && product.title.toLowerCase().includes(lowerCaseQuery)) ||
      (product.description && product.description.toLowerCase().includes(lowerCaseQuery))
    );
    console.log("Search results:", results);
    return results;
  };

  return (
    <SearchContext.Provider value={{ products: allProducts, search }}>
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
