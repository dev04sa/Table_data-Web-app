"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Home() {
  return (
    <main>
      <div className="flex justify-center items-center">
        <Image src="/vector.jpg" alt="vector image" width={500} height={500} />
      </div>
      <h1 className=" text-center font-bold mt-5 text-3xl md:text-4xl text-blue-700 ">
        Code ... Eat ... Repeat... 💯
      </h1>
      <div className="flex flex-row justify-center gap-5 mt-5">
        <Link href={"/home"}>
          <button className="bg-cyan-400 hover:bg-yellow-500 text-black font-bold py-2 px-4 rounded">
            See Table
          </button>
        </Link>
        <Link href={"/add"}>
          <button className="bg-green-500 hover:bg-yellow-500 text-black font-bold py-2 px-4 rounded">
            Add Data
          </button>
        </Link>
      </div>
    </main>
  );
}
