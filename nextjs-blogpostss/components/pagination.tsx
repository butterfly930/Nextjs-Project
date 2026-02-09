import Link from "next/link";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath: string;
}

export function Pagination({
  currentPage,
  totalPages,
  basePath,
}: PaginationProps) {
  
  return (
    <div className="flex justify-center gap-4 mt-10">
      {currentPage > 1 && (
        <Link
          href={`${basePath}?page=${currentPage - 1}`}
          className="px-4 py-2 bg-green-800 text-white rounded shadow"
        >
          Previous
        </Link>
      )}

      <span className=" font-bold self-center">
        Page {currentPage} / {totalPages}
      </span>

      {currentPage < totalPages && (
        <Link
          href={`${basePath}?page=${currentPage + 1}`}
          className="px-4 py-2 bg-green-800 text-white rounded shadow"
        >
          Next
        </Link>
      )}
    </div>
  );
}
