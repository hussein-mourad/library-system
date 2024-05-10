import { ArrowBack } from "@mui/icons-material";
import { Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useUpdate } from "react-admin";
import { useParams } from "react-router-dom";

function BorrowReturn() {
  const { id } = useParams();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const [update] = useUpdate(
    "borrows",
    { id, data: { returned: true } },
    {
      onSuccess: () => setSuccess(true),
      onError: () => setError(true),
    },
  );

  useEffect(() => {
    if (!id) return;
    update();
  }, [id]);

  if (error) {
    return <p>ERROR</p>;
  }
  if (!success) return null;

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
