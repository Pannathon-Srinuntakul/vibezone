import React from "react";
import BlueFrame from "./frame/BlueFrame";
import PinkFrame from "./frame/PinkFrame";
import YellowFrame from "./frame/YellowFrame";
import PurpleFrame from "./frame/PurpleFrame";
import GreenFrame from "./frame/GreenFrame";
import PrideFrame from "./frame/PrideFrame";
import CloudFrame from "./frame/CloudFrame";
import PostCard from "./cards/PostCard";
import BlackFrame from "./frame/BlackFrame";
import CoffeeFrame from "./frame/CoffeeFrame";
import BunnyFrame from "./frame/BunnyFrame";
import FluffyFrame from "./frame/FluffyFrame";

const Frame = ({ posts, userData, updateUser, sriracha }) => {
  return (
    <>
      {posts.map((post, index) => {
        if (post?.status === "Private" && post?.creator?.clerkId !== userData?.clerkId) {
          return null;
        }

        let FrameComponent = null;

        switch (post.frame) {
          case "Blue":
            FrameComponent = BlueFrame;
            break;
          case "Pink":
            FrameComponent = PinkFrame;
            break;
          case "Yellow":
            FrameComponent = YellowFrame;
            break;
          case "Purple":
            FrameComponent = PurpleFrame;
            break;
          case "Green":
            FrameComponent = GreenFrame;
            break;
          case "Black":
            FrameComponent = BlackFrame;
            break;
          case "Pride":
            FrameComponent = PrideFrame;
            break;
          case "Cloud":
            FrameComponent = CloudFrame;
            break;
          case "Coffee":
            FrameComponent = CoffeeFrame;
            break;
          case "Bunny":
            FrameComponent = BunnyFrame;
            break;
          case "Fluffy":
            FrameComponent = FluffyFrame;
            break;
          default:
            FrameComponent = PostCard;
            break;
        }

        return (
          <div className="w-full" key={post._id}>
            <FrameComponent
              key={post._id}
              post={post}
              creator={post.creator}
              loggedInUser={userData}
              updateUser={updateUser}
              sriracha={sriracha}
            />
          </div>
        );
      })}
    </>
  );
};

export default Frame;
