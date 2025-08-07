import React, { useState, useEffect } from "react";
import {
  getAllMedicines,
  deleteMedicine,
} from "../../services/medicineService";
import { toast } from "react-toastify";
import { Medicine } from "../../models/Medicine";
import { useNavigate, useLocation } from "react-router-dom";
import Pagination from "../../components/Pagination";

const MedicineManager = () => {
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  const getInitialPage = () => {
    const queryParams = new URLSearchParams(location.search);
    const page = parseInt(queryParams.get("page") || "1", 10);
    return page > 0 ? page : 1;
  };

  const [currentPage, setCurrentPage] = useState(getInitialPage());
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    queryParams.set("page", currentPage.toString());
    navigate(`${location.pathname}?${queryParams.toString()}`, {
      replace: true,
    });
  }, [currentPage, location.pathname, navigate]);

  useEffect(() => {
    fetchMedicines(currentPage);
  }, [currentPage]);

  const fetchMedicines = async (page: number) => {
    try {
      setLoading(true);
      const response = await getAllMedicines(page, pageSize);
      setMedicines(response.data.items || []);
      setCurrentPage(response.data?.page);
      setTotalPages(response.data?.totalPages);
      setPageSize(response.data?.pageSize);
      setError(null);
    } catch (error) {
      setError("Failed to fetch medicines");
      toast.error("Could not load medicines. Please try again later.");
      console.error("Error fetching medicines:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this medicine?")) {
      try {
        await deleteMedicine(id);
        toast.success("Medicine deleted successfully");
        fetchMedicines(currentPage);
      } catch (error) {
        toast.error("Failed to delete medicine");
      }
    }
  };

  return (
    <div id="content-page" className="content-page">
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12">
            <div className="iq-card">
              <div className="iq-card-header d-flex justify-content-between">
                <div className="iq-header-title">
                  <h4 className="card-title">Medication management</h4>
                </div>
              </div>
              <div className="iq-card-body">
                <div id="table" className="table-editable">
                  <span className="table-add float-right mb-3 mr-2">
                    <button
                      className="btn btn-sm iq-bg-success"
                      onClick={() => navigate("/employee/medicines/add")}
                    >
                      <i className="ri-add-fill">
                      <span className="pl-1">Add New</span>
                      </i>
                    </button>
                  </span>
                  {loading ? (
                    <div className="text-center">
                      <div className="spinner-border" role="status">
                        <span className="sr-only">Loading...</span>
                      </div>
                    </div>
                  ) : error ? (
                    <div className="alert alert-danger">{error}</div>
                  ) : (
                    <table className="table table-bordered table-responsive-md table-striped text-center">
                      <thead>
                        <tr>
                          <th>STT</th>
                          <th>Code</th>
                          <th>Name</th>
                          <th>Price</th>
                          <th>Origin</th>
                          <th>Kind Medicine</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {medicines.length > 0 ? (
                          medicines.map((medicine, index) => (
                            <tr key={medicine.id}>
                              <td>
                                {(currentPage - 1) * pageSize + index + 1}
                              </td>
                              <td>{medicine.code}</td>
                              <td>{medicine.name}</td>
                              <td>{medicine.price} VND</td>
                              <td>{medicine.origin}</td>
                              <td>{medicine.kindOfMedicineEntity?.name}</td>
                              <td>
                                <button
                                  className="btn btn-sm btn-info mr-2"
                                  onClick={() =>
                                    navigate(
                                      `/employee/medicines/${medicine.id}`
                                    )
                                  }
                                  title="Detail"
                                >
                                  <i className="ri-information-line"></i>
                                </button>
                                <button
                                  className="btn btn-sm btn-primary mr-2"
                                  onClick={() =>
                                    navigate(
                                      `/employee/medicines/edit/${medicine.id}`
                                    )
                                  }
                                  title="Edit"
                                >
                                  <i className="ri-edit-line"></i>
                                </button>
                                <button
                                  className="btn btn-sm btn-danger"
                                  onClick={() => handleDelete(medicine.id)}
                                  title="Delete"
                                >
                                  <i className="ri-delete-bin-line"></i>
                                </button>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan={7} className="text-center">
                              No medicines found
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  )}
                </div>
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                  maxPagesToShow={10}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicineManager;
