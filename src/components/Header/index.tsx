import { Scroll, Timer } from 'phosphor-react'
import { NavLink } from 'react-router-dom'
import logoIgnite from '../../assets/logoIgnite.svg'
import { HeaderContainer } from './style'

export function Header() {
  return (
    <HeaderContainer>
      <span>
        <img src={logoIgnite} alt="" />
      </span>
      <nav>
        <NavLink to="/" title="Timer">
          <Timer size={28} />
        </NavLink>
        <NavLink to="/history" title="Historico">
          <Scroll size={28} />
        </NavLink>
      </nav>
    </HeaderContainer>
  )
}
