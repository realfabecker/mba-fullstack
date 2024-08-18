import Image from "next/image";
import Link from "next/link";
import { Product } from "@/data/types/product";
import { api } from "@/data/api";
import { redirect } from "next/navigation";

async function getProducts(query: string): Promise<Product[]> {
  const response = await api(`/products/search?q=${query}`, {
    next: {
      revalidate: 60 * 60,
    },
  });
  return response.json();
}

interface SearchProps {
  searchParams: {
    q: string;
  };
}

export default async function Search({ searchParams }: SearchProps) {
  if (!searchParams.q) {
    return redirect("/");
  }
  const products = await getProducts(searchParams.q);
  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm">
        Resultados para: <span className="font-semibold">{searchParams.q}</span>
      </p>
      <div className="grid grid-cols-3 gap-6">
        {products.map((product) => (
          <Link
            key={product.id}
            href={`/product/${product.slug}`}
            className="relative group rounded-lg bg-zinc-900 overflow-hidden flex justify-center items-end"
          >
            <Image
              src={product.image}
              alt="moleton ai side"
              className="group-hover:scale-105 transition-transform duration-500"
              width={360}
              height={360}
              quality={100}
            />
            <div className="absolute bottom-10 right-10 h-12 flex items-center gap-2 max-w-[280px] rounded-full border-2 border-zinc-500 bg-black/60 p-1 pl-5">
              <span className="text-sm truncate">{product.title}</span>
              <span className="flex h-full items-center justify-center rounded-full bg-violet-500 px-4 font-semibold">
                {product.price.toLocaleString("pt-Br", {
                  style: "currency",
                  currency: "BRL",
                  maximumFractionDigits: 0,
                })}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
