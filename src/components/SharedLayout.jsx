import { Header, Loader } from 'components';
import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { ToastContainer, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Wrapper } from './Wrapper/Wrapper.jsx';

const SharedLayout = () => {
  return (
    <Wrapper>
      <Header />
      <main>
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      </main>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        draggable={false}
        transition={Zoom}
      />
    </Wrapper>
  );
};

export default SharedLayout;
