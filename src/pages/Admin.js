import React, {useState, useEffect, useContext} from 'react';
import { Context } from './../context/Context';
import { useNavigate } from "react-router";
import { Outlet, Link } from 'react-router-dom';

//Component
import Navigation from './../components/MainNavbar.js';
import UserTable from './../utils/user/UserTable.js';
import UserResetPass from './../utils/user/UserResetPass.js';
import RegisterUserModal from './../utils/user/RegisterUserModal.js';
import ResetUserPasswordModal from './../utils/user/ResetUserPasswordModal.js';
import UpdateUserModal from './../utils/user/UpdateUserModal.js';


const Admin = () => {
	
	const { token } = useContext(Context);
	const navigate = useNavigate();
	
	const [selecteduser, setSelectedUser] = useState({});
	
	return (
		<div>
			<div className="container-fluid-md">			
				<div className="row">			
					<div className="col-sm">											
						<Navigation />											
					</div>
				</div><br/>	
				<div className="row">	
					<div className="col-sm"><br/>
						<div className="container overflow-hidden"><br/>							
							<div className="row gx-5">
								<div className="col">
									<div className="p-3 border bg-light">								
										<UserTable setSelectedUser={setSelectedUser} />								
										<br/>										
										<div className="form-control form-control-sm mt-2" id="ButtonsLabor">
											< RegisterUserModal />
										</div>						
									</div>							
								</div>
							</div>	

						</div>
					</div>
				</div>			
			</div>
		</div>
	);
  
}

export default Admin
