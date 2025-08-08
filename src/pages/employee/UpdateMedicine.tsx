import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import { Medicine } from "../../models/Medicine";
import { KindOfMedicine } from "../../models/KindOfMedicine";
import { Unit } from "../../models/Unit";
import { UnitDetail } from "../../models/UnitDetail";
import {
  fetchMedicineById,
  updateMedicine,
} from "../../services/medicineService";
import { getAllKindOfMedicines } from "../../services/kindOfMedicineService";
import { getAllUnits } from "../../services/unitService";
import { uploadFiles } from "../../services/fileService";
import { toast } from "react-toastify";
import Select from "react-select";
import { FormikErrors, FieldArray } from "formik";

// FilePond imports
import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginFileValidateSize from "filepond-plugin-file-validate-size";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImageTransform from "filepond-plugin-image-transform";

// Register FilePond plugins
registerPlugin(
  FilePondPluginImagePreview,
  FilePondPluginFileValidateType,
  FilePondPluginFileValidateSize,
  FilePondPluginImageExifOrientation,
  FilePondPluginImageTransform
);

interface FormValues {
  name: string;
  price: string;
  quantity: number;
  vat: number;
  kindOfMedicineId: number;
  unitId: number;
  note: string;
  maker: string;
  origin: string;
  retailProfit: number;
  activeElement: string;
  unitDetails: UnitDetail[];
}

