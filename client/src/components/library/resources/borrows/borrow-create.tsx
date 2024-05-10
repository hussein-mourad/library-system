import { Box, Typography } from "@mui/material";
import {
  CreateBase,
  DateInput,
  ImageField,
  SaveButton,
  ShowBase,
  SimpleForm,
  SimpleShowLayout,
  TextField,
  TextInput,
  Toolbar,
  useGetIdentity,
} from "react-admin";
import { useParams } from "react-router-dom";

function BorrowCreate() {
  const { id: bookId } = useParams();
  const { data: user } = useGetIdentity();

  return (
    <Box className="mt-5">
      <CreateBase resource="borrows" redirect="/">
        <ShowBase resource="books">
          <SimpleShowLayout>
            <Typography variant="h5">Borrow book</Typography>
            <TextField source="title" variant="h6" />
            <ImageField source="cover" />
          </SimpleShowLayout>
        </ShowBase>
        <SimpleForm
          toolbar={
            <Toolbar>
              <SaveButton label="Borrow" icon={<></>} />
            </Toolbar>
          }
        >
          <TextInput
            source="user"
            defaultValue={user?.id}
            style={{ display: "none" }}
          />

          <TextInput
            source="book"
            defaultValue={bookId}
            style={{ display: "none" }}
          />
          <DateInput source="return_date" />
        </SimpleForm>
      </CreateBase>
    </Box>
  );
}
export default BorrowCreate;
