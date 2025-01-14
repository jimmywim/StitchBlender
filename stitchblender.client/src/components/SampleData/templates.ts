import { IPattern } from "../../clientmodels";
import { v4 as uuidv4 } from 'uuid';

export const BlankPattern: IPattern = {
  name: 'New Pattern',
  id: uuidv4(),
  builtIn: false,
  rows: [{ cells: [{}] }]
}

// From Design 96
export const SampleTemplate96: IPattern = {
  name: 'Template #96',
  id: '96',
  builtIn: true,
  rows: [
    {
      cells: [
        { isForeground: true }, { isForeground: true }, { isForeground: true }, { isForeground: true }, { isForeground: true }, { isForeground: true }
      ]
    },
    {
      cells: [
        { isForeground: true }, { isForeground: true }, { isForeground: true }, { isForeground: false }, { isForeground: false }, { isForeground: false }
      ]
    },
    {
      cells: [
        { isForeground: false }, { isForeground: true }, { isForeground: false }, { isForeground: false }, { isForeground: false }, { isForeground: false }
      ]
    },
    {
      cells: [
        { isForeground: false }, { isForeground: false }, { isForeground: false }, { isForeground: false }, { isForeground: true }, { isForeground: false }
      ]
    },
    {
      cells: [
        { isForeground: false }, { isForeground: false }, { isForeground: false }, { isForeground: true }, { isForeground: true }, { isForeground: true }
      ]
    },
    {
      cells: [
        { isForeground: true }, { isForeground: true }, { isForeground: true }, { isForeground: true }, { isForeground: true }, { isForeground: true }
      ]
    }
  ]
}

export const SampleTemplate30: IPattern = {
  name: 'Template #30',
  id: '30',
  builtIn: true,
  rows: [
    {
      cells: [
        { isForeground: true }, { isForeground: false }, { isForeground: true }, { isForeground: false }, { isForeground: true }
      ]
    },
    {
      cells: [
        { isForeground: false }, { isForeground: true }, { isForeground: false }, { isForeground: true }, { isForeground: false }
      ]
    },
    {
      cells: [
        { isForeground: false }, { isForeground: false }, { isForeground: true }, { isForeground: false }, { isForeground: false }
      ]
    }
  ]
}

export const SampleTemplate106: IPattern = {
  name: 'Template #106',
  id: '106',
  builtIn: true,
  rows: [
    {
      cells: [
        { isForeground: false }, { isForeground: true }, { isForeground: true }, { isForeground: true }, { isForeground: false }, { isForeground: false }
      ]
    },
    {
      cells: [
        { isForeground: true }, { isForeground: false }, { isForeground: false }, { isForeground: false }, { isForeground: true }, { isForeground: false }
      ]
    },
    {
      cells: [
        { isForeground: false }, { isForeground: false }, { isForeground: true }, { isForeground: false }, { isForeground: false }, { isForeground: true }
      ]
    },
    {
      cells: [
        { isForeground: false }, { isForeground: true }, { isForeground: true }, { isForeground: true }, { isForeground: false }, { isForeground: false }
      ]
    },
    {
      cells: [
        { isForeground: false }, { isForeground: false }, { isForeground: true }, { isForeground: false }, { isForeground: false }, { isForeground: true }
      ]
    },
    {
      cells: [
        { isForeground: true }, { isForeground: false }, { isForeground: false }, { isForeground: false }, { isForeground: true }, { isForeground: false }
      ]
    },
    {
      cells: [
        { isForeground: false }, { isForeground: true }, { isForeground: true }, { isForeground: true }, { isForeground: false }, { isForeground: false }
      ]
    },
  ]
}