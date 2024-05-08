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
  NumberField,
  NumberInput,
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

const profilesFilters = [
  <TextInput source="search" label="Search" alwaysOn />,
  // <ReferenceInput source="author" label="Author" reference="authors" />,
  // <ReferenceInput source="category" label="Category" reference="categories" />,
];

const ProfileTitle = () => {
  const record = useRecordContext();
  return <span>Profile {record ? `"${record.username}"` : ""}</span>;
};

export const ProfileList = () => {
  const isSmall = useMediaQuery<Theme>((theme) => theme.breakpoints.down("sm"));
  return (
    <List filters={profilesFilters}>
      {isSmall ? (
        <SimpleList
          primaryText={(record) => record.username}
          secondaryText={(record) => record.phone_number}
          tertiaryText={(record) => record.address}
        />
      ) : (
        <Datagrid rowClick="show">
          <TextField source="id" />
          <TextField source="username" />
          <DateField source="bio" />
          <DateField source="address" />
          <DateField source="phone_number" />
          <TextField source="avatar" />
          <NumberField source="user" />
        </Datagrid>
      )}
    </List>
  );
};



export const ProfileShow = () => (
  <Show title={<ProfileTitle />}>
    <SimpleShowLayout>
      <TextField source="id" />
      <TextField source="username" />
      <DateField source="bio" />
      <DateField source="address" />
      <DateField source="phone_number" />
      <TextField source="avatar" />
      <NumberField source="user" />
    </SimpleShowLayout>
  </Show>
);

export const ProfileEdit = () => (
  <Edit title={<ProfileTitle />}>
    <SimpleForm>
      <TextInput source="id" />
      <TextInput source="username" />
      <DateInput source="bio" />
      <DateInput source="address" />
      <DateInput source="phone_number" />
      <TextInput source="avatar" />
      <NumberInput source="user" />
    </SimpleForm>
  </Edit>
);

export const ProfileCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="id" />
      <TextInput source="username" />
      <DateInput source="bio" />
      <DateInput source="address" />
      <DateInput source="phone_number" />
      <TextInput source="avatar" />
      <NumberInput source="user" />
    </SimpleForm>

  </Create>
);
