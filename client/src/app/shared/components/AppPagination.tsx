import Box from "@mui/material/Box";
import Pagination from "@mui/material/Pagination";
import Typography from "@mui/material/Typography";
import type { Pagination as PaginationMeta } from "../../model/pagination";

type Props = {
  metadata: PaginationMeta;
  onPageChange: (page: number) => void;
};

export default function AppPagination({ metadata, onPageChange }: Props) {
  const { currentPage, totalPages, pageSize, totalCount } = metadata;
  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalCount);

  return (
    <Box display="flex" justifyContent="space-between" alignItems="center" mt={3} flexWrap="wrap" gap={2}>
      <Typography variant="body2" color="text.secondary">
        {totalCount > 0
          ? `Displaying ${startItem}-${endItem} of ${totalCount} items`
          : "No items to display"}
      </Typography>
      <Pagination
        color="secondary"
        size="large"
        page={currentPage}
        count={totalPages}
        onChange={(_, page) => onPageChange(page)}
      />
    </Box>
  );
}
