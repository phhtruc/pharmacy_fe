import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";
import { createMedicine } from "../../services/medicineService";
import { getAllKindOfMedicines } from "../../services/kindOfMedicineService";
import { getAllUnits } from "../../services/unitService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { KindOfMedicine } from "../../models/KindOfMedicine";
import { Unit } from "../../models/Unit";
import { UnitDetail } from "../../models/UnitDetail";
import { FormikErrors } from "formik";
import { uploadFiles } from "../../services/fileService";
import Select from "react-select";

// FilePond imports
import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginFileValidateSize from "filepond-plugin-file-validate-size";

// Register FilePond plugins
registerPlugin(
  FilePondPluginImagePreview,
  FilePondPluginFileValidateType,
  FilePondPluginFileValidateSize
);

interface FormValues {
  name: string;
  price: string;
  quantity: number;
  vat: number;
  note: string;
  maker: string;
  origin: string;
  retailProfit: number;
  activeElement: string;
  kindOfMedicineId: number;
  unitDetails: UnitDetail[];
  images: File[];
  imageUrls?: string[];
}

const CreateMedicine: React.FC = () => {
  const [kindOfMedicines, setKindOfMedicines] = useState<KindOfMedicine[]>([]);
  const [units, setUnits] = useState<Unit[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [files, setFiles] = useState<any[]>([]);
  const [pond, setPond] = useState<any>(null);
  const navigate = useNavigate();

  // Validation schema
  const validationSchema = Yup.object({
    name: Yup.string().required("Tên thuốc là bắt buộc"),
    price: Yup.string()
      .required("Giá là bắt buộc")
      .test(
        "is-valid-price",
        "Giá phải là số dương",
        (value) => !isNaN(Number(value)) && Number(value) > 0
      ),
    quantity: Yup.number()
      .required("Số lượng là bắt buộc")
      .min(1, "Số lượng không được âm"),
    vat: Yup.number()
      .required("VAT là bắt buộc")
      .min(0, "VAT không được âm")
      .max(100, "VAT không được vượt quá 100%"),
    maker: Yup.string().required("Nhà sản xuất là bắt buộc"),
    origin: Yup.string().required("Xuất xứ là bắt buộc"),
    retailProfit: Yup.number()
      .required("Lợi nhuận bán lẻ là bắt buộc")
      .min(0, "Lợi nhuận không được âm"),
    activeElement: Yup.string().required("Thành phần hoạt chất là bắt buộc"),
    kindOfMedicineId: Yup.number()
      .required("Loại thuốc là bắt buộc")
      .test("is-valid-kind", "Vui lòng chọn loại thuốc", (value) => value > 0),
    unitDetails: Yup.array()
      .of(
        Yup.object().shape({
          unitId: Yup.number()
            .required("Đơn vị là bắt buộc")
            .test(
              "is-valid-unit",
              "Vui lòng chọn đơn vị",
              (value) => value > 0
            ),
          conversionUnit: Yup.number()
            .required("Hệ số quy đổi là bắt buộc")
            .min(0.01, "Hệ số quy đổi phải lớn hơn 0"),
        })
      )
      .min(1, "Vui lòng thêm ít nhất một đơn vị"),
    images: Yup.array()
      .min(1, "Vui lòng tải lên ít nhất một hình ảnh")
      .max(10, "Bạn chỉ có thể tải lên tối đa 10 ảnh cùng lúc"),
  });

  // Fetch data for kind of medicines and units
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [kindOfMedicinesResponse, unitsResponse] = await Promise.all([
          getAllKindOfMedicines(1, 1000),
          getAllUnits(1, 1000),
        ]);

        setKindOfMedicines(kindOfMedicinesResponse.data.items || []);
        setUnits(unitsResponse.data.items || []);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Không thể tải dữ liệu. Vui lòng thử lại sau.");
      }
    };

    fetchData();
  }, []);

  // Handle FilePond file changes
  const handleFilePondUpdate = (fileItems: any[], setFieldValue: any) => {
    // Lưu trữ files từ FilePond
    setFiles(fileItems);

    // Chuyển đổi FilePond fileItems thành File objects để tương thích với logic cũ
    const processedFiles = fileItems.map((fileItem) => fileItem.file);

    // Cập nhật formik values
    if (fileItems.length > 0) {
      setFieldValue("images", processedFiles);
    } else {
      setFieldValue("images", []);
    }
  };

  // Handle form submission
  const handleSubmit = async (values: FormValues, { setSubmitting }: any) => {
    try {
      setLoading(true);

      // Step 1: Upload images first
      if (values.images && values.images.length > 0) {
        try {
          // Upload files and get URLs
          const uploadResult = await uploadFiles(values.images);

          // Check if upload was successful and we have URLs
          if (
            !uploadResult.data ||
            !Array.isArray(uploadResult.data) ||
            uploadResult.data.length === 0
          ) {
            throw new Error("Không nhận được URL hình ảnh sau khi tải lên");
          }

          // Store the returned URLs
          values.imageUrls = uploadResult.data;

          console.log("Tải ảnh thành công:", values.imageUrls);
        } catch (error: any) {
          console.error("Lỗi khi tải lên hình ảnh:", error);
          toast.error(error.message || "Đã xảy ra lỗi khi tải lên hình ảnh.");
          setLoading(false);
          setSubmitting(false);
          return; // Stop the submission if image upload fails
        }
      } else {
        toast.error("Vui lòng tải lên ít nhất một hình ảnh");
        setLoading(false);
        setSubmitting(false);
        return;
      }

      // Step 2: Prepare medicine data with the image URLs
      const medicineData = {
        name: values.name,
        price: values.price,
        quantity: values.quantity,
        vat: values.vat,
        note: values.note || "",
        maker: values.maker,
        origin: values.origin,
        retailProfit: values.retailProfit,
        activeElement: values.activeElement,
        kindOfMedicineId: values.kindOfMedicineId,
        unitDetails: values.unitDetails,
        imageUrls: values.imageUrls, // Include the image URLs from the upload response
      };

      // Step 3: Submit medicine creation form
      const response = await createMedicine(medicineData);
      toast.success("Thêm thuốc thành công!");
      navigate("/employee/medicines");
    } catch (error: any) {
      console.error("Lỗi khi tạo thuốc:", error);
      toast.error(
        error.response?.data?.message || "Đã xảy ra lỗi khi thêm thuốc."
      );
    } finally {
      setLoading(false);
      setSubmitting(false);
    }
  };

  // Initial values
  const initialValues: FormValues = {
    name: "",
    price: "",
    quantity: 1,
    vat: 5,
    note: "",
    maker: "",
    origin: "",
    retailProfit: 10,
    activeElement: "",
    kindOfMedicineId: 0,
    unitDetails: [{ unitId: 0, conversionUnit: 1 }],
    images: [],
  };

  return (
    <div id="content-page" className="content-page">
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-12">
            <div className="iq-card">
              <div className="iq-card-header d-flex justify-content-between">
                <div className="iq-header-title">
                  <h4 className="card-title">Thêm thuốc mới</h4>
                </div>
              </div>
              <div className="iq-card-body">
                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={handleSubmit}
                >
                  {({
                    values,
                    errors,
                    touched,
                    setFieldValue,
                    isSubmitting,
                  }) => (
                    <Form>
                      <div className="row">
                        <div className="col-md-6 mb-3">
                          <label htmlFor="name">Tên thuốc *</label>
                          <Field
                            type="text"
                            id="name"
                            name="name"
                            className={`form-control ${
                              errors.name && touched.name ? "is-invalid" : ""
                            }`}
                          />
                          <ErrorMessage
                            name="name"
                            component="div"
                            className="text-danger"
                          />
                        </div>

                        <div className="col-md-6 mb-3">
                          <label htmlFor="price">Giá (VND) *</label>
                          <Field
                            type="text"
                            id="price"
                            name="price"
                            className={`form-control ${
                              errors.price && touched.price ? "is-invalid" : ""
                            }`}
                          />
                          <ErrorMessage
                            name="price"
                            component="div"
                            className="text-danger"
                          />
                        </div>

                        <div className="col-md-4 mb-3">
                          <label htmlFor="quantity">Số lượng *</label>
                          <Field
                            type="number"
                            id="quantity"
                            name="quantity"
                            className={`form-control ${
                              errors.quantity && touched.quantity
                                ? "is-invalid"
                                : ""
                            }`}
                          />
                          <ErrorMessage
                            name="quantity"
                            component="div"
                            className="text-danger"
                          />
                        </div>

                        <div className="col-md-4 mb-3">
                          <label htmlFor="vat">VAT (%) *</label>
                          <Field
                            type="number"
                            id="vat"
                            name="vat"
                            className={`form-control ${
                              errors.vat && touched.vat ? "is-invalid" : ""
                            }`}
                          />
                          <ErrorMessage
                            name="vat"
                            component="div"
                            className="text-danger"
                          />
                        </div>

                        <div className="col-md-4 mb-3">
                          <label htmlFor="retailProfit">
                            Lợi nhuận bán lẻ (%) *
                          </label>
                          <Field
                            type="number"
                            id="retailProfit"
                            name="retailProfit"
                            className={`form-control ${
                              errors.retailProfit && touched.retailProfit
                                ? "is-invalid"
                                : ""
                            }`}
                          />
                          <ErrorMessage
                            name="retailProfit"
                            component="div"
                            className="text-danger"
                          />
                        </div>

                        <div className="col-md-6 mb-3">
                          <label htmlFor="maker">Nhà sản xuất *</label>
                          <Field
                            type="text"
                            id="maker"
                            name="maker"
                            className={`form-control ${
                              errors.maker && touched.maker ? "is-invalid" : ""
                            }`}
                          />
                          <ErrorMessage
                            name="maker"
                            component="div"
                            className="text-danger"
                          />
                        </div>

                        <div className="col-md-6 mb-3">
                          <label htmlFor="origin">Xuất xứ *</label>
                          <Field
                            type="text"
                            id="origin"
                            name="origin"
                            className={`form-control ${
                              errors.origin && touched.origin
                                ? "is-invalid"
                                : ""
                            }`}
                          />
                          <ErrorMessage
                            name="origin"
                            component="div"
                            className="text-danger"
                          />
                        </div>

                        <div className="col-md-6 mb-3">
                          <label htmlFor="activeElement">
                            Thành phần hoạt chất *
                          </label>
                          <Field
                            type="text"
                            id="activeElement"
                            name="activeElement"
                            className={`form-control ${
                              errors.activeElement && touched.activeElement
                                ? "is-invalid"
                                : ""
                            }`}
                          />
                          <ErrorMessage
                            name="activeElement"
                            component="div"
                            className="text-danger"
                          />
                        </div>

                        <div className="col-md-6 mb-3">
                          <label htmlFor="kindOfMedicineId">Loại thuốc *</label>
                          <div
                            className={
                              errors.kindOfMedicineId &&
                              touched.kindOfMedicineId
                                ? "is-invalid"
                                : ""
                            }
                          >
                            <Select
                              id="kindOfMedicineId"
                              placeholder="Tìm và chọn loại thuốc"
                              noOptionsMessage={() =>
                                "Không tìm thấy loại thuốc"
                              }
                              options={kindOfMedicines.map((kind) => ({
                                value: kind.id,
                                label: kind.name,
                              }))}
                              onChange={(selectedOption: any) => {
                                setFieldValue(
                                  "kindOfMedicineId",
                                  selectedOption ? selectedOption.value : 0
                                );
                              }}
                              className={`${
                                errors.kindOfMedicineId &&
                                touched.kindOfMedicineId
                                  ? "is-invalid-select"
                                  : ""
                              }`}
                              isClearable={true}
                              isSearchable={true}
                              styles={{
                                control: (provided) => ({
                                  ...provided,
                                  borderColor:
                                    errors.kindOfMedicineId &&
                                    touched.kindOfMedicineId
                                      ? "#dc3545"
                                      : provided.borderColor,
                                }),
                                placeholder: (provided) => ({
                                  ...provided,
                                  color: "#757575",
                                }),
                              }}
                            />
                          </div>
                          <ErrorMessage
                            name="kindOfMedicineId"
                            component="div"
                            className="text-danger"
                          />
                        </div>

                        <div className="col-md-12 mb-3">
                          <label htmlFor="note">Ghi chú</label>
                          <Field
                            as="textarea"
                            id="note"
                            name="note"
                            rows={3}
                            className="form-control"
                          />
                        </div>

                        <div className="col-md-12 mb-3">
                          <label>Đơn vị tính *</label>
                          <FieldArray name="unitDetails">
                            {({ remove, push }) => (
                              <div>
                                {values.unitDetails.map((unitDetail, index) => {
                                  const unitDetailErrors = (
                                    errors.unitDetails as
                                      | FormikErrors<UnitDetail>[]
                                      | undefined
                                  )?.[index];
                                  const unitDetailTouched =
                                    touched.unitDetails?.[index];

                                  return (
                                    <div className="row mb-2" key={index}>
                                      <div className="col-5">
                                        <Field
                                          as="select"
                                          name={`unitDetails.${index}.unitId`}
                                          className={`form-control ${
                                            unitDetailErrors?.unitId &&
                                            unitDetailTouched?.unitId
                                              ? "is-invalid"
                                              : ""
                                          }`}
                                          onChange={(
                                            e: React.ChangeEvent<HTMLSelectElement>
                                          ) => {
                                            const selectedUnitId = parseInt(
                                              e.target.value
                                            );

                                            // Kiểm tra xem đơn vị này đã được chọn chưa
                                            const isDuplicate =
                                              values.unitDetails.some(
                                                (item, i) =>
                                                  i !== index &&
                                                  item.unitId ===
                                                    selectedUnitId &&
                                                  selectedUnitId !== 0
                                              );

                                            if (isDuplicate) {
                                              toast.error(
                                                "Đơn vị này đã được thêm. Vui lòng chọn đơn vị khác."
                                              );
                                              // Reset về giá trị 0 (chưa chọn)
                                              setFieldValue(
                                                `unitDetails.${index}.unitId`,
                                                0
                                              );
                                            } else {
                                              setFieldValue(
                                                `unitDetails.${index}.unitId`,
                                                selectedUnitId
                                              );
                                            }
                                          }}
                                        >
                                          <option value={0}>
                                            -- Chọn đơn vị --
                                          </option>
                                          {units.map((unit) => (
                                            <option
                                              key={unit.id}
                                              value={unit.id}
                                            >
                                              {unit.name}
                                            </option>
                                          ))}
                                        </Field>
                                        {unitDetailErrors?.unitId &&
                                          unitDetailTouched?.unitId && (
                                            <div className="text-danger">
                                              {unitDetailErrors.unitId}
                                            </div>
                                          )}
                                      </div>

                                      <div className="col-5">
                                        <Field
                                          type="number"
                                          name={`unitDetails.${index}.conversionUnit`}
                                          placeholder="Hệ số quy đổi"
                                          className={`form-control ${
                                            unitDetailErrors?.conversionUnit &&
                                            unitDetailTouched?.conversionUnit
                                              ? "is-invalid"
                                              : ""
                                          }`}
                                        />
                                        {unitDetailErrors?.conversionUnit &&
                                          unitDetailTouched?.conversionUnit && (
                                            <div className="text-danger">
                                              {unitDetailErrors.conversionUnit}
                                            </div>
                                          )}
                                      </div>

                                      <div className="col-2">
                                        {index > 0 && (
                                          <button
                                            type="button"
                                            className="btn btn-danger"
                                            onClick={() => remove(index)}
                                          >
                                            <i className="ri-delete-bin-line"></i>
                                          </button>
                                        )}
                                      </div>
                                    </div>
                                  );
                                })}

                                <button
                                  type="button"
                                  className="btn btn-primary mt-2"
                                  onClick={() => {
                                    // Thêm đơn vị mặc định
                                    push({ unitId: 0, conversionUnit: 1 });
                                  }}
                                >
                                  <i className="ri-add-line"></i> Thêm đơn vị
                                </button>
                              </div>
                            )}
                          </FieldArray>

                          {/* Hiển thị lỗi tổng nếu có */}
                          {typeof errors.unitDetails === "string" && (
                            <div className="text-danger">
                              {errors.unitDetails}
                            </div>
                          )}
                        </div>

                        <div className="col-md-12 mb-3">
                          <label>Hình ảnh thuốc *</label>
                          <div className="mb-3">
                            <FilePond
                              ref={(ref: any) => setPond(ref)}
                              files={files}
                              onupdatefiles={(fileItems) => {
                                handleFilePondUpdate(fileItems, setFieldValue);
                              }}
                              allowMultiple={true}
                              maxFiles={10}
                              allowFileSizeValidation={true}
                              maxFileSize="5MB"
                              labelMaxFileSizeExceeded="File quá lớn"
                              labelMaxFileSize="Kích thước tối đa là 5MB"
                              acceptedFileTypes={['image/png', 'image/jpeg', 'image/jpg']}
                              labelFileTypeNotAllowed="Chỉ chấp nhận file ảnh (jpg, png)"
                              fileValidateTypeLabelExpectedTypes="Chỉ chấp nhận file ảnh: {allTypes}"
                              labelIdle='Kéo và thả hình ảnh vào đây hoặc <span class="filepond--label-action">Chọn tệp</span>'
                              credits={false}
                            />
                          </div>
                          <ErrorMessage name="images" component="div" className="text-danger" />
                        </div>
                      </div>

                      <div className="form-group">
                        <button
                          type="submit"
                          className="btn btn-primary"
                          disabled={isSubmitting || loading}
                        >
                          {loading ? (
                            <>
                              <span
                                className="spinner-border spinner-border-sm mr-2"
                                role="status"
                                aria-hidden="true"
                              ></span>
                              Đang xử lý...
                            </>
                          ) : (
                            "Thêm thuốc"
                          )}
                        </button>
                        <button
                          type="button"
                          className="btn btn-secondary ml-2"
                          onClick={() => navigate("/employee/medicines")}
                        >
                          Hủy
                        </button>
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateMedicine;
