import Axios from 'axios'
import React, { useState } from 'react'
import { domain, header } from '../env'
import { useGlobalState } from '../state/provider'

const Profile = () => {
    const [{ profile }, dispatch] = useGlobalState()
    // console.log(profile.prouser);
    const [image, setImage] = useState(null)
    const [firstname, setFirstname] = useState(profile?.prouser.first_name)
    const [lastname, setLastname] = useState(profile?.prouser.last_name)
    const [email, setEmail] = useState(profile?.prouser.email)



    const uploadimage = async () => {
        const formdata = new FormData()
        formdata.append('image', image)
        await Axios({
            method: "post",
            url: `${domain}/api/updateprofile/`,
            headers: header,
            data: formdata
        }).then(response => {
            // console.log(response.data["message"]);
            dispatch({
                type: "PAGE_RELOAD",
                pagereload: response.data
            })
            alert(response.data["message"])
        })

    }
    const updatedata = async () => {
        await Axios({
            method: "post",
            url: `${domain}/api/updateuser/`,
            headers: header,
            data: {
                "first_name": firstname,
                "last_name": lastname,
                "email": email
            }
        }).then(response => {
            // console.log(response.data["message"]);
            dispatch({
                type: "PAGE_RELOAD",
                pagereload: response.data
            })
            alert(response.data["message"])
        })

    }
    return (
        <div className="container">
            <div className="content-section">
                <h1 className="mt-5">Profile Information</h1>
                <div className="media">
                    <img className="rounded-circle account-img d-inline mx-5" src={`${domain}${profile?.image}`} />
                    <div className="media-body d-inline mt-4 ms-5">
                        <h2 className="account-heading mx-5">{profile?.prouser?.username}</h2>
                        <div>
                            <p className="text-secondary mx-5">{profile?.prouser?.email}</p>
                            <p className="mx-5">{profile?.prouser?.first_name}  {profile?.prouser?.last_name}</p>
                        </div>
                        
                    </div>
                </div>
                <form method="POST" encType="multipart/form-data">
                    <fieldset className="form-group mt-5">
                        <legend className="border-bottom m-4 fw-bold">Update Profile</legend>
                        <div className="form-group">
                            <label className="">Uplode Profile Picture</label>
                            <div className="row">
                                <div className="col-10">
                                    <input onChange={(e) => setImage(e.target.files[0])} type="file" className="form-control" />
                                </div>
                                <div className="col-2">
                                    <p onClick={uploadimage} className="btn btn-outline-info">Upload</p>
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <label>First Name</label>
                            <input type="text" className="form-control" onChange={(e) => setFirstname(e.target.value)} value={firstname} placeholder={firstname} />
                        </div>
                        <div className="form-group">
                            <label>Last Name</label>
                            <input type="text" className="form-control" onChange={(e) => setLastname(e.target.value)} value={lastname} placeholder={lastname} />
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <input type="email" className="form-control" onChange={(e) => setEmail(e.target.value)} value={email} placeholder={email} />
                        </div>
                    </fieldset>
                    <div className="form-group">
                        <p className="btn btn-info" onClick={updatedata}>Update</p>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Profile;