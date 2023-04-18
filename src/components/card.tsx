import Image from "next/image";
import React from "react";
import Button from "./button";
import { I_ProductDetail, I_Products } from "@/types/type";

function formatRupiah(angka: string, prefix?: string) {
  var number_string = angka.replace(/[^,\d]/g, "").toString(),
    split = number_string.split(","),
    sisa = split[0].length % 3,
    rupiah = split[0].substr(0, sisa),
    ribuan = split[0].substr(sisa).match(/\d{3}/gi);

  // tambahkan titik jika yang di input sudah menjadi angka ribuan
  if (ribuan) {
    let separator = sisa ? "." : "";
    rupiah += separator + ribuan.join(".");
  }

  rupiah = split[1] != undefined ? rupiah + "," + split[1] : rupiah;
  return prefix == undefined ? rupiah : rupiah ? "Rp. " + rupiah : ",00";
}

function Card() {
  return <div>Cards</div>;
}

function Products({ categories, name, price, images }: I_Products) {
  return (
    <div className="flex flex-col items-center mt-6 capitalize">
      <Image
        src={images}
        alt={"produk"}
        width={256}
        height={256}
        className="duration-200  bg-tertiary rounded-3xl hover:shadow-lg hover:transition-all hover:-translate-y-1"
      />
      <h1 className="font-semibold text-secondary">{categories}</h1>
      <h1 className="text-lg font-bold">{name}</h1>
      <p className="text-lg">{formatRupiah(price.toString(), "Rp. ")}</p>
    </div>
  );
}
function ProductsDetails({
  addCartHandler,
  buyProductHandler,
  valueCart,
  setTotalCart,
  ...props
}: I_ProductDetail) {
  return (
    <div className="flex gap-x-10">
      <Image
        src={props.images}
        alt={"produk"}
        width={415}
        height={415}
        className=" bg-tertiary rounded-3xl"
      />
      <div className="flex flex-col w-full my-auto text-left capitalize gap-y-3">
        <h1 className="text-5xl font-bold">{props.name}</h1>
        <div>
          <h2 className="font-semibold text-secondary">Categories:</h2>
          <p>{props.categories}</p>
        </div>
        <div>
          <h2 className="font-semibold text-secondary">Harga:</h2>
          <p className="text-4xl font-bold">
            {formatRupiah(props.price.toString(), "Rp. ")}
          </p>
        </div>
        <div className="flex mt-3 space-x-3">
          <h2 className="font-semibold text-secondary">Stok:</h2>
          <p className="font-bold">120</p>
        </div>
        <Button.Jumlah value={valueCart} setTotalCart={setTotalCart} />
        <div className="flex gap-x-5">
          <Button text="Add To Cart" onClick={addCartHandler} />
          <Button text="Buy Now" primary={true} onClick={buyProductHandler} />
        </div>
      </div>
    </div>
  );
}

Card.Products = Products;
Card.ProductsDetails = ProductsDetails;

export default Card;
