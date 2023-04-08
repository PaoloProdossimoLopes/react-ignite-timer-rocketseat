import { HeaderContainer } from './style'

import logoIgnite from '../../assets/logoIgnite.svg'

import { Scroll, Timer } from 'phosphor-react'

export function Header() {
  return (
    <HeaderContainer>
      <span>
        <img src={logoIgnite} alt="" />
      </span>
      <nav>
        <a href="#">
          <Timer size={28} />
        </a>
        <a href="#">
          <Scroll size={28} />
        </a>
      </nav>
    </HeaderContainer>
  )
}
