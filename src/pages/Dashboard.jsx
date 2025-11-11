import { motion } from "framer-motion";

export default function Dashboard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <h2 className="fw-bold mb-4">Dashboard Overview</h2>
      <div className="row g-3">
        <div className="col-md-3">
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <h6>Total Shipments</h6>
              <h4>152</h4>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <h6>Active Vehicles</h6>
              <h4>12</h4>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <h6>Pending Deliveries</h6>
              <h4>23</h4>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <h6>Revenue</h6>
              <h4>₹42,000</h4>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
