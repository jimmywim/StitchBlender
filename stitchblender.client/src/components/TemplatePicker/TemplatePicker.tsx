import * as React from 'react';

import styles from './TemplatePicker.module.scss';
import { Button, FormControl, Input, InputLabel, MenuItem, Popover, Select } from '@mui/material';
import { PatternsService } from '../../services/PatternsService';
import { Pattern } from '../../sbClient/models';

interface ITemplatePickerProps {
  onChange: (pattern: Pattern) => void;
  value: Pattern;
}

export const TemplatePicker: React.FunctionComponent<ITemplatePickerProps> = (props) => {
  const [patterns, setPatterns] = React.useState<Pattern[]>([]);
  const [selectedValue, setSelectedValue] = React.useState<string>(props.value.id as string);
  const [selectedPattern, setSelectedPattern] = React.useState<Pattern>(props.value);
  const [renameOpen, setRenameOpen] = React.useState<boolean>(false);
  const [renameEl, setRenameEl] = React.useState<HTMLButtonElement | null>(null);

  const fetchPatterns = React.useCallback(async () => {
    const patts = await PatternsService.GetAllPatterns();
    setPatterns(patts);
    const patt = patts[0];
    if (patt) {
      props.onChange(patt);
      setSelectedValue(patt.id as string);
      setSelectedPattern(patt);
    }
  }, []);

  React.useEffect(() => {
    fetchPatterns();
  }, [fetchPatterns]);

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

    const patt = patterns.find(p => p.id === selectedPattern.id);
    if (patt) {
      patt.name = name;
      setPatterns(patterns);
    }
  }

  React.useEffect(() => {
    if (patterns.find(p => p.id === props.value.id) === undefined) {
      setPatterns([
        ...patterns,
        props.value
      ]);
    }

    setSelectedValue(props.value.id as string);
    setSelectedPattern(props.value);
  }, [props.value, patterns]);

  return (
    <div>
      <FormControl>
        <InputLabel>Pattern</InputLabel>
        <Select
          value={selectedValue}
          defaultValue={selectedValue}
          onChange={(ev) => patternSelected(ev.target.value)}
        >
          {
            patterns.map((patt) => (
              <MenuItem key={patt.id} value={patt.id as string}>{patt.name}</MenuItem>
            ))
          }
        </Select>
      </FormControl>
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