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
  Labeled,
  List,
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

const categoriesFilters = [
  <TextInput source="search" label="Search" alwaysOn />,
  <ReferenceInput source="author" label="Author" reference="authors" />,
  <ReferenceInput source="category" label="Category" reference="categories" />,
];

const CategoryTitle = () => {
  const record = useRecordContext();
  return <span>Category {record ? `"${record.name}"` : ""}</span>;
};


export const CategoryList = () => {
  const isSmall = useMediaQuery<Theme>((theme) => theme.breakpoints.down("sm"));
  return (
    <List filters={categoriesFilters}>
      {isSmall ? (
        <SimpleList
          primaryText={(record) => record.name}
        />
      ) : (
        <Datagrid rowClick="show">
          <TextField source="id" />
          <TextField source="name" />
        </Datagrid>
      )}
    </List>
  );
};

export const CategoryShow = () => (
  <Show title={<CategoryTitle />}>
    <SimpleShowLayout>
      <TextField source="id" />
      <TextField source="name" />
    </SimpleShowLayout>
  </Show>
);

export const CategoryEdit = () => (
  <Edit title={<CategoryTitle />}>
    <SimpleForm>
      <TextInput source="id" InputProps={{ disabled: true }} />
      <TextInput source="name" />
    </SimpleForm>
  </Edit>
);

export const CategoryCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput className="sm:w-96" source="name" />
    </SimpleForm>
  </Create>
);
