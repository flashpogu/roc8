import { CiSearch } from "react-icons/ci";
import { BsCart2 } from "react-icons/bs";
import { GoChevronLeft } from "react-icons/go";
import { GoChevronRight } from "react-icons/go";
import Link from "next/link";

export default function Header() {
  return (
    <>
      <div className="flex flex-col">
        <div className="flex justify-end gap-5 px-10 pb-3 pt-2 text-sm">
          <a href="">Help</a>
          <a href="">Orders & Returns</a>
          <Link href="/sign-in">Hi, John</Link>
        </div>
        <div className="flex items-center justify-between px-10 pb-4 pt-2">
          <Link href="/" className="text-2xl font-bold">
            ECOMMERCE
          </Link>
          <div className="flex gap-5 text-sm font-semibold">
            <a href="#">Categories</a>
            <a href="#">Sales</a>
            <a href="#">Clearance</a>
            <a href="#">New stock</a>
            <a href="#">Trending</a>
          </div>
          <div className="flex gap-5">
            <CiSearch size={26} />
            <BsCart2 size={26} />
          </div>
        </div>
        <div className="flex items-center justify-center gap-4 bg-[#F4F4F4] py-2">
          <GoChevronLeft size={21} />
          <p className="text-sm font-medium">Get 10% off on business sign up</p>
          <GoChevronRight size={21} />
        </div>
      </div>
    </>
  );
}
