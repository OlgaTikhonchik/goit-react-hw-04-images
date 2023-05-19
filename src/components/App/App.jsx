import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { Searchbar } from 'components/Searchbar';
import { ImageGallery } from 'components/ImageGallery';
import { AppContainer } from './App.styled';

export function App() {
  const [textSearch, setTextSearch] = useState('');

  const handleSubmit = textSearch => {
    setTextSearch(textSearch);
  };

  return (
    <AppContainer>
      <Searchbar onSubmit={handleSubmit} />
      <ImageGallery value={textSearch} />
      <ToastContainer autoClose={3000} />
    </AppContainer>
  );
}

// export class App extends Component {
//   state = {
//     textSearch: '',
//   };

//   handleSubmit = textSearch => {
//     this.setState({ textSearch });
//   };

//   render() {
//     const { textSearch } = this.state;

//     return (
//       <AppContainer>
//         <Searchbar onSubmit={this.handleSubmit} />
//         <ImageGallery value={textSearch} />
//         <ToastContainer autoClose={3000} />
//       </AppContainer>
//     );
//   }
// }
