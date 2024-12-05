import React from 'react'
import {

  LiveblocksProvider,

  RoomProvider,

} from "@liveblocks/react/suspense";

const Document = () => {
  return (
    <div>
      <RoomProvider id='123'>
        {/* Add your children components here */}
        <div>Document Content</div>
      </RoomProvider>
    </div>
  )
}

export default Document