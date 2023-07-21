import React, { useState, useEffect } from "react";
import axios from "axios";

const NewMailing = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [users, setUsers] = useState([]);  // Store users in an array

    const wpUser = 'chris';
    const appPassword = 'eGoz Pfse M20p tuBM dSfn cr3h';

    const fetchData = async () => {
        setIsError(false);
        setIsLoading(true);

        const config = {
            method: 'get',
            url: `https://blomsbulbs.com/wp-json/custom/v1/orders_by_date/?start_date=2023-07-01&end_date=2023-07-20`,
            auth: {
                username: wpUser,
                password: appPassword
            },
        };

        try {
            const response = await axios(config);

            const users = response.data.map(user => ({
                title: user.title,
                firstName: user.first_name,
                lastName: user.last_name,
                line1: user.address_line_1,
                line2: user.address_line_2,
                city: user.city,
                postcode: user.postcode,
                country: user.country,
                customerNumber: user.legacy_id,
                emailAddress: user.email_address,
                userId: user.user_id
            }));

            setUsers(users);
            setIsLoading(false);
        } 
        catch (error) {
            setIsError(true);
            console.log(error);
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchData();
    }, [])  // Run fetch data when the component mounts

    return (
        <div className="lower-container">
            <h1>New Mailing</h1>
            {isLoading ? (
                <div>Loading...</div>
            ) : isError ? (
                <div>Error occurred.</div>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Line 1</th>
                            <th>Line 2</th>
                            <th>City</th>
                            <th>Postcode</th>
                            <th>Country</th>
                            <th>Customer Number</th>
                            <th>Email Address</th>
                            <th>User Id</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user.userId}>
                                <td>{user.title}</td>
                                <td>{user.firstName}</td>
                                <td>{user.lastName}</td>
                                <td>{user.line1}</td>
                                <td>{user.line2}</td>
                                <td>{user.city}</td>
                                <td>{user.postcode}</td>
                                <td>{user.country}</td>
                                <td>{user.customerNumber}</td>
                                <td>{user.emailAddress}</td>
                                <td>{user.userId}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default NewMailing;
