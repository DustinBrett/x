import {
  AllApps,
  Documents,
  Power,
  SideMenu
} from 'components/system/StartMenu/Sidebar/SidebarIcons';
import StyledSidebar from 'components/system/StartMenu/Sidebar/StyledSidebar';

type SidebarButtonProps = {
  name: string;
  icon: JSX.Element;
};

const topButtons = [
  { name: 'START', icon: <SideMenu /> },
  { name: 'All apps', icon: <AllApps /> }
];

const bottomButtons = [
  { name: 'Documents', icon: <Documents /> },
  { name: 'Power', icon: <Power /> }
];

const SidebarButton = ({ name, icon }: SidebarButtonProps) => (
  <li key={name}>
    <figure>
      {icon}
      <figcaption>{name}</figcaption>
    </figure>
  </li>
);

const Sidebar = (): JSX.Element => (
  <StyledSidebar>
    {Object.entries({ topButtons, bottomButtons }).map(([key, buttons]) => (
      <ol key={key}>{buttons.map(SidebarButton)}</ol>
    ))}
  </StyledSidebar>
);

export default Sidebar;
