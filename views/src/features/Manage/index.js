import {React} from "react";

import {Route, useRouteMatch, Switch} from "react-router-dom";

import NotFound from "../../components/NotFound";
import MenuManage from "./components/MenuManage";
import addProduct from "./pages/AddProduct";
import ListProducts from "./pages/ListProducts";
import ListOrders from "./pages/ListOrders";
import MainPage from "./pages/Main";
import AddWareHouse from "./components/AddWareHouse";
import AddTypeProduct from "./components/AddTypeProduct";


function Manage() {
  const match = useRouteMatch();
  return (
    <div>
      <MenuManage />
      <Switch>
        <Route exact path={match.url} component={MainPage} />
        <Route path={`${match.url}/add`} component={addProduct} />
        <Route path={`${match.url}/products`} component={ListProducts} />
        <Route path={`${match.url}/list_orders`} component={ListOrders} />
        <Route path={`${match.url}/ware_house`} component={AddWareHouse} />
        <Route path={`${match.url}/type_product`} component={AddTypeProduct} />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
}

export default Manage;
