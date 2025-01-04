import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLeads } from '../redux/actions/leadActions';
import { getStats } from '../redux/actions/leadActions'; // Make sure this action is available

const Dash = () => {
  const dispatch = useDispatch();
  // const leads = useSelector(state => state.leads.leads);
  const stats = useSelector(state => state.leads.stats);  // Assuming stats are in the Redux state

  useEffect(() => {
    dispatch(fetchLeads());
    dispatch(getStats());
  }, [dispatch]);

  return (
    <>
     

      <div className="row mt-4">
        <div className="col-md-3">
          <div className="card text-center">
            <div className="card-body">
              <h5>Total Leads</h5>
              <h2>{stats ? stats.totalLeads : 0}</h2>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-center">
            <div className="card-body">
              <h5>New Leads</h5>
              <h2>{stats ? stats.newLeads : 0}</h2>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-center">
            <div className="card-body">
              <h5>Contacted Leads</h5>
              <h2>{stats ? stats.contactedLeads : 0}</h2>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-center">
            <div className="card-body">
              <h5>Unqualified Leads</h5>
              <h2>{stats ? stats.unqualifiedLeads : 0}</h2>
            </div>
          </div>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-md-8">
          <div className="card">
            <div className="card-body">
              <h5>Closed Leads</h5>
              <canvas id="salesChart"></canvas>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h5>Top Products</h5>
              <canvas id="productsChart"></canvas>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dash;
