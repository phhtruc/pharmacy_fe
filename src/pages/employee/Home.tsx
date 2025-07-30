import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div id="content-page" className="content-page">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-6 col-lg-3">
            <div className="iq-card iq-card-block iq-card-stretch iq-card-height overflow-hidden">
              <div className="iq-card-body pb-0">
                <div className="rounded-circle iq-card-icon iq-bg-primary">
                  <i className="ri-exchange-dollar-fill"></i>
                </div>
                <span className="float-right line-height-6">Net Worth</span>
                <div className="clearfix"></div>
                <div className="text-center">
                  <h2 className="mb-0">
                    <span className="counter">65</span>
                    <span>M</span>
                  </h2>
                  <p className="mb-0 text-secondary line-height">
                    <i className="ri-arrow-up-line text-success mr-1"></i>
                    <span className="text-success">10%</span> Increased
                  </p>
                </div>
              </div>
              <div id="chart-1"></div>
            </div>
          </div>
          <div className="col-md-6 col-lg-3">
            <div className="iq-card iq-card-block iq-card-stretch iq-card-height overflow-hidden">
              <div className="iq-card-body pb-0">
                <div className="rounded-circle iq-card-icon iq-bg-warning">
                  <i className="ri-bar-chart-grouped-line"></i>
                </div>
                <span className="float-right line-height-6">Todays Gains</span>
                <div className="clearfix"></div>
                <div className="text-center">
                  <h2 className="mb-0">
                    <span>$</span>
                    <span className="counter">4500</span>
                  </h2>
                  <p className="mb-0 text-secondary line-height">
                    <i className="ri-arrow-up-line text-success mr-1"></i>
                    <span className="text-success">20%</span> Increased
                  </p>
                </div>
              </div>
              <div id="chart-2"></div>
            </div>
          </div>
          <div className="col-md-6 col-lg-3">
            <div className="iq-card iq-card-block iq-card-stretch iq-card-height overflow-hidden">
              <div className="iq-card-body pb-0">
                <div className="rounded-circle iq-card-icon iq-bg-danger">
                  <i className="ri-pie-chart-line"></i>
                </div>
                <span className="float-right line-height-6">Expenses</span>
                <div className="clearfix"></div>
                <div className="text-center">
                  <h2 className="mb-0">
                    <span>$</span>
                    <span className="counter">2500</span>
                  </h2>
                  <p className="mb-0 text-secondary line-height">
                    <i className="ri-arrow-down-line text-danger mr-1"></i>
                    <span className="text-danger">5%</span> Decreased
                  </p>
                </div>
              </div>
              <div id="chart-3"></div>
            </div>
          </div>
        </div>
        <ul className="timeline">
          <li>
            <div className="timeline-dots border-primary"></div>
            <h6 className="float-left mb-1">Client Call</h6>
            <small className="float-right mt-1">19 November 2019</small>
            <div className="d-inline-block w-100">
              <p>
                Bonbon macaroon jelly beans gummi bears jelly lollipop apple
              </p>
            </div>
          </li>
          <li>
            <div className="timeline-dots border-warning"></div>
            <h6 className="float-left mb-1">Mega event</h6>
            <small className="float-right mt-1">15 November 2019</small>
            <div className="d-inline-block w-100">
              <p>
                Bonbon macaroon jelly beans gummi bears jelly lollipop apple
              </p>
            </div>
          </li>
        </ul>
        <div className="iq-card">
          <img
            src="images/small/img-1.jpg"
            className="img-fluid w-100 rounded"
            alt="E-store setup guide"
          />
          <div className="iq-card-header d-flex justify-content-between">
            <div className="iq-header-title">
              <h4 className="card-title">How to setup E-store</h4>
            </div>
            <div className="iq-card-header-toolbar d-flex align-items-center">
              <div className="dropdown">
                <span
                  className="dropdown-toggle"
                  id="dropdownMenuButton"
                  data-toggle="dropdown"
                  aria-label="Settings"
                >
                  <i className="ri-settings-5-fill"></i>
                </span>
                <div
                  className="dropdown-menu dropdown-menu-right"
                  aria-labelledby="dropdownMenuButton"
                >
                  <a className="dropdown-item" href="javascript:void(0)">
                    <i className="ri-eye-fill mr-2"></i>View
                  </a>
                  <a className="dropdown-item" href="javascript:void(0)">
                    <i className="ri-delete-bin-6-fill mr-2"></i>Delete
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
