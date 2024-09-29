import React from 'react'

const PodcastDetails = ({ params }: { params: { podcast_id: string } }) => {
    return (
        <p className='text-white-1'>Details for {params.podcast_id}</p>
    )
}

export default PodcastDetails