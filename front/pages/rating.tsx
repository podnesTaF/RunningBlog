/** @format */

import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Tabs,
  Tab,
} from '@mui/material';

import MainLayout from '../layouts/MainLayout';
import FollowButton from '../components/FollowButton';
import {Api} from "../utils/api";
import {NextPage} from "next";
import {ResponseUser} from "../utils/api/types";

interface RatingPageProps {
  users: ResponseUser[];
}

const Rating: NextPage<RatingPageProps> = ({users}) => {
  return (
      <MainLayout>
        <Paper className="p;-20 pt-20 pr-20 mb-20" elevation={0}>
          <Typography
              variant="h5"
              style={{ fontWeight: 'bold', fontSize: 30, marginBottom: 6 }}
          >
            Rating of communities and blogs
          </Typography>
          <Typography style={{ fontSize: 15 }}>
            Ten best authors, commentators and administrators of the first ten
            communities from rating by month results will get a Plus-account per
            free for one month
          </Typography>
          <Tabs
              className="mt-10"
              value={0}
              indicatorColor="primary"
              textColor="primary"
          >
            <Tab label="August" />
            <Tab label="last 3 month" />
            <Tab label="For all time" />
          </Tabs>
        </Paper>

        <Paper elevation={0}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>User Name</TableCell>
                <TableCell align="right">Rating</TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell component="th" scope="row">
                      <span className="mr-15">{user.id}</span> {user.fullName}
                    </TableCell>
                    <TableCell align="right">{user.commentsCount * 2}</TableCell>
                    <TableCell align="right">
                      <FollowButton />
                    </TableCell>
                  </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </MainLayout>
  );
}

export const getServerSideProps = async () => {
  try {
    const users = await Api().user.getAll();
    return {
      props: {
        users,
      },
    };
  } catch (err) {
    console.log(err);
  }
  return {
    props: {
      users: null,
    },
  };
};

export default Rating;