const UpdateMedicine: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [medicine, setMedicine] = useState<Medicine | null>(null);
  const [kindOfMedicines, setKindOfMedicines] = useState<KindOfMedicine[]>([]);
  const [units, setUnits] = useState<Unit[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [fetchingData, setFetchingData] = useState<boolean>(true);
  const [files, setFiles] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [imageError, setImageError] = useState<string | null>(null);
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
    kindOfMedicineId: Yup.number().required("Loại thuốc là bắt buộc"),
    unitId: Yup.number().required("Đơn vị tính là bắt buộc"),
    note: Yup.string(),
    maker: Yup.string(),
    origin: Yup.string(),
    retailProfit: Yup.number(),
    activeElement: Yup.string(),
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
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setFetchingData(true);
        setError(null);

        // Fetch kind of medicines and units first
        const [kindOfMedicineData, unitsData] = await Promise.all([
          getAllKindOfMedicines(1, 1000),
          getAllUnits(1, 1000),
        ]);

        // Ensure we received arrays
        setKindOfMedicines(kindOfMedicineData?.data?.items || []);
        setUnits(unitsData?.data?.items || []);

        // Fetch medicine data if ID exists
        if (id) {
          const medicineData = await fetchMedicineById(id);
          if (medicineData) {
            setMedicine(medicineData);

            // Initialize FilePond files with existing images
            if (medicineData.images && medicineData.images.length > 0) {
              const initialFiles = medicineData.images.map((url: string) => ({
                source: url,
                options: {
                  type: "local",
                },
              }));
              setFiles(initialFiles);
            }
          } else {
            setError("Không tìm thấy thuốc");
          }
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Đã xảy ra lỗi khi tải dữ liệu");
        toast.error("Đã xảy ra lỗi khi tải dữ liệu");
      } finally {
        setFetchingData(false);
      }
    };

    fetchData();
  }, [id]);

  // Extract files from FilePond items for upload
  const getFilesToUpload = (fileItems: any[]): File[] => {
    return fileItems
      .filter((fileItem) => fileItem.file && fileItem.origin !== 2) // Filter out server files
      .map((fileItem) => fileItem.file);
  };

  // Extract URLs of files that are already on the server
  const getExistingFileUrls = (fileItems: any[]): string[] => {
    return fileItems
      .filter((fileItem) => fileItem.origin === 2)
      .map((fileItem) => fileItem.source);
  };

  const handleSubmit = async (
    values: FormValues,
    { setSubmitting }: FormikHelpers<FormValues>
  ) => {
    try {
      // Check if there are any files selected
      if (files.length === 0) {
        setImageError("Vui lòng tải lên ít nhất một hình ảnh");
        setSubmitting(false);
        return;
      }

      setLoading(true);
      setError(null);
      setImageError(null);

      // Upload files and get URLs
      let images: string[] = [];

      // Get existing image URLs
      const existingUrls = getExistingFileUrls(files);

      // Get new files to upload
      const filesToUpload = getFilesToUpload(files);

      if (filesToUpload.length > 0) {
        const uploadResult = await uploadFiles(filesToUpload);
        if (uploadResult) {
          // Check if uploadResult has a data property containing the array of URLs
          if (uploadResult.data && Array.isArray(uploadResult.data)) {
            images = [...existingUrls, ...uploadResult.data];
          } else {
            // Fallback in case structure is different
            images = existingUrls;
            toast.warning("Không thể tải hình ảnh mới lên. Chỉ sử dụng hình ảnh hiện có.");
          }
        }
      } else {
        images = existingUrls;
      }

      if (!id) {
        setError("Không tìm thấy ID thuốc");
        toast.error("Không tìm thấy ID thuốc");
        return;
      }

      // Update medicine
      await updateMedicine(id, {
        ...values,
        price: Number(values.price),
        imageUrls: images,
        kindOfMedicineEntity: {
          id: values.kindOfMedicineId,
          code: "",
          name: "",
        },
        unitDetails: values.unitDetails.map((detail) => ({
          id: detail.unitId || 0,
          unitId: detail.unitId,
          unitName: "", // Will be filled on server side
          conversionUnit: detail.conversionUnit,
        })),
      });

      toast.success("Cập nhật thuốc thành công!");
      navigate("/employee/medicines");
    } catch (err: any) {
      console.error("Error updating medicine:", err);
      const errorMessage = err.message || "Đã xảy ra lỗi khi cập nhật thuốc";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
      setSubmitting(false);
    }
  };

  if (fetchingData) {
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

  if (!medicine) {
    return (
      <div id="content-page" className="content-page">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12 text-center p-5">
              <div className="alert alert-danger" role="alert">
                {error || "Không tìm thấy thuốc"}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Get the primary unit from unitDetails if it exists
  const primaryUnit =
    medicine.unitDetails && medicine.unitDetails.length > 0
      ? medicine.unitDetails.find((u) => u.conversionUnit === 1) ||
        medicine.unitDetails[0]
      : null;

  const initialValues: FormValues = {
    name: medicine.name || "",
    price: medicine.price ? medicine.price.toString() : "",
    quantity: medicine.quantity || 0,
    vat: medicine.vat || 0,
    kindOfMedicineId: medicine.kindOfMedicineEntity?.id || 0,
    unitId: primaryUnit?.unitId || 0,
    note: medicine.note || "",
    maker: medicine.maker || "",
    origin: medicine.origin || "",
    retailProfit: medicine.retailProfit || 0,
    activeElement: medicine.activeElement || "",
    unitDetails: medicine.unitDetails?.length
      ? medicine.unitDetails.map((unit) => ({
          id: unit.id || 0,
          unitId: unit.unitId || 0,
          conversionUnit: unit.conversionUnit || 1,
          unitName: unit.unitName || "",
        }))
      : [{ unitId: primaryUnit?.unitId || 0, conversionUnit: 1 }],
  };

  return (
    <div id="content-page" className="content-page">
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-12">
            <div className="iq-card">
              <div className="iq-card-header d-flex justify-content-between">
                <div className="iq-header-title">
                  <h4 className="card-title">Cập nhật thuốc</h4>
                </div>
              </div>
              <div className="iq-card-body">
                {/*{error && (*/}
                {/*  <div className="alert alert-danger" role="alert">*/}
                {/*    {error}*/}
                {/*  </div>*/}
                {/*)}*/}

                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={handleSubmit}
                  enableReinitialize
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
                            min="0"
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
                            min="0"
                            max="100"
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
                          <label htmlFor="maker">Nhà sản xuất</label>
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
                          <label htmlFor="origin">Xuất xứ</label>
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
                          <label htmlFor="activeElement">Hoạt chất</label>
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
                            {Array.isArray(kindOfMedicines) &&
                            kindOfMedicines.length > 0 ? (
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
                                value={
                                  kindOfMedicines
                                    .filter(
                                      (kom) =>
                                        kom.id === values.kindOfMedicineId
                                    )
                                    .map((kom) => ({
                                      value: kom.id,
                                      label: kom.name,
                                    }))[0]
                                }
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
                            ) : (
                              <div className="text-danger">
                                Không có loại thuốc. Vui lòng thêm loại thuốc
                                trước.
                              </div>
                            )}
                          </div>
                          <ErrorMessage
                            name="kindOfMedicineId"
                            component="div"
                            className="text-danger"
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

                                            // Check if this unit is already selected
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
                                              // Reset to 0 (unselected)
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
                                    // Add default unit
                                    push({ unitId: 0, conversionUnit: 1 });
                                  }}
                                >
                                  <i className="ri-add-line"></i> Thêm đơn vị
                                </button>
                              </div>
                            )}
                          </FieldArray>

                          {/* Show aggregate error if any */}
                          {typeof errors.unitDetails === "string" && (
                            <div className="text-danger">
                              {errors.unitDetails}
                            </div>
                          )}
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
                          <label>Hình ảnh thuốc *</label>
                          <div className="mb-3">
                            <FilePond
                              files={files}
                              onupdatefiles={(fileItems) => {
                                setFiles(fileItems);
                                if (fileItems.length === 0) {
                                  setImageError("Vui lòng tải lên ít nhất một hình ảnh");
                                } else {
                                  setImageError(null);
                                }
                              }}
                              allowMultiple={true}
                              maxFiles={5}
                              allowFileSizeValidation={true}
                              maxFileSize="5MB"
                              labelMaxFileSizeExceeded="File quá lớn"
                              labelMaxFileSize="Kích thước tối đa là 5MB"
                              acceptedFileTypes={[
                                "image/png",
                                "image/jpeg",
                                "image/jpg",
                              ]}
                              labelFileTypeNotAllowed="Chỉ chấp nhận file ảnh (jpg, png)"
                              fileValidateTypeLabelExpectedTypes="Chỉ chấp nhận file ảnh: {allTypes}"
                              labelIdle='Kéo và thả hình ảnh vào đây hoặc <span class="filepond--label-action">Chọn tệp</span>'
                              credits={false}
                              server={{
                                load: (
                                  source,
                                  load,
                                  error,
                                  progress,
                                  abort
                                ) => {
                                  // This loads the image preview for existing images
                                  const isCompleteUrl =
                                    source.startsWith("http") ||
                                    source.startsWith("https");
                                  const imageUrl = isCompleteUrl
                                    ? source
                                    : `${process.env.REACT_APP_API_URL}/uploads/${source}`;

                                  fetch(imageUrl)
                                    .then((response) => response.blob())
                                    .then((blob) => {
                                      load(blob);
                                    })
                                    .catch(() => {
                                      error("Could not load image");
                                    });
                                },
                              }}
                            />
                            {imageError && (
                              <div className="text-danger mt-2">
                                {imageError}
                              </div>
                            )}
                          </div>
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
                            "Cập nhật thuốc"
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

export default UpdateMedicine;
