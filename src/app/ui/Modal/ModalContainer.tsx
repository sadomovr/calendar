import styled from "styled-components";

export const ModalContainer = styled.div<{ width?: string}>`
  background-color: white;
  border-radius: 5px;
  position: relative;
  width: ${p => p.width || '400px'};
`
