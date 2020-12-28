import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Modal, Title } from '../shared';

export default function NotFound(): JSX.Element {
  return (
    <Modal>
      <Title centered>Oops! Not found!</Title>
      <Link to="/">
        <Button>Back to Login page</Button>
      </Link>
    </Modal>
  );
}
