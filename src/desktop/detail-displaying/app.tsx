import { Chip } from '@mui/material';
import React, { FC } from 'react';

type Props = {
  fieldId: string | null;
  viewId: string;
  initialValue: Plugin.TagData;
};

const Component: FC<Props> = ({ fieldId, initialValue, viewId }) => (
  <div className='🐸'>
    <div className='flex mt-2 flex-wrap gap-2 [&>a>div]:cursor-pointer'>
      {initialValue.tags.map((tag, i) => (
        <a
          key={`${i}_${tag.value}`}
          href={`${location.pathname.replace('show', '')}${
            viewId ? `?view=${viewId}&` : '?'
          }q=f${fieldId} like "${tag.value}"`}
        >
          <Chip color='primary' variant='outlined' label={tag.value} />
        </a>
      ))}
    </div>
  </div>
);

export default Component;
