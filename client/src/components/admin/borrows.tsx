import { useMediaQuery, Theme } from "@mui/material";
import {
  BooleanField,
  BooleanInput,
  Create,
  Datagrid,
  DateField,
  DateInput,
  Edit,
  EditButton,
  ImageField,
  ImageInput,
  Labeled,
  List,
  ReferenceArrayInput,
  ReferenceField,
  ReferenceInput,
  SelectField,
  SelectInput,
  Show,
  SimpleForm,
  SimpleList,
  SimpleShowLayout,
  TextField,
  TextInput,
  useRecordContext,
} from "react-admin";

const borrowsFilters = [<TextInput source="search" label="Search" alwaysOn />];

const BorrowTitle = () => {
  const record = useRecordContext();
  return <span>Borrow {record ? `"${record.id}"` : ""}</span>;
};

export const BorrowList = () => {
  const isSmall = useMediaQuery<Theme>((theme) => theme.breakpoints.down("sm"));
  return (
    <List filters={borrowsFilters}>
      {isSmall ? (
        <SimpleList
          primaryText={(record) => record.book}
          secondaryText={(record) => record.borrow_date}
          tertiaryText={(record) => record.return_date}
        />
      ) : (
        <Datagrid rowClick="show">
          <TextField source="id" />
          <ReferenceField source="user" reference="users" link="show" />
          <ReferenceField source="book" reference="books" link="show" />
          <DateField source="borrow_date" />
          <DateField source="return_date" />
          <BooleanField source="returned" />
          <EditButton />
        </Datagrid>
      )}
    </List>
  );
};

export const BorrowShow = () => (
  <Show title={<BorrowTitle />}>
    <SimpleShowLayout>
      <TextField source="id" />
      <ReferenceField source="user" reference="users" link="show" />
      <ReferenceField source="book" reference="books" link="show" />
      <DateField source="borrow_date" />
      <DateField source="return_date" />
      <BooleanField source="returned" />
    </SimpleShowLayout>
  </Show>
);

export const BorrowEdit = () => (
  <Edit title={<BorrowTitle />}>
    <SimpleForm>
      <TextInput
        className="sm:w-96"
        source="id"
        InputProps={{ disabled: true }}
      />
      <ReferenceInput className="sm:w-96" source="book" reference="books">
        <SelectInput className="sm:w-96" source="book" />
      </ReferenceInput>
      <ReferenceInput className="sm:w-96" source="user" reference="users">
        <SelectInput className="sm:w-96" source="user" />
      </ReferenceInput>
      <DateInput className="sm:w-96" source="borrow_date" />
      <DateInput className="sm:w-96" source="return_date" />
      <BooleanInput className="sm:w-96" source="returned" />
    </SimpleForm>
  </Edit>
);

export const BorrowCreate = () => (
  <Create>
    <SimpleForm>
      <ReferenceInput className="sm:w-96" source="book" reference="books">
        <SelectInput className="sm:w-96" source="book" />
      </ReferenceInput>
      <ReferenceInput className="sm:w-96" source="user" reference="users">
        <SelectInput className="sm:w-96" source="user" />
      </ReferenceInput>
      <DateInput className="sm:w-96" source="borrow_date" />
      <DateInput className="sm:w-96" source="return_date" />
    </SimpleForm>
  </Create>
);
