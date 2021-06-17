import Menu from 'components/system/Menu';
import type { MenuItem } from 'contexts/menu/useMenuContextState';
import { useEffect, useRef, useState } from 'react';
import { Position } from 'react-rnd';
import Icon from 'styles/common/Icon';

type MenuItemEntryProps = MenuItem & {
  resetMenu: () => void;
};

const MenuItemEntry = ({
  action,
  icon,
  label,
  menu,
  primary,
  resetMenu,
  separator
}: MenuItemEntryProps): JSX.Element => {
  const entryRef = useRef<HTMLLIElement | null>(null);
  const [subMenuOffset, setSubMenuOffset] = useState<Position>({ x: 0, y: 0 });
  const [showSubMenu, setShowSubMenu] = useState(false);
  const onMouseEnter: React.MouseEventHandler = () => setShowSubMenu(true);
  const onMouseLeave: React.MouseEventHandler = ({ relatedTarget }) => {
    if (!entryRef?.current?.contains(relatedTarget as HTMLElement)) {
      setShowSubMenu(false);
    }
  };
  const subMenuEvents = !menu ? {} : { onMouseEnter, onMouseLeave };

  useEffect(() => {
    if (entryRef?.current) {
      const { height, width } = entryRef?.current?.getBoundingClientRect();

      setSubMenuOffset({
        x: width - 2,
        y: -height - 3
      });
    }
  }, []);

  return (
    <li ref={entryRef}>
      {separator ? (
        <hr />
      ) : (
        <figure
          onClick={() => {
            action?.();
            resetMenu();
          }}
          {...subMenuEvents}
        >
          {icon && <Icon src={icon} alt={label} imgSize={16} />}
          <figcaption className={primary ? 'primary' : ''}>{label}</figcaption>
        </figure>
      )}
      {menu && showSubMenu && (
        <Menu subMenu={{ items: menu, ...subMenuOffset }} />
      )}
    </li>
  );
};

export default MenuItemEntry;
