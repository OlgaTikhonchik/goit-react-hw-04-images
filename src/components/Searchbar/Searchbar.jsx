import { useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { HiMagnifyingGlass } from 'react-icons/hi2';
import {
  SearchForm,
  SearchFormButton,
  SearchFormInput,
  SearchbarContainer,
} from './Searchbar.styled';

export function Searchbar({ onSubmit }) {
  const [value, setValue] = useState('');

  const handleChange = event => {
    setValue(event.currentTarget.value.toLowerCase());
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (value.trim() === '') {
      return toast.info('Please enter key words for search', {
        position: 'top-center',
        theme: 'colored',
      });
    }

    onSubmit(value);
    setValue('');
  };

  return (
    <SearchbarContainer>
      <SearchForm onSubmit={handleSubmit}>
        <SearchFormButton type="submit">
          <HiMagnifyingGlass size="24" />
        </SearchFormButton>

        <SearchFormInput
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={value}
          onChange={handleChange}
        />
      </SearchForm>
    </SearchbarContainer>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

// export class Searchbar extends Component {
//   state = {
//     value: '',
//   };

//   handleChange = event => {
//     this.setState({ value: event.currentTarget.value.toLowerCase() });
//   };

//   handleSubmit = event => {
//     event.preventDefault();
//     if (this.state.value.trim() === '') {
//       // return alert('Please enter key words for search');
//       return toast.info('Please enter key words for search', {
//         position: 'top-center',
//         theme: 'colored',
//       });
//     }

//     this.props.onSubmit(this.state.value);
//     this.setState({ value: '' });
//   };

//   render() {
//     const { value } = this.state;

//     return (
//       <SearchbarContainer>
//         <SearchForm onSubmit={this.handleSubmit}>
//           <SearchFormButton type="submit" className="button">
//             <HiMagnifyingGlass size="24" />
//           </SearchFormButton>

//           <SearchFormInput
//             type="text"
//             autoComplete="off"
//             autoFocus
//             placeholder="Search images and photos"
//             value={value}
//             onChange={this.handleChange}
//           />
//         </SearchForm>
//       </SearchbarContainer>
//     );
//   }
// }

// Searchbar.propTypes = {
//   onSubmit: PropTypes.func.isRequired,
// };
