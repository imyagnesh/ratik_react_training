import React from 'react';
import PageRouter from '../../components/PageRouter';

const About = ({ routes }) => (
  <div>
    <h1>About Page</h1>
    {routes && <PageRouter routes={routes} />}
  </div>
);

export default About;
