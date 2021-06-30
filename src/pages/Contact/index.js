import React from 'react';
import PageRouter from '../../components/PageRouter';

const Contact = ({ history, routes }) => (
  <div>
    {routes && <PageRouter routes={routes} />}
    <button
      type="button"
      onClick={() => {
        history.replace('/about');
      }}
    >
      Redirect To About Page
    </button>
  </div>
);

export default Contact;
