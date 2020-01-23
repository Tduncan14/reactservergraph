import React from 'react';
import styled from 'styled-components';
import SubHeader from '../Header/SubHeader';
import ProductItem from './ProductItem';
import {Query} from 'react-apollo';
import gql from 'graphql-tag';



const GET_PRODUCTS = gql`
query getProducts{

  products{
    id
    title
    thumbnail
  }
}
`


const ProductItemsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  flex-direction: column;
  margin: 2% 5%;
`;

const Alert = styled.span`
  width: 100%;
  text-align: center;
`;

const Products = ({ match,history }) => (
  // const isEmpty = products.length === 0 ? 'No products available' : false;


    <>
      {history && (
        <SubHeader
          title='Available products'
          goToCart={() => history.push('/cart')}
        />
      )}
      <Query query ={GET_PRODUCTS}>
        {({data,error,loading }) =>{


  if(loading || error){
    return <Alert>
      {loading ? 'Loading': error}
    </Alert>
  }
  return(
  <ProductItemsWrapper>
  {data.products &&
    data.map(product => (
    <ProductItem key={product.id} data={product} />

    
  ))}
</ProductItemsWrapper>


   ) }}
 

      </Query>
     
    </>

)

// Products.defaultProps = {
//   loading: false,
//   error: '',
//   products: [],
// };

export default Products;