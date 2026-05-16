import React from "react";
import { useState, useEffect } from "react";
import "./Students.css";

// Students component
function Students() {

    // state to store student data
    const [student, setstudent] = useState([]);

    // loading state
    const [loading, setloading] = useState(true);

    // error state
    const [error, seterror] = useState(null);

    // API call on component mount
    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/users")
            .then(response => {

                // check if response is ok
                if (!response.ok) {
                    throw new Error("Network error");
                }

                return response.json();
            })

            .then(data => {
                // store data in state
                setstudent(data);
                setloading(false);
            })

            .catch(error => {
                // handle error
                seterror(error.message);
                setloading(false);
            });
    }, []);

    // show loading UI
    if (loading) {
        return <h2>Loading students...</h2>;
    }

    // show error UI
    if (error) {
        return <h2 style={{ color: "red" }}>{error}</h2>;
    }

    // main UI (table)
    return (
        <div className="student-container">
            <table>

                {/* table header */}
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>City</th>
                        <th>CompanyName</th>
                    </tr>
                </thead>

                {/* table body */}
                <tbody>
                    {student.map(items => (
                        <tr key={items.id}>
                            <td>{items.name}</td>
                            <td>{items.email}</td>
                            <td>{items.address?.city}</td>
                            <td>{items.company?.name}</td>
                        </tr>
                    ))}
                </tbody>

            </table>
        </div>
    );
}

export default Students;