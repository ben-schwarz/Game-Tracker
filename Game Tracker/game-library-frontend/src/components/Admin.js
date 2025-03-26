import {useEffect, useState} from 'react';
import {API_ENDPOINT} from "../config";
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

    return (
        <div className="App">
            <h1>Accounts</h1>
            <table align="center">
                <thead>
                <tr>
                    <th scope="col">Id</th>
                    <th scope="col">Username</th>
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
                        </tr>)
                })}
                </tbody>
            </table>
        </div>
    );
}

export default Admin;