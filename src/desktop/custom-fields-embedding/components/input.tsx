import { Button } from '@mui/material';
import React, { ChangeEventHandler, FC, KeyboardEventHandler, useState } from 'react';
import { KintoneInput } from '@/lib/components/kintone-input';
import styled from '@emotion/styled';
import { useRecoilCallback } from 'recoil';
import { tagDataState } from '../states/plugin';
import { produce } from 'immer';
import AddIcon from '@mui/icons-material/Add';

type Props = { className?: string; width: number };

const Component: FC<Props> = ({ className }) => {
  const [input, setInput] = useState<string>('');

  const onInputChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setInput(event.target.value);
  };

  const onInputKeyDown: KeyboardEventHandler<HTMLInputElement> = (event) => {
    if (event.key !== 'Enter') {
      return;
    }
    onAddButtonClick();
  };

  const onAddButtonClick = useRecoilCallback(
    ({ set }) =>
      () => {
        if (!input) {
          return;
        }
        set(tagDataState, (current) =>
          produce(current, (draft) => {
            draft.tags.push({ value: input });
          })
        );
        setInput('');
      },
    [input]
  );

  return (
    <div className={className}>
      <KintoneInput value={input} onChange={onInputChange} onKeyDown={onInputKeyDown} />
      <Button
        variant='contained'
        color='primary'
        size='small'
        onClick={onAddButtonClick}
        startIcon={<AddIcon />}
      >
        タグを追加
      </Button>
    </div>
  );
};

const StyledComponent = styled(Component)`
  display: flex;
  gap: 0.5rem;
  align-items: center;

  input {
    ${({ width }) => (width ? `width: ${width}px;` : '')}
  }
`;

export default StyledComponent;
