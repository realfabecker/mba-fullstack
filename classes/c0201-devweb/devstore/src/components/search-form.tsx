"use client";

import { FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";

export function SearchForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get("q");

  function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData);
    const query = data.q;
    if (!query) return null;
    router.push(`/search?q=${query}`);
  }

  return (
    <form
      className="flex w-[320px] items-center gap-3 rounded-full bg-zinc-900 px-5 py-3 ring-zinc-700"
      onSubmit={handleSearch}
    >
      <Search className="w-5 h-5 text-zinc-500" />
      <input
        type="text"
        defaultValue={query || ""}
        name={"q"}
        placeholder="buscar produtos..."
        className="flex-1 bg-transparent text-sm outline-none placeholder:text-zinc-500"
      />
    </form>
  );
}
