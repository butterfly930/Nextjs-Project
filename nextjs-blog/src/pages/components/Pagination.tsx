interface Props {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
}: Props) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <div className="flex justify-center gap-12 mt-40">
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-3 py-1 border rounded ${page === currentPage ? "bg-blue-500 text-white" : ""}`}
        >
          {page}
        </button>
      ))}
    </div>
  );
}
