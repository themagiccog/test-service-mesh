// function HomeButton() {
//   return (
//     <button>
//       I'm a button
//     </button>
//   );
// }

// export default HomeButton;


// function MyButton() {
//   function handleClick() {
//     alert('You clicked me!');
//   }

//   return (
//     <button onClick={handleClick}>
//       Click me
//     </button>
//   );
// }
// export default MyButton;


import { useNavigate } from 'react-router-dom';

function HomeButton(){

  const navigate = useNavigate();

  function goHome() {
    navigate('/');
  }

  return (
    <button className="btn btn-info" onClick={goHome}>
     ◀️ Home
    </button>
  );
};

export default HomeButton;