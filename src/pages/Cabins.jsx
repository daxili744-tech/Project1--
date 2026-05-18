import Heading from "../ui/Heading";
import CabinTable from "../features/cabins/CabinTable";
import Row from "../ui/Row";
import AddCabin from "../features/cabins/AddCabin";
import CabinTableOperations from "../features/cabins/CabinTableOperations";


import SortBy from "../ui/SortBy";



function Cabins() {

  return (
    <>
    <Row type="horizontal">
      <Heading as="h1">All cabins</Heading>
      <CabinTableOperations />
    </Row>
    <Row type="vertical">
     <CabinTable />
     <AddCabin />
    </Row>
    </>
  );
}

export default Cabins;
