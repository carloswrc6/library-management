import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const CustomPagination = () => {
  return (
    <Pagination id="pagination" className="flex flex-row justify-end gap-3">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            className="pagination-btn_light"
          />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink
            href="#"
            className="pagination-btn_light"
          >
            1
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink
            href="#"
            isActive
            className="pagination-btn_dark"
          >
            2
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink
            href="#"
            className="pagination-btn_light"
          >
            3
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext
            href="#"
            className="pagination-btn_light"
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default CustomPagination;
