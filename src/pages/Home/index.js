import React, { useContext } from 'react';
import { LocaleContext } from '../../context/localeContex';

const Home = (props) => {
  console.log('Home Render');
  const { locale, setLocale } = useContext(LocaleContext);

  return (
    <div>
      <h1>Home Page</h1>

      <div>
        <p>{locale}</p>
        <button
          type="button"
          onClick={() => {
            setLocale('pr');
          }}
        >
          Change Locale
        </button>
      </div>

      <button
        type="button"
        onClick={() => {
          props.history.push('/contact');
        }}
      >
        Go to contact page
      </button>
    </div>
  );
};

export default Home;
