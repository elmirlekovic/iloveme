import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container, Modal, Tab } from 'react-bootstrap';
import SignUpForm from './SignupForm';
import LoginForm from './LoginForm';
import logo from '../../images/logo.png';
import Auth from '../../utils/auth';
import './Navbar.scss';

import { IconContext } from 'react-icons';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as MdIcons from 'react-icons/md';
import * as BiIcons from 'react-icons/bi';

const AppNavbar = () => {
  // set modal display state
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <Navbar bg='primary' variant='dark' expand='xl'>
        <Container fluid>
          <Navbar.Brand href='/'>
          <img src={logo} alt="iLove.me Logo" className="logo"/>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='navbar' />
          <Navbar.Collapse id='navbar'>
            <Nav className='ml-auto'>
              
              {/* if user is logged in show saved books and logout */}
              {Auth.loggedIn() ? (
                <>
                  <Nav.Link as={Link} to='/saved'>
                    
                  </Nav.Link>
                  <Nav.Link href='/'>
                  <MdIcons.MdDashboard /> Dashboard
                  </Nav.Link>
                  <Nav.Link href='/Habits'>
                    <BiIcons.BiListCheck /> Habits
                  </Nav.Link>
                  <Nav.Link href='/calendar'>
                    <BiIcons.BiCalendarHeart /> Calendar
                  </Nav.Link>
                  <Nav.Link onClick={Auth.logout}><BiIcons.BiUserCircle /> You are signed in {Auth.getProfile().data.username}! Logout</Nav.Link>
                  
                </>
              ) : (
                <Nav.Link onClick={() => setShowModal(true)}>Login/Sign Up</Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* set modal data up */}
      <Modal
        size='lg'
        show={showModal}
        onHide={() => setShowModal(false)}
        aria-labelledby='signup-modal'>
        {/* tab container to do either signup or login component */}
        <Tab.Container defaultActiveKey='login'>
          <Modal.Header closeButton>
            <Modal.Title id='signup-modal'>
              <Nav variant='pills'>
                <Nav.Item>
                  <Nav.Link eventKey='login'>Login</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey='signup'>Sign Up</Nav.Link>
                </Nav.Item>
              </Nav>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Tab.Content>
              <Tab.Pane eventKey='login'>
                <LoginForm handleModalClose={() => setShowModal(false)} />
              </Tab.Pane>
              <Tab.Pane eventKey='signup'>
                <SignUpForm handleModalClose={() => setShowModal(false)} />
              </Tab.Pane>
            </Tab.Content>
          </Modal.Body>
        </Tab.Container>
      </Modal>
    </>
  );
};

export default AppNavbar;
