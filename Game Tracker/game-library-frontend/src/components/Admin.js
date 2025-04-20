import {useEffect, useState} from 'react';
import {API_BASE_URL, API_ENDPOINT} from "../config";
import axios from "axios";
import {TableCell} from "@mui/material";
function Admin() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get(API_ENDPOINT + '/users/all')
            .then(response => {
                setUsers(response.data);
            })
            .catch(error => console.error('Error fetching users:', error));
    }, []);

    const handleDelete = async (id) => {
        console.log(id);
        try {
            const response = await fetch(`${API_ENDPOINT}/users/`+id, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id }),
            });

            const data = await response.text();

            if (response.ok) {
                alert("Account deleted successfully!");
                window.location.reload()
            } else {
                alert(data || "Failed to delete account");
            }
        } catch (error) {
            console.error("Deletion error:", error);
            alert("An error occurred. Please try again.");
        }
    };

    return (
        <div className="App">
            <h1>Accounts</h1>
            <table align="center">
                <thead>
                <tr>
                    <th scope="col">Id</th>
                    <th scope="col">Username</th>
                    <th scope="col">Manage</th>
                </tr>
                </thead>
                <tbody>
                {users.map((data) => {
                    return (
                        <tr>
                            <TableCell>
                                {data.id}
                            </TableCell>
                            <TableCell>
                                {data.username}
                            </TableCell>
                            <TableCell>
                                <button onClick={() => handleDelete(data.id)}>
                                    Delete
                                </button>
                            </TableCell>
                        </tr>)
                })}
                </tbody>
            </table>
        </div>
    );
}

export default Admin;