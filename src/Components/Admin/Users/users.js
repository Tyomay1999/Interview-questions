import React, { useState, useEffect } from 'react';
import usersModule from './users.module.css';
import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
const Users = (props) => {
    const [users, setUsers] = useState([]);
    console.log("🚀 ~ file: users.js ~ line 8 ~ Users ~ user", users)
    useEffect(() => {
        firebase.database().ref("Users").on("value", user => {
            let userList = [];
            user.forEach(item => {
            // console.log("🚀 ~ file: users.js ~ line 13 ~ firebase.database ~ item", item)
                userList.push(item.val());
            });
            setUsers(userList)
        })
        // firebase.database().ref("Users/0").push({
        //     firstName: 'Lana',
        //     lastName: "ddaa",
        //     email: 'lana@mail.ru',
        //     password: 'Artyom2012'
        // })
        // firebase.database().ref("Users/user1").update({
        //     firstName: 'Lana',
        //     lastName: "sss",
        //     email: 'lana@mail.ru',
        //     password: 'Artyom2012',
        //     isAdmin: false
        // })

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
                                if(typeof(user.id) === "number"){
                                    return (
                                        <tr key={index + 1}>
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