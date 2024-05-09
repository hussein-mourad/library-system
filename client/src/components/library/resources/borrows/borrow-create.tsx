import { Box, Typography } from "@mui/material";
import {
  Button,
  CreateBase,
  CreateButton,
  DateInput,
  ImageField,
  ReferenceInput,
  SaveButton,
  Show,
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
  const { data: user, isLoading, error } = useGetIdentity();

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
              <SaveButton label="Borrow" icon={false} />
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
