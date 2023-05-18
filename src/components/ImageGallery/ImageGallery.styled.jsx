import styled from '@emotion/styled';

export const GalleryList = styled.ul`
  display: grid;
  max-width: calc(100vw - 48px);
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  grid-gap: 20px;
  place-content: center;
  margin-top: 0;
  margin-bottom: 0;
  padding: 0;
  list-style: none;
  margin-left: auto;
  margin-right: auto;

  //   padding-top: 50px;

  //   list-style: none;
  //   max-width: calc(100vw - 48px);
  //   flex-basis: calc((100% - 30px) / 5);
  //   cursor: pointer;

  //   transition: scale 200ms linear;
  //   display: flex;
  //   justify-content: center;
  //   align-items: baseline;
  //   flex-wrap: wrap;
  //   gap: 30px;
`;
