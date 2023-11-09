import logo from "./logo.svg";
import "./App.css";
import UserLogin from "./Components/authentication/Authentication";
import { Route, Routes} from "react-router-dom";
import AdminDashBoard from "./Components/admin/AdminDashBoard";
import Addbank from "./Components/bank/AddBank";
import CustomerDashBoard from "./Components/customer/CustomerDashBoard";
import AddCustomer from "./Components/customer/AddCustomer";
import AddAccount from "./Components/account/AddAccount";
import ShowAllAccount from "./Components/account/ShowAllAccount";
import ShowBank from "./Components/bank/ShowBank";
import ShowCustomer from "./Components/customer/ShowCustomer";
import Transaction from "./Components/bank/Transfer";
import PassBook from "./Components/bank/PassBook";

function App() {
    return(
      <Routes>
        <Route exact path="/" element={<UserLogin></UserLogin>}></Route>
        <Route
          exact
          path="/admin_dash_board"
          element={<AdminDashBoard />}
        ></Route>
        <Route
          exact
          path="/customer_dash_board"
          element={<CustomerDashBoard />}
        ></Route>
        <Route exact path="/add_bank" element={<Addbank />}></Route>
        <Route exact path="/add_customer" element={<AddCustomer />}></Route>
        <Route exact path="/add_account" element={<AddAccount />}></Route>
        <Route exact path="/get_account" element={<ShowAllAccount />}></Route>
        <Route exact path="/get_bank" element={<ShowBank/>}></Route>
        <Route exact path="/get_customer" element={<ShowCustomer/>}></Route>
        <Route exact path="/transaction" element={<Transaction/>}></Route>
        <Route exact path="/passbook" element={<PassBook/>}></Route>      
      </Routes>
   
  );
}

export default App;
