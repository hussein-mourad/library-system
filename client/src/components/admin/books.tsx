import { useMediaQuery, Theme } from "@mui/material";
import {
  Create,
  Datagrid,
  DateField,
  DateInput,
  Edit,
  EditButton,
  Labeled,
  List,
  ReferenceField,
  ReferenceInput,
  SelectField,
  Show,
  SimpleForm,
  SimpleList,
  SimpleShowLayout,
  TextField,
  TextInput,
  UrlField,
  useRecordContext,
} from "react-admin";

const booksFilters = [
  <TextInput source="search" label="Search" alwaysOn />,
  <ReferenceInput source="author" label="Author" reference="authors" />,
  <ReferenceInput source="category" label="Category" reference="categories" />,
];

const BookTitle = () => {
  const record = useRecordContext();
  return <span>Book {record ? `"${record.title}"` : ""}</span>;
};

export const BookList = () => {
  const isSmall = useMediaQuery<Theme>((theme) => theme.breakpoints.down("sm"));
  return (
    <List filters={booksFilters}>
      {isSmall ? (
        <SimpleList
          primaryText={(record) => record.title}
          secondaryText={(record) => record.isbn}
          tertiaryText={(record) => record.status}
        />
      ) : (
        <Datagrid rowClick="show">
          <TextField source="id" />
          <ReferenceField source="author" reference="authors" link="show" />
          <TextField source="title" />
          <ReferenceField
            source="category"
            reference="categories"
            link="show"
          />
          <TextField source="isbn" />
          <DateField source="publication_date" />
          <TextField source="status" />
          <EditButton />
        </Datagrid>
      )}
    </List>
  );
};

export const BookShow = () => (
  <Show title={<BookTitle />}>
    <SimpleShowLayout>
      <TextField source="id" />
      <ReferenceField source="author" reference="authors" link="show" />
      <ReferenceField source="category" reference="categories" link="show" />
      <TextField source="title" />
      <TextField source="description" />
      <TextField source="isbn" />
      <TextField source="cover_image" />
      <DateField source="publication_date" />
      <TextField source="status" />
    </SimpleShowLayout>
  </Show>
);

export const BookEdit = () => (
  <Edit title={<BookTitle />}>
    <SimpleForm>
      <TextInput source="id" InputProps={{ disabled: true }} />
      <TextInput source="title" />
      <TextInput source="description" multiline rows={5} />
      <TextInput source="isbn" />
      <TextInput source="cover_image" />
      {/* <SelectField source="author" reference="authors" /> */}
      <DateInput source="publication_date" />
      {/* <TextInput source="status" /> */}
      <SelectField source="status" choices={["available", "borrowed"]} />
      <Labeled label="Author">
        <ReferenceField source="author" reference="authors" link="edit" />
      </Labeled>
      <Labeled label="Category">
        <ReferenceField source="category" reference="categories" link="edit" />
      </Labeled>
    </SimpleForm>
  </Edit>
);

export const BookCreate = () => (
  <Create>
    <SimpleForm>
      {/* <TextInput source="id" InputProps={{ disabled: true }} /> */}
      <TextInput source="author" />
      <TextInput source="category" />
      <TextInput source="title" />
      <TextInput source="description" multiline rows={5} />
      <TextInput source="isbn" />
      <TextInput source="cover_image" />
      {/* <DateInput source="publication_date" /> */}
      {/* <TextInput source="status" /> */}
    </SimpleForm>
  </Create>
);
