import * as React from 'react';

import styles from './TemplatePicker.module.scss';
import { IPattern } from '../../clientmodels';
import { SampleTemplate106, SampleTemplate30, SampleTemplate96 } from '../SampleData/templates';
import { MenuItem, Select } from '@mui/material';

interface ITemplatePickerProps {
  onChange: (pattern: IPattern) => void;
  value: string;
}

export const TemplatePicker: React.FunctionComponent<ITemplatePickerProps> = (props) => {
  const [patterns, setPatterns] = React.useState<IPattern[]>([SampleTemplate30, SampleTemplate96, SampleTemplate106]);
  const [selectedValue, setSelectedValue] = React.useState<string>();

  const patternSelected = (patternId: string) => {
    setSelectedValue(patternId);
    const patt = patterns.find(p => p.id === patternId);
    if (patt) {
      props.onChange(patt);
    }
  };

  return (
    <Select
      value={selectedValue}
      label='Pattern'
      onChange={(ev) => patternSelected(ev.target.value)}
    >
      {
        patterns.map((patt) => (
          <MenuItem key={patt.id} value={patt.id}>{patt.name}</MenuItem>
        ))
      }
    </Select>
  );
};