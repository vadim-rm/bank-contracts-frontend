import "./Account.css";
import {Link} from "react-router-dom";

interface CartProps {
    accountId?: number;
    itemCount?: number;
}

const Cart: React.FC<CartProps> = ({accountId, itemCount}) => {
    const enabled = !!accountId && !!itemCount;
    return (
        <Link className={`cart ${!enabled ? "cart-disabled" : ""}`}
              to={enabled ? `/accounts/${accountId}` : ""}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-shopping-cart"
            >
                <circle cx="8" cy="21" r="1"/>
                <circle cx="19" cy="21" r="1"/>
                <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/>
            </svg>
            {enabled && <span className="cart-badge">{itemCount}</span>}
        </Link>
    );
};

export default Cart;