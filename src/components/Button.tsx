import { ButtonContainer, ButtonVariant } from "./Button.styles";

interface Properties {
  title?: string
  variant?: ButtonVariant
}

export function Button({ title = 'Enviar', variant = 'primary' }: Properties) {
  return <ButtonContainer
    variant = { variant }
  >{ title }</ButtonContainer>
}