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
import {activityRating, calculateRating, sortSocial, sortSport} from "../utils/rating";
import {useEffect, useState} from "react";

interface RatingPageProps {
  users: ResponseUser[];
}

const Rating: NextPage<RatingPageProps> = ({users}) => {
  const [sortedUsers, setSortedUsers] = useState(users.sort(sortSocial))
  const [ratingType, setRatingType] = useState('activity')

  useEffect(() => {
    if(ratingType === 'activity') {
      setSortedUsers(users.sort(sortSocial))
      console.log(sortedUsers)
    } else {
      setSortedUsers(users.sort(sortSport))
      console.log(sortedUsers)
    }
    // @ts-ignore
  }, [ratingType]);


  return (
      <MainLayout>
        <Paper className="p;-20 pt-20 pr-20 mb-20" elevation={0}>
          <Typography
              variant="h5"
              style={{ fontWeight: 'bold', fontSize: 30, marginBottom: 6 }}
          >
            Rating of users activity
          </Typography>
          <Typography style={{ fontSize: 15 }}>
Here you can see the rating of users activity. It counted by special algorithm. The more posts, likes, comments, followers, followings you have, the more you are in the rating as blogger. You also can be the most active user in sport, just run or ride more than others.
          </Typography>
          <Tabs
              className="mt-10"
              value={ratingType === 'activity' ? 0 : 1}
              indicatorColor="primary"
              textColor="primary"
          >
            <Tab onClick={() => setRatingType('activity')} label="Blog activity" />
            <Tab onClick={() => setRatingType('sport')} label="Sport rating" />
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
              {ratingType === 'activity' ? (
                  sortedUsers.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell component="th" scope="row">
                            <span className="mr-15">{user.id}</span> {user.fullName}
                          </TableCell>
                                  <TableCell align="right">{calculateRating(user.followerCount, user.commentsCount, user.postsCount, user.likesCount)}</TableCell>
                          <TableCell align="right">
                            <FollowButton />
                          </TableCell>
                        </TableRow>
                    ))
              ) : (
                  sortedUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell component="th" scope="row">
                          <span className="mr-15">{user.id}</span> {user.fullName}
                        </TableCell>
                        <TableCell align="right">{activityRating(user.runningDistance, user.cycleDistance)}</TableCell>
                        <TableCell align="right">
                          <FollowButton />
                        </TableCell>
                      </TableRow>
                  ))
              )}

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