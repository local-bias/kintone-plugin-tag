import styled from '@emotion/styled';
import React, { FCwC } from 'react';

type Props = { className?: string };

const Component: FCwC<Props> = ({ children, className }) => (
  <div className={className}>{children}</div>
);

const StyledComponent = styled(Component)``;

export default StyledComponent;
