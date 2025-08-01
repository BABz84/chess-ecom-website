"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useSearch } from "./search-provider";
import { Product } from "@/lib/types";

export default function ProductSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Product[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const { search } = useSearch();

  useEffect(() => {
    const handler = setTimeout(async () => {
      if (query.length < 2) {
        setResults([]);
        setIsOpen(false);
        return;
      }
      const searchResults = await search(query);
      setResults(searchResults);
      setIsOpen(searchResults.length > 0);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [query, search]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={searchRef}>
      <div className="relative w-full">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500 h-4 w-4" />
        <Input
          type="search"
          placeholder="Search products..."
          className="pl-10 pr-4"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query.length > 1 && results.length > 0 && setIsOpen(true)}
        />
      </div>
      {isOpen && results.length > 0 && (
        <div className="absolute top-full mt-2 w-full md:w-[500px] bg-white border rounded-lg shadow-lg z-10">
          <ul>
            {results.map((product) => (
              <li key={product.id}>
                <Link href={`/products/${product.handle}`} className="flex items-center p-4 hover:bg-gray-100">
                  <Image
                    src={product.featuredImage?.url || "/placeholder.svg"}
                    alt={product.featuredImage?.altText || product.title}
                    width={40}
                    height={40}
                    className="rounded-md mr-4"
                  />
                  <span>{product.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
