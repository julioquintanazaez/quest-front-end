import './../App.css';
import React, { useState, useEffect, useContext } from 'react';
import { BrowserRouter, Routes, Route, Link, NavLink } from 'react-router-dom';
import { Context } from './../context/Context';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { LinkContainer } from "react-router-bootstrap";

import Student_Questionary_Btn from './../utils/csv/Student_Questionary_Btn.js';

const Navigation = ( props ) => {
	
	const { handleLogout } = useContext(Context);
	const { user, isAdmin, isLoggedIn } = useContext(Context);
	
	
	const logoutUser = () => {
		handleLogout();
	}
	
	return (
		<>
			<Navbar expand="lg" fixed="top" className="navbar-light" bg="bg-dark" data-bs-theme="dark">
				<Container>
					<Navbar.Brand href="/">
						QUEST-BRAIN
					</Navbar.Brand>
					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse className="justify-content-end">
						<Nav className="me-auto" activeKey={window.location.pathname}>							
							<NavDropdown title="Questionarios" id="basic-nav-dropdown">	
								<NavDropdown.Item>
									<LinkContainer to="/quest_one">
										<Nav.Link>Estudiantes</Nav.Link>
									</LinkContainer>
								</NavDropdown.Item>
							</NavDropdown>							
							{isAdmin && 
							<NavDropdown title="Panel Administrador" id="adminstrador">									
								<NavDropdown.Item>
									<LinkContainer to="/admin">
										<Nav.Link>Users</Nav.Link>
									</LinkContainer>									
								</NavDropdown.Item>	
							</NavDropdown >
							}
							{isAdmin && 
							<NavDropdown title="Registro" id="registro">	
								<NavDropdown.Item>
									< Student_Questionary_Btn />										
								</NavDropdown.Item>
							</NavDropdown>
							}							
						</Nav>	
						<Nav className="justify-content-end">
							<NavDropdown title="Sistema" id="basic-nav-dropdown">
							{!isLoggedIn
								?
								<NavDropdown.Item as="button">
									<LinkContainer to="/login">
										<Nav.Link>Autenticarse</Nav.Link>
									</LinkContainer>
								</NavDropdown.Item>
								:								
								<NavDropdown.Item as="button" onClick={logoutUser}>
									Salir
								</NavDropdown.Item>								
							}
							</NavDropdown>
						</Nav>
						
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</>		
	);
}

export default Navigation