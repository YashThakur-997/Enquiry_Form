import { Button, Checkbox, Label, TextInput, Toast } from "flowbite-react";
import { ToastContainer, toast } from "react-toastify";
import { Table } from "flowbite-react";
import axios from "axios";
import { use, useEffect, useState } from "react";
import Enquirylist from "./enquirylist";
import { get } from "flowbite-react/helpers/get";
import Swal from 'sweetalert2/dist/sweetalert2.js'


const Form = () => {
  let [enquirylist, setenquirylist] = useState([]);
  let [formdata, setformdata] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    _id: ""
  });

  let handleSubmit = (e) => {       // function to handle form submission
    e.preventDefault();

    if (formdata._id) {
      Swal.fire({
        title: "Do you want to save the changes?",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Save",
        denyButtonText: `Don't save`
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          axios.put("http://localhost:3000/enquiry/update/" + formdata._id, formdata)
            getenquiry();
          Swal.fire("Updated!", "", "success");
        } else if (result.isDenied) {
          Swal.fire("Changes are not saved", "", "info");
        }
      });
    }
    else {
      toast.success("Form Submitted Successfully")
      axios.post("http://localhost:3000/enquiry/insert", formdata).then(() => {      // sending a post request to the server
        setformdata({
          name: "",
          email: "",
          password: "",
          phone: ""
        });
        getenquiry();
      }).catch((err) => {
        console.log(err)
      })
    }

  };

  let getdata = (e) => {
    let inputname = e.target.name;
    let value = e.target.value;
    let Olddata = { ...formdata };
    Olddata[inputname] = value;
    setformdata(Olddata);
  }

  let getenquiry = () => {
    axios.get("http://localhost:3000/enquiry/view").then((res) => {
      setenquirylist(res.data)
    })
  }

  useEffect(() => {
    getenquiry()
  }, [])

  return (
    <>
      <ToastContainer />
      <div className="flex max-h-screen overflow-y-auto">
        <form className="flex w-1/3 flex-col gap-4 mx-auto mt-20 border p-4 rounded-lg bg-gray-900" onSubmit={handleSubmit}>
          <h1 className="text-white font-bold text-3xl self-center">USER ENQUIRY</h1>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="name2">Your name</Label>
            </div>
            <TextInput id="name2" value={formdata.name} onChange={getdata} name="name" type="name" placeholder="enter your name" required shadow />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="email2">Your email</Label>
            </div>
            <TextInput id="email2" value={formdata.email} onChange={getdata} name="email" type="email" placeholder="xyz123@gmail.com" required shadow />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="password2">Your password</Label>
            </div>
            <TextInput id="password2" value={formdata.password} onChange={getdata} name="password" type="password" required shadow />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="phone2">Your phone</Label>
            </div>
            <TextInput id="phone2" value={formdata.phone} onChange={getdata} name="phone" type="phone" required shadow />
          </div>
          <Button type="submit" className="mt-5">{formdata._id ? 'update' : 'save'}</Button>
        </form>
        <Enquirylist data={enquirylist} getenquiry={getenquiry()} swal={Swal} setformdata={setformdata} />
      </div>
    </>
  );
};

export default Form;