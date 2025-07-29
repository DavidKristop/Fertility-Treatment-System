import { useEffect, useState } from "react";
import { useAuthHeader } from "@/lib/context/AuthHeaderContext"
import LoadingComponent from "@/components/common/LoadingComponent";
import { HeaderProfile } from "@/components/profiles/HeaderProfile";
import type { UserProfileResponse } from "@/api/types";
import { toast } from "react-toastify";
import { getMyProfile } from "@/api/profile";
import UserGeneralInfo from "@/components/profiles/UserGeneralInfo";

export default function StaffProfile() {
  const {setTitle,setBreadCrumbs} = useAuthHeader()
  const [user, setUser] = useState<UserProfileResponse>({
    id: "",
    email: "",
    role: "",
    fullName: "",
    phone: "",
    address: "",
    dateOfBirth: "",
    avatarUrl: ""
  });
  const [isFetchingUserProfile,setIsFetchingUserProfile] = useState(false);

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
    setTitle("Hồ sơ nhân viên")
    setBreadCrumbs([
      { label: "Trang tổng quan", path: "/staff/dashboard" },
      { label: "Hồ sơ nhân viên" },
    ])
  }, [setTitle, setBreadCrumbs])

  return (
    <LoadingComponent isLoading={isFetchingUserProfile}>
      <div className="space-y-6">
        <HeaderProfile user={user}/>

        <div className="grid gap-6">
          <UserGeneralInfo user={user}/>
        </div>
      </div>
    </LoadingComponent>
  );
}