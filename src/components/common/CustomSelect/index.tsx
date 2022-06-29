import React, { useState } from 'react';
import SelectUnstyled, {
  SelectUnstyledProps,
  selectUnstyledClasses,
} from '@mui/base/SelectUnstyled';
import OptionUnstyled, { optionUnstyledClasses } from '@mui/base/OptionUnstyled';
import PopperUnstyled from '@mui/base/PopperUnstyled';
import { styled } from '@mui/system';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faCheck, faRandom } from '@fortawesome/free-solid-svg-icons';
import { Genre } from 'types/chart';
import moment from 'moment';
import 'moment/locale/ko';
import NextLink from 'next/link';
import { useRouter } from 'next/router';

const blue = {
  100: '#DAECFF',
  200: '#99CCF3',
  400: '#3399FF',
  500: '#007FFF',
  600: '#0072E5',
  900: '#003A75',
};

const grey = {
  100: '#E7EBF0',
  200: '#E0E3E7',
  300: '#CDD2D7',
  400: '#B2BAC2',
  500: '#A0AAB4',
  600: '#6F7E8C',
  700: '#3E5060',
  800: '#2D3843',
  900: '#1A2027',
};

const StyledButton = styled('button')(
  ({ theme }) => `
  min-height: 32px;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[800] : grey[300]};
  border-radius: 1.6em;
  padding: 0 10px 0 10px;
  text-align: left;
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};

  &:hover {
    background: ${theme.palette.mode === 'dark' ? '' : grey[100]};
    border-color: ${theme.palette.mode === 'dark' ? grey[700] : grey[400]};
  }

  &.${selectUnstyledClasses.focusVisible} {
    outline: 3px solid ${theme.palette.mode === 'dark' ? blue[600] : blue[100]};
  }

  &.${selectUnstyledClasses.expanded} {
    &::after {
      content: '▴';
      padding-left: 2px;
    }
  }

  &::after {
    content: '▾';
    padding-left: 2px;
    float: right;
  }
  `
);

const StyledListbox = styled('ul')(
  ({ theme }) => `
  font-size: 1.2rem;
  box-sizing: border-box;
  padding: 5px;
  margin: 10px 0;
  min-width: 120px;
  background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[800] : grey[300]};
  border-radius: 0.75em;
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  overflow: auto;
  outline: 0px;
  z-index: 10;
  max-height: 300px;
  ::-webkit-scrollbar {
    display: none;
  }
  `
);

const StyledOption = styled(OptionUnstyled)(
  ({ theme }) => `
  list-style: none;
  padding: 8px;
  border-radius: 0.45em;
  cursor: default;

  &:last-of-type {
    border-bottom: none;
  }

  &.${optionUnstyledClasses.selected} {
    background-color: ${theme.palette.mode === 'dark' ? blue[900] : blue[100]};
    color: ${theme.palette.mode === 'dark' ? blue[100] : blue[900]};
  }

  &.${optionUnstyledClasses.highlighted} {
    background-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[100]};
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  }

  &.${optionUnstyledClasses.highlighted}.${optionUnstyledClasses.selected} {
    background-color: ${theme.palette.mode === 'dark' ? blue[900] : blue[100]};
    color: ${theme.palette.mode === 'dark' ? blue[100] : blue[900]};
  }

  &.${optionUnstyledClasses.disabled} {
    color: ${theme.palette.mode === 'dark' ? grey[700] : grey[400]};
  }

  &:hover:not(.${optionUnstyledClasses.disabled}) {
    background-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[100]};
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  }
  `
);

const StyledPopper = styled(PopperUnstyled)`
  z-index: 1;
`;

const BaseCustomSelect = React.forwardRef(function CustomSelect<TValue>(
  props: SelectUnstyledProps<TValue>,
  ref: React.ForwardedRef<HTMLUListElement>
) {
  const components: SelectUnstyledProps<TValue>['components'] = {
    Root: StyledButton,
    Listbox: StyledListbox,
    Popper: StyledPopper,
    ...props.components,
  };

  return <SelectUnstyled {...props} ref={ref} components={components} />;
}) as <TValue>(
  props: SelectUnstyledProps<TValue> & React.RefAttributes<HTMLUListElement>
) => JSX.Element;

interface CustomSelectProps {
  item:
    | Genre[]
    | {
        name: string;
        value: string;
      }[]
    | string[]
    | null;
  typeString: 'genre' | 'year' | 'month' | 'week' | 'link';
  type: string | number | null;
  setType: React.SetStateAction<any>;
}

export default function CustomSelect({ item, typeString, type, setType }: CustomSelectProps) {
  return (
    <BaseCustomSelect defaultValue={type} value={type} onChange={setType}>
      {item ? (
        {
          genre: item.map((val, i) => (
            <StyledOption key={i} value={val.id}>
              {val.displayName}
            </StyledOption>
          )),
          year: item.map((val, i) => (
            <StyledOption key={i} value={val}>
              {moment(val).format('YYYY년')}
            </StyledOption>
          )),
          month: item.map((val, i) => (
            <StyledOption key={i} value={val}>
              {moment(val).format('YYYY년 MM월')}
            </StyledOption>
          )),
          week: item.map((val, i) => (
            <StyledOption key={i} value={val}>
              {`${moment(val).subtract(7, 'days').format('YYYY년 MM월 DD일')} ~ ${moment(
                val
              ).format('MM월 DD일')}`}
            </StyledOption>
          )),
          link: item.map((val, i) => (
            <StyledOption key={i} value={val.value}>
              {val.name}
            </StyledOption>
          )),
        }[typeString]
      ) : (
        <></>
      )}
    </BaseCustomSelect>
  );
}
