import * as React from 'react';

import styles from './DesignEditor.module.scss';
import { IDesign } from '../../clientmodels';

interface IDesignEditorProps {

}

const SamplePattern: IDesign = {
  name: 'Sample',
  patterns: [
    {
      cells: [
        { isOn: false },
        { isOn: true },
      ]
    }
  ]
}

export const DesignEditor: React.FunctionComponent<IDesignEditorProps> = (props) => {

  return (
    <div className={styles.patternEditor}>

    </div>
  );
};