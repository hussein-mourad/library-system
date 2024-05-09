import { useMediaQuery, Theme } from "@mui/material";
import {
  Create,
  Datagrid,
  DateField,
  DateInput,
  Edit,
  EditButton,
  ImageField,
  ImageInput,
  List,
  ReferenceField,
  ReferenceInput,
  ReferenceManyField,
  SelectInput,
  Show,
  SimpleForm,
  SimpleList,
  TabbedShowLayout,
  TextField,
  TextInput,
  useRecordContext,
} from "react-admin";

const booksFilters = [
  <TextInput source="search" label="Search" alwaysOn />,
  <SelectInput
    source="status"
    choices={[
      { id: "available", name: "Available" },
      { id: "borrowed", name: "Borrowed" },
    ]}
  />,
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
          <ImageField
            source="cover"
            sx={{
              "& img": { maxWidth: 50, maxHeight: 50, objectFit: "contain" },
            }}
          />
          <TextField source="title" />
          <ReferenceField source="author" reference="authors" link="show" />
          <ReferenceField
            source="category"
            reference="categories"
            link="show"
          />
          <TextField source="isbn" />
          <TextField source="year" />
          <TextField source="status" />
          <EditButton />
        </Datagrid>
      )}
    </List>
  );
};

export const BookShow = () => (
  <Show title={<BookTitle />}>
    <TabbedShowLayout>
      <TabbedShowLayout.Tab label="data">
        <TextField source="id" />
        <ImageField source="cover" />
        <TextField source="title" />
        <ReferenceField source="author" reference="authors" link="show" />
        <TextField source="description" />
        <ReferenceField source="category" reference="categories" link="show" />
        <TextField source="isbn" />
        <TextField source="status" />
        <TextField source="year" />
      </TabbedShowLayout.Tab>
      <TabbedShowLayout.Tab label="comments" path="comments">
        <ReferenceManyField reference="comments" target="book" label={false}>
          <Datagrid>
            <TextField source="content" />
            <DateField source="created_at" />
            <EditButton />
          </Datagrid>
        </ReferenceManyField>
      </TabbedShowLayout.Tab>
    </TabbedShowLayout>
  </Show>
);

export const BookEdit = () => {
  return (
    <Edit title={<BookTitle />} mutationMode="pessimistic">
      <SimpleForm>
        <TextInput
          className="sm:w-96"
          source="id"
          InputProps={{ disabled: true }}
        />
        <ImageField source="cover" />
        <ImageInput className="sm:w-96" source="cover" accept="image/*">
          <ImageField source="src" title="title" />
        </ImageInput>
        <TextInput className="sm:w-96" source="title" />
        <TextInput
          className="sm:w-96"
          source="description"
          multiline
          rows={5}
        />
        <TextInput className="sm:w-96" source="isbn" />
        <SelectInput
          className="sm:w-96"
          source="status"
          choices={[
            { id: "available", name: "Available" },
            { id: "borrowed", name: "Borrowed" },
          ]}
        />
        <TextInput className="sm:w-96" source="year" />
        <ReferenceInput className="sm:w-96" source="author" reference="authors">
          <SelectInput className="sm:w-96" source="author" />
        </ReferenceInput>
        <ReferenceInput
          className="sm:w-96"
          source="category"
          reference="categories"
        >
          <SelectInput className="sm:w-96" source="category" />
        </ReferenceInput>
      </SimpleForm>
    </Edit>
  );
};

export const BookCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput className="sm:w-96" source="title" />
      <TextInput className="sm:w-96" source="description" multiline rows={5} />
      <ReferenceField className="sm:w-96" source="author" reference="authors" />
      <ReferenceInput className="sm:w-96" source="author" reference="authors">
        <SelectInput className="sm:w-96" source="author" />
      </ReferenceInput>
      <ReferenceInput
        className="sm:w-96"
        source="category"
        reference="categories"
      >
        <SelectInput className="sm:w-96" source="category" />
      </ReferenceInput>
      <TextInput className="sm:w-96" source="isbn" />
      <TextInput className="sm:w-96" source="year" />
      <ImageInput className="sm:w-96" source="cover">
        <ImageField source="src" title="title" />
      </ImageInput>
    </SimpleForm>
  </Create>
);
