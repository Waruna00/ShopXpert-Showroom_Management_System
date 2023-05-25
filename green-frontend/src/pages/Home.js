import React, { useEffect, useState } from 'react'
import axios from 'axios'

export default function Home() {
    const [Users, setUsers] = useState([]);

    useEffect(() => {
        //console.log("setUser on progress..");
        loadUsers();
    }, [1]);

    const loadUsers = async () => {
        const result = await axios.get("http://localhost:8080/getUsers");
        setUsers(result.data);
        console.log(result.data);
    }

    return (
        <div className='container'>
            <div className='py-4'>
                <table className="table border shadow">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">First Name</th>
                            <th scope="col">Username</th>
                            <th scope="col">email</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            Users.map((user, index) => (
                                <tr>
                                    <th scope="row" key={index}>
                                        {index +1}
                                    </th>
                                    <td>{user.fname}</td>
                                    <td>{user.username}</td>
                                    <td>{user.email}</td>
                                </tr>
                            ))
                        }

                    </tbody>
                </table>
            </div>
        </div>
    )
}
