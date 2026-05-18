import styled from "styled-components";
import { formatCurrency } from "../../utils/helpers";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCabin } from "../../services/apiCabins";
import { toast } from "react-hot-toast";
import CreateCabinForm from "./CreateCabinForm";
import { useState } from "react";
import { useCreateCabin } from "./useCreateCabin";
import { HiSquare2Stack, HiPencil, HiTrash } from "react-icons/hi2";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Modal from "../../ui/Modal";
import Table from "../../ui/Table";
import Menu from "../../ui/Menus";

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

const Capacity = styled.div`
  font-family: "Sono";
  font-weight: 500;
`;

function CabinRow({ cabin }) {
  const [showForm, setShowForm] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const { id: cabinId, name, maxCapacity, regularPrice, discount, image } = cabin;
  const queryClient = useQueryClient();
  const {isCreating, createCabin} = useCreateCabin();
  function handleDuplicate() {
    createCabin({name:`Copy of ${name}`,maxCapacity, regularPrice, discount, image});
  }
  const { isLoading: isDeleting, mutate } = useMutation({
    mutationFn: deleteCabin,
    onSuccess: () => {
      toast.success("Cabin deleted successfully");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: () => {
      toast.error("Cabin deletion failed");
    },
  });

  return (
    <>
    <Table.Row>
      {image ? <Img src={image} alt={name} style={{ width:"3.6rem" }} /> : <div style={{ width:"3.6rem" }} />}
      <Cabin>{name}</Cabin>
      <Capacity>{maxCapacity}</Capacity>
      <Price>{formatCurrency(regularPrice)}</Price>
      {discount ? <Discount>{formatCurrency(discount)}</Discount> : "--"}
      <Menu>
        <Menu.Toggle />
        <Menu.List>
          <Menu.Button icon={<HiSquare2Stack />} onClick={handleDuplicate} disabled={isCreating}>
            Duplicate
          </Menu.Button>
          <Menu.Button icon={<HiPencil />} onClick={() => setShowForm(true)}>
            Edit
          </Menu.Button>
          <Menu.Button icon={<HiTrash />} onClick={() => setShowConfirm(true)} disabled={isDeleting}>
            Delete
          </Menu.Button>
        </Menu.List>
      </Menu>
    </Table.Row>
    {showForm && 
    ( <Modal onClose={() => setShowForm(false)}>
    <CreateCabinForm cabinToEdit={cabin} onClose={() => setShowForm(false)} />
      </Modal>)}
    {showConfirm && (
      <Modal onClose={() => setShowConfirm(false)}>
        <ConfirmDelete
          resourceName={name}
          onConfirm={() => {
            mutate(cabinId);
            setShowConfirm(false);
          }}
          disabled={isDeleting}
          onClose={() => setShowConfirm(false)}
        />
      </Modal>
    )}
    </>
  );
}
export default CabinRow;