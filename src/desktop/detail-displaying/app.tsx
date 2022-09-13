import styled from '@emotion/styled';
import { Chip } from '@mui/material';
import React, { FCX } from 'react';

type Props = {
  fieldId: string | null;
  viewId: string;
  initialValue: kintone.plugin.TagData;
};

const Component: FCX<Props> = ({ fieldId, initialValue, className, viewId }) => (
  <div className={className}>
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
);

const StyledComponent = styled(Component)`
  display: flex;
  margin-top: 0.5rem;
  flex-wrap: wrap;
  gap: 0.5rem;

  > a > div {
    cursor: pointer;
  }
`;

export default StyledComponent;
