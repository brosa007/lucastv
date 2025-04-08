import { Button } from "@/components/ui/button";

async function getStrapiData(path: string) {
  const baseURL = "http://localhost:1337";
  try {
    const response = await fetch(baseURL + path);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

export default async function Home() {
  const strapiData = await getStrapiData("/api/home-page");
  if (!strapiData) {
    return <div>Error fetching data</div>;
  }

  console.log("Strapi Data:", strapiData);
  const title = strapiData?.data?.title || "Default Title";
  const description =
    strapiData?.data?.description || "Default description";

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-3xl font-bold">{title}</h1>
      <p className="text-lg">{description}</p>
      <Button className="mt-4">Click Me</Button>
    </main>
  );
}
