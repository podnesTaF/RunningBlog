/** @format */

import { Button, Divider, Paper, TextField, Typography } from '@mui/material';
import MainLayout from '../../layouts/MainLayout';
import {NextPage} from "next";
import {useInput} from "../../hooks/useInput";

const SettingPage: NextPage = () => {
  const fullName = useInput('')
  const password = useInput('')
  const oldPassword = useInput('')

  return (
    <MainLayout hideComments>
      <Paper className="p-20" elevation={0}>
        <Typography variant="h6">Main settings</Typography>
        <Divider className="mt-20 mb-30" />
        <form>
          <TextField
              {...fullName}
            className="mb-20"
            size="small"
            label="Nickname"
            variant="outlined"
            fullWidth
            required
          />
          <TextField
              {...oldPassword}
            className="mb-20"
            size="small"
            label="Old password"
            variant="outlined"
            fullWidth
            required
          />
          <TextField
              {...password}
            className="mb-20"
            size="small"
            label="Password"
            variant="outlined"
            fullWidth
            required
          />
          <Divider className="mt-30 mb-20" />
          <Button color="primary" variant="contained">
            Save changes
          </Button>
        </form>
      </Paper>
    </MainLayout>
  );
}

export default SettingPage;