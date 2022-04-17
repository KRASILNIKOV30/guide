import { Link, Outlet } from "react-router-dom";
import styles from './App.module.css';

const App = () => {
    return (
        <div className={styles.main_container}>
            <h1>Bookkeeper</h1>
                <nav
                    style={{
                    borderBottom: "solid 1px",
                    paddingBottom: "1rem",
                    }}
                >
                    <Link to="/invoices">Invoices</Link> |{" "}
                    <Link to="/expenses">Expenses</Link>
                </nav>
                <Outlet />
        </div>  
    )
}

export { App }