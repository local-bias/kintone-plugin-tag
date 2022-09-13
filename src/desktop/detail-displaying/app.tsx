import styled from '@emotion/styled';
import { Chip } from '@mui/material';
import React, { FCX } from 'react';

type Props = {
  condition: kintone.plugin.Condition;
  initialValue: kintone.plugin.TagData;
  width?: number;
};

const Component: FCX<Props> = ({ initialValue, className, width }) => (
  <div className={className}>
    {initialValue.tags.map((tag, i) => (
      <Chip key={`${i}_${tag.value}`} color='primary' variant='outlined' label={tag.value} />
    ))}
  </div>
);

const StyledComponent = styled(Component)`
  display: flex;
  margin-top: 0.5rem;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

export default StyledComponent;
