import ProductList from "./ProductList";
import { useFetchProductQuery } from "./catalogApi";


export default function Catalog() {
  const {data, isLoading} = useFetchProductQuery();

  if(isLoading || !data) return <div>Loading...</div>

  return (
    <>
      <ProductList products={data} />
    </>
  );
}