import React, { useState, useEffect } from 'react';
import usersModule from './users.module.css';
import { firebaseDatabase } from '../../../functions';
const Users = ({ setUser, setNewUsers, setUsers }) => {
    const [users, getUsers] = useState([]);
    useEffect(() => {
        firebaseDatabase().ref("Users").on("value", user => {
            let userList = [];
            user.forEach(item => {
                userList.push(item.val());
            });
            getUsers(userList)
        })
    }, []);

    return (
        <section className={usersModule.Users}>
            <h2 className={usersModule.info}>
                Double click to change or delete user
            </h2>
            <div className={usersModule.container}>
                <ul className={usersModule["responsive-table"]}>
                    <li className={usersModule["table-header"]}>
                        <div className={`${usersModule.col} ${usersModule['col-1']}`}>Position</div>
                        <div className={`${usersModule.col} ${usersModule['col-2']}`}>First Name</div>
                        <div className={`${usersModule.col} ${usersModule['col-3']}`}>Last Name</div>
                        <div className={`${usersModule.col} ${usersModule['col-4']}`}>Email</div>
                    </li>
                    {
                        users && users.map((user, index) => {
                            if (index) {
                                return (
                                    <li
                                        key={index}
                                        className={usersModule["table-row"]}
                                        onDoubleClick={() => {
                                            setUser({ user });
                                            setNewUsers(true);
                                            setUsers(false);
                                        }}>
                                        <div className={`${usersModule.col} ${usersModule['col-1']}`} data-label="Position:">{user.isAdmin ? "Admin" : "User"}</div>
                                        <div className={`${usersModule.col} ${usersModule['col-2']}`} data-label="First Name:">{user.firstName}</div>
                                        <div className={`${usersModule.col} ${usersModule['col-3']}`} data-label="Last Name:">{user.lastName}</div>
                                        <div className={`${usersModule.col} ${usersModule['col-4']}`} data-label="Email:">{user.email}</div>
                                    </li>
                                )
                            }
                            return null
                        })
                    }
                </ul>
            </div>
        </section>
    )
}

export default Users;