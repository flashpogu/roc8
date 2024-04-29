"use client";

import { useState } from "react";
import { api } from "~/trpc/react";
import PaginationComp from "../_components/PaginationComp";
import { useAuthStore } from "~/store";

export default function page() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [pageNum, setPageNum] = useState<number>(1);
  const { data: products } = api.get.getAllProducts.useQuery({
    page: pageNum,
  });

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const userIdFromGlobalState = useAuthStore((state) => state.userID);
  console.log(userIdFromGlobalState);

  const { data } = api.get.addProductToSelected.useQuery({
    userId: 1,
    productId: 4,
  });

  console.log(data);
  return (
    <div className="flex items-center justify-center py-6">
      <div className="flex w-[42vw] flex-col gap-5 rounded-xl border border-gray-300 px-8 pb-28 pt-10">
        <h2 className="py-4 text-center text-3xl font-semibold">
          Please mark your interests!
        </h2>
        <p className="text-center">We will keep you notified.</p>
        <div className="ml-20 flex flex-col gap-6">
          <h3 className="text-lg font-semibold">My saved interests!</h3>
          <div className="mb-12 mt-6">
            {products?.map((q) => (
              <div key={q.id}>
                <label className="flex gap-5 py-2 text-lg">
                  <input type="checkbox" name={q.product} />
                  {q.product}
                </label>
              </div>
            ))}
          </div>
          <PaginationComp
            page={pageNum}
            pages={17}
            onPageChange={(pageNum) => setPageNum(pageNum)}
          />
        </div>
      </div>
    </div>
  );
}
