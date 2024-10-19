import { UserButton, useUser } from '@clerk/clerk-react';
import React from 'react'

const DashBoard = () => {
    const {user} = useUser();
    console.log(user);
    return (
        <div>
            This is DashBoard <br/>
            Dit me {user?.username}<br/>
            m ten la {user?.firstName} dung ko {user?.fullName}
            <UserButton />
        </div>
    )
}

export default DashBoard;
