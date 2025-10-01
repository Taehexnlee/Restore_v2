import { Box, Button, Paper, Typography } from "@mui/material";
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
      <Paper variant="outlined" sx={{ p: 3, borderRadius: 3 }}>
        <Search />
      </Paper>

      <Paper variant="outlined" sx={{ p: 3, borderRadius: 3 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1.5 }}>
          Sort by
        </Typography>
        <RadioButtonGroup
          options={sortOptions}
          selectedValue={orderBy}
          onChange={(event) => dispatch(setOrderBy(event.target.value))}
        />
      </Paper>

      <Paper variant="outlined" sx={{ p: 3, borderRadius: 3 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1.5 }}>
          Brands
        </Typography>
        <CheckboxButtons
          items={filtersData.brands}
          checked={brands}
          onChange={(items) => dispatch(setBrands(items))}
        />
      </Paper>

      <Paper variant="outlined" sx={{ p: 3, borderRadius: 3 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1.5 }}>
          Types
        </Typography>
        <CheckboxButtons
          items={filtersData.types}
          checked={types}
          onChange={(items) => dispatch(setTypes(items))}
        />
      </Paper>

      <Button
        variant="text"
        color="secondary"
        onClick={() => dispatch(resetParams())}
        disabled={!hasActiveFilters}
        sx={{ alignSelf: "flex-start" }}
      >
        Reset filters
      </Button>
    </Box>
  );
}
