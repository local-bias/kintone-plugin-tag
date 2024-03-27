import { Chip } from '@mui/material';
import { produce } from 'immer';
import React, { FC } from 'react';
import { useRecoilCallback, useRecoilValue } from 'recoil';
import { tagDataState } from '../states/plugin';

const Component: FC = () => {
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
    <div className='🐸'>
      <div className='flex mt-2 flex-wrap gap-2'>
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
    </div>
  );
};

export default Component;
