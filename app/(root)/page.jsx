"use client";

import { useUser } from "@clerk/nextjs";
import PostCard from "@components/cards/PostCard";
import Loader from "@components/Loader";
import { useEffect, useState } from "react";

const Home = () => {
  const { user, isLoaded } = useUser();
  const [loading, setLoading] = useState(true);
  const [feedPost, setFeedPost] = useState([]);
  const [clientIp, setClientIp] = useState("");
  const [userData, setUserData] = useState({});
  const [guestData, setGuestData] = useState({});
  const [isUserDataLoaded, setIsUserDataLoaded] = useState(false); // เพิ่มสถานะนี้เพื่อเช็คว่าข้อมูล user ถูกโหลดแล้วหรือยัง
  
  const getClientIp = async () => {
    if (!user) {
      try {
        const response = await fetch("/api/getClientIp");
        const data = await response.json();
        setClientIp(data.ip);
      } catch (error) {
        console.error("Error fetching IP:", error);
      }
    }
  };

  const updateUser = async () => {
    if (user) {
      const response = await fetch(`/api/user/${user.id}`);
      const data = await response.json();
      setUserData(data);
      setIsUserDataLoaded(true);
    }
  };

  const getFeedPost = async () => {
    const response = await fetch("/api/post");
    const data = await response.json();
    const sortedData = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    setFeedPost(sortedData);
    setLoading(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (isLoaded) { // ตรวจสอบว่า useUser โหลดเสร็จหรือยัง
          if (user) {
            const response = await fetch(`/api/user/${user.id}`);
            const data = await response.json();
            setUserData(data);
            setIsUserDataLoaded(true); // ตั้งค่าสถานะว่าข้อมูล user ถูกโหลดแล้ว
          } else {
            await getClientIp();
          }
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [isLoaded, user]); // เพิ่มการเช็ค isLoaded

  useEffect(() => {
    if (isUserDataLoaded || (clientIp && !user)) { // ตรวจสอบว่าสถานะ userData ถูกโหลดหรือมี clientIp และไม่มี user
      getFeedPost();
    }
  }, [isUserDataLoaded, clientIp, user]);

  useEffect(() => {
    const fetchGuestData = async () => {
      if (clientIp && !user && !isUserDataLoaded) { // ดึงข้อมูล guest เฉพาะเมื่อ clientIp ถูกตั้งค่าและ user ไม่มีข้อมูลและ isUserDataLoaded เป็น false
        try {
          const response = await fetch(`/api/guest/${clientIp}`);
          const data = await response.json();
          setGuestData(data);
        } catch (error) {
          console.log(error);
        }
      }
    };

    fetchGuestData();
  }, [clientIp, user, isUserDataLoaded]);

  return loading || !isLoaded ? (
    <Loader />
  ) : (
    <div className="flex flex-col w-full items-center gap-10">
      {feedPost.map((post) => (
        <PostCard
          key={post._id}
          post={post}
          creator={post.creator}
          guest={clientIp}
          loggedInGuest={guestData}
          loggedInUser={userData}
          update={getFeedPost}
          updateUser={updateUser}
        />
      ))}
    </div>
  );
};

export default Home;
