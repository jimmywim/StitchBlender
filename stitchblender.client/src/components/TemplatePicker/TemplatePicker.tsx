import * as React from 'react';

import styles from './TemplatePicker.module.scss';
import { IPattern } from '../../clientmodels';
import { SampleTemplate106, SampleTemplate30, SampleTemplate96 } from '../SampleData/templates';
import { Button, Input, MenuItem, Popover, Select } from '@mui/material';

interface ITemplatePickerProps {
  onChange: (pattern: IPattern) => void;
  value: IPattern;
}

export const TemplatePicker: React.FunctionComponent<ITemplatePickerProps> = (props) => {
  const [patterns, setPatterns] = React.useState<IPattern[]>([SampleTemplate30, SampleTemplate96, SampleTemplate106]);
  const [selectedValue, setSelectedValue] = React.useState<string>(props.value.id);
  const [selectedPattern, setSelectedPattern] = React.useState<IPattern>(props.value);
  const [renameOpen, setRenameOpen] = React.useState<boolean>(false);
  const [renameEl, setRenameEl] = React.useState<HTMLButtonElement | null>(null);

  const patternSelected = (patternId: string) => {
    setSelectedValue(patternId);
    const patt = patterns.find(p => p.id === patternId);
    if (patt) {
      setSelectedPattern(patt);
      props.onChange(patt);
    }
  };

  const nameChange = (name: string) => {
    setSelectedPattern({
      ...selectedPattern,
      name
    });
  }

  React.useEffect(() => {
    if (patterns.find(p => p.id === props.value.id) === undefined) {
      setPatterns([
        ...patterns,
        props.value
      ]);
    }

    setSelectedValue(props.value.id);
    setSelectedPattern(props.value);
  }, [props.value, patterns]);

  return (
    <div>
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

      {
        !selectedPattern?.builtIn &&
        <>
          <Button onClick={(ev) => {
            setRenameOpen(true);
            setRenameEl(ev.currentTarget);
          }}>
            Rename
          </Button>
          <Popover
            open={renameOpen}
            onClose={() => {
              setRenameEl(null);
              setRenameOpen(false);
            }}
            anchorEl={renameEl}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
          >
            <Input
              value={selectedPattern.name ?? ''}
              onChange={(ev) => nameChange(ev.currentTarget.value)}
              onKeyUp={(ev) => {
                if (ev.key === 'Enter') {
                  setRenameOpen(false);
                  setRenameEl(null);
                  props.onChange(selectedPattern);
                }
              }}
            />
          </Popover>
        </>
      }
    </div>
  );
};