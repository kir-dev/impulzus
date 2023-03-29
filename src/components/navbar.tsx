import { NavItem } from './navitem'

const MENU_LIST = [
  { text: 'Home', href: '/' },
  { text: 'Rólunk', href: '/about' },
  { text: 'Blog', href: '/blog' },
  { text: 'Archívum', href: '/archive' },
  { text: 'Szerkesztőség', href: '/editorship' }
]

export const Navbar = () => {
  return (
    <div className="flex bg-sky-200 justify-evenly">
      {MENU_LIST.map((menu) => (
        <NavItem key={menu.text + menu.href} {...menu} />
      ))}
    </div>
  )
}
