import React from 'react';
import backgroundImage from '../assets/images/salon_kanapa.webp';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function Hero({
  title = 'Nowa Kolekcja Mebli',
  subtitle = 'Odkryj naszą najnowszą kolekcję mebli, które odmienią Twoje wnętrze!',
}) {
  return (
    <>
      <section
        className="relative h-[70vh] bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        {/* <!-- Treść hero --> */}
        <div className="relative z-10 max-w-xs text-center text-black p-12 bg-white rounded-xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{title}</h1>
          <p className="text-lg md:text-xl mb-6">{subtitle}</p>
          <Link
            to="/products?collection=nowa-kolekcja"
            className="inline-block bg-white text-black font-semibold px-6 py-3 rounded-md hover:bg-gray-200 border border-black transition"
          >
            Zobacz kolekcję
          </Link>
        </div>
      </section>
    </>
  );
}

export default Hero;

Hero.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
};
