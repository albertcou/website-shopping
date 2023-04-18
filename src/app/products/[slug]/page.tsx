"use client";
import Card from "@/components/card";
import data from "@/utils/data";
import Link from "next/link";
import React, { useState } from "react";
import type { RootState } from "@/app/GlobalRedux/store";
import { useDispatch, useSelector } from "react-redux";
import { CART_ADD_ITEM } from "@/app/GlobalRedux/carts";
import { Product } from "@/types/type";
import { toast } from "react-hot-toast";

function SideImages() {
  return <div className="w-28 h-28 bg-tertiary rounded-2xl"></div>;
}

function Hero({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-y-3 mt-14">
      <h1 className="text-3xl font-semibold capitalize text-secondary">
        {title}
      </h1>
      {children}
    </div>
  );
}

function Page({ params }: { params: { slug: string } }) {
  const [TotalCart, setTotalCart] = useState<number>(1);
  const product = data.products.find((x) => x.slug === params.slug);
  const item = useSelector((state: RootState) => state.Carts.cart);
  const dispatch = useDispatch();
  
  if (!product) return <div>Product Not Found!!!</div>;
  const recommend = data.products.filter(
    (obj, _) =>
      obj.categories === product.categories && obj.slug !== params.slug
  );

  const addToCartHandler = (product: Product) => {
    const existItem = item.cartItems.find((x) => x.slug === product.slug);
    const quantity = existItem ? existItem.quantity + TotalCart : TotalCart;
    dispatch(
      CART_ADD_ITEM({
        ...product,
        quantity,
      })
    );
    toast(`Anda Berhasil Menambah ${product.name} sebanyak ${TotalCart} 😄`,{
      icon: '🛒'
    });
  };

  return (
    <div className="container mx-auto">
      <div className="flex mt-10 space-x-10">
        <div className="flex flex-col gap-y-14">
          <SideImages />
          <SideImages />
          <SideImages />
        </div>
        <Card.ProductsDetails
          categories={product.categories}
          name={product.name}
          price={product.price}
          images={product.images}
          addCartHandler={() => addToCartHandler(product)}
          valueCart={TotalCart}
          setTotalCart={setTotalCart}
        />
      </div>

      <Hero title="Products Details:">
        <p>{product.description}</p>
      </Hero>
      <Hero title="Another Products You Might Like:">
        <div className="flex justify-center gap-x-10">
          {recommend.map((product) => (
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
      </Hero>
    </div>
  );
}

export default Page;
