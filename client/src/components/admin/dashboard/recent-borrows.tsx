import {
  Card,
  CardContent,
  Theme,
  Typography,
  useMediaQuery,
} from "@mui/material";
import {
  BooleanField,
  Datagrid,
  DateField,
  EditButton,
  ListBase,
  ReferenceField,
  SimpleList,
  TextField,
  WithListContext,
} from "react-admin";

function RecentBorrows() {
  const isSmall = useMediaQuery<Theme>((theme: Theme) =>
    theme.breakpoints.down("sm"),
  );
  return (
    <Card>
      <CardContent>
        <Typography variant="h4" color="primary" gutterBottom>
          Recent Borrows
        </Typography>
        <ListBase
          resource="borrows"
          page={null}
          sort={{ field: "borrow_date", order: "DESC" }}
        >
          {isSmall ? (
            <WithListContext
              render={({ data }) => (
                <SimpleList
                  data={data}
                  primaryText={(data) => data.book}
                  secondaryText={(data) => data.borrow_date}
                  tertiaryText={(data) => data.return_date}
                />
              )}
            />
          ) : (
            <WithListContext
              render={({ data }) => (
                <Datagrid data={data} rowClick="show">
                  <TextField source="id" />
                  <ReferenceField
                    source="user"
                    reference="users"
                    link="show"
                    sortable={false}
                  />
                  <ReferenceField
                    source="book"
                    reference="books"
                    link="show"
                    sortable={false}
                  />
                  <DateField source="borrow_date" />
                  <DateField source="return_date" sortable={false} />
                  <BooleanField source="returned" sortable={false} />
                  <EditButton />
                </Datagrid>
              )}
            />
          )}
        </ListBase>
      </CardContent>
    </Card>
  );
}

export default RecentBorrows;
