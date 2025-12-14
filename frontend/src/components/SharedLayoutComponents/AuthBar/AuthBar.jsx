// import style from './AuthBar.module.css';

// const AuthBar = () => {
//   return (
//     <div class="toggle-group">
//       <button className={`${style.togglebutton} inactive`}>SIGN IN</button>
//       <button className={`${style.togglebutton} active`}>SIGN UP</button>
//     </div>
//   );
// };

// export default AuthBar;
import React, { useState } from 'react';
import './AuthBar.module.css'; // Optional: move styles to a separate file

const AuthBar = () => {
  const [active, setActive] = useState('signup'); // default active

  return (
    <div className="toggle-group">
      <button
        className={`toggle-button ${active === 'signin' ? 'active' : 'inactive'}`}
        onClick={() => setActive('signin')}>
        SIGN IN
      </button>
      <button
        className={`toggle-button ${active === 'signup' ? 'active' : 'inactive'}`}
        onClick={() => setActive('signup')}>
        SIGN UP
      </button>
    </div>
  );
};

export default AuthBar;
