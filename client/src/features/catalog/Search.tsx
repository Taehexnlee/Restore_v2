import { type ChangeEvent, useEffect, useMemo, useState } from "react";
import TextField from "@mui/material/TextField";
import { debounce } from "@mui/material/utils";
import { useAppDispatch, useAppSelector } from "../../app/store/store";
import { setSearchTerm } from "./catalogSlice";

const SEARCH_DELAY = 500;

export default function Search() {
  const { searchTerm } = useAppSelector((state) => state.catalog);
  const dispatch = useAppDispatch();
  const [term, setTerm] = useState(searchTerm);

  useEffect(() => {
    setTerm(searchTerm);
  }, [searchTerm]);

  const debouncedSearch = useMemo(
    () =>
      debounce((value: string) => {
        dispatch(setSearchTerm(value));
      }, SEARCH_DELAY),
    [dispatch]
  );

  useEffect(() => {
    return () => {
      debouncedSearch.clear();
    };
  }, [debouncedSearch]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setTerm(value);
    debouncedSearch(value);
  };

  return (
    <TextField
      label="Search products"
      type="search"
      variant="filled"
      fullWidth
      value={term}
      onChange={handleChange}
      InputProps={{ disableUnderline: true }}
    />
  );
}
