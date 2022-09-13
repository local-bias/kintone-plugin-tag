import styled from '@emotion/styled';
import { Chip } from '@mui/material';
import produce from 'immer';
import React, { FC, FCX } from 'react';
import { useRecoilCallback, useRecoilValue } from 'recoil';
import { tagDataState } from '../states/plugin';

const Component: FCX = ({ className }) => {
  const tagData = useRecoilValue(tagDataState);

  const onDeleteTag = useRecoilCallback(
    ({ set }) =>
      async (index: number) => {
        set(tagDataState, (current) =>
          produce(current, (draft) => {
            draft.tags.splice(index, 1);
          })
        );
      },
    []
  );

  return (
    <div className={className}>
      {tagData.tags.map((tag, i) => (
        <Chip
          key={`${i}_${tag.value}`}
          color='primary'
          variant='outlined'
          label={tag.value}
          onDelete={() => onDeleteTag(i)}
        />
      ))}
    </div>
  );
};

const StyledComponent = styled(Component)`
  display: flex;
  margin-top: 0.5rem;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

export default StyledComponent;
