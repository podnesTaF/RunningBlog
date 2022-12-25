/** @format */

import { Button, Divider, Paper, TextField, Typography } from '@mui/material';
import MainLayout from '../../layouts/MainLayout';
import {GetServerSideProps, NextPage} from "next";
import {ResponseUser} from "../../utils/api/types";
import React from "react";
import SettingForm from "../../components/SettingForm";
import {Api} from "../../utils/api";
import AccountInfo from "../../components/AccountInfo";

interface SettingPageProps {
  user: ResponseUser;
}
const SettingPage: NextPage<SettingPageProps> = ({user}) => {


  return (
    <MainLayout hideComments>
      <Paper className="p-20" elevation={0}>
        <Typography variant="h5">Main settings</Typography>
        <Divider className="mt-20 mb-30"/>
        <Typography variant="h6">Account Info</Typography>
        <AccountInfo email={user.email} name={user.fullName} createdAt={user.createdAt} updatedAt={user.updatedAt} />
        <Typography variant="h6">Change your data</Typography>
        <Divider className="mt-20 mb-30" />
        <SettingForm user={user}/>
      </Paper>
    </MainLayout>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    const user = await Api(ctx).user.getMe()
      return {
        props: {
          user
        }
      }
  } catch (err) {
    console.log('Setting page', err)
    return {
      props: {

      }
    }
  }
}

export default SettingPage;