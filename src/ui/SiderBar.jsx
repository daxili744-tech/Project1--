import styled from 'styled-components';
import Logo from './Logo';
import MainNav from './MainNav';
import Uploader from '../data/Uploader.jsx';
const StyledSiderBar = styled.aside`
  padding: 3.2rem 2.4rem;
  background-color: var(--color-grey-0);
  border-bottom: 1px solid var(--color-grey-100);
  grid-row: 1 / -1;
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
`;
function SiderBar() {
  return (
    <StyledSiderBar>
      <Logo />
      <MainNav />
    </StyledSiderBar>
  );
}
export default SiderBar;
