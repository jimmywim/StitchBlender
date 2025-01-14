import * as React from 'react';

import styles from './PatternEditor.module.scss';
import { Field } from '../Field/Field';
import { BlankPattern } from '../SampleData/templates';
import { TemplatePicker } from '../TemplatePicker/TemplatePicker';

import { v4 as uuidv4 } from 'uuid';
import { Button } from '@mui/material';
import { Pattern, PatternCell } from '../../sbClient/models';
import { PatternsService } from '../../services/PatternsService';

interface IPatternEditorProps {
  pattern?: Pattern;
}

export const PatternEditor: React.FunctionComponent<IPatternEditorProps> = (props) => {
  const [pattern, setPattern] = React.useState<Pattern>(BlankPattern);
  const [editToken, setEditToken] = React.useState<number>(0);

  const [rowCount, setRowcount] = React.useState<number>(BlankPattern.rows.length);
  const [columnCount, setColumnCount] = React.useState<number>(BlankPattern.rows[0].cells.length);

  React.useEffect(() => {
    setPattern(pattern);
  }, [props.pattern]);

  const newPattern = () => {
    setPattern(BlankPattern);
    setRowcount(BlankPattern.rows.length);
    setColumnCount(BlankPattern.rows[0].cells.length);
  };

  const renderRowNumber = (rowId: number) => {
    return <>{(rowId - (pattern.rows?.length ?? 0)) * -1}</>
  };

  const cellClicked = (cell: PatternCell) => {
    cell.isForeground = !cell.isForeground;
    setEditToken(editToken + 1);
  };

  const rowsChanged = (rows: number) => {
    if (pattern.rows) {
      if (rows < pattern.rows.length) {
        pattern.rows.splice(0, 1);
        setRowcount(rowCount - 1);
      } else {
        pattern.rows.push({
          cells: Array.apply(null, Array(columnCount)).map(c => { return {} as PatternCell; })
        });

        setRowcount(rowCount + 1);
      }
    }

    setEditToken(editToken + 1);
  };

  const columnsChanged = (cols: number) => {
    if (pattern.rows) {
      for (const row of pattern.rows) {
        if (row.cells) {
          if (cols < row.cells.length) {
            row.cells.splice(0, 1);
            setColumnCount(columnCount - 1);
          } else {
            row.cells.push({});
            setColumnCount(columnCount + 1);
          }
        }
      }
    }
    setEditToken(editToken + 1);
  };

  const save = async () => {
    await PatternsService.SavePattern(pattern);
  } ; 

  return (
    <div className={styles.patternEditor}>

      <div className={styles.patternControls}>
        <TemplatePicker
          value={pattern}
          onChange={setPattern}
        />

        <Button onClick={newPattern}>New</Button>


        <Field label='Rows'>
          <input type='number'
            min={1}
            max={30}
            value={rowCount}
            onInput={(ev) => rowsChanged(ev.currentTarget.valueAsNumber)}
          />
        </Field>

        <Field label='Colums'>
          <input type='number'
            min={1}
            max={30}
            value={columnCount}
            onInput={(ev) => columnsChanged(ev.currentTarget.valueAsNumber)}
          />
        </Field>

        <Field>
          <Button onClick={save}>Save Changes</Button>
        </Field>
      </div>

      <div className={styles.templateGrid} key={editToken}>
        {
          pattern.rows?.map((row, rowId) => (
            <div key={rowId} className={styles.templateRow}>
              {
                row.cells?.map((cell, idx) => (
                  <div key={idx} className={styles.templateCell} onClick={() => cellClicked(cell)}>
                    {cell.isForeground && <>&#11044;</>}
                  </div>
                ))
              }

              <div className={styles.templateRowNumber}>
                {renderRowNumber(rowId)}
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
};