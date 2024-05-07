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

const authorsFilters = [
  <TextInput source="search" label="Search" alwaysOn />,
];

const AuthorTitle = () => {
  const record = useRecordContext();
  return <span>Author {record ? `"${record.title}"` : ""}</span>;
};

export const AuthorList = () => {
  const isSmall = useMediaQuery<Theme>((theme) => theme.breakpoints.down("sm"));
  return (
    <List filters={authorsFilters}>
      {isSmall ? (
        <SimpleList
          primaryText={(record) => record.name}
          secondaryText={(record) => record.bio}
          tertiaryText={(record) => record.id}
        />
      ) : (
        <Datagrid rowClick="show">
          <TextField source="id" />
          <TextField source="name" />
          <TextField source="bio" />
        </Datagrid>
      )}
    </List>
  );
};


export const AuthorShow = () => (
  <Show title={<AuthorTitle />}>
    <SimpleShowLayout>
      <TextField source="id" />
      <TextField source="name" />
      <TextField source="bio" />
    </SimpleShowLayout>
  </Show>
);


export const AuthorEdit = () => (
  <Edit title={<AuthorTitle />}>
    <SimpleForm>
      <TextInput source="id" InputProps={{ disabled: True }} />
      <TextInput source="name" />
      <TextInput source="bio" />
    </SimpleForm>
  </Edit>
);

export const AuthorCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="name" />
      <TextInput source="bio" />
    </SimpleForm>
  </Create>
);
