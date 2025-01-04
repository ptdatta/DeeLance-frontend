import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Button from "./Button";

function Pagination({ totalPages, currentPage, onPageChange }: any) {
  // Genera un array di numeri di pagina da mostrare nella paginazione
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <div className="flex items-center space-x-1">
      <Button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="h-8 w-8"
      >
        <FaChevronLeft />
      </Button>
      {pages.map((page) => (
        <Button
          key={page}
          onClick={() => onPageChange(page)}
          className={`h-8 w-8 ${currentPage === page ? "bg-green-haze-600" : ""}`}
        >
          {page}
        </Button>
      ))}
      <Button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="h-8 w-8"
      >
        <FaChevronRight />
      </Button>
    </div>
  );
}

export default Pagination;
