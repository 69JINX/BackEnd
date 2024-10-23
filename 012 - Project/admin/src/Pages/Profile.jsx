import React, { useEffect, useState } from "react";
import { RiFacebookFill } from "react-icons/ri";
import { CiInstagram } from "react-icons/ci";
import { FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import Cookies from "js-cookie";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { DNA } from "react-loader-spinner";


function Profile() {

  const nav = useNavigate();

  const [show, setShow] = useState(false);
  const [Admin, setAdmin] = useState({});
  const [preIMGs, setpreIMGs] = useState({});
  const [otpBtnText, setotpBtnText] = useState('Generate OTP');
  const [showOTPfield, setshowOTPfield] = useState(false);
  const [loader, setloader] = useState(false);
  const [otpBtnFormating, setotpBtnFormating] = useState(false);



  useEffect(() => { console.log(Admin) }, [Admin])
  useEffect(() => {
    setAdmin(JSON.parse(Cookies.get('admin')));
  }, [])

  useEffect(() => {
    console.log(Admin);
    console.log(Admin.filepath);
    console.log(Admin.logo);
    console.log(Admin.filepath + Admin.logo);
  }, [Admin])

  const handlePreview = (e) => {
    console.log(e.target.files[0]);
    const reader = new FileReader();

    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      setpreIMGs({ ...preIMGs, [e.target.name]: reader.result }); //  Bracket Notation:
    }
  }

  const handleUpdate = (e) => {
    e.preventDefault();


    Swal.fire({
      title: "Are you sure want to Updated with following details ?",
      text: "You will be logged out!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Update !"
    }).then((result) => {
      if (result.isConfirmed) {

        axios.put(`${process.env.REACT_APP_API_URL}/api/admin-panel/admin/update-admin/${Admin._id}`, e.target)
          .then((response) => {
            console.log(response.data);
            Cookies.remove('admin');
            nav('/');
          })
          .catch((error) => {
            console.log(error);
          })

        Swal.fire({
          title: "Updated!",
          text: "Your profile has been updated and you have been logged out.",
          icon: "success"
        });
      }
    });
  }

  const handleOTP = () => {

    setloader(true);

    axios.post(`${process.env.REACT_APP_API_URL}/api/admin-panel/admin/generate-otp`, { email: Admin.email })
      .then((response) => {
        console.log(response.data);
        setloader(false);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "OTP sent Successfully to you current Email Address",
          showConfirmButton: false,
          timer: 1500
        });
        setotpBtnFormating(true);
        setshowOTPfield(true);
        let count = 10;
        setotpBtnText(`Generate OTP in ${count}`)
        let interval = setInterval(() => {
          count--;
          setotpBtnText(`Generate OTP in ${count}`)
          if (count < 1) {
            clearInterval(interval);
            setotpBtnFormating(false);
            setotpBtnText('Generate OTP')
          }
        }, 1000)

      })
      .catch((error) => {
        console.log(error);
      })

  }
  return (
    <div>
      <div className="w-[90%] mx-auto  mt-[140px] mb-[20px] bg-white border rounded-[10px]">
        <span className="block text-[#303640] bg-[#f8f8f9] rounded-[10px_10px_0_0] h-[60px] p-[15px_15px] box-border font-bold text-[25px] border-b">
          Profile
        </span>
        <div className="w-full  grid grid-cols-[2fr_2fr]">
          <div className="p-[10px] w-100">
            <form onSubmit={handleUpdate}>
              <div className="flex">
                <div className="w-[45vw]">
                  <div className="w-full ">
                    <span className="block m-[15px_0]">Name</span>
                    <input
                      type="text"
                      value={Admin.name}
                      name="name"
                      onChange={(e) => setAdmin({ ...Admin, name: e.target.value })}
                      className="w-full border h-[35px] rounded-[5px] p-2 input"
                    />
                  </div>
                  <div className="w-full ">
                    <span className="block m-[15px_0]">Social Link</span>
                    <div className="w-full grid grid-cols-[10%_auto] mb-[10px]">
                      <span className="w-full h-full text-[20px] p-[8px]">
                        <RiFacebookFill />
                      </span>
                      <input value={Admin.fb} onChange={(e) => setAdmin({ ...Admin, fb: e.target.value })} type="text" name="fb" className="w-full border h-[35px] rounded-[5px] p-2 input"
                      />
                    </div>
                    <div className="w-full grid grid-cols-[10%_auto] mb-[10px]">
                      <span className="w-full h-full text-[20px] p-[8px]">
                        <CiInstagram />
                      </span>
                      <input value={Admin.insta} onChange={(e) => setAdmin({ ...Admin, insta: e.target.value })} type="text" name="insta" className="w-full border h-[35px] rounded-[5px] p-2 input"
                      />
                    </div>
                    <div className="w-full grid grid-cols-[10%_auto] mb-[10px]">
                      <span className="w-full h-full text-[20px] p-[8px]">
                        <FaYoutube />
                      </span>
                      <input value={Admin.youtube} onChange={(e) => setAdmin({ ...Admin, youtube: e.target.value })} type="text" name="youtube" className="w-full border h-[35px] rounded-[5px] p-2 input"
                      />
                    </div>
                    <div className="w-full grid grid-cols-[10%_auto] mb-[10px]">
                      <span className="w-full h-full text-[20px] p-[8px]">
                        <FaXTwitter />
                      </span>
                      <input value={Admin.twitter} onChange={(e) => setAdmin({ ...Admin, twitter: e.target.value })} type="text" name="twitter" className="w-full border h-[35px] rounded-[5px] p-2 input"
                      />
                    </div>
                  </div>
                  <div className="w-full my-[20px]">
                    <span className="block m-[15px_0]">Logo</span>
                    <div className="w-[50px] h-[50px] object-fill">
                      <img src={preIMGs.logo || Admin.filepath + Admin.logo} alt="Logo" name="logo" className="w-full h-full" />
                    </div>
                    <input type="file" onChange={handlePreview} name="logo" className="input border w-full m-[10px_0] category" />
                  </div>
                  <div className="w-full my-[20px]">
                    <span className="block m-[15px_0]">Fav Icon</span>
                    <div className="w-[50px] h-[50px] object-fill">
                      <img src={preIMGs.favicon || Admin.filepath + Admin.favicon} alt="favicon" name="favicon" className="w-full h-full" />
                    </div>
                    <input type="file" onChange={handlePreview} name="favicon" className="input border w-full m-[10px_0] category" />
                  </div>
                  <div className="w-full my-[20px]">
                    <span className="block m-[15px_0]">Footer Logo</span>
                    <div className="w-[50px] h-[50px] object-fill">
                      <img src={preIMGs.footer_icon || Admin.filepath + Admin.footer_icon} alt="footer_icon" name="footer_icon" className="w-full h-full" />
                    </div>
                    <input type="file" onChange={handlePreview} name="footer_icon" className="input border w-full m-[10px_0] category" />
                  </div>
                  <div className="w-full my-[20px] relative ">
                    <span className="block m-[15px_0]">Password</span>
                    <input
                      type={show === false ? "password" : "text"}
                      name="password"
                      value={Admin.password}
                      onChange={(e) => setAdmin({ ...Admin, password: e.target.value })}
                      className="w-full border h-[35px] rounded-[5px] p-2 input" />
                    <span onClick={() => setShow(!show)} className="absolute right-[20px] bottom-[10px] cursor-pointer text-[#303640]">
                      {show === false ? <FaEye /> : <FaEyeSlash />}
                    </span>
                  </div>
                </div>
                <div>
                  <div className="flex flex-col justify-center p-[10px] box-border items-center gap-[10px] h-[400px]">
                    <div className="border border-slate-300 w-[200px] h-[200px] rounded-[50%] object-contain">
                      <img src={preIMGs.profileImg || Admin.filepath + Admin.profileImg} name="profileImg" alt="profile img" className="w-full h-full rounded-[50%]" />
                    </div>
                    <input type="file" onChange={handlePreview} name="profileImg" className="input border w-full m-[10px_0] category" />
                    <span className="block text-center">Profile Image</span>
                  </div>
                </div>
              </div>
              <button type="submit" className="w-[150px] h-[40px] rounded-md text-white bg-[#5351c9] my-[30px]">
                Update
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className="mb-[80px] w-[90%] mx-auto border rounded-[10px]">
        <span className="block text-[#303640] bg-[#f8f8f9] rounded-[10px_10px_0_0] h-[60px] p-[15px_15px] box-border font-bold text-[25px] border-b">
          Update Email
        </span>
        <div className="w-full p-[30px]">
          <form method="post">
            <div className="w-full mb-[10px]">
              <span className="block m-[15px_0]">Current Email</span>
              <input
                type="email"
                readOnly
                value={Admin.email}
                className="w-full border h-[35px] rounded-[5px] p-2 input"
              />
            </div>

            <button
              type="button"
              onClick={handleOTP}
              disabled={otpBtnFormating}
              className={`w-[150px] h-[40px] ${otpBtnFormating ? 'bg-blue-300' : 'bg-blue-600'}  rounded-md text-white  my-[30px]`}>
              {otpBtnText}
            </button>
            <div className={`w-full mb-[10px] ${showOTPfield ? 'block' : 'hidden'}`}>
              <span className="block m-[15px_0]">OTP</span>
              <input type="text" placeholder="Enter OTP" name='userotp' className="my-2 w-full border h-[35px] rounded-[5px] p-2 input" />
              <input type="text" placeholder="Enter new email" name='newemail' className="my-2 w-full border h-[35px] rounded-[5px] p-2 input" />
              <button type="button" className={`w-[150px] block h-[40px] rounded-md text-white bg-[#5351c9]  my-[30px]`}>
                Update Email
              </button>
            </div>
            <DNA
              visible={loader}
              height="100vh"
              width="100vw"
              ariaLabel="dna-loading"
              wrapperStyle={{
                position: 'fixed',
                top: '0%',
                zIndex: 99,
                left: '0%',
                backgroundColor: 'rgba(0,0,0,0.3)',
              }}
              wrapperClass="dna-wrapper"
            />
          </form>
        </div>
      </div>
    </div>
  );
}

export default Profile;
