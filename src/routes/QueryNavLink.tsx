import { useLocation, NavLink } from "react-router-dom";

type QueryNavLinkProps = {
    to: string
}

const QueryNavLink = ({ to, ...props }: QueryNavLinkProps) => {
  let location = useLocation();
  return <NavLink to={to + location.search} {...props} />;
}

export default QueryNavLink