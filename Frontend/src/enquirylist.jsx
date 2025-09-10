import { get } from 'flowbite-react/helpers/get'
import React from 'react'
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";

const enquirylist = ({ data,getenquiry,swal,setformdata}) => {

  let handleDelete = (id) => {
    swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete("https://enquiryform-production.up.railway.app/enquiry/delete/" + id).then(() => {
          toast.success("Deleted Successfully")
          getenquiry();
        })
        swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
      }
    });
  }

  let handleedit = (id) => {
    axios.get("https://enquiryform-production.up.railway.app/enquiry/edit/" + id).then((data) => {
      console.log(data)
      setformdata(data.data)
    })
  }

  return (
    <div className="flex w-0.7 flex-col gap-4 mx-auto mt-20 border p-4 rounded-lg border-black bg-gray-200">
      <h1 className=" font-bold text-3xl self-center mt-1">ENQUIRY LIST</h1>
      <div className="bg-white shadow-md rounded-lg p-4">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 rounded-lg overflow-hidden shadow-md">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Phone</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Password</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Delete</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Edit</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {
                data.map((item, index) => {
                  return (
                    <>
                      <tr className="hover:bg-gray-50 transition" key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.email}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.phone}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.password}</td>
                        <td><button onClick={() => handleDelete(item._id)} className="px-6 py-4 whitespace-nowrap text-medium text-blue-500">Delete</button></td>
                        <td><button onClick={() => handleedit(item._id)} className="px-6 py-4 whitespace-nowrap text-medium text-blue-500">Edit</button></td>
                      </tr>
                    </>
                  )
                })
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default enquirylist
