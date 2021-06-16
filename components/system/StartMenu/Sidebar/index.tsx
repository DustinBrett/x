import {
  AllApps,
  Documents,
  Power,
  SideMenu
} from 'components/system/StartMenu/Sidebar/SidebarIcons';
import StyledSidebar from 'components/system/StartMenu/Sidebar/StyledSidebar';
import StyledSidebarButton from 'components/system/StartMenu/Sidebar/StyledSidebarButton';

type SidebarButtonProps = {
  active?: boolean;
  heading?: boolean;
  icon: JSX.Element;
  name: string;
};

const topButtons = [
  { name: 'START', icon: <SideMenu />, heading: true },
  { name: 'All apps', icon: <AllApps />, active: true }
];

const bottomButtons = [
  { name: 'Documents', icon: <Documents /> },
  { name: 'Power', icon: <Power /> }
];

const SidebarButton = ({ active, icon, name, heading }: SidebarButtonProps) => (
  <StyledSidebarButton key={name} active={active} heading={heading}>
    <figure>
      {icon}
      <figcaption>{name}</figcaption>
    </figure>
  </StyledSidebarButton>
);

const Sidebar = (): JSX.Element => (
  <StyledSidebar>
    {Object.entries({ topButtons, bottomButtons }).map(([key, buttons]) => (
      <ol key={key}>{buttons.map(SidebarButton)}</ol>
    ))}
  </StyledSidebar>
);

export default Sidebar;
