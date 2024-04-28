export type Props = {
  page: number;
  pages: number;
  onPageChange: (page: number) => void;
};

export default function PaginationComp({ page, pages, onPageChange }: Props) {
  const pageNumber = [];
  for (let i = 1; i <= pages; i++) {
    pageNumber.push(i);
  }
  return (
    <div className="flex justify-center">
      <ul className="flex">
        {pageNumber.map((number) => (
          <li
            key={number}
            className={`px-2 py-1 font-semibold ${page === number ? "text-black" : "text-gray-400"}`}
          >
            <button onClick={() => onPageChange(number)}>{number}</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
