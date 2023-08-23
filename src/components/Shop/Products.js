import ProductItem from './ProductItem';
import classes from './Products.module.css';

const Products = (props) => {
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        <ProductItem
          title='First Test'
          price={10}
          description='This is a first product - amazing!'
        />
        <ProductItem
          title='Second Test'
          price={6}
          description='This is a Second  product - amazing!'
        />
        <ProductItem
          title='Third Test'
          price={2}
          description='This is a Third product - amazing!'
        />
      </ul>
    </section>
  );
};

export default Products;
