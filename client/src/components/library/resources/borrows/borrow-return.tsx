import { ArrowBack } from "@mui/icons-material";
import { Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDataProvider, useUpdate } from "react-admin";
import { useParams } from "react-router-dom";

function BorrowReturn() {
  const { id } = useParams();
  const dataProvider = useDataProvider();
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    if (!id) return;
    dataProvider
      .update("borrows", { id, data: { returned: true } })
      .then(() => {
        console.log("Book returned");
      });
  }, [id]);

  return (
    <div className="mt-5 space-y-5">
      <Typography variant="h5">Book returned successfully</Typography>
      <Button href="/books" startIcon={<ArrowBack />}>
        Back to library
      </Button>
    </div>
  );
}

export default BorrowReturn;
