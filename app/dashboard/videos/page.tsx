import BreadCrumb from "@/components/breadcrumb";
import { UserClient } from "@/components/tables/user-tables/client";
import { users } from "@/constants/data";
import { Toaster } from "@/components/ui/toaster";
 import { Suspense } from "react";
import VideoGrid from "@/components/video-page/video-grid";
import { VideoFallback } from "@/components/video-page/video-fallback";

const breadcrumbItems = [{ title: "Videos", link: "/dashboard/video" }];

export default function Page() { 

  return (
    <>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <BreadCrumb items={breadcrumbItems} />
        <UserClient data={users} /> 
          <VideoGrid />
      </div>
      <Toaster />
    </>
  );
}
