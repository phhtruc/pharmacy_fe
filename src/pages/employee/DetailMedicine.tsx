import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchMedicineById } from "../../services/medicineService";
import { Medicine } from "../../models/Medicine";
import { toast } from "react-toastify";

const DetailMedicine: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [medicine, setMedicine] = useState<Medicine | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMedicine = async () => {
      try {
        setLoading(true);
        if (id) {
          const medicineData = await fetchMedicineById(id);
          setMedicine(medicineData);
        } else {
          setError("Không tìm thấy ID thuốc");
        }
      } catch (err) {
        console.error("Error fetching medicine:", err);
        setError("Đã xảy ra lỗi khi tải dữ liệu thuốc");
        toast.error("Đã xảy ra lỗi khi tải dữ liệu thuốc");
      } finally {
        setLoading(false);
      }
    };

    fetchMedicine();
  }, [id]);

  const handleEdit = () => {
    navigate(`/employee/medicines/${id}/edit`);
  };

  const handleBack = () => {
    navigate("/employee/medicines");
  };

  if (loading) {
    return (
      <div id="content-page" className="content-page">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12 text-center p-5">
              <div className="spinner-border text-primary" role="status">
                <span className="sr-only">Loading...</span>
              </div>
              <p className="mt-2">Đang tải dữ liệu...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !medicine) {
    return (
      <div id="content-page" className="content-page">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12 text-center p-5">
              <div className="alert alert-danger" role="alert">
                {error || "Không tìm thấy thuốc"}
              </div>
              <button className="btn btn-secondary" onClick={handleBack}>
                Quay lại danh sách
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div id="content-page" className="content-page">
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-12">
            <div className="iq-card">
              <div className="iq-card-header d-flex justify-content-between">
                <div className="iq-header-title">
                  <h4 className="card-title">Chi tiết thuốc</h4>
                </div>
                <div>
                  <button className="btn btn-primary mr-2" onClick={handleEdit}>
                    <i className="ri-pencil-line"></i> Chỉnh sửa
                  </button>
                  <button className="btn btn-secondary" onClick={handleBack}>
                    <i className="ri-arrow-left-line"></i> Quay lại
                  </button>
                </div>
              </div>
              <div className="iq-card-body">
                <div className="row mb-4">
                  <div className="col-md-8">
                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <h6 className="text-muted mb-1">Tên thuốc:</h6>
                        <h5>{medicine.name}</h5>
                      </div>
                      <div className="col-md-6 mb-3">
                        <h6 className="text-muted mb-1">Mã thuốc:</h6>
                        <h5>{medicine.code || "N/A"}</h5>
                      </div>
                      <div className="col-md-6 mb-3">
                        <h6 className="text-muted mb-1">Giá (VND):</h6>
                        <h5>{medicine.price?.toLocaleString() || "0"}</h5>
                      </div>
                      <div className="col-md-6 mb-3">
                        <h6 className="text-muted mb-1">Số lượng:</h6>
                        <h5>{medicine.quantity || "0"}</h5>
                      </div>
                      <div className="col-md-6 mb-3">
                        <h6 className="text-muted mb-1">VAT (%):</h6>
                        <h5>{medicine.vat || "0"}</h5>
                      </div>
                      <div className="col-md-6 mb-3">
                        <h6 className="text-muted mb-1">
                          Lợi nhuận bán lẻ (%):
                        </h6>
                        <h5>{medicine.retailProfit || "0"}</h5>
                      </div>
                      <div className="col-md-6 mb-3">
                        <h6 className="text-muted mb-1">Nhà sản xuất:</h6>
                        <h5>{medicine.maker || "N/A"}</h5>
                      </div>
                      <div className="col-md-6 mb-3">
                        <h6 className="text-muted mb-1">Xuất xứ:</h6>
                        <h5>{medicine.origin || "N/A"}</h5>
                      </div>
                      <div className="col-md-6 mb-3">
                        <h6 className="text-muted mb-1">Hoạt chất:</h6>
                        <h5>{medicine.activeElement || "N/A"}</h5>
                      </div>
                      <div className="col-md-6 mb-3">
                        <h6 className="text-muted mb-1">Loại thuốc:</h6>
                        <h5>{medicine.kindOfMedicineEntity?.name || "N/A"}</h5>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    {medicine.images && medicine.images.length > 0 ? (
                      <div
                        id="medicine-image-carousel"
                        className="carousel slide"
                        data-ride="carousel"
                      >
                        <ol className="carousel-indicators">
                          {medicine.images.map((_, index) => (
                            <li
                              key={`indicator-${index}`}
                              data-target="#medicine-image-carousel"
                              data-slide-to={index}
                              className={index === 0 ? "active" : ""}
                            ></li>
                          ))}
                        </ol>
                        <div className="carousel-inner">
                          {medicine.images.map((image, index) => (
                            <div
                              key={`image-${index}`}
                              className={`carousel-item ${
                                index === 0 ? "active" : ""
                              }`}
                            >
                              <img
                                src={image}
                                className="d-block w-100"
                                alt={`${medicine.name} - ${index + 1}`}
                                style={{
                                  height: "300px",
                                  objectFit: "contain",
                                  backgroundColor: "#f8f9fa",
                                }}
                              />
                            </div>
                          ))}
                        </div>
                        <a
                          className="carousel-control-prev"
                          href="#medicine-image-carousel"
                          role="button"
                          data-slide="prev"
                        >
                          <span
                            className="carousel-control-prev-icon"
                            aria-hidden="true"
                          ></span>
                          <span className="sr-only">Previous</span>
                        </a>
                        <a
                          className="carousel-control-next"
                          href="#medicine-image-carousel"
                          role="button"
                          data-slide="next"
                        >
                          <span
                            className="carousel-control-next-icon"
                            aria-hidden="true"
                          ></span>
                          <span className="sr-only">Next</span>
                        </a>
                      </div>
                    ) : (
                      <div className="text-center p-5 bg-light">
                        <i
                          className="ri-image-line"
                          style={{ fontSize: "48px" }}
                        ></i>
                        <p className="mt-2">Không có hình ảnh</p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-12 mb-3">
                    <h6 className="text-muted mb-1">Ghi chú:</h6>
                    <p className="p-3 bg-light">
                      {medicine.note || "Không có ghi chú"}
                    </p>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-12 mb-3">
                    <h6 className="text-muted mb-2">Đơn vị tính:</h6>
                    <div className="table-responsive">
                      <table className="table table-bordered">
                        <thead>
                          <tr>
                            <th>Đơn vị</th>
                            <th>Hệ số quy đổi</th>
                          </tr>
                        </thead>
                        <tbody>
                          {medicine.unitDetails &&
                          medicine.unitDetails.length > 0 ? (
                            medicine.unitDetails.map((unit, index) => (
                              <tr key={index}>
                                <td>{unit.unitName}</td>
                                <td>{unit.conversionUnit}</td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan={2} className="text-center">
                                Không có đơn vị tính
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-12">
                    <h6 className="text-muted mb-2">Hình ảnh thuốc:</h6>
                    <div className="row">
                      {medicine.images && medicine.images.length > 0 ? (
                        medicine.images.map((image, index) => (
                          <div key={index} className="col-md-2 mb-3">
                            <a
                              href={image}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <img
                                src={image}
                                alt={`${medicine.name} - ${index + 1}`}
                                className="img-thumbnail"
                                style={{
                                  width: "100%",
                                  height: "150px",
                                  objectFit: "cover",
                                }}
                              />
                            </a>
                          </div>
                        ))
                      ) : (
                        <div className="col-12">
                          <p className="text-center text-muted">
                            Không có hình ảnh
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailMedicine;
