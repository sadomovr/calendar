import styled from "styled-components";
import { color } from "../../constants/color.ts";

type ButtonProps = {
	color?: 'success' | 'error' | 'primary'
}

export const Button = styled.button<ButtonProps>`
	background: ${p => p.color ? color.button.background[p.color] : color.button.background.primary };
	color: ${p => p.color ? color.button.color[p.color] : color.button.color.primary };
	padding: 10px;
	border-radius: 10px;
  border: none;
  font: inherit;
  cursor: pointer;
  outline: inherit;
`
