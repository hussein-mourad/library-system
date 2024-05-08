import { Card, CardContent, CardHeader, Typography } from "@mui/material";
import { Button, Link, useGetList } from "react-admin";

const StatCard = ({ resource }) => {
  const { data } = useGetList(resource);
  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  return (
    <Link to={`/admin/${resource}`}>
      <Card>
        <CardContent>
          <Typography variant="h5">
            {capitalizeFirstLetter(resource)}
          </Typography>
          <Typography variant="h4">{data ? data.length : "0"}</Typography>
        </CardContent>
      </Card>
    </Link>
  );
};

export const Dashboard = () => {
  const resources = [
    "users",
    "books",
    "borrows",
    "comments",
    "categories",
    "authors",
  ];
  return (
    <div className="mt-4">
      <Card>
        <CardContent className="flex items-center justify-between">
          <Typography component="div" variant="h5">Welcome to the Admin dashboard</Typography>
          <Button component={Link} to={"/"} variant="contained">{"Go to app"}</Button>
        </CardContent>
      </Card>
      <div className="grid grid-cols-2 gap-4 mt-4">
        {resources.map((resource, index) => (
          <StatCard key={index} resource={resource} />
        ))}
      </div>
    </div >
  );
};
