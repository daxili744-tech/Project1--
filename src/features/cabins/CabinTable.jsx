import Spinner from "../../ui/Spinner";
import { useSearchParams } from "react-router-dom";
import CabinRow from "./CabinRow";
import { useCabins } from "./useCabins";
import Table from "../../ui/Table";
import SortBy from "../../ui/SortBy";



function CabinTable() {
  const { isLoading, cabins } = useCabins();
  const [searchParams] = useSearchParams();
  if (isLoading) {
    return <Spinner />;
  }
  const filterValue = searchParams.get("discount") || "all";
  let filteredCabins = cabins;
  if (filterValue === "all") {
    filteredCabins = cabins;
  }
  if(filterValue === "no-discount") {
    filteredCabins = cabins.filter((cabin) => cabin.discount === 0);
  }
  if(filterValue === "with-discount") {
    filteredCabins = cabins.filter((cabin) => cabin.discount > 0);
  }
  const sortBy = searchParams.get("sortBy") || "name-asc";
  const [field, direction] = sortBy.split("-");
  const modifier = direction === "asc" ? 1 : -1;
  const sortedCabins = [...filteredCabins].sort((a, b) => {
    if (a[field] < b[field]) return -1 * modifier;
    if (a[field] > b[field]) return 1 * modifier;
    return 0;
  });
  if(!sortedCabins.length) {
    return <Empty resourceName="cabins" />;
  }
  return (
    <Table columns="0.6fr 1.8fr 1.2fr 1fr 1fr 1fr">
      <Table.Header>
        <div></div>
        <p>Cabin</p>
        <p>Capacity</p>
        <p>Price</p>
        <p>Discount</p>
        <p></p>
      </Table.Header>
      <Table.Body
        data={sortedCabins}
        render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
      />
    </Table>
  );
}
export default CabinTable;
