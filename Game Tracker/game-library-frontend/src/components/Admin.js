import {useEffect, useState} from 'react';
import {API_ENDPOINT} from "../config";
import axios from "axios";
function Admin() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get(API_ENDPOINT + '/users/all')
            .then(response => {
                setUsers(response.data);
            })
            .catch(error => console.error('Error fetching users:', error));
    }, []);

    //console.log("Value of names" + users)

    return (
        <div className="App">
            <h1>Accounts</h1>
            <ol className="list-group list-group-numbered">

                {users.map((data) => {
                    return(
                        <li className="list-group-item" key={data.id}> {data.username} </li>
                    )
                })}
            </ol>
        </div>
    );
}
export default Admin;