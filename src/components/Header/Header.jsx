import { Container, Logo, UserLogo } from 'components';
import { UserAuth } from './UserAuth/UserAuth.jsx';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../redux/auth/authSelectors';
import { ContainerHeader, WrapHeader } from './Header.styled';

export const Header = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <header>
      <Container>
        <ContainerHeader>
          <Logo />
          {/* <WrapHeader>{isLoggedIn ? <UserLogo /> : <UserAuth />}</WrapHeader> */}
{/* second test */}
          <WrapHeader><UserAuth/></WrapHeader>
        </ContainerHeader>
      </Container>
    </header>
  );
};
