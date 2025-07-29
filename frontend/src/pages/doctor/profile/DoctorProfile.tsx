import { useEffect, useState } from "react"
import { useAuthHeader } from "@/lib/context/AuthHeaderContext"
import LoadingComponent from "@/components/common/LoadingComponent"
import { HeaderProfile } from "@/components/profiles/HeaderProfile"
import UserGeneralInfo from "@/components/profiles/UserGeneralInfo"
import { getMyProfile } from "@/api/profile"
import { toast } from "react-toastify"
import type { UserProfileResponse } from "@/api/types"
import DoctorProfileInfo from "@/components/profiles/DoctorProfileInfo"

export default function DoctorProfile() {
  const {setTitle,setBreadCrumbs} = useAuthHeader()
  const [isFetchingUserProfile,setIsFetchingUserProfile] = useState(false)
  const [user,setUser] = useState<UserProfileResponse>({
    id: "",
    email: "",
    role: "",
    fullName: "",
    phone: "",
    address: "",
    dateOfBirth: "",
    avatarUrl: ""
  })

  useEffect(() => {
    (async () => {
      setIsFetchingUserProfile(true);
      try {
        const current = await getMyProfile();
        if(current.payload){
          setUser(current.payload);
        }
      } catch(err) {
        console.log(err)
        toast.error("Lỗi khi tải thông tin người dùng");
      }
      setIsFetchingUserProfile(false);
    })();
  }, []);


  useEffect(() => {
    setTitle("Hồ sơ cá nhân")
    setBreadCrumbs([
      { label: "Trang chủ", path: "/doctor/dashboard" },
      { label: "Hồ sơ cá nhân" },
    ])
  },[])

  return (
    <LoadingComponent isLoading={isFetchingUserProfile}>
      <div className="space-y-6">
        <HeaderProfile user={user}/>

        <div className="grid gap-6">
          <UserGeneralInfo user={user}/>  
          {user?.doctorProfile && <DoctorProfileInfo doctor={user?.doctorProfile}/>}
        </div>
      </div>
    </LoadingComponent>
  )
}
