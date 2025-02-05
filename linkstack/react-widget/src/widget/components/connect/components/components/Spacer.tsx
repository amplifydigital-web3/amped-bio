import React from "react";
import styled from 'styled-components'

const Spacer = styled.div<{ horizontal?: boolean; size: number; style?: any }>`
  min-width: ${(props) => props.horizontal && props.size}px;
  min-height: ${(props) => !props.horizontal && props.size}px;
`;

export default Spacer
