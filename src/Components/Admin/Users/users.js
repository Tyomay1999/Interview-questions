import React, { useState, useEffect } from 'react';
import usersModule from './users.module.css';
import { firebaseDatabase } from '../../../functions';
const Users = ({ setUser, setNewUsers, setUsers, languages }) => {
    const [users, getUsers] = useState([]);
    const [language, getLanguage] = useState(languages);
    useEffect(() => {
        firebaseDatabase().ref("Users").on("value", user => {
            let userList = [];
            user.forEach(item => {
                userList.push(item.val());
            });
            getUsers(userList)
        })
        getLanguage(languages)
    }, [languages]);

    return (
        <section className={usersModule.Users}>
            <h2 className={usersModule.info}>
                {(language === 0) ? "Double click to change or remove user"
                    : (language === 1) ? "Дважды щелкните мышью, чтобы изменить или удалить пользователя"
                        : "Կատարեք մկնիկի կրկնակի սեղմում, օգտվողի տվյալները փոփոխելու համար"}
            </h2>
            <div className={usersModule.container}>
                <ul className={usersModule["responsive-table"]}>
                    <li className={usersModule["table-header"]}>
                        <div className={`${usersModule.col} ${usersModule['col-1']}`}>
                            {(language === 0) ? "Status" : (language === 1) ? "Статус" : "Կարգավիճակը"}
                        </div>
                        <div className={`${usersModule.col} ${usersModule['col-2']}`}>
                            {(language === 0) ? "First Name" : (language === 1) ? "Имя" : "Անուն"}
                        </div>
                        <div className={`${usersModule.col} ${usersModule['col-3']}`}>
                            {(language === 0) ? "Last Name" : (language === 1) ? "Фамилия" : "Ազգանուն"}
                        </div>
                        <div className={`${usersModule.col} ${usersModule['col-4']}`}>
                            {(language === 0) ? "Email" : (language === 1) ? "Эл. адрес" : "Էլ.հասցե"}
                        </div>
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
                                        <div
                                            className={`${usersModule.col} ${usersModule['col-1']}`}
                                            data-label={(language === 0) ? "Status" : (language === 1) ? "Статус" : "Կարգավիճակը"}
                                        >{user.isAdmin ?
                                            ((language === 0) ? "Admin" : (language === 1) ? "Админ" : "Ադմին.")
                                            : ((language === 0) ? "User" : (language === 1) ? "Пользователь" : "Օգտվող")
                                            }</div>
                                        <div
                                            className={`${usersModule.col} ${usersModule['col-2']}`}
                                            data-label={(language === 0) ? "First Name" : (language === 1) ? "Имя" : "Անուն"}
                                        >{user.firstName}</div>
                                        <div
                                            className={`${usersModule.col} ${usersModule['col-3']}`}
                                            data-label={(language === 0) ? "Last Name" : (language === 1) ? "Фамилия" : "Ազգանուն"}
                                        >{user.lastName}</div>
                                        <div
                                            className={`${usersModule.col} ${usersModule['col-4']}`}
                                            data-label={(language === 0) ? "Email" : (language === 1) ? "Эл. адрес" : "Էլ.հասցե"}
                                        >{user.email}</div>
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