import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Home() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {
        const result = await axios.get("http://localhost:3002/users");
        setUsers(result.data.reverse());
    };
    const deleteUser = async (id) => {
        await axios.delete(`http://localhost:3002/users/${id}`);
        loadUsers();
    };

    return (
        <div className="container">
            <div className="py-4">
                <h1>Home Page</h1>
                <table
                    className="table shadow
                "
                >
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">UserName</th>
                            <th scope="col">Email</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr key={index}>
                                <th scope="row">{index + 1}</th>
                                <td>{user.name}</td>
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                                <td>
                                    <Link
                                        to={`/users/${user.id}`}
                                        className="btn btn-primary mr-2"
                                    >
                                        Wiew
                                    </Link>
                                    <Link
                                        to={`/users/edit/${user.id}`}
                                        className="btn btn-outline-primary mr-2"
                                    >
                                        Edit
                                    </Link>
                                    <Link
                                        to="/"
                                        className="btn btn-danger"
                                        onClick={() => deleteUser(user.id)}
                                    >
                                        Delete
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Home;
