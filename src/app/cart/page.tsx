"use client";
import Button from "@/components/button";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../GlobalRedux/store";
import { cartItems } from "@/types/type";
import Image from "next/image";
import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "../GlobalRedux/carts";

function CartItem({ ...props }: cartItems) {
  const dispatch = useDispatch();
  const [TotalCart, setTotalCart] = useState<number>(props.quantity);

  useEffect(()=>{
    dispatch(CART_ADD_ITEM({
      ...props,
      quantity: TotalCart
    }))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[TotalCart])

  const removeItemHandler = (item: cartItems) => {
    dispatch(CART_REMOVE_ITEM(item));
  };
  
  return (
    <div className="flex">
      <div className="flex">
        <Image
          className="rounded-3xl"
          src={props.images}
          width={208}
          height={208}
          alt="images_c"
        />
      </div>
      <div className="flex flex-col ml-8 text-xl gap-y-5">
        <h1 className="font-bold">{props.name}</h1>
        <div className="grid grid-cols-2">
          <h1 className="font-semibold text-secondary">Categories:</h1>
          <h1 className="font-semibold text-secondary">{props.categories}</h1>
        </div>
        <div className="grid grid-cols-2">
          <h1 className="font-semibold text-secondary">Harga:</h1>
          <h1 className="font-bold">{props.price}</h1>
        </div>
        <div className="grid grid-cols-2 gap-x-5">
          <Button.Jumlah value={TotalCart} setTotalCart={setTotalCart} />
          <Button
            danger={true}
            text="Hapus"
            onClick={() => removeItemHandler(props)}
          />
        </div>
      </div>
    </div>
  );
}

function Cart() {
  const { cartItems } = useSelector((state: RootState) => state.Carts.cart);
  
  return (
    <div className="w-full min-h-[90vh]">
      <div className="flex flex-col items-center">
        <h1 className="my-16 text-4xl font-bold">My Cart</h1>
        <div className="flex flex-col gap-y-10">
          {cartItems.length > 0 ? (
            <>
              {cartItems.map((item, index) => {
                return (
                  <CartItem
                    key={item.slug}
                    quantity={item.quantity}
                    name={item.name}
                    price={item.price}
                    categories={item.categories}
                    images={item.images}
                    slug={item.slug}
                  />
                );
              })}
              <h2 className="text-2xl font-bold text-center">SubTotal: Rp.{cartItems.reduce((acc, item) => {return acc + item.quantity * item.price}, 0)}</h2>
            </>
          ) : (
            <h2 className="text-2xl font-semibold">Tidak ada Belajaan 😒</h2>
          )}
        </div>
      </div>
    </div>
  );
}

export default Cart;
