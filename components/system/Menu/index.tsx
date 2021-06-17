import MenuList from 'components/system/Menu/MenuList';
import StyledMenu from 'components/system/Menu/StyledMenu';
import { useMenu } from 'contexts/menu/index';
import { useEffect, useRef } from 'react';

const Menu = (): JSX.Element => {
  const { menu: { items, x = 0, y = 0 } = {}, setMenu } = useMenu();
  const resetMenu = () => setMenu({});
  const menuRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (items) menuRef?.current?.focus();
  }, [items]);

  return items ? (
    <StyledMenu onBlur={resetMenu} ref={menuRef} tabIndex={-1} x={x} y={y}>
      <MenuList items={items} resetMenu={resetMenu} />
    </StyledMenu>
  ) : (
    <></>
  );
};

export default Menu;
