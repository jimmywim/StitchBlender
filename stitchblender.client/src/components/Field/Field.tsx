import * as React from 'react';

import styles from './Field.module.scss';

interface IFieldProps {
  label?: string;
}

export const Field: React.FunctionComponent<React.PropsWithChildren<IFieldProps>> = (props) => {

    return (
      <div className={ styles.field }>
        <label>{props.label}</label>
        {props.children}
      </div>
    );
};