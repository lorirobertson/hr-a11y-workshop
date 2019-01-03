import React from 'react';
import { Route, Link } from 'react-router-dom';
import { Layout } from '../components/layout';
import { 
  ProductList,
  ProductDetail,
  ShoppingCart,
  Checkout,
  Confirmation
} from '../components/StuffShop';

class StuffShop extends React.Component {
  constructor(props) {
    super(props)

    this.state = {}
  }

  componentDidMount() {
    document.title = 'Stuff Shop';
  }

  render() {
    const match = this.props.match;

    return (
      <Layout useTopbar="true" useSidebar="true" className="box-shadow">
        <Route path={`${match.path}`} exact component={ProductList}/>
        <Route path={`${match.path}/product/:id`} component={ProductDetail}/>
        <Route path={`${match.path}/cart`} component={ShoppingCart}/>
        <Route path={`${match.path}/checkout`} component={Checkout}/>
        <Route path={`${match.path}/order-confirmation`} component={Confirmation}/>
      </Layout>
    )
  }
}

export default StuffShop;