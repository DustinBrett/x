import MenuItemEntry from 'components/system/Menu/MenuItemEntry';
import type { MenuItem } from 'contexts/menu/useMenuContextState';

type MenuListProps = {
  items: MenuItem[];
  resetMenu: () => void;
};

const MenuList = ({ items, resetMenu }: MenuListProps): JSX.Element => (
  <ol>
    {items.map((item) => (
      <MenuItemEntry
        key={item.label || item.separator}
        resetMenu={resetMenu}
        {...item}
      />
    ))}
  </ol>
);

export default MenuList;
