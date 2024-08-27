export default function Home() {
    return (
        <div>
            <ul className="flex flex-col space-y-4">
                <li>
                    <a href="/login">Login Page</a>
                </li>
                <li>
                    <a href="/register">Register Page</a>
                </li>
                <li>
                    <a href="/products">Products Page</a>
                </li>
                <li>
                    <a href="/cart">Cart Page</a>
                </li>
                <li>
                    <a href="/checkout">Checkout Page</a>
                </li>
            </ul>
        </div>
    );
}
