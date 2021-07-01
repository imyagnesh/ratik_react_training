import React from 'react';
import PageRouter from '../../components/PageRouter';
import { LocaleContext } from '../../context/localeContex';

const About = ({ routes }) => (
  <div>
    <h1>About Page</h1>
    <LocaleContext.Consumer>
      {(value) => {
        return <p>{value.locale}</p>;
      }}
    </LocaleContext.Consumer>
    {routes && <PageRouter routes={routes} />}
  </div>
);

export default About;
