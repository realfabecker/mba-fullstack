import data from "../data.json";

export async function GET() {
  const featured = data.products.filter((v) => v.featured);
  return Response.json(featured);
}
