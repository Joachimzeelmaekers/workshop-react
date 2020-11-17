import React from 'react';
import {useParams} from 'react-router-dom';

function ShowDetail() {
  const params = useParams();

  return (
    <div>This is the detail page of the show with id: {params.show_id}</div>
  );
}

export default ShowDetail;
