/*global wp*/
const { __ } = wp.i18n;

const Header = () => {
  return (
    <header>
      <div className="container">
        <div className="top">
          <h1 className="heading">{__('White Label Settings', 'neve')}</h1>
        </div>
      </div>
    </header>
  );
};

export default Header;
