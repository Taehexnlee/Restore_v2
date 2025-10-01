import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import EmptyState from "../../app/components/EmptyState";
import LoadingState from "../../app/components/LoadingState";
import AppPagination from "../../app/shared/components/AppPagination";
import Filters from "./Filters";
import ProductList from "./ProductList";
import { useFetchFiltersQuery, useFetchProductQuery } from "./catalogApi";
import { useAppDispatch, useAppSelector } from "../../app/store/store";
import { setPageNumber } from "./catalogSlice";

export default function Catalog() {
  const dispatch = useAppDispatch();
  const productParams = useAppSelector((state) => state.catalog);
  const { data, isLoading, isFetching } = useFetchProductQuery(productParams);
  const {
    data: filtersData,
    isLoading: filtersLoading,
  } = useFetchFiltersQuery();

  if (isLoading || filtersLoading || !filtersData) {
    return <LoadingState label="Discovering products" />;
  }

  const products = data?.items ?? [];
  const pagination = data?.pagination ?? null;

  const handlePageChange = (page: number) => {
    dispatch(setPageNumber(page));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Box component="section" sx={{ py: { xs: 4, md: 6 }, backgroundColor: "background.default" }}>
      <Stack spacing={4} sx={{ width: "100%", px: { xs: 2, sm: 4, lg: 6, xl: 10 } }}>
        <Paper
          variant="outlined"
          sx={{
            px: { xs: 3, md: 6 },
            py: { xs: 4, md: 6 },
            borderRadius: 4,
            background:
              "linear-gradient(135deg, rgba(79,70,229,0.12) 0%, rgba(37,99,235,0.12) 45%, rgba(14,116,144,0.1) 100%)",
          }}
        >
          <Stack spacing={2} maxWidth={{ xs: "100%", md: 640, xl: 720 }}>
            <Typography variant="overline" color="primary" sx={{ letterSpacing: 2, fontWeight: 600 }}>
              Curated Catalog
            </Typography>
            <Typography variant="h3" sx={{ fontWeight: 700 }}>
              Find the gear that matches your next adventure
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Filter by brand, category, or price to discover the products that best fit your style. New arrivals drop
              every week—stay tuned and refine your search anytime.
            </Typography>
          </Stack>
        </Paper>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "minmax(0, 1fr)",
              md: "minmax(280px, 22%) minmax(0, 1fr)",
              xl: "minmax(320px, 20%) minmax(0, 1fr)",
            },
            gap: { xs: 3, lg: 4, xl: 6 },
            alignItems: "start",
          }}
        >
          <Box
            sx={{
              position: { md: "sticky" },
              top: { md: 96 },
              maxHeight: { md: "calc(100vh - 120px)" },
              overflowY: { md: "auto" },
              pr: { md: 1 },
            }}
          >
            <Filters filtersData={filtersData} />
          </Box>
          <Box>
            {products.length > 0 ? (
              <Stack spacing={3}>
                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  justifyContent="space-between"
                  alignItems={{ xs: "flex-start", sm: "center" }}
                  spacing={1.5}
                >
                  <Typography variant="h5" sx={{ fontWeight: 600 }}>
                    Showing {products.length} of {pagination?.totalCount ?? products.length} products
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Page {pagination?.currentPage ?? 1} of {pagination?.totalPages ?? 1}
                  </Typography>
                </Stack>
                <ProductList products={products} isLoading={isFetching} />
                {pagination ? <AppPagination metadata={pagination} onPageChange={handlePageChange} /> : null}
              </Stack>
            ) : (
              <Stack spacing={3} alignItems="center" textAlign="center">
                <EmptyState
                  title="No products match your filters"
                  description="Try adjusting your filters or search for something else."
                />
                {pagination && (
                  <Typography variant="caption" color="text.secondary">
                    Showing 0 of {pagination.totalCount} products
                  </Typography>
                )}
              </Stack>
            )}
          </Box>
        </Box>
      </Stack>
    </Box>
  );
}
