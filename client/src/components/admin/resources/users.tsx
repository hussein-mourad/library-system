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
  EmailField,
  ImageField,
  ImageInput,
  Labeled,
  List,
  PasswordInput,
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

const usersFilters = [<TextInput source="search" label="Search" alwaysOn />];

const UserTitle = () => {
  const record = useRecordContext();
  return <span>User {record ? `"${record.username}"` : ""}</span>;
};

export const UserList = () => {
  const isSmall = useMediaQuery<Theme>((theme) => theme.breakpoints.down("sm"));
  return (
    <List filters={usersFilters}>
      {isSmall ? (
        <SimpleList
          primaryText={(record) => record.username}
          secondaryText={(record) => record.email}
          tertiaryText={(record) => record.role}
        />
      ) : (
        <Datagrid rowClick="show">
          <TextField source="id" />
          <TextField source="first_name" />
          <TextField source="last_name" />
          <TextField source="username" />
          <EmailField source="email" />
          <TextField source="role" />
          <BooleanField source="is_active" />
          <DateField source="date_joined" />
        </Datagrid>
      )}
    </List>
  );
};

export const UserShow = () => (
  <Show title={<UserTitle />}>
    <SimpleShowLayout>
      <TextField source="id" />
      <TextField source="username" />
      <TextField source="role" />
      <TextField source="first_name" />
      <TextField source="last_name" />
      <EmailField source="email" />
      <BooleanField source="is_active" />
      <DateField source="date_joined" />
    </SimpleShowLayout>
  </Show>
);

export const UserEdit = (props) => {
  const transform = (data) => {
    // Filter out the unchanged email field
    // console.log("transform", data, props.record.email)
    console.log(data, props);
    if (data?.email && data.email === props.record?.email) {
      const { email, ...rest } = data;
      return rest;
    }
    delete data.email;
    console.log("transform", data);
    return data;
  };
  return (
    <Edit title={<UserTitle />} {...props} transform={transform}>
      <SimpleForm>
        <TextInput
          className="sm:w-96"
          source="id"
          InputProps={{ disabled: true }}
        />
        <TextInput className="sm:w-96" source="username" />
        <SelectInput
          className="sm:w-96"
          source="role"
          choices={[
            { id: "admin", name: "Admin" },
            { id: "librarian", name: "Librarian" },
            { id: "assistant", name: "Assistant" },
            { id: "member", name: "Member" },
          ]}
        />
        <TextInput className="sm:w-96" source="first_name" />
        <TextInput className="sm:w-96" source="last_name" />
        <TextInput className="sm:w-96" source="email" />
        <PasswordInput className="sm:w-96" source="password" />
        <BooleanInput className="sm:w-96" source="is_active" />
      </SimpleForm>
    </Edit>
  );
};

export const UserCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput className="sm:w-96" source="first_name" />
      <TextInput className="sm:w-96" source="last_name" />
      <TextInput className="sm:w-96" source="username" />
      <TextInput className="sm:w-96" source="email" />
      <PasswordInput className="sm:w-96" source="password" />
      <SelectInput
        className="sm:w-96"
        source="role"
        choices={[
          { id: "admin", name: "Admin" },
          { id: "librarian", name: "Librarian" },
          { id: "assistant", name: "Assistant" },
          { id: "member", name: "Member" },
        ]}
      />
    </SimpleForm>
  </Create>
);
