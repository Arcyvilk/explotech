import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Modal, Title } from '../shared';

type NotFoundProps = {
  type?: 'notfound' | 'noperms';
};

export default function NotFound(props: NotFoundProps): JSX.Element {
  const { type } = props;
  const message = () => {
    if (type === 'notfound') {
      return 'Oops! Not found!';
    }
    if (type === 'noperms') {
      return 'You need to log in to this room to be able to access it!';
    }
    return 'Something went wrong!';
  };

  return (
    <Modal>
      <Title centered style={{ marginBottom: '16px' }}>
        {message()}
      </Title>
      <Link to="/">
        <Button>Back to Login page</Button>
      </Link>
      <div style={{}} />
    </Modal>
  );
}
