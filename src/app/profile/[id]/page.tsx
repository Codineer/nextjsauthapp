import React from 'react'

const UserProfile = ({ params }: any) => {
    return (

        <span className='p-2 ml-2 rounded bg-orange-500 text-black'>
            {params.id}
        </span>

    )
}

export default UserProfile
