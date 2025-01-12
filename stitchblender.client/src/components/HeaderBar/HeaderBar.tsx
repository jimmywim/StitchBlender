import * as React from 'react';

import styles from './HeaderBar.module.scss';
import { Typography } from '@mui/material';


export const HeaderBar: React.FunctionComponent = () => {

  return (
    <div className={styles.headerBar}>
      <Typography variant='h4'>StitchBlender</Typography>
    </div>
  );
};