import { useEffect } from "react";
import { useDataProvider, useUpdate } from "react-admin";
import { useParams } from "react-router-dom";

function BorrowReturn() {
  const { id } = useParams();
  const dataProvider = useDataProvider();
  useEffect(() => {
    if (!id) return;
    dataProvider
      .update("borrows", { id, data: { returned: true } })
      .then(() => {
        console.log("Book returned");
      });
  }, [id]);

  return <div>Return book of id: {id}</div>;
}

export default BorrowReturn;
