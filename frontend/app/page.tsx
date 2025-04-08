import { Button } from "@/components/ui/button";
import qs from "qs";

const homePageQuery = qs.stringify({
  populate: {
    blocks: {
      populate: {
        image: {
          fields: ["url", "alternativeText"],
        },
        link: {
          populate: true,
        },
      },
    },
  },
});
async function getStrapiData(path: string) {
  const baseURL = "http://localhost:1337";

  const url = new URL(path, baseURL);
  url.search = homePageQuery;

  console.log("Fetching data from:", url.href);

  try {
    const response = await fetch(url.href);
    const data = await response.json();
    console.log("Fetched data:", data);
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
