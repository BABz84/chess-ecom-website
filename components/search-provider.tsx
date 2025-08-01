"use client";

import { createContext, useContext, useState, type ReactNode, useCallback } from "react";
import { Product } from "@/lib/types";

interface SearchContextType {
  search: (query: string) => Promise<Product[]>;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export function SearchProvider({ children }: { children: ReactNode }) {
  const search = useCallback(async (query: string) => {
    if (query.length < 2) return [];
    try {
      const response = await fetch(`/api/products/search?query=${encodeURIComponent(query)}`);
      if (!response.ok) {
        throw new Error("Search request failed");
      }
      const { products } = await response.json();
      return products.map((edge: { node: Product }) => edge.node);
    } catch (error) {
      console.error("Failed to fetch search results:", error);
      return [];
    }
  }, []);

  return (
    <SearchContext.Provider value={{ search }}>
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
