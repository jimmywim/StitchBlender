import * as React from 'react';

import styles from './{{pascalCase name}}.module.scss';

interface I{{pascalCase name}}Props {

}

export const {{pascalCase name}}: React.FunctionComponent<I{{pascalCase name}}Props> = (props) => {

    return (
      <div className={ styles.{{camelCase name}} }>

      </div>
    );
};