import { Box, Button, Card, CardContent, Divider, Typography } from "@mui/material";
import { alpha } from "@mui/material/styles";
import CheckboxButtons from "../../app/shared/components/CheckboxButtons";
import RadioButtonGroup from "../../app/shared/components/RadioButtonGroup";
import { useAppDispatch, useAppSelector } from "../../app/store/store";
import Search from "./Search";
import { resetParams, setBrands, setOrderBy, setTypes } from "./catalogSlice";

type Props = {
  filtersData: {
    brands: string[];
    types: string[];
  };
};

const sortOptions = [
  { value: "name", label: "Alphabetical" },
  { value: "priceDesc", label: "Price: High to Low" },
  { value: "price", label: "Price: Low to High" },
];

export default function Filters({ filtersData }: Props) {
  const dispatch = useAppDispatch();
  const { orderBy, brands, types, searchTerm } = useAppSelector((state) => state.catalog);
  const hasActiveFilters =
    orderBy !== "name" || brands.length > 0 || types.length > 0 || searchTerm.trim().length > 0;

  return (
    <Box display="flex" flexDirection="column" gap={3}>
      <Card
        variant="outlined"
        sx={(theme) => ({
          borderRadius: 3,
          borderColor: alpha(theme.palette.primary.main, 0.25),
          backgroundColor: alpha(theme.palette.background.paper, 0.65),
          backdropFilter: "blur(18px)",
          boxShadow: "0 18px 48px rgba(15, 23, 42, 0.25)",
        })}
      >
        <CardContent sx={{ display: "flex", flexDirection: "column", gap: 3, p: { xs: 3, md: 4 } }}>
          <Box>
            <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1.5 }}>
              Search
            </Typography>
            <Search />
          </Box>

          <Divider sx={{ borderColor: "rgba(255,255,255,0.08)" }} />

          <Box>
            <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1.5 }}>
              Sort by
            </Typography>
            <RadioButtonGroup
              options={sortOptions}
              selectedValue={orderBy}
              onChange={(event) => dispatch(setOrderBy(event.target.value))}
            />
          </Box>

          <Divider sx={{ borderColor: "rgba(255,255,255,0.08)" }} />

          <Box>
            <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1.5 }}>
              Brands
            </Typography>
            <CheckboxButtons
              items={filtersData.brands}
              checked={brands}
              onChange={(items) => dispatch(setBrands(items))}
            />
          </Box>

          <Divider sx={{ borderColor: "rgba(255,255,255,0.08)" }} />

          <Box>
            <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1.5 }}>
              Types
            </Typography>
            <CheckboxButtons
              items={filtersData.types}
              checked={types}
              onChange={(items) => dispatch(setTypes(items))}
            />
          </Box>
        </CardContent>
      </Card>

      <Button
        variant="outlined"
        color="secondary"
        onClick={() => dispatch(resetParams())}
        disabled={!hasActiveFilters}
        sx={{
          alignSelf: "stretch",
          fontWeight: 600,
          borderRadius: 999,
          py: 1.2,
        }}
      >
        Reset filters
      </Button>
    </Box>
  );
}