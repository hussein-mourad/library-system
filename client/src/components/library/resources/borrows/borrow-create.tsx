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
  useCreate,
} from "react-admin";
import { useParams } from "react-router-dom";

function BorrowCreate() {
  const { id: bookId } = useParams();

  return (
    <Box className="mt-5">
      <CreateBase resource="borrows">
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
          {/* <TextInput source="book" defaultValue={bookId} hidden={true} /> */}
          <ReferenceInput source="user">
            {/* <TextInput source="book" defaultValue={bookId} hidden={true} /> */}
          </ReferenceInput>
          <ReferenceInput
            source="book"
            reference="books"
            defaultValue={bookId}
            hidden={true}
          />
          <DateInput source="return_date" />
        </SimpleForm>
      </CreateBase>
    </Box>
  );
}
export default BorrowCreate;
