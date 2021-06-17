import MenuList from 'components/system/Menu/MenuList';
import StyledMenu from 'components/system/Menu/StyledMenu';
import { useMenu } from 'contexts/menu/index';
import type { MenuState } from 'contexts/menu/useMenuContextState';
import { useEffect, useRef } from 'react';

type MenuProps = {
  subMenu?: MenuState;
};

const Menu = ({ subMenu }: MenuProps): JSX.Element => {
  const { menu: baseMenu = {}, setMenu } = useMenu();
  const { items, x = 0, y = 0 } = subMenu || baseMenu;
  const resetMenu = () => setMenu({});
  const menuRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (items && !subMenu) menuRef?.current?.focus();
  }, [items, subMenu]);

  return items ? (
    <StyledMenu
      onBlur={resetMenu}
      ref={menuRef}
      subMenu={!!subMenu}
      tabIndex={-1}
      x={x}
      y={y}
    >
      <MenuList items={items} resetMenu={resetMenu} />
    </StyledMenu>
  ) : (
    <></>
  );
};

export default Menu;
