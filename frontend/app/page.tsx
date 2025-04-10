import { Button } from "@/components/ui/button";
import qs from "qs";

const homePageQuery = qs.stringify({
  populate: {
    blocks: {
      on: {
        "layout.hero-section": {
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
    },
  },
});

async function getStrapiData(path: string) {
  const baseUrl = "http://localhost:1337";

  const url = new URL(path, baseUrl);
  url.search = homePageQuery;

  try {
    const response = await fetch(url.href);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

export default async function Home() {
  const strapiData = await getStrapiData("/api/home-page");

  if (!strapiData) {
    return <div>Error fetching data</div>;
  }

  console.log("Strapi Data:", strapiData);

  const { title, description } = strapiData.data;
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-3xl font-bold">{title}</h1>
      <p className="text-lg">{description}</p>
      <Button className="mt-4">Click Me</Button>
      <h1>Teste Infinito</h1>
    </main>
  );
}
