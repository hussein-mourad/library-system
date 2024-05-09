import { useEffect } from "react";
import { useParams } from "react-router-dom";

function BorrowReturn() {
  const { id } = useParams();
  const [update, { data, isLoading, error }] = useUpdate(
    "borrows",
    { id, data, previousData },
    options,
  );

  return <div>Return book of id: {id}</div>;
}

export default BorrowReturn;
