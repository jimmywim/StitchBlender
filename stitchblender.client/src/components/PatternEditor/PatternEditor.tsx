import * as React from 'react';

import styles from './PatternEditor.module.scss';
import { IPattern, IPatternCell } from '../../clientmodels';
import { Field } from '../Field/Field';
import { SampleTemplate96 } from '../SampleData/templates';
import { TemplatePicker } from '../TemplatePicker/TemplatePicker';
import { Grid2 } from '@mui/material';




interface IPatternEditorProps {
  pattern?: IPattern;
}

export const PatternEditor: React.FunctionComponent<IPatternEditorProps> = (props) => {
  const [pattern, setPattern] = React.useState<IPattern>(SampleTemplate96);
  const [editToken, setEditToken] = React.useState<number>(0);

  React.useEffect(() => {
    setPattern(pattern);
  }, [props.pattern]);

  const renderRowNumber = (rowId: number) => {
    return <>{(rowId - pattern.rows.length) * -1}</>
  };

  const cellClicked = (cell: IPatternCell) => {
    cell.isForeground = !cell.isForeground;
    setEditToken(editToken + 1);
  };

  const rowsChanged = (rows: number) => {
    const colCount = pattern.rows[0].cells.length;

    if (rows < pattern.rows.length) {
      pattern.rows.splice(0, 1);
    } else {
      pattern.rows.push({
        cells: Array.apply(null, Array(colCount)).map(c => { return {} as IPatternCell; })
      });
    }

    setEditToken(editToken + 1);
  };

  const columnsChanged = (cols: number) => {
    for (const row of pattern.rows) {
      if (cols < row.cells.length) {
        row.cells.splice(0, 1);
      } else {
        row.cells.push({})
      }
    }

    setEditToken(editToken + 1);
  };

  return (
    <div className={styles.patternEditor}>

      <div className={styles.patternControls}>
        <TemplatePicker
          value={pattern.id}
          onChange={setPattern}
        />


        <Field label='Rows'>
          <input type='number'
            min={1}
            max={30}
            value={pattern.rows.length ?? 1}
            onInput={(ev) => rowsChanged(ev.currentTarget.valueAsNumber)}
          />
        </Field>

        <Field label='Colums'>
          <input type='number'
            min={1}
            max={30}
            value={pattern.rows[0].cells.length ?? 4}
            onInput={(ev) => columnsChanged(ev.currentTarget.valueAsNumber)}
          />
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