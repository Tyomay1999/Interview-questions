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
            <h2 className={usersModule.h2}>Users</h2>
            <div className={usersModule.tbl_header}>
                <table className={usersModule.table} cellPadding="0" cellSpacing="0" border="0">
                    <thead>
                        <tr>
                            <th>Num</th>
                            <th>Admin</th>
                            <th>FirstName</th>
                            <th>LastName</th>
                            <th>Email</th>
                        </tr>
                    </thead>
                </table>
            </div>
            <div className={usersModule.tbl_content}>
                <table className={usersModule.table} cellPadding="0" cellSpacing="0" border="0">
                    <tbody>
                        {
                            users && users.map((user, index) => {
                                if (typeof (user.id) === "number") {
                                    return (
                                        <tr key={index + 1} onDoubleClick={() => {
                                            setUser({ user });
                                            setNewUsers(true);
                                            setUsers(false);
                                        }}>
                                            <td>{user.id}</td>
                                            <td>{user.isAdmin ? "Yes" : "No"}</td>
                                            <td>
                                                <p className={usersModule.question}>{user.firstName}</p>
                                            </td>
                                            <td>{user.lastName}</td>
                                            <td>{user.email}</td>
                                        </tr>
                                    )
                                }
                            })
                        }
                    </tbody>
                </table>
            </div>
        </section>
    )
}

export default Users;