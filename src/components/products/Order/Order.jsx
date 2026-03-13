import "./Order.css";

export default function Order   ({ product, close }) {
  return (
    <div className="modal-backdrop">
      <div className="modal-box">
        <button className="close-btn" onClick={close}>✕</button>

        <h3>Order / Sample Request</h3>

        <form>
          <input type="text" value={product} readOnly />

          <input type="text" placeholder="Your Name" required />
          <input type="email" placeholder="Email Address" required />
          <input type="text" placeholder="Phone Number" />

          <select>
            <option>Request Type</option>
            <option>Sample</option>
            <option>Bulk Order</option>
          </select>

          <textarea placeholder="Additional Requirements"></textarea>

          <button type="submit" className="submit-btn">
            Submit Request
          </button>
        </form>
      </div>
    </div>
  );
}
