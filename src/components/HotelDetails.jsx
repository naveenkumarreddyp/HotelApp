import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { api } from "../services/api";
import Header from "./common/Header";
import ImageSlider from "./common/ImageSlider";

const BookingSchema = Yup.object().shape({
  fromDate: Yup.date().min(new Date(), "Cannot select past dates").required("Required"),
  toDate: Yup.date().min(Yup.ref("fromDate"), "To date must be after From date").required("Required"),
});

function HotelDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [fromDateHolder, setFromDateHolder] = useState("");

  useEffect(() => {
    const fetchHotel = async () => {
      try {
        const hotelData = await api.getHotelById(id);
        setHotel(hotelData);
      } catch (error) {
        toast.error("Failed to fetch hotel details");
      } finally {
        setLoading(false);
      }
    };

    fetchHotel();
  }, [id]);

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      // console.log("-------------", values);
      // const user = JSON.parse(localStorage.getItem("user"));
      await api.bookHotel(hotel.id, values.fromDate, values.toDate);
      toast.success("Booking successful");
      navigate("/");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  if (!hotel) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl text-red-600">Hotel not found</div>
      </div>
    );
  }

  const today = new Date().toISOString().split("T")[0];

  return (
    <>
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <ImageSlider images={hotel.images} />
          <div className="p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{hotel.name}</h1>
            <p className="text-gray-600 text-lg mb-6">{hotel.description}</p>
            <p className="text-2xl font-bold text-gray-900 mb-8">
              ${hotel.price} <span className="text-base font-normal text-gray-600">per night</span>
            </p>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Book Now</h2>
              <Formik initialValues={{ fromDate: "", toDate: "" }} validationSchema={BookingSchema} onSubmit={handleSubmit}>
                {({ isSubmitting, setFieldValue }) => (
                  <Form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="fromDate" className="block text-sm font-medium text-gray-700">
                          From Date
                        </label>
                        <Field
                          type="date"
                          name="fromDate"
                          min={today}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                          onChange={(e) => {
                            setFieldValue("fromDate", e.target.value);
                            setFromDateHolder(e.target.value); // Update local fromDate state
                          }}
                        />
                        <ErrorMessage name="fromDate" component="div" className="text-red-500 text-sm mt-1" />
                      </div>
                      <div>
                        <label htmlFor="toDate" className="block text-sm font-medium text-gray-700">
                          To Date
                        </label>
                        <Field
                          type="date"
                          name="toDate"
                          min={fromDateHolder ? fromDateHolder : today}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        />
                        <ErrorMessage name="toDate" component="div" className="text-red-500 text-sm mt-1" />
                      </div>
                    </div>
                    <div>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                      >
                        {isSubmitting ? "Booking..." : "Book Now"}
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HotelDetails;
