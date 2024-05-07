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
          secondaryText={(record) => record.address}
          tertiaryText={(record) => record.phone_number}
        />
      ) : (
        <Datagrid rowClick="show">
          <TextField source="id" />
          <ImageField source="avatar" sortable={false}
            sx={{ '& img': { maxWidth: 35, maxHeight: 35, borderRadius: 9999, objectFit: 'contain' } }}
          />
          <TextField source="username" />
          <TextField source="bio" />
          <TextField source="phone_number" />
          <TextField source="address" />
        </Datagrid>
      )}
    </List>
  );
};

export const ProfileShow = () => (
  <Show title={<ProfileTitle />}>
    <SimpleShowLayout>
      <TextField source="id" />
      <ImageField source="avatar" />
      <TextField source="username" />
      <TextField source="bio" />
      <TextField source="phone_number" />
      <TextField source="address" />
    </SimpleShowLayout>
  </Show>
);

export const ProfileEdit = () => (
  <Edit title={<ProfileTitle />} mutationMode="pessimistic">
    <SimpleForm>
      <ImageField className="sm:w-96" source="avatar" />
      <ImageInput className="sm:w-96" source="avatar">
        <ImageField source="src" title="title" />
      </ImageInput>
      <TextInput
        className="sm:w-96"
        source="id"
        InputProps={{ disabled: true }}
      />
      <ReferenceInput className="sm:w-96" source="user" reference="users" />
      <TextInput className="sm:w-96" source="username" />
      <TextInput className="sm:w-96" source="bio" multiline rows={5} />
      <TextInput className="sm:w-96" source="address" />
      <NumberInput className="sm:w-96" source="phone_number" />
    </SimpleForm>
  </Edit>
);

export const ProfileCreate = () => (
  <Create>
    <SimpleForm>
      <ImageInput className="sm:w-96" source="avatar">
        <ImageField source="src" title="title" />
      </ImageInput>
      <TextInput className="sm:w-96" source="username" />
      <TextInput className="sm:w-96" source="bio" />
      <NumberInput className="sm:w-96" source="phone_number" />
      <TextInput className="sm:w-96" source="address" />
    </SimpleForm>
  </Create>
);
