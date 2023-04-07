import Button from "@/components/button";
import Card from "@/components/card";
import data from "@/utils/data";
import Image from "next/legacy/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <main className="min-h-screen mx-auto max-w-7xl">
        <section className="py-24 bg-tertiary rounded-xl my-28">
          <div className="grid grid-cols-2 px-24">
            <div className="flex flex-col justify-center">
              <h1 className="text-lg font-semibold text-secondary">
                Lorem Ipsum is simply
              </h1>
              <h2 className="text-3xl font-bold">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry.{" "}
              </h2>
              <div className="mt-5">
                <Button
                  text="Show More"
                  primary={true}
                  className="duration-200 hover:shadow-lg hover:transition-all hover:-translate-y-1"
                />
              </div>
            </div>
            <div className="flex items-center justify-center">
              <Image
                src="/girls-doing-shopping.svg"
                alt="girls-doing-shopping"
                width={742}
                height={582}
              />
            </div>
          </div>
        </section>
        <section className="text-center">
          <h1 className="text-xl font-bold text-secondary">Categories</h1>
          <h2 className="mt-1 text-2xl font-bold">Browse The Categories</h2>
          <div className="flex justify-center mt-6">
            <div className="w-32 h-32 bg-tertiary rounded-3xl"></div>
          </div>
        </section>
        <section className="mt-20 text-center">
          <h1 className="text-xl font-bold text-secondary">Products</h1>
          <h2 className="mt-1 text-2xl font-bold">Browse Our Products</h2>
          <div className="grid grid-cols-3">
            {data.products.map((product) => (
              <Link key={product.slug} href={`/products/${product.slug}`}>
                <Card.Products
                  categories={product.categories}
                  name={product.name}
                  price={product.price}
                  images={product.images}
                />
              </Link>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
